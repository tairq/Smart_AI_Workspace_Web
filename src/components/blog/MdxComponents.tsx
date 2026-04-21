import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-display text-3xl font-bold text-off-white sm:text-4xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display text-2xl font-semibold text-off-white sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display text-xl font-semibold text-off-white"
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="font-display text-lg font-semibold text-off-white" {...props} />
  ),
  p: (props) => (
    <p className="text-light-gray leading-relaxed" {...props} />
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-accent-cyan underline decoration-accent-cyan/30 underline-offset-2 transition-colors hover:decoration-accent-cyan"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-cyan underline decoration-accent-cyan/30 underline-offset-2 transition-colors hover:decoration-accent-cyan"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: (props) => (
    <ul
      className="list-disc space-y-2 pl-6 text-light-gray marker:text-accent-cyan/50"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal space-y-2 pl-6 text-light-gray marker:text-accent-cyan/50"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent-cyan/40 pl-6 italic text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-charcoal px-1.5 py-0.5 text-sm text-accent-cyan"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="glass overflow-x-auto rounded-xl p-5 text-sm leading-relaxed"
      {...props}
    />
  ),
  hr: () => <hr className="border-accent-cyan/10" />,
  strong: (props) => (
    <strong className="font-semibold text-off-white" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-sm text-light-gray"
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead className="border-b border-accent-cyan/20 text-off-white" {...props} />
  ),
  tbody: (props) => (
    <tbody className="divide-y divide-charcoal" {...props} />
  ),
  tr: (props) => <tr {...props} />,
  th: (props) => (
    <th className="px-4 py-3 font-semibold" {...props} />
  ),
  td: (props) => <td className="px-4 py-3 align-top" {...props} />,
  img: ({ src, alt, ...props }) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={800}
        height={450}
        className="rounded-xl"
        {...props}
      />
    );
  },
};
