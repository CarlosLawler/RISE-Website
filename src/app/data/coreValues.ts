// Core values shown around "Disciples of Jesus" on the About page.
// Listed clockwise starting from the top. Add, remove or reorder freely;
// the circle re-spaces itself. Icons come from lucide-react (https://lucide.dev/icons).

import type { ComponentType, SVGProps } from "react";
import {
  Flame,
  HandHeart,
  HouseHeart,
  Network,
  PartyPopper,
  Send,
  Sprout,
} from "lucide-react";
import KneelingPrayer from "../components/about/KneelingPrayer";
import UsersThree from "../components/about/UsersThree";

export type CoreValue = { label: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

export const coreValues: CoreValue[] = [
  { label: "Lives of Celebration", icon: PartyPopper },
  { label: "Spirit-Empowered Servants", icon: Flame },
  { label: "Simple Living", icon: Sprout },
  { label: "Faithful Stewards", icon: HandHeart },
  { label: "Radical Hospitality", icon: HouseHeart },
  { label: "Multiplying Church", icon: Network },
  { label: "Surrendered Lives", icon: KneelingPrayer },
  { label: "Sent Ones", icon: Send },
  { label: "One Family", icon: UsersThree },
];
