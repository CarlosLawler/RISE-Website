"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Flame, Users, X } from "lucide-react";

const values = [
  "One Family",
  "Simple Living",
  "Spirit-Empowered Servants",
  "Radical Hospitality",
  "Sent Ones",
  "Surrendered Lives",
  "Faithful Stewards",
  "Multiplying Church",
  "Lives of Celebration",
];

const pathway = [
  {
    icon: BookOpen,
    title: "ABIDE",
    body: "Receive consistent, ongoing discipleship. Grow to be with, learn from, and obey Jesus.",
  },
  {
    icon: Flame,
    title: "IGNITE",
    body: "On-ramp into leader development. Discover gifts, roles, passions, and calling. Empowered to lead others to Jesus.",
  },
  {
    icon: Users,
    title: "MULTIPLY",
    body: "Raise up new house church communities. Empower people to carry out God-given ministry.",
  },
];

// Shared styles for the pop-up's sub-headings and white cards
const subheading = "font-display text-xl font-bold text-biscay";
const card = "rounded-2xl border-l-4 border-portage bg-white p-5 shadow-sm";

export default function HomeWhatIsRise() {
  const [open, setOpen] = useState(false);
  const learnMoreRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Close on ESC
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Lock background scroll while open; move keyboard focus into the pop-up when it opens,
  // and back to "Learn More" when it closes
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) learnMoreRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      {/* On tablet/desktop the navy background shape is drawn by the wrapper in app/page.tsx */}
      <section
        id="about"
        aria-labelledby="what-is-rise-heading"
        className="relative rounded-br-[100%_4rem] bg-biscay md:rounded-none md:bg-transparent"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-28 pt-16 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12 md:pb-36 md:pt-24 lg:gap-16">
          {/* Text first on every screen size, so phones read the heading before the photo */}
          <div className="font-body text-white">
            <h2
              id="what-is-rise-heading"
              className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
            >
              What is RISE?
            </h2>
            <p className="mt-4 text-lg font-semibold leading-snug sm:text-xl">
              Not just another church – a movement of disciple-making community.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gallery/90 sm:text-base">
              RISE is a network of Spirit-led house churches meeting in living rooms – where faith feels personal, not
              performative. Instead of weekly spectatorship, we gather like family: sharing meals, studying Scripture,
              praying, and growing in real relationship. It&apos;s a simpler, deeper way of being the Church – one built
              on constant fellowship.
            </p>
            <button
              ref={learnMoreRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-biscay shadow transition-colors hover:bg-gallery focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Learn More
            </button>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/whatIsRise.JPG"
              alt="People gathered in a home, talking and reading the Bible together"
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pop-up */}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6" onClick={() => setOpen(false)}>
          {/* Navy backdrop */}
          <div aria-hidden className="absolute inset-0 bg-biscay/70 backdrop-blur-sm" />

          {/* Dialog: nearly solid so text stays readable over anything behind it */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rise-modal-title"
            className="relative z-[71] flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-wildsand/95 font-body shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header stays put while the body scrolls, so Close is always in reach */}
            <div className="flex items-center justify-between border-b border-biscay/10 px-6 py-4 sm:px-8">
              <h3 id="rise-modal-title" className="font-display text-3xl font-bold tracking-tight text-biscay">
                What is RISE?
              </h3>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-biscay/70 transition hover:bg-biscay/10 hover:text-biscay focus-visible:outline-2 focus-visible:outline-mariner"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 pb-8 pt-5 leading-relaxed text-jaguar/85 sm:px-8">
              {/* Intro */}
              <p>
                RISE Discipleship Network seeks to establish a network of house churches devoted to the task of being
                disciples of Jesus who make disciples. Our heart is to see small, intimate, and simple house church
                communities multiply as we sit with Jesus, learn from Him, and intentionally implement His way of life
                in ours.
              </p>
              <p className="mt-3">
                We gather each week in homes with about 15–20 friends. We share life. We worship God. We read the
                Scriptures. We teach and preach. We discuss together. Once a month, every house church in our network
                gathers together for a time of powerful corporate worship, vision, and encouragement. And throughout
                the week, we meet in small discipleship huddles of 3–4 people. This is a space where discipleship is
                personalized and people are met where they are as they learn to follow Jesus.
              </p>
              <p className="mt-3">
                Our network does not have a full-time staff. Instead, we are a community of bi-vocational workers—
                working and building our lives in the cities as we follow Jesus, plant His church, and build His
                kingdom.
              </p>

              {/* Definitions */}
              <div className={`mt-6 ${card}`}>
                <h4 className={subheading}>What we focus on</h4>
                <p className="mt-1">
                  Everything we do is focused on the task of being disciples of Jesus and making disciples of Jesus.
                  This is how we define that:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-mariner">
                  <li>
                    <span className="font-semibold text-biscay">Disciple:</span> One who submits all of life to Jesus as
                    they sit with Him, learn from Him, and intentionally obey His way of life and teachings.
                  </li>
                  <li>
                    <span className="font-semibold text-biscay">Discipleship:</span> Teaching others to be with Jesus,
                    learn from Him, and obey Him as they intentionally submit all of life to Him.
                  </li>
                </ul>
              </div>

              {/* Values */}
              <div className="mt-8">
                <h4 className={subheading}>Our Values</h4>
                <p className="mt-1">
                  <span className="font-semibold text-biscay">Disciples of Jesus</span> — We must first and foremost be
                  disciples of Jesus. Knowing Him is first.
                </p>
                {/* Columns (not a grid) so the list reads top-to-bottom, like the original */}
                <ul className="mt-3 list-disc gap-x-6 space-y-1 pl-6 marker:text-mariner sm:columns-2 sm:[&>li]:break-inside-avoid">
                  {values.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>

              {/* Discipleship Pathway: same look as the home page Values panel */}
              <div className="mt-8">
                <h4 className={subheading}>Discipleship Pathway</h4>
                <p className="mt-1">
                  A simple rhythm to help people get plugged in, grow as disciples, discover their calling, and multiply
                  disciples and churches.
                </p>
                <ul className="mt-4 grid gap-4 md:grid-cols-3">
                  {pathway.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="rounded-2xl bg-white p-5 text-center shadow-sm">
                      <span className="mx-auto grid size-12 place-items-center rounded-full bg-biscay text-white">
                        <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                      </span>
                      <span aria-hidden className="mx-auto mt-3 block h-1 w-8 rounded-full bg-portage" />
                      <div className="mt-2 font-display text-lg font-bold tracking-wide text-biscay">{title}</div>
                      <p className="mt-1 text-sm">{body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Name */}
              <div className={`mt-8 ${card}`}>
                <h4 className={subheading}>Our Name</h4>
                <p className="mt-1">
                  Our name comes from Ezekiel 47:1–12. This is a vision God gives Ezekiel of a small drop of water
                  coming from the temple of God, the dwelling place of the Holy Spirit. As the prophet walks further
                  from the temple, the trickle of water rises to become a mighty river that causes everything it touches
                  to transform from death to life. We understand the meaning of this vision for God&apos;s church. It is
                  not the building, but the people of God who are the dwelling place of the Holy Spirit today. His power
                  lives in us and flows from our lives, touching the world around us. God is using His church to bring
                  life where there once was death. We believe this is God&apos;s heart for His church and for every
                  member of it.
                </p>
                <p className="mt-3">
                  Rather than gather us to one place, He has filled us with the Spirit of God to empower His people to
                  plant the church and be His witnesses wherever we go—bringing life to the earth.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/join"
                  className="rounded-full bg-mariner px-7 py-3 font-semibold text-white shadow transition-colors hover:bg-biscay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mariner"
                >
                  Get Connected
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-biscay/30 px-7 py-3 font-semibold text-biscay transition hover:bg-biscay/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mariner"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
