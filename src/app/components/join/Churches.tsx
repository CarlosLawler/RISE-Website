"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  House,
  MapPin,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { houseChurches, type Gathering } from "../../data/joinPage";
import HuddleFinder from "./HuddleFinder";
import EmptyState from "./EmptyState";
import { prefillConnectForm } from "./connectPrefill";

type TabId = "house-churches" | "huddles";

type Tab = {
  id: TabId;
  label: string;
  heading: string;
  linkLabel: string;
  icon: LucideIcon;
};

const tabs: Tab[] = [
  {
    id: "house-churches",
    label: "House Churches",
    heading: "Explore House Churches",
    linkLabel: "Explore House Churches",
    icon: House,
  },
  {
    id: "huddles",
    label: "Discipleship Huddles",
    heading: "Explore Discipleship Huddles",
    linkLabel: "Explore Huddles",
    icon: UsersRound,
  },
];

const buttonClass =
  "inline-flex items-center justify-center rounded-lg bg-white font-display font-bold text-jaguar shadow-sm transition-colors hover:bg-gallery focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portage focus-visible:ring-offset-2 focus-visible:ring-offset-biscay";

function HouseChurchList() {
  if (houseChurches.length === 0) {
    return <EmptyState message="New house churches are forming. Connect with us and we'll help you find one near you." />;
  }
  if (houseChurches.length === 1) {
    return <FeaturedGatheringCard gathering={houseChurches[0]} />;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">
      {houseChurches.map((g) => (
        <GatheringCard key={g.id} gathering={g} />
      ))}
    </div>
  );
}

function SectionHeading({ id, children, size }: { id?: string; children: string; size: "lg" | "md" }) {
  return (
    <div>
      <h2
        id={id}
        className={[
          "font-display font-bold tracking-tight text-jaguar",
          size === "lg" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl",
        ].join(" ")}
      >
        {children}
      </h2>
      <span aria-hidden="true" className="mt-3 block h-1.5 w-20 rounded-full bg-mariner/70 sm:w-24" />
    </div>
  );
}

function GatheringDetails({ gathering, compact }: { gathering: Gathering; compact?: boolean }) {
  const rows = [
    { icon: CalendarDays, label: "When", value: `${gathering.day} · ${gathering.time}` },
    { icon: MapPin, label: "Where", value: gathering.location },
    { icon: Users, label: "Who", value: gathering.audience },
  ];

  return (
    <dl className={compact ? "space-y-1.5 text-xs sm:space-y-2 sm:text-sm" : "space-y-3 text-base sm:text-lg"}>
      {rows.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-start gap-2 sm:gap-3">
          <Icon
            aria-hidden="true"
            className={["shrink-0 text-portage", compact ? "mt-px size-3.5 sm:size-4" : "size-6"].join(" ")}
            strokeWidth={1.75}
          />
          <dt className="sr-only">{label}</dt>
          <dd className="text-white/90">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Wide photo + details layout, used when a tab has a single gathering. */
function FeaturedGatheringCard({ gathering }: { gathering: Gathering }) {
  return (
    <article className="grid overflow-hidden rounded-3xl bg-biscay text-white shadow-[0_12px_35px_rgba(18,50,95,0.25)] md:grid-cols-2">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-80">
        <Image
          src={gathering.imageSrc}
          alt={gathering.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
        <div>
          <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{gathering.name}</h3>
          <p className="mt-1 text-base text-white/85 sm:text-lg">{gathering.host}</p>
        </div>

        <GatheringDetails gathering={gathering} />

        <a
          href="#connect"
          onClick={() => prefillConnectForm({ kind: "gathering", option: gathering.formOption })}
          className={`${buttonClass} mt-2 px-6 py-3 text-lg`}
        >
          Connect With This Gathering
        </a>
      </div>
    </article>
  );
}

/** Stacked card, used in the 2-column (mobile) / 3-column (desktop) grid. */
function GatheringCard({ gathering }: { gathering: Gathering }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-biscay text-white shadow-[0_8px_25px_rgba(18,50,95,0.2)] sm:rounded-3xl">
      <div className="relative aspect-[4/3]">
        <Image
          src={gathering.imageSrc}
          alt={gathering.imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5 lg:p-6">
        <div>
          <h3 className="font-display text-base font-bold leading-tight sm:text-xl lg:text-2xl">{gathering.name}</h3>
          <p className="mt-0.5 text-xs text-white/80 sm:text-sm">{gathering.host}</p>
        </div>

        <GatheringDetails gathering={gathering} compact />

        <a
          href="#connect"
          onClick={() => prefillConnectForm({ kind: "gathering", option: gathering.formOption })}
          className={`${buttonClass} mt-auto px-3 py-2 text-xs sm:py-2.5 sm:text-sm`}
        >
          <span className="sm:hidden">Connect</span>
          <span className="hidden sm:inline">Connect With This Gathering</span>
        </a>
      </div>
    </article>
  );
}

export default function Churches() {
  const [activeId, setActiveId] = useState<TabId>("house-churches");
  const activeTab = tabs.find((t) => t.id === activeId)!;
  const otherTab = tabs.find((t) => t.id !== activeId)!;
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <section
      id="gatherings"
      aria-labelledby="gatherings-heading"
      className="w-full scroll-mt-24 px-5 py-16 font-body sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="gatherings-heading" size="lg">
          Find Your Community
        </SectionHeading>

        {/* Toggle slider */}
        <div
          role="tablist"
          aria-label="Gathering type"
          className="relative mt-8 grid grid-cols-2 rounded-xl bg-white p-1 shadow-sm"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-biscay transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          {tabs.map(({ id, label, icon: Icon }) => {
            const selected = id === activeId;
            return (
              <button
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${id}`}
                onClick={() => setActiveId(id)}
                className={[
                  "relative z-10 flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 font-display text-sm font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mariner sm:gap-3 sm:text-base",
                  selected ? "text-white" : "text-jaguar hover:text-mariner",
                ].join(" ")}
              >
                <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
                {label}
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab.id}`}
          className="mt-10"
        >
          <SectionHeading size="md">{activeTab.heading}</SectionHeading>

          <div className="mt-6">
            {activeId === "house-churches" ? <HouseChurchList /> : <HuddleFinder />}
          </div>

          <button
            type="button"
            onClick={() => setActiveId(otherTab.id)}
            className="mt-8 inline-flex items-center gap-2 font-display text-lg font-bold text-jaguar underline underline-offset-4 transition-colors hover:text-mariner"
          >
            {activeIndex === 0 ? null : <ArrowLeft aria-hidden="true" className="size-5" />}
            {otherTab.linkLabel}
            {activeIndex === 0 ? <ArrowRight aria-hidden="true" className="size-5" /> : null}
          </button>
        </div>
      </div>
    </section>
  );
}
