import Image from "next/image";

export default function WhatIsRise() {
  return (
    <section id="about" className="relative bg-[url('/fabric_plaid.png')] bg-cover bg-center">
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2">
    <div className="order-2 md:order-1">
      <h2 className="text-3xl md:text-4xl font-semibold text-jaguar">What is RISE?</h2>
      <p className="mt-3 text-jaguar/80">
        Not just another church — a movement of simple, reproducible house
        churches meeting across Columbus. We gather to abide in Jesus,
        ignite everyday mission, and multiply disciples.
      </p>
      <a
        href="/#values"
        className="mt-6 inline-block rounded-xl bg-jaguar px-4 py-2 text-white hover:bg-biscay hover:text-white"
      >
        Learn More
      </a>
    </div>

    <div className="order-1 md:order-2 flex items-center justify-center">
      <div className="relative">
        <Image
          src="/riseWIR.png" // keep your about image
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
