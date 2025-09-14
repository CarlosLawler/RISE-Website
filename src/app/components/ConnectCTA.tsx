import Image from "next/image";

export default function ConnectCTA() {
  return (
    <section className="relative bg-[url('/fabric_plaid.png')] bg-cover bg-center overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Photo bubbles */}
          <div className="relative order-2 md:order-1">
            <div className="absolute -top-6 -left-4 h-40 w-40 overflow-hidden rounded-full border border-white/70 shadow-xl">
              <Image src="/riseCon1.png" alt="" fill className="object-cover" />
            </div>
            <div className="absolute top-28 left-36 h-56 w-56 overflow-hidden rounded-full border border-white/70 shadow-xl">
              <Image src="/riseCon2.png" alt="" fill className="object-cover" />
            </div>
            <div className="absolute top-56 -left-2 h-44 w-44 overflow-hidden rounded-xl border border-white/70 shadow-xl">
              <Image src="/riseCon3.png" alt="" fill className="object-cover" />
            </div>
            <div className="invisible md:visible h-[420px]" />
          </div>

          {/* Big circle CTA */}
          <div className="order-1 md:order-2 md:justify-self-end">
            <div className="relative size-[380px] md:size-[460px] rounded-full bg-mariner text-white p-10 shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-white/10" />
              <div className="relative">
                <h3 className="text-3xl font-semibold leading-tight text-center">
                  Get Connected. <br /> Find Your People.
                </h3>
                <p className="mt-4 text-white/90 text-sm leading-relaxed">
                  Whether you’re new to faith or ready to lead, there’s a seat
                  for you. Join a living room gathering, a dinner, or a serve
                  team—simple rhythms for real community and disciple-making.
                </p>
                <a
                  href="/connect"
                  className="mt-6 inline-block rounded-2xl bg-white px-5 py-2 font-semibold text-mariner hover:opacity-90 hover:bg-jaguar hover:text-white"
                >
                  Get Connected
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Band footer-like section */}
      {/* TODO: Move to separate footer component */}
      <div className="bg-biscay py-14">
        <div className="mx-auto max-w-6xl px-4 flex items-center gap-4">
          <img src="/logo-mark.svg" alt="" className="h-8 w-auto" />
          <div className="text-white">
            <div className="text-xl font-semibold tracking-wide">RISE DISCIPLESHIP NETWORK</div>
            <div className="text-white/70 text-sm">EST. 2025</div>
          </div>
        </div>
      </div>
    </section>
  );
}
