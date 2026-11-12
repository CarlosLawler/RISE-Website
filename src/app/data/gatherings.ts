// Everything shown in the Join page's "Find Your Community" section lives in gatherings.json.
//
// ── House churches ──────────────────────────────────────────────────────────
// Shown as cards AND in the connect form's "Preferred Area" dropdown (using `area`).
// {
//   "id": "dublin",                              // must be unique
//   "name": "Dublin House Church",
//   "host": "Hosted by the Smith family",
//   "day": "Wednesdays",
//   "time": "7:00 PM",
//   "area": "Dublin, Ohio",                      // short label for the form dropdown
//   "location": "Near Downtown Dublin",
//   "audience": "All ages welcome",
//   "imageSrc": "/dublinHouse.jpg",              // file in /public
//   "imageAlt": "Describe the photo for screen readers"
// }
//
// ── Discipleship huddles ────────────────────────────────────────────────────
// Shown in a list beside a map. The map only ever shows an approximate circle.
// {
//   "id": "clintonville-women",                  // must be unique
//   "name": "Clintonville Women's Huddle",
//   "day": "Tuesdays",                           // also feeds the "Any day" filter
//   "time": "6:30 PM",
//   "audience": "Women's group",
//   "neighborhood": "Clintonville",              // label on the map + searchable
//   "zip": "43214",                              // searchable
//   "approxLat": 40.04,
//   "approxLng": -83.02,
//   "radiusMeters": 1200,                        // optional, defaults to 1200
//   "imageSrc": "/clintonvilleHuddle.jpg",
//   "imageAlt": "Describe the photo for screen readers"
// }
//
// PRIVACY: this file is bundled into the public website, so NEVER put a real street
// address or the home's exact coordinates here. For approxLat/approxLng, right-click a
// spot on Google Maps roughly half a mile to a mile away from the home (a nearby park,
// intersection, or business), and copy those coordinates. Two decimal places is plenty.

import gatherings from "./gatherings.json";

export type Gathering = {
  id: string;
  name: string;
  host: string;
  day: string;
  time: string;
  area: string;
  location: string;
  audience: string;
  imageSrc: string;
  imageAlt: string;
};

export type Huddle = {
  id: string;
  name: string;
  day: string;
  time: string;
  audience: string;
  neighborhood: string;
  zip: string;
  approxLat: number;
  approxLng: number;
  radiusMeters?: number;
  imageSrc: string;
  imageAlt: string;
};

export const DEFAULT_HUDDLE_RADIUS_METERS = 1200;

export const houseChurches: Gathering[] = gatherings.houseChurches;
export const huddles: Huddle[] = gatherings.huddles;
