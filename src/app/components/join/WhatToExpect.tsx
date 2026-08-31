import {
  Baby,
  BookOpen,
  Church,
  Droplet,
  HandHeart,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type Expectation = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const expectations: Expectation[] = [
  {
    title: "A Warm Welcome",
    description:
      "Come in, grab some food, and get to know people. We begin and often end by simply enjoying time together.",
    icon: UsersRound,
  },
  {
    title: "Worship Together",
    description:
      "We turn our attention to the Lord through song, prayer, and other meaningful expressions of worship.",
    icon: Church,
  },
  {
    title: "Biblical Teaching",
    description:
      "Each gathering includes purposeful, pastorally led teaching that grounds us in Scripture and leads us deeper in following Jesus.",
    icon: BookOpen,
  },
  {
    title: "Prayer & Response",
    description:
      "Teaching makes room for conversation, prayer, and small-group response as we listen to God and encourage one another.",
    icon: HandHeart,
  },
  {
    title: "For All Ages",
    description:
      "Whether you’re single, married, a student, or bringing children, you and your family are welcome here.",
    icon: Baby,
  },
];

export default function WhatToExpect() {
  return (
    <section
      aria-labelledby="what-to-expect-heading"
      className="bg-white px-5 py-16 font-body text-biscay sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2
            id="what-to-expect-heading"
            className="font-display text-4xl font-bold tracking-tight text-mariner sm:text-5xl"
          >
            What to Expect
          </h2>

          <p className="mt-3 text-base leading-7 text-biscay sm:text-lg">
            House church is an intentional time of worship, biblical teaching,
            prayer, and life together—shared in the warmth of a home.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 min-[430px]:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {expectations.map(
            ({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex min-h-72 flex-col items-center rounded-2xl border border-gallery bg-white px-5 py-7 text-center shadow-[0_8px_25px_rgba(18,50,95,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(18,50,95,0.14)] sm:px-6"
              >
                <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-wildsand text-biscay">
                  <Icon
                    aria-hidden="true"
                    className="size-11"
                    strokeWidth={1.7}
                  />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold leading-tight text-mariner">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-biscay sm:text-base lg:text-sm">
                  {description}
                </p>
              </article>
            )
          )}
        </div>

        <div
          aria-hidden="true"
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-mariner sm:w-44" />

          <Droplet
            className="size-6 fill-mariner text-mariner"
            strokeWidth={1.5}
          />

          <span className="h-px w-20 bg-gradient-to-l from-transparent to-mariner sm:w-44" />
        </div>
      </div>
    </section>
  );
}
