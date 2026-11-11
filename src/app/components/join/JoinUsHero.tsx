import Image from "next/image";
import Link from "next/link";

export default function JoinUsHero() {
  return (
    // Top padding clears the fixed nav bar; it's the same navy, so the two blend together
    <section className="overflow-hidden bg-biscay pt-28">
      <div className="mx-auto grid max-w-[1440px] md:min-h-[500px] md:grid-cols-[48%_52%]">
        {/* Hero copy */}
        <div className="relative z-10 flex items-center px-6 py-14 sm:px-10 md:px-14 md:py-20 lg:px-20">
          <div className="max-w-xl font-body text-white">
            <p className="text-portage mb-3 text-xs font-semibold tracking-[0.24em] uppercase sm:text-sm">
              Join a House Church
            </p>

            <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find a community
              <br className="hidden sm:block" /> where you can grow
            </h1>

            <p className="text-gallery mt-6 max-w-md text-base leading-relaxed sm:text-lg">
              RISE gathers in homes throughout Columbus to worship, build
              genuine relationships, and follow Jesus together.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                href="#gatherings"
                className="text-biscay bg-white rounded-xl px-8 py-3 font-semibold transition-colors hover:bg-gallery focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Find a Gathering
              </Link>

              <Link
                href="#what-to-expect"
                className="font-semibold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:text-portage focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                What to Expect
              </Link>
            </div>
          </div>
        </div>

        {/* Hero image: fills the column edge to edge, with a curved left edge on desktop */}
        <div className="relative min-h-[330px] sm:min-h-[400px] md:min-h-full">
          <Image
            src="/whatIsRise.JPG"
            alt="People gathered in a home, talking and reading the Bible together"
            fill
            priority
            sizes="(min-width: 768px) 52vw, 100vw"
            className="object-cover"
          />
          {/* Navy curve over the image's left edge (stretches with the column) */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-y-0 left-0 hidden h-full w-28 text-biscay md:block lg:w-36"
          >
            <path d="M0 0 H100 C40 30 8 65 0 100 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
