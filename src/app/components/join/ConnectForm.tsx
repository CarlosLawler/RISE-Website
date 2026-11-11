"use client";

import { useActionState, type ReactNode } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { submitConnectForm, type ConnectFormState } from "../../join/actions";
import { connectOptions } from "../../data/connectForm";
import { houseChurches } from "../../data/houseChurches";

// Fallback if submitting through the site fails
const GOOGLE_FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSdxI1RRwUXxrjCYMZbyBOI1eoLQBL_m90qR22awXHpeDsihQQ/viewform";

const inputClass =
  "w-full rounded-md border border-jaguar/15 bg-white px-3 py-2 text-sm text-jaguar outline-none transition placeholder:text-jaguar/40 focus:border-mariner focus:ring-2 focus:ring-mariner/20";

const initialState: ConnectFormState = { status: "idle" };

export default function ConnectForm() {
  const [state, formAction, pending] = useActionState(submitConnectForm, initialState);

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

                {/* Left column: two dropdowns, beside a message box that spans both rows */}
                <div className="flex flex-col gap-4">
                  <Field label="Preferred Area / Gathering">
                    {/* Not sent to Google yet: there's only one location, so the Google Form has no question for it */}
                    <select name="area" defaultValue={houseChurches[0]?.area} className={inputClass}>
                      {houseChurches.map((c) => (
                        <option key={c.id} value={c.area}>
                          {c.area}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="How would you like to connect?" required>
                    <select name="connectHow" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        Choose an option
                      </option>
                      {connectOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
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
