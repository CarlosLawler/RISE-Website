// Works out which options the connect form's dropdowns show.
//
// The options themselves are written in data/joinPage.ts. This file doesn't hold any
// content: it only double-checks those options against the live Google Form, because
// Google rejects a submission whose answer isn't one of the form's current options.

import { connectHowOptions, googleForm, houseChurches, huddles, interestOptions } from "../data/joinPage";

export const GOOGLE_FORM_LINK = `${googleForm.baseUrl}/viewform`;
export const GOOGLE_FORM_SUBMIT_URL = `${googleForm.baseUrl}/formResponse`;

export type ConnectFormChoices = {
  interest: string[];
  gathering: string[];
  huddle: string[];
  connectHow: string[];
};

const QUESTION_LABELS: Record<keyof ConnectFormChoices, string> = {
  interest: "What are you interested in?",
  gathering: "Which Gathering?",
  huddle: "Which Huddle?",
  connectHow: "How would you like to connect?",
};

// How long the website trusts its last look at the Google Form before checking again.
const RECHECK_SECONDS = 300;

/** The options as written in data/joinPage.ts. */
function choicesFromFile(): ConnectFormChoices {
  const unique = (options: string[]) => Array.from(new Set(options));
  return {
    interest: unique(Object.values(interestOptions)),
    gathering: unique(houseChurches.map((g) => g.formOption)),
    huddle: unique(huddles.map((h) => h.formOption)),
    connectHow: unique(connectHowOptions),
  };
}

/** The options currently in the live Google Form, or null if it couldn't be read. */
async function choicesFromGoogleForm(): Promise<ConnectFormChoices | null> {
  try {
    const res = await fetch(GOOGLE_FORM_LINK, { next: { revalidate: RECHECK_SECONDS } });
    if (!res.ok) throw new Error(`Google Forms responded ${res.status}`);
    const html = await res.text();

    // The form's questions are embedded in the page as a JSON array
    const match = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*([\s\S]*?);\s*<\/script>/);
    if (!match) throw new Error("Form data not found in the page");
    const questions: unknown = JSON.parse(match[1])?.[1]?.[1];
    if (!Array.isArray(questions)) throw new Error("Unexpected form data shape");

    // "entry.<id>" -> that question's option labels
    const optionsByEntry = new Map<string, string[]>();
    for (const question of questions) {
      for (const input of question?.[4] ?? []) {
        const labels = (input?.[1] ?? [])
          .filter((option: unknown[]) => !option?.[4]) // skip the free-text "Other" choice
          .map((option: unknown[]) => String(option?.[0] ?? ""))
          .filter(Boolean);
        optionsByEntry.set(`entry.${input?.[0]}`, labels);
      }
    }

    const { questions: ids } = googleForm;
    if (!optionsByEntry.has(ids.connectHow)) throw new Error("Question IDs not found in the form");
    return {
      interest: optionsByEntry.get(ids.interest) ?? [],
      gathering: optionsByEntry.get(ids.gathering) ?? [],
      huddle: optionsByEntry.get(ids.huddle) ?? [],
      connectHow: optionsByEntry.get(ids.connectHow) ?? [],
    };
  } catch (err) {
    console.warn("[Join form] Couldn't check the options against the Google Form:", err);
    return null;
  }
}

/**
 * The options to show in the connect form: the ones in data/joinPage.ts, minus any
 * that aren't in the live Google Form (those would make Google reject the submission).
 * Mismatches are logged so they can be fixed in joinPage.ts or the Google Form.
 */
export async function getConnectFormChoices(): Promise<ConnectFormChoices> {
  const fromFile = choicesFromFile();
  const fromGoogle = await choicesFromGoogleForm();
  if (!fromGoogle) return fromFile; // can't check right now, so trust the file

  const choices = { ...fromFile };
  const quote = (options: string[]) => options.map((o) => `"${o}"`).join(", ");

  for (const key of Object.keys(QUESTION_LABELS) as (keyof ConnectFormChoices)[]) {
    const notInGoogle = fromFile[key].filter((o) => !fromGoogle[key].includes(o));
    const notInFile = fromGoogle[key].filter((o) => !fromFile[key].includes(o));
    choices[key] = fromFile[key].filter((o) => fromGoogle[key].includes(o));

    if (notInGoogle.length > 0) {
      console.warn(
        `[Join form] "${QUESTION_LABELS[key]}": ${quote(notInGoogle)} in src/app/data/joinPage.ts ` +
          `is not an option in the Google Form, so it's hidden from the website's form. ` +
          `The Google Form's options are: ${quote(fromGoogle[key]) || "(none)"}. They must match exactly.`,
      );
    }
    if (notInFile.length > 0) {
      console.warn(
        `[Join form] "${QUESTION_LABELS[key]}": the Google Form has ${quote(notInFile)}, ` +
          `which is missing from src/app/data/joinPage.ts, so the website doesn't offer it.`,
      );
    }
  }

  // This question is required, so never leave it empty: fall back to Google's own options
  if (choices.connectHow.length === 0) choices.connectHow = fromGoogle.connectHow;

  return choices;
}
