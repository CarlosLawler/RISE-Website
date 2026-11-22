"use client";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { statementNumber, statementsOfFaith } from "../../data/statementsOfFaith";

const total = statementsOfFaith.length;

export default function StatementsOfFaith() {
  const [selected, setSelected] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const statement = statementsOfFaith[selected];
  const nextIndex = (selected + 1) % total;
  const prevIndex = (selected - 1 + total) % total; // wraps from the first statement to the last

  // Up/Down arrows move through the list, like a menu
  function onListKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (selected + (e.key === "ArrowDown" ? 1 : -1) + total) % total;
    setSelected(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    // id lets the "Back to About" links on the all-statements page return here instead of the page top.
    // scroll-mt leaves room for the fixed nav bar.
    <section id="statements-of-faith" className="scroll-mt-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-extrabold leading-tight text-biscay md:text-5xl lg:text-[3.5rem]">
          Statements of Faith
        </h2>
        <p className="mt-3 text-lg text-jaguar/75">
          The beliefs that ground our community and guide how we follow Jesus together.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
          {/* Mobile: dropdown selector */}
          <label className="lg:hidden">
            <span className="sr-only">Choose a statement</span>
            <select
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
              className="w-full rounded-xl border border-jaguar/15 bg-white px-4 py-3 font-semibold text-biscay shadow-sm"
            >
              {statementsOfFaith.map((s, i) => (
                <option key={s.title} value={i}>
                  {statementNumber(i)}. {s.title}
                </option>
              ))}
            </select>
          </label>

          {/* Desktop: numbered list */}
          <ul className="hidden divide-y divide-jaguar/10 lg:block" onKeyDown={onListKeyDown}>
            {statementsOfFaith.map((s, i) => {
              const active = i === selected;
              return (
                <li key={s.title}>
                  <button
                    ref={(el) => {
                      buttonRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-current={active ? "true" : undefined}
                    className={[
                      "flex w-full items-center gap-5 rounded-lg px-4 py-2.5 text-left transition-colors",
                      active ? "bg-biscay text-white shadow-md" : "text-jaguar/80 hover:bg-biscay/5",
                    ].join(" ")}
                  >
                    <span
                      className={`w-6 text-sm font-semibold ${active ? "text-portage" : "text-mariner"}`}
                    >
                      {statementNumber(i)}
                    </span>
                    <span>{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail card */}
          <div>
            <article
              aria-live="polite"
              className="relative flex flex-col overflow-hidden rounded-2xl border border-jaguar/10 bg-white p-8 shadow-sm lg:min-h-[34rem] lg:p-12"
            >
              {/* Large faint number in the corner */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 right-6 select-none text-[7rem] font-extrabold leading-none text-mariner/10 lg:right-10 lg:text-[11rem]"
              >
                {statementNumber(selected)}
              </span>

              <div key={selected} className="fade-in relative flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mariner">
                  Statement {statementNumber(selected)} / {total}
                </p>
                <h3 className="mt-4 text-3xl font-extrabold leading-tight text-biscay md:text-4xl lg:text-5xl">
                  {statement.title}
                </h3>
                <div className="mt-6 h-1 w-12 bg-mariner" />
                <p className="mt-8 max-w-2xl text-lg leading-8 text-jaguar/80 lg:text-xl lg:leading-9">
                  {statement.body}
                </p>
              </div>

              {/* Decorative overlapping shapes */}
              <div aria-hidden className="relative mt-10 h-16 w-24">
                <div className="absolute left-0 top-0 h-14 w-14 rounded-full bg-portage/80" />
                <div className="absolute left-8 top-4 h-12 w-12 rounded-xl bg-biscay/90" />
              </div>

              {/* Back on the left, Next on the right; they stack on narrow screens if the titles don't fit */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-jaguar/10 pt-4">
                <button
                  type="button"
                  onClick={() => setSelected(prevIndex)}
                  className="group flex items-center gap-2 text-left text-sm text-jaguar/60 hover:text-biscay"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0 text-mariner transition-transform group-hover:-translate-x-0.5" />
                  Back:
                  <span className="font-semibold text-mariner">
                    {statementsOfFaith[prevIndex].title}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(nextIndex)}
                  className="group ml-auto flex items-center gap-2 text-right text-sm text-jaguar/60 hover:text-biscay"
                >
                  Next:
                  <span className="font-semibold text-mariner">
                    {statementsOfFaith[nextIndex].title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-mariner transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>

            <Link
              href="/about/statements-of-faith"
              className="mt-5 inline-block text-sm text-jaguar/70 underline underline-offset-4 hover:text-biscay"
            >
              Show all statements
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
