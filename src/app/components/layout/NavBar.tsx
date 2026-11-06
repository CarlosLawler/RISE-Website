"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const linkClass = "text-sm font-semibold text-white";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 top-0 z-50 text-white shadow-lg backdrop-blur transition-colors duration-500",
        // More solid at the top of the page, slightly see-through once scrolled
        scrolled ? "bg-biscay/90 supports-[backdrop-filter]:bg-biscay/80" : "bg-biscay/[0.97]",
      ].join(" ")}
    >
      <nav
        className={[
          "mx-auto max-w-6xl px-4 flex items-center justify-between transition-all duration-500",
          // Taller at the top of the page, compact once scrolled
          scrolled ? "py-0" : "py-4",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-2">
          {scrolled ? (
            <Image src="/riseShortLogo.png" alt="RISE Discipleship Network" width={140} height={28} priority />
          ) : (
            <span className="block font-display text-2xl font-bold uppercase leading-[0.95]">
              RISE
              <br />
              Discipleship
              <br />
              Network
            </span>
          )}
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/give" className={linkClass}>
            Give
          </Link>
          <a
            href="/join"
            className="rounded-xl bg-white px-3 py-1.5 text-sm font-semibold text-biscay shadow hover:opacity-90"
          >
            Join Us
          </a>
        </div>
      </nav>
    </div>
  );
}
