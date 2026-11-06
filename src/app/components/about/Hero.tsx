import PhotoMarquee from "./PhotoMarquee";
import { topRow, bottomRow } from "../../data/aboutPhotos";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden text-jaguar pb-20">
      {/* Large, mostly offscreen circle: starts right of the heading and runs down behind the photos.
          Sized in vw so its visible slice (the left ~30%) stays proportional to the screen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[42vw] top-28 hidden h-[72vw] w-[72vw] rounded-full bg-portage/40 md:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 md:pt-28 lg:pt-32">
        <div className="max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-portage">
            WHO WE ARE
          </p>

          <h1 className="font-extrabold text-3xl leading-tight sm:text-4xl md:text-[3.5rem] lg:text-[4.25rem]">
            A group of people <span className="text-mariner">following Jesus</span> together in the
            intimacy of a Home.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-7 text-jaguar/80">
            We believe intimacy with Jesus changes everything.
            <br />
            So we’ve chosen a simple way of gathering—meeting in homes—where faith becomes personal,
            community becomes real, and discipleship becomes a way of life.
          </p>
        </div>
      </div>

      {/* Full-width rolling photo rows */}
      <div className="relative mt-14 flex flex-col gap-6">
        {/* Navy circle on the left, anchored to the photo rows: peeks out just above the top row
            (below the paragraph) and ends before the navy section below. Fixed size so it lines up
            with the ~424px-tall rows. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[18rem] -top-12 hidden h-[30rem] w-[30rem] rounded-full bg-biscay md:block"
        />
        <PhotoMarquee images={topRow} direction="left" />
        <PhotoMarquee images={bottomRow} direction="right" />
      </div>
    </section>
  );
}
