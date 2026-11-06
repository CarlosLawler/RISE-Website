import type { SVGProps } from "react";

// Three-person icon drawn in lucide's style (lucide only ships a two-person "Users" icon)
export default function UsersThree({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
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
      {/* center */}
      <circle cx="12" cy="7.5" r="3" />
      <path d="M6.5 20v-1a5.5 5.5 0 0 1 11 0v1" />
      {/* left */}
      <circle cx="5" cy="9.5" r="2.2" />
      <path d="M1.5 19.5v-.5a3.5 3.5 0 0 1 4.8-3.25" />
      {/* right */}
      <circle cx="19" cy="9.5" r="2.2" />
      <path d="M22.5 19.5v-.5a3.5 3.5 0 0 0-4.8-3.25" />
    </svg>
  );
}
