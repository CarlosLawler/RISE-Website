"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "translate-y-0 bg-biscay/90 text-white backdrop-blur supports-[backdrop-filter]:bg-biscay/80 shadow-lg"
          : "-translate-y-4 text-white/95",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-6xl px-4 py-0 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Image
            src={scrolled ? "/riseShortLogo.png" : "/riseStartLogo.png"}
            alt="RISE Discipleship Network"
            width={scrolled ? 140:220}
            height={scrolled ? 28:44}
            className="transition-opacity duration-500"
            priority
          />
        </a>

        <div className="flex items-center gap-6">
          {["Home", "About", "Give"].map((item) => (
            <a
              key={item}
              href={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
              className={[
                "text-sm font-medium transition-opacity duration-500",
                scrolled ? "opacity-100" : "opacity-50 text-jaguar hover:opacity-100",
              ].join(" ")}
            >
              {item}
            </a>
          ))}

          <a
            href="/connect"
            className={[
              "rounded-xl px-3 py-1.5 text-sm font-semibold transition-all duration-500",
              scrolled
                ? "bg-white text-biscay hover:opacity-90 shadow"
                : "bg-white/90 text-biscay hover:bg-white",
            ].join(" ")}
          >
            Join Us
          </a>
        </div>
      </nav>
    </div>
  );
}
