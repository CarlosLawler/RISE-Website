"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Links scale up with the screen: phones are tight on space, wide screens felt empty
// Hover/keyboard focus fades in a soft white highlight behind the link. The padding gives the highlight
// room; the gaps between links are reduced by the same amount so the spacing looks unchanged.
const linkClass =
  "rounded-lg px-2 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20 focus-visible:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-3 sm:text-base lg:text-lg";
// Shared timing so the bar, emblem, and titles all move together (and stay still for reduced-motion users)
const ease = "duration-500 ease-in-out motion-reduce:transition-none";

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
          // Full width so the emblem/title hug the left edge and the links hug the right
          `flex items-center justify-between px-4 sm:px-6 lg:px-10 transition-[height] ${ease}`,
          // Taller at the top of the page, compact once scrolled. Fixed heights (not padding around the
          // content) so the bar shrinks smoothly instead of jumping when the title swaps.
          scrolled ? "h-12" : "h-20 sm:h-[6.25rem]",
        ].join(" ")}
      >
        {/* aria-label names the link on phones, where only the emblem shows */}
        <Link href="/" aria-label="RISE Discipleship Network home" className="flex shrink-0 items-center gap-2">
          {/* Emblem stays put and shrinks with the bar. The PNG has ~10% transparent padding around
              the circle, so the negative margin pulls it in to line up with the title. */}
          <Image
            src="/NewEmblem.png"
            alt=""
            width={1254}
            height={1254}
            sizes="84px"
            priority
            className={[
              // max-w-none: the negative margin narrows the link, and the default max-width:100% would squash the circle
              `w-auto max-w-none shrink-0 transition-[height,margin] ${ease}`,
              scrolled ? "-m-1 h-11" : "-m-2 h-16 sm:h-[5.25rem]",
            ].join(" ")}
          />
          {/* Phones have no room for the title next to the nav links, so the emblem stands alone there */}
          {/* Both titles are always rendered in the same grid cell and cross-fade: the full title shrinks
              away as the short logo grows in, so the swap reads as one smooth morph. */}
          <span className="hidden sm:grid">
            <span
              aria-hidden
              className={[
                `col-start-1 row-start-1 origin-left self-center font-display text-2xl font-bold uppercase leading-[0.95] transition-[opacity,transform] ${ease}`,
                scrolled ? "scale-[0.6] opacity-0" : "scale-100 opacity-100",
              ].join(" ")}
            >
              RISE
              <br />
              Discipleship
              <br />
              Network
            </span>
            <Image
              src="/riseShortLogo.png"
              alt=""
              width={140}
              height={28}
              priority
              className={[
                `col-start-1 row-start-1 origin-left self-center transition-[opacity,transform] ${ease}`,
                scrolled ? "scale-100 opacity-100" : "scale-[1.3] opacity-0",
              ].join(" ")}
            />
          </span>
        </Link>
        <div className="flex items-center gap-0 lg:gap-4">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <a
            href="https://risedn.churchcenter.com/giving"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Give
          </a>
          <a
            href="/join"
            className={[
              `ml-2 whitespace-nowrap rounded-xl bg-white px-3 sm:ml-3 py-1.5 text-sm font-semibold text-biscay shadow transition-[padding] hover:opacity-90 sm:px-4 sm:text-base lg:px-6 lg:text-lg ${ease}`,
              // Slimmer in the compact bar so it doesn't touch the bar's edges
              scrolled ? "sm:py-1" : "sm:py-2",
            ].join(" ")}
          >
            Join Us
          </a>
        </div>
      </nav>
    </div>
  );
}
