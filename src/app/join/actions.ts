"use server";

import { googleForm } from "../data/joinPage";
import { GOOGLE_FORM_SUBMIT_URL, getConnectFormChoices } from "./connectFormChoices";

const ENTRY = googleForm.questions;

export type ConnectFormState = { status: "idle" | "success" | "error"; message?: string };

// Sends the Join page form to the "RISE Interest Form" Google Form, where responses are collected.
export async function submitConnectForm(
  _prev: ConnectFormState,
  formData: FormData,
): Promise<ConnectFormState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();

  const firstName = field("firstName");
  const lastName = field("lastName");
  const email = field("email");
  const phone = field("phone");
  const interest = field("interest");
  const gathering = field("gathering");
  const huddle = field("huddle");
  const connectHow = field("connectHow");
  const message = field("message");

  // Mirror the browser checks, since requests can skip them
  if (!firstName || !lastName || !email || !phone || !connectHow) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  // Google rejects the whole submission if a choice isn't one of the form's current options
  const choices = await getConnectFormChoices();
  const isValid = (value: string, options: string[]) => !value || options.includes(value);
  if (
    !isValid(interest, choices.interest) ||
    !isValid(gathering, choices.gathering) ||
    !isValid(huddle, choices.huddle) ||
    !isValid(connectHow, choices.connectHow)
  ) {
    return {
      status: "error",
      message: "Our form options were just updated. Please refresh the page and try again.",
    };
  }

  const body = new URLSearchParams({
    [ENTRY.name]: `${firstName} ${lastName}`,
    [ENTRY.email]: email,
    [ENTRY.phone]: phone,
    [ENTRY.connectHow]: connectHow,
    [ENTRY.message]: message,
  });
  // Optional questions are left out entirely when unanswered
  if (interest) body.set(ENTRY.interest, interest);
  if (gathering) body.set(ENTRY.gathering, gathering);
  if (huddle) body.set(ENTRY.huddle, huddle);

  try {
    const res = await fetch(GOOGLE_FORM_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Google Forms responded ${res.status}`);
  } catch (err) {
    console.error("Connect form submission failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your details. Please try again in a moment.",
    };
  }

  return { status: "success" };
}
