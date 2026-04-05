import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-xs text-muted", className)}>
      <Link href="/" className="transition-colors hover:text-accent-cyan">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} />
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-accent-cyan">{item.label}</Link>
          ) : (
            <span className="text-off-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
