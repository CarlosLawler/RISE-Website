"use client";

import { useId, useState } from "react";

const faqs = [
  {
    q: "Is this a \"real\" church or just small groups?",
    a: "We gather as a church in homes. We're one church made up of many household gatherings that live out faith together.",
  },
  {
    q: "Why meet in homes?",
    a: "Homes create a context for authentic relationships, shared life, and practical discipleship that is hard to replicate in a larger building.",
  },
  {
    q: "Where is the main gathering?",
    a: "Our monthly gatherings bring everyone together in one place; day-to-day life and discipleship happens in homes throughout the week.",
  },
  {
    q: "Do I need to be a Christian?",
    a: "No. You're welcome wherever you are in your journey.",
  },
  {
    q: "Who is leading or teaching?",
    a: "Leaders are disciples who serve their homes. Teaching is biblical and aimed at helping people follow Jesus in everyday life.",
  },
  {
    q: "What about kids ministry?",
    a: "Kids are a welcome part of our gatherings. We see families as central to discipleship, so children take part in worship alongside adults. Then, we provide age-appropriate teaching and activities for children during the main gathering.",
  },
];

// Shared timing so the row tint, arrow, and answer all move together
const motion = "duration-300 ease-out motion-reduce:transition-none";

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="py-12">
      <div className="relative mx-auto max-w-4xl px-6">
        {/* Decorative circle peeking out from behind the card's top-right corner */}
        <div
          aria-hidden
          className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-portage sm:-top-12 sm:h-56 sm:w-56"
        />

        <div className="relative rounded-3xl bg-white px-5 py-8 shadow-lg sm:px-8 sm:py-10">
          <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-biscay sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <ChatBubbleIcon />
          </div>

          <ul className="border-t border-gallery">
            {faqs.map((item, i) => {
              const open = i === openIndex;
              const buttonId = `${baseId}-q${i}`;
              const panelId = `${baseId}-a${i}`;

              return (
                <li key={i} className="border-b border-gallery">
                  <div className={`rounded-lg transition-colors ${motion} ${open ? "bg-portage/25" : "bg-transparent"}`}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => setOpenIndex(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={panelId}
                        className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-4 text-left text-biscay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mariner sm:px-4"
                      >
                        {/* Fixed-width number column keeps every question (and wrapped lines) aligned */}
                        <span className="flex font-display text-lg font-bold sm:text-xl">
                          <span className="w-7 shrink-0 tabular-nums">{i + 1}</span>
                          <span>{item.q}</span>
                        </span>
                        <span
                          aria-hidden
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-biscay transition-colors ${motion} ${open ? "bg-biscay text-white" : "bg-transparent text-biscay"}`}
                        >
                          <svg
                            className={`h-4 w-4 transition-transform ${motion} ${open ? "rotate-180" : "rotate-0"}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    {/* Animating grid rows 0fr -> 1fr slides the answer open to its natural height, however long it is */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      inert={!open}
                      className={`grid transition-[grid-template-rows,opacity] ${motion} ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        {/* Left padding = row padding + number column, so the answer lines up with the question */}
                        <p className="pb-4 pl-10 pr-3 font-body text-base text-jaguar/80 sm:pl-11 sm:pr-4 sm:text-lg">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ChatBubbleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 64 56" className="h-12 w-14 shrink-0 text-portage sm:h-14 sm:w-16" fill="none">
      <path
        d="M32 4C16.5 4 5 13.4 5 25c0 6.3 3.4 11.9 8.8 15.8L11 52l12.6-6.6c2.7.6 5.5.9 8.4.9 15.5 0 27-9.4 27-21.3S47.5 4 32 4z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <circle cx="21" cy="25" r="3.5" fill="currentColor" />
      <circle cx="32" cy="25" r="3.5" fill="currentColor" />
      <circle cx="43" cy="25" r="3.5" fill="currentColor" />
    </svg>
  );
}
