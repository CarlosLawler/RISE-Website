import PhotoMarquee from "./PhotoMarquee.tsx";
import { topRow, bottomRow } from "../../data/aboutPhotos.ts";

export default function AboutHero() {
  return (
    <section className="bg-wildsand text-jaguar pb-20">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-28 lg:pt-32">
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
      <div className="mt-14 flex flex-col gap-6">
        <PhotoMarquee images={topRow} direction="left" />
        <PhotoMarquee images={bottomRow} direction="right" />
      </div>
    </section>
  );
}
