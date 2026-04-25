import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { tariqOsmani } from "@/lib/data/author";
import { getAllPosts } from "@/lib/data/blog";
import {
  JsonLd,
  buildBreadcrumbList,
  buildPerson,
} from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildPageMetadata({
  title: "Tariq Osmani — Founder & AI Automation Consultant",
  description: tariqOsmani.shortBio,
  path: `/about/${tariqOsmani.slug}`,
  type: "profile",
});

export default function TariqOsmaniPage() {
  const recentPosts = getAllPosts().slice(0, 3);
  const personUrl = `${siteConfig.url}/about/${tariqOsmani.slug}`;

  const crumbs = buildBreadcrumbList([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
    { name: tariqOsmani.name, url: personUrl },
  ]);

  return (
    <>
      <JsonLd data={[buildPerson(), crumbs]} />

      {/* Hero */}
      <section className="gradient-mesh py-20 md:py-28">
        <Container>
          <Breadcrumbs
            items={[
              { label: "About", href: "/about" },
              { label: tariqOsmani.name },
            ]}
            className="mb-8"
          />
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="relative mx-auto md:mx-0">
              <div className="h-56 w-56 overflow-hidden rounded-2xl bg-electric-blue/15 ring-2 ring-electric-blue/30 sm:h-64 sm:w-64">
                <Image
                  src={tariqOsmani.photo}
                  alt={tariqOsmani.name}
                  width={256}
                  height={256}
                  className="h-full w-full object-cover object-top"
                  quality={100}
                  priority
                  unoptimized
                />
              </div>
              <span className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-charcoal" />
            </div>

            <div className="text-center md:text-left">
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">
                Founder
              </p>
              <SectionHeading
                as="h1"
                title={tariqOsmani.name}
                align="left"
                className="!mb-4"
              />
              <p className="font-display text-lg font-medium text-off-white md:text-xl">
                {tariqOsmani.jobTitle}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {tariqOsmani.shortBio}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a
                  href={tariqOsmani.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted transition hover:bg-white/10 hover:text-off-white"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href={tariqOsmani.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted transition hover:bg-white/10 hover:text-off-white"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter size={16} />
                </a>
                <a
                  href={tariqOsmani.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted transition hover:bg-white/10 hover:text-off-white"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
                <a
                  href={`mailto:${tariqOsmani.email}`}
                  className="ml-1 text-xs text-muted transition-colors hover:text-accent-cyan"
                >
                  {tariqOsmani.email}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bio */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-off-white sm:text-3xl">
              About me
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted md:text-base">
              {tariqOsmani.longBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Expertise / focus areas */}
      <section className="bg-navy-light py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
                <Sparkles size={20} />
              </span>
              <h2 className="font-display text-2xl font-bold text-off-white sm:text-3xl">
                Focus areas
              </h2>
            </div>
            <Card hover={false}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {tariqOsmani.expertise.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-off-white"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Recent writing */}
      {recentPosts.length > 0 && (
        <section className="py-20 md:py-24">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-off-white sm:text-3xl">
                  Recent writing
                </h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-electric-blue"
                >
                  All posts
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <Card className="flex h-full flex-col">
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <Calendar size={12} />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-off-white transition-colors group-hover:text-accent-cyan">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent-cyan">
                        Read post
                        <ArrowRight size={12} />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTAs */}
      <section className="border-t border-charcoal py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-off-white sm:text-3xl">
              Want to work together?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              I take on a small number of B2B automation engagements each
              quarter. If you have a workflow that&apos;s burning time or a
              process that should be running itself, let&apos;s talk.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="primary">
                Book a discovery call
                <ArrowRight size={16} />
              </Button>
              <Button href="/about" variant="secondary">
                About Smart AI Workspace
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
