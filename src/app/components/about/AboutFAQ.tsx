"use client";

import React, { useState } from "react";

const faqs = [
  {
    q: "Is this a \"real\" church or just small groups?",
    a: "We gather as a church in homes. We're one church made up of many household gatherings that live out faith together.",
  },
  {
    q: "Why homes?",
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
    q: "What happens at a gathering?",
    a: "Gatherings include worship, stories of life and faith, practical teaching, and times to connect in smaller groups.",
  },
];

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(3);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-6 text-2xl font-extrabold">FAQ</h2>

        <div className="rounded-2xl bg-[#d8e3ff] p-6 lg:p-8">
          <div className="space-y-4">
            {faqs.map((item, i) => {
              const open = i === openIndex;
              return (
                <div key={i} className="">
                  <div
                    className={`w-full overflow-hidden transition-all ${open ? "rounded-2xl shadow-inner" : "rounded-full shadow-md"} bg-[#5f7ed7]`}
                  >
                    <button
                      onClick={() => setOpenIndex(open ? -1 : i)}
                      className="w-full px-6 py-4 text-left text-white flex items-center justify-between"
                      aria-expanded={open}
                    >
                      <span className="text-sm font-semibold">{item.q}</span>
                      <svg
                        className={`h-5 w-5 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`transition-[max-height] overflow-hidden ${open ? "max-h-40" : "max-h-0"}`}>
                      <div className="border-t border-white/30 px-6 py-4 text-sm text-white/95">
                        {item.a}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
