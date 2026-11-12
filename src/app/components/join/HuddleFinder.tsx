"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CalendarDays, ChevronDown, Search, Users } from "lucide-react";
import { huddles } from "../../data/gatherings";
import EmptyState from "./EmptyState";

// Leaflet touches `window`, so the map only renders in the browser.
const HuddleMap = dynamic(() => import("./HuddleMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-gallery" />,
});

// Numbers stay tied to each huddle's position in gatherings.json, even when filtered.
const numbered = huddles.map((huddle, i) => ({ ...huddle, number: i + 1 }));
const days = Array.from(new Set(huddles.map((h) => h.day)));

export default function HuddleFinder() {
  const [query, setQuery] = useState("");
  const [day, setDay] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(numbered[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return numbered.filter(
      (h) =>
        (!day || h.day === day) &&
        (!q || [h.name, h.neighborhood, h.zip, h.audience].some((field) => field.toLowerCase().includes(q))),
    );
  }, [query, day]);

  if (huddles.length === 0) {
    return (
      <EmptyState message="Discipleship huddles are forming now. Connect with us and we'll let you know when one opens near you." />
    );
  }

  const activeId = filtered.some((h) => h.id === selectedId) ? selectedId : null;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1 sm:max-w-sm">
          <span className="sr-only">Search by neighborhood or ZIP</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-biscay/60"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Neighborhood or ZIP"
            className="w-full rounded-lg border border-jaguar/15 bg-white py-2.5 pl-10 pr-3 text-jaguar outline-none transition placeholder:text-jaguar/45 focus:border-mariner focus:ring-2 focus:ring-mariner/20"
          />
        </label>

        <label className="relative sm:w-56">
          <span className="sr-only">Filter by day</span>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full appearance-none rounded-lg border border-jaguar/15 bg-white py-2.5 pl-3 pr-10 text-jaguar outline-none transition focus:border-mariner focus:ring-2 focus:ring-mariner/20"
          >
            <option value="">Any day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-jaguar"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* List */}
        <div className="lg:max-h-[34rem] lg:overflow-y-auto lg:p-1">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-center text-biscay shadow-sm">
              <p>No huddles match those filters.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDay("");
                }}
                className="mt-3 font-display font-bold text-mariner underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {filtered.map((h) => {
                const selected = h.id === activeId;
                return (
                  <li
                    key={h.id}
                    onClick={() => setSelectedId(h.id)}
                    className={[
                      "flex cursor-pointer gap-3 rounded-2xl bg-biscay p-3 text-white transition sm:gap-4",
                      selected ? "ring-4 ring-portage" : "ring-0 hover:ring-2 hover:ring-portage/60",
                    ].join(" ")}
                  >
                    <div className="relative aspect-[4/3] w-28 shrink-0 self-center overflow-hidden rounded-xl sm:w-40">
                      <Image src={h.imageSrc} alt={h.imageAlt} fill sizes="160px" className="object-cover" />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSelectedId(h.id)}
                        className="flex items-start gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portage"
                      >
                        <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-portage font-display text-sm font-bold text-jaguar sm:size-7 sm:text-base">
                          {h.number}
                        </span>
                        <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">{h.name}</h3>
                      </button>

                      <dl className="space-y-0.5 text-xs text-white/85 sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Users aria-hidden="true" className="size-4 shrink-0 text-portage" strokeWidth={1.75} />
                          <dt className="sr-only">Who</dt>
                          <dd>{h.audience}</dd>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-portage" strokeWidth={1.75} />
                          <dt className="sr-only">When</dt>
                          <dd>
                            {h.day} @ {h.time}
                          </dd>
                        </div>
                      </dl>

                      <a
                        href="#connect"
                        className="mt-auto inline-flex items-center justify-center rounded-lg bg-white px-3 py-1.5 font-display text-sm font-bold text-jaguar transition-colors hover:bg-gallery focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portage sm:py-2 sm:text-base"
                      >
                        Ask About This Huddle
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Map (shown first on mobile) */}
        <div className="order-first overflow-hidden rounded-2xl border border-gallery bg-white shadow-sm lg:order-last">
          <div className="isolate h-72 overflow-hidden sm:h-96 lg:h-[31.5rem]">
            <HuddleMap huddles={filtered} selectedId={activeId} onSelect={setSelectedId} />
          </div>
          <p className="border-t border-gallery px-4 py-2.5 text-center text-sm italic text-biscay/80">
            Approximate areas · Details shared after connecting
          </p>
        </div>
      </div>
    </div>
  );
}
