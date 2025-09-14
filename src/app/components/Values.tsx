import { BookOpen, Flame, Users } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    title: "ABIDE",
    body:
      "Practicing the presence of Jesus in prayer, Scripture, and rhythms of grace.",
  },
  {
    icon: Flame,
    title: "IGNITE",
    body:
      "Everyday mission in neighborhoods, campuses, and workplaces.",
  },
  {
    icon: Users,
    title: "MULTIPLY",
    body:
      "Disciples who make disciples; simple churches that reproduce.",
  },
];

export default function Values() {
  return (
    <section id="values" className="bg-gradient-to-b from-gallery to-portage">
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl bg-white/80 p-6 text-center shadow border border-white/60 backdrop-blur"
          >
            <Icon className="mx-auto size-10" />
            <h3 className="mt-3 text-lg font-semibold tracking-wide">{title}</h3>
            <p className="mt-2 text-sm text-jaguar/80">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
