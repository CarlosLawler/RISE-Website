"use server";

import { connectOptions } from "../data/connectForm";

// The "RISE Interest Form" Google Form. Responses keep landing there as before.
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdxI1RRwUXxrjCYMZbyBOI1eoLQBL_m90qR22awXHpeDsihQQ/formResponse";

// Google Form question IDs (from the form's "Get pre-filled link").
// If a question is added or changed in the Google Form, update its ID here.
const ENTRY = {
  name: "entry.430848516", // First and Last Name (required)
  email: "entry.269646513", // Email
  phone: "entry.418979054", // Phone Number (required)
  connectHow: "entry.1452349888", // How would you like to connect? (required)
  message: "entry.604408557", // Anything else you'd like to share?
  // TODO: add the location question's ID once it exists in the Google Form
};

export type ConnectFormState = { status: "idle" | "success" | "error"; message?: string };

export async function submitConnectForm(
  _prev: ConnectFormState,
  formData: FormData,
): Promise<ConnectFormState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();

  const firstName = field("firstName");
  const lastName = field("lastName");
  const email = field("email");
  const phone = field("phone");
  const connectHow = field("connectHow");
  const message = field("message");

  // Mirror the browser checks, since requests can skip them
  if (!firstName || !lastName || !email || !phone || !connectHow) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (!(connectOptions as readonly string[]).includes(connectHow)) {
    return { status: "error", message: "Please choose how you’d like to connect." };
  }

  const body = new URLSearchParams({
    [ENTRY.name]: `${firstName} ${lastName}`,
    [ENTRY.email]: email,
    [ENTRY.phone]: phone,
    [ENTRY.connectHow]: connectHow,
    [ENTRY.message]: message,
  });

  try {
    const res = await fetch(GOOGLE_FORM_URL, {
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
