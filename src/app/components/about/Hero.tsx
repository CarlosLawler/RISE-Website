import Link from "next/link";

export default function AboutHero() {
  return (
    <main className="min-h-screen bg-wildsand text-jaguar">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-32">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-biscay">
          About RISE
        </p>
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Building discipleship and community with purpose.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-jaguar/80">
          RISE Discipleship Network exists to help people grow in faith, build meaningful
          relationships, and serve their communities with intention.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="rounded-xl bg-biscay px-4 py-2 text-sm font-semibold text-white transition hover:bg-biscay/90"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
