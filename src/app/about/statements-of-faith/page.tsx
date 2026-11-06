import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";
import { statementNumber, statementSlug, statementsOfFaith } from "../../data/statementsOfFaith";

export const metadata: Metadata = {
  title: "Statements of Faith | RISE Discipleship Network",
  description: "The beliefs that ground our community and guide how we follow Jesus together.",
};

export default function StatementsOfFaithPage() {
  return (
    <main className="bg-wildsand bg-[url('/fabric_plaid.png')] bg-repeat text-jaguar">
      <NavBar />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:pt-40">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mariner hover:text-biscay"
        >
          <ArrowLeft className="h-4 w-4" /> Back to About
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-biscay md:text-5xl lg:text-[3.5rem]">
          Statements of Faith<span className="text-mariner">.</span>
        </h1>
        <p className="mt-3 text-lg text-jaguar/75">
          The beliefs that ground our community and guide how we follow Jesus together.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,18rem)_1fr]">
          {/* Desktop: sticky jump list */}
          <nav aria-label="Statements" className="hidden lg:block">
            <ul className="sticky top-32 space-y-1">
              {statementsOfFaith.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#${statementSlug(s)}`}
                    className="flex gap-4 rounded-lg px-3 py-1.5 text-sm text-jaguar/75 hover:bg-biscay/5 hover:text-biscay"
                  >
                    <span className="w-5 font-semibold text-mariner">{statementNumber(i)}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* All statements */}
          <div className="space-y-6">
            {statementsOfFaith.map((s, i) => (
              <article
                key={s.title}
                id={statementSlug(s)}
                className="scroll-mt-32 rounded-2xl border border-jaguar/10 bg-white p-8 shadow-sm lg:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mariner">
                  Statement {statementNumber(i)} / {statementsOfFaith.length}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-biscay md:text-3xl">{s.title}</h2>
                <div className="mt-4 h-1 w-10 bg-mariner" />
                <p className="mt-5 max-w-3xl text-lg leading-8 text-jaguar/80">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
