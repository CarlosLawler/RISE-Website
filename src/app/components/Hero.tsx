import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[72vh] min-h-[560px] w-full">
      {/* Background image */}
        <Image
            src="/welcomeGraphic.jpg"
            alt="Warm living room"
            fill
            priority
            className="object-cover"
        />
        {/* Darken top a bit for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />

        {/* Glass card */}
        <div className="relative z-10 h-full grid place-items-center px-4">
            <div className="backdrop-blur-xl bg-white/55 border border-white/60 rounded-2xl px-6 py-5 shadow-xl max-w-lg w-full text-center">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-jaguar">
                WELCOME HOME
                </h1>
                <p className="mt-2 text-sm md:text-base text-jaguar/80">
                This is church, reimagined as living rooms and city blocks.
                </p>
            </div>
        </div>

    </section>
  );
}
