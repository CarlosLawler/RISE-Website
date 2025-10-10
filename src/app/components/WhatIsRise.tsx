"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

export default function WhatIsRise() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
  }, [open]);

  return (
    <>
      {/* Section (unchanged hero for “What is RISE?”) */}
      <section id="about" className="relative bg-[url('/fabric_plaid.png')] bg-cover bg-center">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2">
          <div className="order-2 content-center md:order-1">
            <h2 className="text-3xl md:text-4xl font-semibold text-jaguar">What is RISE?</h2>
            <p className="mt-3 text-jaguar/80">
              We are a network of simple, reproducible house churches with the focus of being disciples of Jesus who
              make disciples of Jesus. Our heart is to train all people to be with Jesus, discover their role in God&apos;s
              story, to make disciples, and to plant the church in their home.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-6 inline-block rounded-xl bg-jaguar px-4 py-2 text-white transition-colors hover:bg-biscay"
            >
              Learn More
            </button>
          </div>

          <div className="order-1 md:order-2 flex items-center justify-center">
            <div className="relative">
              <Image
                src="/whatIsRise.JPG"
                alt="People reading the Bible together"
                width={560}
                height={360}
                className="relative rounded-[28px] border border-white/70 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Glass modal */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rise-modal-title"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Dialog */}
          
	<div
	  className="relative z-[71] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/15"
	  onClick={(e) => e.stopPropagation()}
	>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6">
              <h3 id="rise-modal-title" className="text-2xl md:text-3xl font-semibold text-jaguar">
                What is RISE?
              </h3>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-jaguar/70 hover:bg-white/40 hover:text-jaguar transition"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            
	    <div className="px-6 pb-10 pt-4 text-jaguar/90 overflow-y-auto scroll-smooth">
              {/* Intro */}
              <p className="leading-relaxed">
                RISE Discipleship Network seeks to establish a network of house churches devoted to the task of being
                disciples of Jesus who make disciples. Our heart is to see small, intimate, and simple house church
                communities multiply as we sit with Jesus, learn from Him, and intentionally implement His way of life
                in ours.
              </p>

              <p className="mt-3 leading-relaxed">
                We gather each week in homes with about 15–20 friends. We share life. We worship God. We read the
                Scriptures. We teach and preach. We discuss together. Once a month, every house church in our network
                gathers together for a time of powerful corporate worship, vision, and encouragement. And throughout
                the week, we meet in small discipleship huddles of 3–4 people. This is a space where discipleship is
                personalized and people are met where they are as they learn to follow Jesus.
              </p>

              <p className="mt-3 leading-relaxed">
                Our network does not have a full-time staff. Instead, we are a community of bi-vocational workers—
                working and building our lives in the cities as we follow Jesus, plant His church, and build His
                kingdom.
              </p>

              {/* Definitions */}
              <div className="mt-6 rounded-2xl border border-white/40 bg-white/30 p-4 backdrop-blur">
                <h4 className="font-semibold text-jaguar">What we focus on</h4>
                <p className="mt-1 text-jaguar/80">
                  Everything we do is focused on the task of being disciples of Jesus and making disciples of Jesus.
                  This is how we define that:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>
                    <span className="font-medium">Disciple:</span> One who submits all of life to Jesus as they sit with
                    Him, learn from Him, and intentionally obey His way of life and teachings.
                  </li>
                  <li>
                    <span className="font-medium">Discipleship:</span> Teaching others to be with Jesus, learn from Him,
                    and obey Him as they intentionally submit all of life to Him.
                  </li>
                </ul>
              </div>

              {/* Values */}
              <div className="mt-6">
                <h4 className="font-semibold text-jaguar">Our Values</h4>
                <p className="mt-1 text-jaguar/80">
                  <span className="font-medium">Disciples of Jesus</span> — We must first and foremost be disciples of
                  Jesus. Knowing Him is first.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>One Family</li>
                    <li>Simple Living</li>
                    <li>Spirit-Empowered Servants</li>
                    <li>Radical Hospitality</li>
                    <li>Sent Ones</li>
                  </ul>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Surrendered Lives</li>
                    <li>Faithful Stewards</li>
                    <li>Multiplying Church</li>
                    <li>Lives of Celebration</li>
                  </ul>
                </div>
              </div>

              {/* Discipleship Pathway */}
              <div className="mt-8">
                <h4 className="font-semibold text-jaguar">Discipleship Pathway</h4>
                <p className="mt-1 text-jaguar/80">
                  A simple rhythm to help people get plugged in, grow as disciples, discover their calling, and multiply
                  disciples and churches.
                </p>

                {/* Three-step “badge” cards */}
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/40 bg-white/30 p-4 text-center backdrop-blur">
                    <div className="text-sm font-semibold tracking-wide">ABIDE</div>
                    <p className="mt-2 text-sm text-jaguar/80">
                      Receive consistent, ongoing discipleship. Grow to be with, learn from, and obey Jesus.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/40 bg-white/30 p-4 text-center backdrop-blur">
                    <div className="text-sm font-semibold tracking-wide">IGNITE</div>
                    <p className="mt-2 text-sm text-jaguar/80">
                      On-ramp into leader development. Discover gifts, roles, passions, and calling. Empowered to lead
                      others to Jesus.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/40 bg-white/30 p-4 text-center backdrop-blur">
                    <div className="text-sm font-semibold tracking-wide">MULTIPLY</div>
                    <p className="mt-2 text-sm text-jaguar/80">
                      Raise up new house church communities. Empower people to carry out God-given ministry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Name */}
              <div className="mt-8">
                <h4 className="font-semibold text-jaguar">Our Name</h4>
                <p className="mt-1 leading-relaxed">
                  Our name comes from Ezekiel 47:1–12. This is a vision God gives Ezekiel of a small drop of water
                  coming from the temple of God, the dwelling place of the Holy Spirit. As the prophet walks further
                  from the temple, the trickle of water rises to become a mighty river that causes everything it touches
                  to transform from death to life. We understand the meaning of this vision for God&apos;s church. It is
                  not the building, but the people of God who are the dwelling place of the Holy Spirit today. His power
                  lives in us and flows from our lives, touching the world around us. God is using His church to bring
                  life where there once was death. We believe this is God&apos;s heart for His church and for every
                  member of it.
                </p>
                <p className="mt-3 leading-relaxed">
                  Rather than gather us to one place, He has filled us with the Spirit of God to empower His people to
                  plant the church and be His witnesses wherever we go—bringing life to the earth.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
	         <a
		  href="https://docs.google.com/forms/d/e/1FAIpQLSdxI1RRwUXxrjCYMZbyBOI1eoLQBL_m90qR22awXHpeDsihQQ/viewform?usp=dialog"
		  target="_blank"
		  rel="noopener noreferrer"
                  className="rounded-xl bg-jaguar px-4 py-2 text-white transition-colors hover:bg-biscay"
                >
                  Get Connected
                </a>
                <button
                  className="rounded-xl border border-jaguar/20 bg-white/60 px-4 py-2 text-jaguar hover:bg-white/80 transition"
                  onClick={() => setOpen(false)}
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

