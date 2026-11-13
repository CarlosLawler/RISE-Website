import Image from "next/image";
import Link from "next/link";

type Photo = {
  src: string;
  alt: string;
  /** Position, size and tilt inside the collage box (percentages scale with the box) */
  className: string;
  /** Which part of the photo stays in frame when it's cropped */
  focus?: string;
};

// Placeholder photos until the team picks final ones
const photos: Photo[] = [
  {
    src: "/riseConnect4.JPG",
    alt: "Friends and a young boy roasting marshmallows around a backyard fire pit",
    className: "left-[2%] top-[4%] w-[54%] -rotate-3 z-[2]",
  },
  {
    src: "/riseConnect2.JPG",
    alt: "A house church gathered in a living room, listening as someone teaches",
    className: "right-[1%] top-[10%] w-[46%] rotate-[4deg] z-[1]",
  },
  {
    src: "/riseConnect1.JPG",
    alt: "Friends talking around a patio table with open Bibles",
    className: "left-[8%] bottom-[4%] w-[50%] rotate-2 z-[3]",
    focus: "object-[50%_75%]",
  },
  {
    src: "/riseConnect3.JPG",
    alt: "A living room full of people quietly reading their Bibles",
    className: "right-[3%] bottom-[8%] w-[44%] -rotate-[4deg] z-[4]",
  },
];

export default function HomeConnectCTA() {
  return (
    <section aria-labelledby="connect-heading" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {/* Text */}
        <div className="font-body text-biscay">
          <h2
            id="connect-heading"
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Get Connected.
            <br /> Join the Family.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-biscay/80">
            Whether you are new to the faith, or ready to lead, our door is open to you. We invite you to come join us
            in our homes—experience the simple church and the family of God as we follow Jesus together!
          </p>
          <Link
            href="/join"
            className="mt-8 inline-block rounded-full bg-mariner px-8 py-3 font-semibold text-white shadow transition-colors hover:bg-biscay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mariner"
          >
            Get Connected
          </Link>
        </div>

        {/* Scrapbook collage: every photo is positioned in percentages, so it scales down on phones */}
        <div className="relative mx-auto aspect-[6/5] w-full max-w-2xl">
          <div aria-hidden className="absolute -right-[6%] -top-[8%] size-[62%] rounded-full bg-portage/50" />

          {/* Small hand-drawn accent marks */}
          <svg
            aria-hidden
            viewBox="0 0 40 30"
            className="absolute right-[2%] top-[-2%] z-[5] w-[8%] text-mariner"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M6 24 C10 12 20 6 34 6" />
            <path d="M14 27 C17 19 24 15 34 14" />
          </svg>

          {photos.map((p) => (
            <figure
              key={p.src}
              className={`absolute bg-white p-[1.5%] shadow-xl ring-1 ring-black/5 ${p.className}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className={`object-cover ${p.focus ?? ""}`}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
