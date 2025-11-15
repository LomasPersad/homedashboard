import type { SVGProps } from 'react';

export function FamilyHubLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
      <path d="M2 7h20" />
      <path d="M12 4 8 7h8l-4-3z" />
      <path d="M12 11a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5z" />
    </svg>
  );
}
