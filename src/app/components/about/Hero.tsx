import Link from "next/link";

export default function AboutHero() {
  const images = [
    "/riseConnect1.JPG",
    "/riseConnect2.JPG",
    "/riseConnect3.JPG",
    "/riseConnect4.JPG",
    "/riseConnect5.JPG",
    "/riseConnect6.JPG",
  ];

  return (
    <main className="bg-wildsand text-jaguar">
      <section className="mx-auto max-w-7xl px-6 pt-24 md:pt-28 lg:pt-32 pb-20">
        <div className="max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-biscay">
            WHO WE ARE
          </p>

          <h1 className="font-extrabold text-3xl leading-tight sm:text-4xl md:text-[3.5rem] lg:text-[4.25rem]">
            The family of God
            <span className="ml-3 text-biscay">following Jesus</span> together in the intimacy of a Home.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-jaguar/80">
            We believe intimacy with Jesus changes everything.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-jaguar/80">
            So we’ve chosen a simple way of gathering—meeting in homes—where faith becomes personal,
            community becomes real, and discipleship becomes a way of life.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/join"
              className="rounded-xl bg-biscay px-5 py-3 text-sm font-semibold text-white transition hover:bg-biscay/90"
            >
              Join Us
            </Link>
            <Link
              href="/give"
              className="rounded-xl border border-jaguar/10 px-5 py-3 text-sm font-semibold text-jaguar transition hover:bg-jaguar/5"
            >
              Give
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {images.concat(images).slice(0, 12).map((src, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
                style={{ aspectRatio: "16/10" }}
              >
                <img
                  src={src}
                  alt={`connect ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
