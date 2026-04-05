import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan",
        className,
      )}
    >
      {children}
    </span>
  );
}
