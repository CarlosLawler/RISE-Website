// Lets the "Connect With This Gathering" / "Ask About This Huddle" buttons fill in the
// connect form at the bottom of the Join page. The buttons announce what was picked,
// and ConnectForm listens and selects the matching dropdown options.

export type ConnectPrefill = {
  kind: "gathering" | "huddle";
  /** The gathering's or huddle's `formOption` from data/joinPage.ts */
  option: string;
};

const EVENT_NAME = "rise:connect-prefill";

/** Call from a button's onClick. The button's own href="#connect" does the scrolling. */
export function prefillConnectForm(prefill: ConnectPrefill) {
  window.dispatchEvent(new CustomEvent<ConnectPrefill>(EVENT_NAME, { detail: prefill }));
}

/** Runs `handler` whenever a button asks for a prefill. Returns a cleanup function. */
export function onConnectPrefill(handler: (prefill: ConnectPrefill) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<ConnectPrefill>).detail);
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
