"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-electric-blue text-pure-white hover:bg-electric-blue/90 hover:shadow-[0_0_24px_rgba(0,102,255,0.4)]",
  secondary:
    "border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 hover:shadow-[0_0_24px_rgba(0,212,255,0.15)]",
  ghost:
    "text-muted hover:text-off-white hover:bg-white/5",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, ...props }, ref) {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer",
      variants[variant],
      sizes[size],
      className,
    );

    if ("href" in props && props.href) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          whileTap={{ scale: 0.97 }}
          {...(rest as Omit<HTMLMotionProps<"a">, "ref">)}
        />
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        whileTap={{ scale: 0.97 }}
        {...(props as Omit<HTMLMotionProps<"button">, "ref">)}
      />
    );
  },
);
