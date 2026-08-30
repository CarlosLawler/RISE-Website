import Image from "next/image";
import Link from "next/link";

type JoinUsHeroProps = {
  imageSrc: string;
};

export default function JoinUsHero() {
  return (
    <section className="bg-biscay overflow-hidden">
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
                className="text-biscay bg-white rounded-md px-6 py-3 text-sm font-semibold transition-colors hover:bg-gallery focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Find a Gathering
              </Link>

              <Link
                href="#what-to-expect"
                className="text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:text-portage focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                What to Expect
              </Link>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative min-h-[330px] sm:min-h-[400px] md:min-h-full">
          <div
            className="
              absolute inset-0 overflow-hidden
              md:-left-10
              md:rounded-l-[50%]
              md:[clip-path:ellipse(100%_110%_at_100%_50%)]
            "
          >
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
  );
}
