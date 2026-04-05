import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className, size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-hidden="true"
    >
      {/* Outer rounded square background */}
      <rect width="36" height="36" rx="9" fill="#0B1426" />
      <rect width="36" height="36" rx="9" fill="url(#logoGrad)" fillOpacity="0.15" />

      {/* Robot head outline */}
      <rect x="7" y="10" width="22" height="18" rx="4" stroke="#0066FF" strokeWidth="1.8" fill="none" />

      {/* Antenna */}
      <line x1="18" y1="10" x2="18" y2="6" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="5" r="1.5" fill="#00D4FF" />

      {/* Left ear nub */}
      <rect x="5" y="16" width="2" height="5" rx="1" fill="#0066FF" />
      {/* Right ear nub */}
      <rect x="29" y="16" width="2" height="5" rx="1" fill="#0066FF" />

      {/* Left eye */}
      <circle cx="13.5" cy="18" r="3" fill="#0066FF" />
      <circle cx="13.5" cy="18" r="1.4" fill="#00D4FF" />
      <circle cx="14.2" cy="17.3" r="0.5" fill="white" fillOpacity="0.8" />

      {/* Right eye */}
      <circle cx="22.5" cy="18" r="3" fill="#0066FF" />
      <circle cx="22.5" cy="18" r="1.4" fill="#00D4FF" />
      <circle cx="23.2" cy="17.3" r="0.5" fill="white" fillOpacity="0.8" />

      {/* Smile / mouth */}
      <path
        d="M13.5 23.5 Q18 26.5 22.5 23.5"
        stroke="#00D4FF"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
