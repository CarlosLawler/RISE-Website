"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { submitConnectForm, type ConnectFormState } from "../../join/actions";
import { GOOGLE_FORM_LINK, type ConnectFormChoices } from "../../join/connectFormChoices";
import { interestOptions } from "../../data/joinPage";
import { onConnectPrefill } from "./connectPrefill";

const inputClass =
  "w-full rounded-md border border-jaguar/15 bg-white px-3 py-2 text-sm text-jaguar outline-none transition placeholder:text-jaguar/40 focus:border-mariner focus:ring-2 focus:ring-mariner/20";

const initialState: ConnectFormState = { status: "idle" };

// `choices` are the dropdown options: written in data/joinPage.ts and checked against
// the live Google Form by the Join page
export default function ConnectForm({ choices }: { choices: ConnectFormChoices }) {
  const [state, formAction, pending] = useActionState(submitConnectForm, initialState);

  // These three can be pre-filled by the connect buttons on the gathering and huddle cards
  const [interest, setInterest] = useState("");
  const [gathering, setGathering] = useState("");
  const [huddle, setHuddle] = useState("");

  useEffect(
    () =>
      onConnectPrefill(({ kind, option }) => {
        // Only select things that are real options in the Google Form; otherwise leave blank
        const pick = (options: string[], wanted: string) => (options.includes(wanted) ? wanted : "");

        if (kind === "gathering") {
          setInterest(pick(choices.interest, interestOptions.gatherings));
          setGathering(pick(choices.gathering, option));
          setHuddle("");
        } else {
          setInterest(pick(choices.interest, interestOptions.huddles));
          setHuddle(pick(choices.huddle, option));
          setGathering("");
        }
      }),
    [choices],
  );

  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="scroll-mt-28 px-5 pb-20 pt-10 font-body text-biscay sm:px-8 lg:px-12 lg:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="connect-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Let’s Get You Connected
        </h2>
        <p className="mt-2 text-sm text-biscay/80 sm:text-base">
          Share a few details and someone from our team will reach out.
        </p>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          {state.status === "success" ? (
            <div role="status" className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-mariner" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 font-display text-2xl font-bold">Thank you!</h3>
              <p className="mt-2 max-w-md text-biscay/80">
                We’ve received your details. Someone from our team will reach out to you soon.
              </p>
            </div>
          ) : (
            <form action={formAction}>
              <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                <Field label="First Name" required>
                  <input name="firstName" required autoComplete="given-name" placeholder="First Name" className={inputClass} />
                </Field>
                <Field label="Last Name" required>
                  <input name="lastName" required autoComplete="family-name" placeholder="Last Name" className={inputClass} />
                </Field>
                <Field label="Email" required>
                  <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
                </Field>
                <Field label="Phone" required>
                  <input name="phone" type="tel" required autoComplete="tel" placeholder="(614) 555-1234" className={inputClass} />
                </Field>

                {/* Left column: dropdowns, beside a message box that spans the same height */}
                <div className="flex flex-col gap-4">
                  <ChoiceField
                    label="What are you interested in?"
                    name="interest"
                    options={choices.interest}
                    value={interest}
                    onChange={setInterest}
                  />
                  <ChoiceField
                    label="Which Gathering?"
                    name="gathering"
                    options={choices.gathering}
                    value={gathering}
                    onChange={setGathering}
                  />
                  <ChoiceField
                    label="Which Huddle?"
                    name="huddle"
                    options={choices.huddle}
                    value={huddle}
                    onChange={setHuddle}
                  />
                  <ChoiceField
                    label="How would you like to connect?"
                    name="connectHow"
                    options={choices.connectHow}
                    required
                  />
                </div>
                <Field label="Message / Questions">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    className={`${inputClass} h-full min-h-28 resize-y`}
                  />
                </Field>
              </div>

              {state.status === "error" && (
                <p role="alert" className="mt-6 text-center text-sm text-red-600">
                  {state.message}{" "}
                  <a href={GOOGLE_FORM_LINK} target="_blank" rel="noreferrer" className="underline">
                    You can also fill out our Google Form directly.
                  </a>
                </p>
              )}

              <div className="mt-6 flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-biscay px-14 py-3 font-display font-semibold text-white shadow-md transition-colors hover:bg-mariner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mariner focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-70"
                >
                  {pending ? "Sending…" : "Connect With Us"}
                </button>
                <p className="flex items-center gap-2 text-xs text-biscay/70">
                  <Lock className="h-3.5 w-3.5" aria-hidden />
                  Your information is private and will only be used to follow up with you.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

// A dropdown for one of the Google Form's multiple-choice questions.
// Hidden when the question has no options; optional ones can be left as "Not sure yet".
// Pass `value` + `onChange` to control it from outside (used for pre-filling).
function ChoiceField({
  label,
  name,
  options,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  // Controlled when a value is passed in, otherwise the browser keeps track of it
  const selection = value === undefined ? { defaultValue: "" } : { value };
  if (options.length === 0) return null;
  return (
    <Field label={label} required={required}>
      <select
        name={name}
        required={required}
        {...selection}
        onChange={onChange && ((e) => onChange(e.target.value))}
        className={inputClass}
      >
        <option value="" disabled={required}>
          {required ? "Choose an option" : "Not sure yet"}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}
