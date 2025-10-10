import Image from "next/image";

type Bubble = {
  src: string;
  x: string;   // CSS var for horizontal offset (from CTA center)
  y: string;   // CSS var for vertical offset (from CTA center)
  size: string;
  rounded?: string;
  z?: string;
  hideOn?: string;
};

const bubbles: Bubble[] = [
// A — smores 
{
  src: "/riseConnect5.JPG",
  x: "[--x:clamp(-260px,-28vw,-80px)] md:[--x:clamp(-460px,-2vw,-190px)] lg:[--x:clamp(0px,6vw,80px)] xl:[--x:clamp(-900px,-32vw,-550px)]",
  y: "[--y:clamp(-260px,-66vw,-120px)] md:[--y:clamp(-300px,-12vw,-180px)] lg:[--y:clamp(-180px,-15vw,0px)] xl:[--y:clamp(-350px,-8vw,-300px)]",
  size: "size-[clamp(200px,16vw,380px)]",
  rounded: "rounded-full",
  z: "z-[1]",
},

// B — luca (top-right) → +50px right, +100px up on lg
{
  src: "/riseConnect4.JPG",
  x: "[--x:clamp(120px,46vw,220px)]  md:[--x:clamp(360px,17vw,360px)] lg:[--x:clamp(270px,20vw,390px)] xl:[--x:clamp(300px,18vw,420px)]",
  y: "[--y:clamp(0px,8vw,0px)]  md:[--y:clamp(-50px,-2vw,-20px)] lg:[--y:clamp(-280px,-4vw,-60px)] xl:[--y:clamp(-240px,-5vw,-20px)]",
  size: "size-[clamp(76px,13vw,300px)]",
  rounded: "rounded-full",
  z: "z-[3]",
},

// C — reading (you want it up 200, right 150 on lg)
{
  src: "/riseConnect3.JPG",
  x: "[--x:clamp(30px,25vw,200px)]  md:[--x:clamp(200px,28vw,350px)] lg:[--x:clamp(-380px,-20vw,-120px)] xl:[--x:clamp(-900px,-45vw,-600px)]",
  y: "[--y:clamp(-280px,-83vw,-40px)]  md:[--y:clamp(-220px,25vw,-200px)] lg:[--y:clamp(-280px,-9vw,-220px)] xl:[--y:clamp(0px,2vw,100px)]",
  size: "size-[clamp(200px,9vw,500px)]",
  rounded: "rounded-full",
  z: "z-[3]",
},

// D — exhortation (hidden at lg; still shows at xl as before)
{
  src: "/riseConnect2.JPG",
  x: "[--x:clamp(330px,20vw,420px)]  md:[--x:clamp(340px,20vw,460px)] lg:[--x:clamp(420px,24vw,560px)] xl:[--x:clamp(330px,20vw,620px)]",
  y: "[--y:clamp(90px,6vw,150px)]  md:[--y:clamp(100px,6.5vw,160px)] lg:[--y:clamp(40px,4vw,120px)] xl:[--y:clamp(90px,6vw,150px)]",
  size: "size-[clamp(120px,8vw,350px)]",
  rounded: "rounded-full",
  hideOn: "hidden lg:hidden xl:block", // ← hide at lg and below, show again at xl
  z: "z-[1]",
},

// E — ky guitar (top-middle) → +250px down, +75px right on lg
{
  src: "/riseConnect6.JPG",
  x: "[--x:clamp(-200px,-20vw,-10px)] md:[--x:clamp(-260px,-42vw,-140px)] lg:[--x:clamp(-205px,-2vw,-105px)] xl:[--x:clamp(-60px,-4vw,0px)]",
  y: "[--y:clamp(100px,43vw,180px)] md:[--y:clamp(150px,15vw,250px)] lg:[--y:clamp(150px,12vw,250px)] xl:[--y:clamp(-220px,-14vw,-300px)]",
  size: "size-[clamp(284px,12vw,375px)]",
  rounded: "rounded-full",
  z: "z-[2]",
},

// F — patio (bottom-middle) → +200px right, +100px up on lg
{
  src: "/riseConnect1.JPG",
  x: "[--x:clamp(80px,30vw,180px)]  md:[--x:clamp(160px,16vw,200px)] lg:[--x:clamp(160px,5vw,340px)] xl:[--x:clamp(-10px,5vw,60px)]",
  y: "[--y:clamp(200px,18vw,360px)]  md:[--y:clamp(150px,6vw,300px)] lg:[--y:clamp(20px,6vw,140px)] xl:[--y:clamp(30px,4vw,190px)]",
  size: "size-[clamp(250px,12vw,475px)]",
  rounded: "rounded-full",
  z: "z-[1]",
},
];

export default function ConnectCTA() {
  return (
    <section className="relative overflow-hidden bg-[url('/fabric_plaid.png')] bg-repeat">
      <div className="relative mx-auto max-w-[1280px] px-4 py-16 sm:py-20 md:py-24 min-h-[60svh]">
        {/* Bubbles */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {bubbles.map((b, i) => (
            <div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className={[
                  b.x,
                  b.y,
                  "translate-x-[var(--x)] translate-y-[var(--y)]",
                  "overflow-hidden border border-black/35 shadow-xl",
                  b.size,
                  b.rounded ?? "rounded-full",
                  b.z ?? "z-[1]",
		  b.hideOn ?? "",
                ].join(" ")}
              >
                <Image src={b.src} alt="" fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative z-10 grid place-items-center lg:place-items-start">
          <div className="lg:-translate-x-6 xl:-translate-x-10">
            <div className="relative rounded-full bg-mariner text-white shadow-2xl size-[clamp(360px,36vw,560px)]">
              <div className="absolute inset-0 rounded-full bg-white/10" />
              <div className="relative h-full w-full grid place-items-center text-center px-6">
                <div className="max-w-[36ch]">
                  <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                    Get Connected.
                    <br /> Join the Family.
                  </h3>
                  <p className="mt-4 text-white/90 text-xs sm:text-sm md:text-base leading-relaxed">
                    Whether you are new to the faith, or ready to lead, our door is open to you. We invite you to come join us in our homes—experience the simple
                    church and the family of God as we follow Jesus together!
                  </p>
                  <a
		  href="https://docs.google.com/forms/d/e/1FAIpQLSdxI1RRwUXxrjCYMZbyBOI1eoLQBL_m90qR22awXHpeDsihQQ/viewform?usp=dialog"
		  target="_blank"
		  rel="noopener noreferrer"                    
		  className="mt-6 inline-block rounded-2xl bg-white px-5 py-2 font-semibold text-mariner transition-colors hover:bg-jaguar hover:text-white"
                  >
                    Get Connected
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
}

