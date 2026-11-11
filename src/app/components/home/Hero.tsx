import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative h-[72vh] min-h-[560px] w-full">
      {/* Background image */}
      <Image
        src="/welcomeGraphic.jpg"
        alt="Warm living room"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Darken top a bit for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />

      {/* Glass card */}
      <div className="relative z-10 grid h-full place-items-center px-4 pt-20">
        <div className="w-full max-w-xl rounded-2xl border border-white/60 bg-white/55 px-6 py-5 text-center shadow-xl backdrop-blur-xl sm:px-10 sm:py-6">
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-biscay sm:text-5xl md:text-6xl">
            Welcome Home
          </h1>
          <p className="mt-3 font-body text-sm text-jaguar/80 sm:text-base">
            This is Church, reimagined in living rooms and led by the Spirit
          </p>
        </div>
      </div>
    </section>
  );
}
