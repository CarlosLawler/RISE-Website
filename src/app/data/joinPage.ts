// ═════════════════════════════════════════════════════════════════════════════
//  JOIN PAGE — THE ONE PLACE TO EDIT
// ═════════════════════════════════════════════════════════════════════════════
// Everything the Join page knows about house churches, huddles and the connect
// form lives in this file: the cards, the huddle map, and the form's dropdowns.
//
// The connect form on the website sends its answers into the "RISE Interest Form"
// Google Form. The website CANNOT edit the Google Form, so the form itself is the
// one other place that has to be kept up to date by hand.
//
// ⚠️  THE GOLDEN RULE
// Anything below marked "MUST MATCH THE GOOGLE FORM EXACTLY" has to be the same,
// character for character, as the option text in the Google Form: same spelling,
// capitals, spaces and punctuation (watch out for curly ’ vs straight ', and
// long — vs short - dashes). Copy and paste it from the Google Form; don't retype.
// Google throws away a submission whose answer isn't one of its options.
//
// Safety net: if something here doesn't match the Google Form, the website hides
// that option from its dropdown (so nobody's submission gets lost) and prints a
// "[Join form]" warning in the terminal / server logs naming what doesn't match.
//
// ── Common changes ───────────────────────────────────────────────────────────
// Add a house church or huddle:
//   1. Google Form: add it as an option under "Which Gathering?" / "Which Huddle?".
//   2. Here: copy an existing entry in `houseChurches` / `huddles`, fill it in, and
//      paste the option text from step 1 into `formOption`.
// Rename one: change the option in the Google Form, then `formOption` here.
// Remove one: delete its entry here, then delete the option in the Google Form.
// Change "How would you like to connect?" or "What are you interested in?":
//   change the option in the Google Form, then the matching text below.
// ═════════════════════════════════════════════════════════════════════════════

// ── The Google Form ──────────────────────────────────────────────────────────
export const googleForm = {
  // The form's public link, without anything after the long ID
  // (Google Form → Send → link icon; drop "/viewform..." from the end).
  baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdxI1RRwUXxrjCYMZbyBOI1eoLQBL_m90qR22awXHpeDsihQQ",

  // Each question's ID in the Google Form. These only change if a question is deleted
  // and re-created; editing a question's options keeps the same ID.
  // To find one: Google Form → ⋮ → "Get pre-filled link", fill in every answer,
  // "Get link", and read the entry.<number> values out of the link.
  // Adding a brand-new question also needs a developer to add a field for it in
  // components/join/ConnectForm.tsx and join/actions.ts.
  questions: {
    name: "entry.430848516", // "First and Last Name" (required)
    email: "entry.269646513", // "Email"
    phone: "entry.418979054", // "Phone Number" (required)
    interest: "entry.93759658", // "What are you interested in?"
    gathering: "entry.93649919", // "Which Gathering?"
    huddle: "entry.1799941335", // "Which Huddle?"
    connectHow: "entry.1452349888", // "How would you like to connect?" (required)
    message: "entry.604408557", // "Anything else you’d like to share?"
  },
} as const;

// ── "What are you interested in?" ────────────────────────────────────────────
// ⚠️ The text on the right MUST MATCH THE GOOGLE FORM EXACTLY.
// Keep the names on the left (gatherings / huddles) as they are: they tell the
// website which option to pick when someone clicks a house church or huddle card.
export const interestOptions = {
  gatherings: "Gatherings",
  huddles: "Huddles",
} as const;

// ── "How would you like to connect?" ─────────────────────────────────────────
// ⚠️ Every line MUST MATCH THE GOOGLE FORM EXACTLY. Shown in this order.
// (The Google Form's free-text "Other" choice isn't offered on the website.)
export const connectHowOptions: string[] = [
  "Visit",
  "Talk with someone from RISE",
  "I’m not sure yet — I’d just like to learn more",
];

// ── House churches ───────────────────────────────────────────────────────────
// Each entry makes one card on the Join page AND one choice in the connect form's
// "Which Gathering?" dropdown.
export type Gathering = {
  /** Must be unique. Lowercase with dashes, never shown to visitors. */
  id: string;
  /** ⚠️ MUST MATCH THE GOOGLE FORM EXACTLY: this gathering's option under "Which Gathering?" */
  formOption: string;
  /** Title on the card */
  name: string;
  host: string;
  day: string;
  time: string;
  /** General area only, never a street address (see PRIVACY below) */
  location: string;
  audience: string;
  /** A file in the /public folder, starting with "/" */
  imageSrc: string;
  /** Describe the photo for screen readers */
  imageAlt: string;
};

export const houseChurches: Gathering[] = [
  {
    id: "bethel-road",
    formOption: "Bethel Rd", // ⚠️ MUST MATCH THE GOOGLE FORM EXACTLY ("Which Gathering?")
    name: "Bethel Road House Church",
    host: "Hosted by the Ostermeyer family",
    day: "Sundays",
    time: "Time to be confirmed",
    location: "Near Bethel Road, Columbus",
    audience: "All ages welcome",
    imageSrc: "/riseConnect1.JPG",
    imageAlt: "People gathered in a living room for the Bethel Road house church",
  },
];

// ── Discipleship huddles ─────────────────────────────────────────────────────
// Each entry makes one row in the huddle list, one circle on the map, AND one
// choice in the connect form's "Which Huddle?" dropdown.
//
// PRIVACY: this file is bundled into the public website, so NEVER put a real street
// address or a home's exact coordinates here. For approxLat/approxLng, right-click a
// spot on Google Maps roughly half a mile to a mile away from the home (a nearby park,
// intersection, or business), and copy those coordinates. Two decimal places is plenty.
// The map only ever shows an approximate circle.
export type Huddle = {
  /** Must be unique. Lowercase with dashes, never shown to visitors. */
  id: string;
  /** ⚠️ MUST MATCH THE GOOGLE FORM EXACTLY: this huddle's option under "Which Huddle?" */
  formOption: string;
  /** Title in the list */
  name: string;
  /** Also feeds the "Any day" filter */
  day: string;
  time: string;
  audience: string;
  /** Label on the map, and searchable */
  neighborhood: string;
  /** Searchable */
  zip: string;
  approxLat: number;
  approxLng: number;
  /** Size of the circle on the map. Optional, defaults to 1200. */
  radiusMeters?: number;
  /** A file in the /public folder, starting with "/" */
  imageSrc: string;
  /** Describe the photo for screen readers */
  imageAlt: string;
};

export const DEFAULT_HUDDLE_RADIUS_METERS = 1200;

export const huddles: Huddle[] = [
  {
    id: "carlos-aidan",
    formOption: "Carlos and Aidan's Huddle", // ⚠️ MUST MATCH THE GOOGLE FORM EXACTLY ("Which Huddle?")
    name: "Carlos and Aidan's Huddle",
    day: "Fridays",
    time: "7:00 PM",
    audience: "Men's group",
    neighborhood: "University District",
    zip: "43201",
    approxLat: 39.998,
    approxLng: -83.007,
    radiusMeters: 1200,
    imageSrc: "/riseConnect3.JPG",
    imageAlt: "A group reading the Bible together in a living room",
  },
];
