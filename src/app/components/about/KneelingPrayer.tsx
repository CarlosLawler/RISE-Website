import type { SVGProps } from "react";

// Figure kneeling in prayer with light above, drawn in lucide's style (lucide has no equivalent)
export default function KneelingPrayer({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* rays above the head */}
      <path d="M14 2v1.5" />
      <path d="M10.5 3.5l1 1" />
      <path d="M17.5 3.5l-1 1" />
      {/* head */}
      <circle cx="14" cy="8" r="2" />
      {/* back curving down to the hip */}
      <path d="M12.5 10.5c-2 1.5-4 4-4 7.5" />
      {/* thigh forward to the knee, shin back along the ground */}
      <path d="M8.5 18l5 3H5.5" />
      {/* arms folded up, hands together in front of the face */}
      <path d="M12.5 12.5l2.5 2.5 1.5-4" />
    </svg>
  );
}
