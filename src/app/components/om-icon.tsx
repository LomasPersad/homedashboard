import type { SVGProps } from 'react';

export function OmIcon(props: SVGProps<SVGSVGElement>) {
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
        <path d="M10 10v0a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4v-1a4 4 0 0 1 4-4h1z"/>
        <path d="M12 2a9.7 9.7 0 0 0-7 3 8.6 8.6 0 0 0-3 7c0 3.5 1.5 6 4 8"/>
        <path d="M12 2a9.7 9.7 0 0 1 7 3 8.6 8.6 0 0 1 3 7c0 3.5-1.5 6-4 8"/>
    </svg>
  );
}
