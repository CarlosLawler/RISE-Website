import { BookOpen, Flame, Users } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    title: "ABIDE",
    body: "Sitting with Jesus, learning from Him, and obeying Him.",
  },
  {
    icon: Flame,
    title: "IGNITE",
    body: "Empowering God's people through discipleship to use their gifts and to lead others to Jesus.",
  },
  {
    icon: Users,
    title: "MULTIPLY",
    body: "Disciples who make Disciples. Simple churches that reproduce.",
  },
];

export default function HomeValues() {
  return (
    // Pulled up so the panel overlaps the bottom of the navy "What is RISE?" section
    <section id="values" aria-label="Abide, Ignite, Multiply" className="relative -mt-16 px-5 pb-16 sm:px-8 md:-mt-20 md:pb-24">
      <div className="relative mx-auto max-w-6xl">
        {/* Light-blue circle peeking out from behind the panel's top-right corner */}
        <div
          aria-hidden
          className="absolute -right-8 -top-12 size-32 rounded-full bg-portage/60 sm:-right-12 sm:-top-16 md:size-44"
        />

        <ul className="relative grid divide-y divide-gallery rounded-2xl bg-white shadow-xl md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map(({ icon: Icon, title, body }) => (
            <li key={title} className="px-6 py-8 text-center font-body md:my-6 md:py-4 lg:px-10">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-biscay text-white md:size-20">
                <Icon className="size-8 md:size-9" strokeWidth={1.75} aria-hidden />
              </span>
              <span aria-hidden className="mx-auto mt-5 block h-1 w-10 rounded-full bg-portage" />
              <h3 className="mt-3 font-display text-2xl font-bold tracking-wide text-biscay md:text-3xl">{title}</h3>
              <p className="mx-auto mt-2 max-w-[26ch] text-sm leading-relaxed text-jaguar/80 md:text-base">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
