"use client";

import Image from "next/image";
import { Clock3, MapPin, Users } from "lucide-react";

// Uncomment these when you activate the automatic carousel.
// import { useEffect, useState } from "react";

export type HouseChurch = {
  id: string;
  name: string;
  day: string;
  area: string;
  time: string;
  location: string;
  audience: string;
  imageSrc: string;
  imageAlt: string;
};

const houseChurches: HouseChurch[] = [
  {
    id: "ostermeyer-home",
    name: "The Ostermeyer’s Home",
    day: "Sundays",
    area: "Bethel Rd, Columbus",
    time: "10:00 PM",
    location: "Near Bethel Rd.",
    audience: "All Ages",
    imageSrc: "/riseConnect1.JPG",
    imageAlt: "The Ostermeyer home in Columbus, Ohio",
  },

  /*
   * Add future house churches here:
   *
   * {
   *   id: "another-house-church",
   *   name: "Another House Church",
   *   day: "Wednesdays",
   *   area: "Dublin, Ohio",
   *   time: "7:00 PM",
   *   location: "Near Downtown Dublin",
   *   audience: "All Ages",
   *   imageSrc: "/images/another-house.jpg",
   *   imageAlt: "The home where the Dublin house church gathers",
   * },
   */
];

type HouseChurchCardProps = {
  church: HouseChurch;
};

function HouseChurchCard({ church }: HouseChurchCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-biscay via-[#102d71] to-jaguar px-4 py-5 text-white shadow-[16px_16px_0_rgba(0,0,0,0.28)] sm:px-6 md:px-7">
      {/* Day and general area */}
      <div className="mb-4 flex items-center gap-4 text-xs text-silver sm:text-sm">
        <span className="shrink-0">{church.day}</span>

        <span
          aria-hidden="true"
          className="h-px flex-1 bg-white/25"
        />

        <span className="shrink-0 text-right">{church.area}</span>
      </div>

      {/* House image */}
      <div className="relative h-40 overflow-hidden rounded-xl sm:h-52 md:h-60">
        <Image
          src={church.imageSrc}
          alt={church.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      {/* House church name */}
      <h3 className="px-2 py-5 text-center font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {church.name}
      </h3>

      {/* Gathering details */}
      <div className="border-y border-white/20 py-4">
        <dl className="flex flex-col items-center justify-center gap-3 text-silver sm:flex-row sm:flex-wrap sm:gap-0">
          <div className="flex items-center gap-2 sm:px-5">
            <Clock3
              aria-hidden="true"
              className="size-5 shrink-0"
              strokeWidth={2}
            />
            <dt className="sr-only">Time</dt>
            <dd>{church.time}</dd>
          </div>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-white/60 sm:block"
          />

          <div className="flex items-center gap-2 sm:px-5">
            <MapPin
              aria-hidden="true"
              className="size-5 shrink-0"
              fill="currentColor"
              strokeWidth={2}
            />
            <dt className="sr-only">Location</dt>
            <dd>{church.location}</dd>
          </div>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-white/60 sm:block"
          />

          <div className="flex items-center gap-2 sm:px-5">
            <Users
              aria-hidden="true"
              className="size-5 shrink-0"
              fill="currentColor"
              strokeWidth={2}
            />
            <dt className="sr-only">Who can attend</dt>
            <dd>{church.audience}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default function HouseChurches() {
  const currentChurch = houseChurches[0];

  return (
    <section
      aria-label="House church locations"
      className="w-full px-4 py-12 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <HouseChurchCard church={currentChurch} />

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-biscay px-10 py-3 font-display font-semibold text-white shadow-md transition-colors hover:bg-mariner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mariner focus-visible:ring-offset-4"
          >
            Want More Details?
          </button>
        </div>
      </div>
    </section>
  );
}

/*
 * FUTURE AUTOMATIC CROSSFADE/SLIDE CAROUSEL
 *
 * When you have multiple house churches:
 *
 * 1. Uncomment the React import near the top of this file.
 * 2. Replace the active HouseChurches component above with the component below.
 *
 * The carousel changes cards every six seconds. The outgoing card fades and
 * slides left while the incoming card fades and slides into place.
 */

/*
export default function HouseChurches() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (houseChurches.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        (currentIndex + 1) % houseChurches.length
      );
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="House church locations"
      className="w-full overflow-hidden px-4 py-12 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid">
          {houseChurches.map((church, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={church.id}
                aria-hidden={!isActive}
                className={[
                  "col-start-1 row-start-1 transition-all duration-700 ease-in-out",
                  isActive
                    ? "visible translate-x-0 opacity-100"
                    : "invisible -translate-x-8 opacity-0",
                ].join(" ")}
              >
                <HouseChurchCard church={church} />
              </div>
            );
          })}
        </div>

        <div
          aria-label="Choose a house church"
          className="mt-7 flex justify-center gap-2"
        >
          {houseChurches.map((church, index) => (
            <button
              key={church.id}
              type="button"
              aria-label={`Show ${church.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-8 bg-mariner"
                  : "w-2.5 bg-silver hover:bg-portage",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-biscay px-10 py-3 font-display font-semibold text-white shadow-md transition-colors hover:bg-mariner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mariner focus-visible:ring-offset-4"
          >
            Want More Details?
          </button>
        </div>
      </div>
    </section>
  );
}
*/
