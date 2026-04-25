import { ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/Container";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
  title?: string;
  eyebrow?: string;
};

export function FAQ({ items, title = "Frequently Asked Questions", eyebrow }: FAQProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-12 text-center md:mb-16">
          {eyebrow && (
            <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold tracking-tight text-off-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="glass group rounded-2xl p-6 transition-colors hover:border-electric-blue/30 md:p-7 [&[open]>summary>svg]:rotate-180"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left font-display text-base font-semibold text-off-white transition-colors group-hover:text-electric-blue md:text-lg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  className="mt-1 shrink-0 text-accent-cyan transition-transform duration-300"
                  aria-hidden
                />
              </summary>
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted md:text-base">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
