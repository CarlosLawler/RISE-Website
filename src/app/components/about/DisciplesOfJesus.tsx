import { coreValues } from "../../data/coreValues";

// Diagram geometry, in % of the square diagram (center is 50, 50)
const ITEM_RADIUS = 38; // where each value sits
const SPOKE_START = 21; // just outside the center circle
const SPOKE_END = 29; // stops short of the icon

// Evenly spaced around the circle, starting at the top and going clockwise
function pointAt(index: number, radius: number) {
  const angle = (index / coreValues.length) * 2 * Math.PI - Math.PI / 2;
  return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) };
}

export default function DisciplesOfJesus() {
  return (
    <section className="overflow-hidden bg-biscay px-6 py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 xl:flex-row xl:items-center xl:gap-16">
        {/* Left: heading and copy */}
        <div className="text-white xl:w-[42%] xl:shrink-0">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-portage">
            Our Core Values
          </p>
          <h2 className="text-4xl font-medium leading-tight md:text-5xl lg:text-[3.5rem]">
            <strong className="font-extrabold">JESUS</strong> came to{" "}
            {/* Keep "make DISCIPLES." together on larger screens */}
            <span className="md:whitespace-nowrap">
              make <strong className="font-extrabold">DISCIPLES</strong>.
            </span>
          </h2>
          {/* Side by side on mid-size screens, where the text spans the full width; stacked otherwise */}
          <div className="mt-6 md:grid md:grid-cols-2 md:gap-10 xl:block">
            <p className="max-w-md text-lg leading-8 text-white/85">
              True disciples are people who submit all of life to Jesus as they sit with him, learn
              from him, and intentionally obey his way of life and teachings.
            </p>
            <p className="mt-4 max-w-md text-lg leading-8 text-white/85 md:mt-0 xl:mt-4">
              The way we live is meant to be shaped by who we follow. If we are the kind of
              disciples Jesus came to make, then our lives, as well as the church, will look as
              Jesus intended.
            </p>
          </div>
        </div>

        {/* Right: values diagram */}
        <div className="relative w-full xl:flex-1">
          {/* Decorative circle peeking out behind the panel */}
          <div className="absolute -right-6 -top-10 h-32 w-32 rounded-full bg-portage xl:-right-10 xl:h-40 xl:w-40" />

          <div className="relative rounded-3xl bg-wildsand bg-[url('/fabric_plaid.png')] bg-repeat p-6 shadow-xl sm:p-10">
            {/* Tablet and up: radial diagram */}
            <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] md:block">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                {coreValues.map((_, i) => {
                  const start = pointAt(i, SPOKE_START);
                  const end = pointAt(i, SPOKE_END);
                  return (
                    <line
                      key={i}
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="var(--color-portage)"
                      strokeWidth={0.3}
                    />
                  );
                })}
              </svg>

              <CenterCircle className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 text-2xl" />

              <ul>
                {coreValues.map(({ label, icon: Icon }, i) => {
                  const { x, y } = pointAt(i, ITEM_RADIUS);
                  return (
                    <li
                      key={label}
                      className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <Icon className="h-10 w-10 text-biscay" strokeWidth={1.5} aria-hidden />
                      <span className="text-sm font-semibold leading-tight text-biscay">{label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile: center circle with a grid of values */}
            <div className="md:hidden">
              <CenterCircle className="mx-auto h-36 w-36 text-xl" />
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {coreValues.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-portage/20 px-3 py-5 text-center"
                  >
                    <Icon className="h-8 w-8 text-biscay" strokeWidth={1.5} aria-hidden />
                    <span className="text-sm font-semibold leading-tight text-biscay">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CenterCircle({ className }: { className: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-biscay text-center font-bold leading-tight text-white shadow-lg ${className}`}
    >
      Disciples
      <br />
      of Jesus
    </div>
  );
}
