import { Fragment } from "react";
import { ClipboardPen, Droplet, HouseHeart, PhoneCall, type LucideIcon } from "lucide-react";

type Step = { title: string; description: string; icon: LucideIcon };

const steps: Step[] = [
  {
    title: "Fill Out the Form",
    description: "Share a few details so we can get to know you.",
    icon: ClipboardPen,
  },
  {
    title: "We Reach Out",
    description: "A team member will personally reach out to you soon.",
    icon: PhoneCall,
  },
  {
    title: "Find Your Gathering",
    description: "We’ll help you find the right gathering that fits your life.",
    icon: HouseHeart,
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="px-5 pt-16 font-body text-biscay sm:px-8 sm:pt-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="how-it-works-heading"
          className="font-display text-4xl font-bold tracking-tight text-mariner sm:text-5xl"
        >
          How It Works
        </h2>
        <p className="mt-3 text-base leading-7 text-biscay sm:text-lg">
          Getting connected is simple.
        </p>

        <ol className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
          {steps.map(({ title, description, icon: Icon }, i) => (
            <Fragment key={title}>
              {/* Dotted connector between cards (desktop only) */}
              {i > 0 && (
                <li
                  aria-hidden
                  className="hidden w-10 shrink-0 border-t-2 border-dotted border-biscay/60 md:block lg:w-14"
                />
              )}
              <li className="relative flex flex-1 items-center gap-4 rounded-2xl bg-white p-5 shadow-md">
                <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-biscay text-sm font-bold text-white">
                  {i + 1}
                </span>
                <Icon className="ml-6 mt-4 h-14 w-14 shrink-0" strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-biscay/80">{description}</p>
                </div>
              </li>
            </Fragment>
          ))}
        </ol>

        {/* Divider with the water drop from the RISE logo mark */}
        <div aria-hidden className="mx-auto mt-14 flex max-w-md items-center gap-3 text-biscay">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-biscay" />
          <Droplet className="h-5 w-5 fill-current" strokeWidth={0} />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-biscay" />
        </div>
      </div>
    </section>
  );
}
