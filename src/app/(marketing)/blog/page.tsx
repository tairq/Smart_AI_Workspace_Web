import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";
import { getAllPosts } from "@/lib/data/blog";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Automation Blog & Insights",
  description:
    "Insights on AI automation, workflow optimization, and business transformation from the Smart AI Workspace team.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Insights & Updates"
            subtitle="Practical guides, case studies, and the latest thinking on AI-powered business automation."
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-muted">
              No posts yet — check back soon!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="glass h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-[0_0_24px_0_rgba(0,212,255,0.12)]">
                    {post.coverImage && (
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-off-white">
                            {post.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag}>{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <ArrowUpRight
                          size={18}
                          className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                        <Calendar size={12} />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span>·</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
