import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/data/blog";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mdxComponents } from "@/components/blog/MdxComponents";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      {/* Header */}
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.meta.title },
            ]}
            className="mb-8"
          />
          <div className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-pure-white sm:text-4xl md:text-5xl">
            {post.meta.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.meta.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              <time dateTime={post.meta.date}>
                {new Date(post.meta.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
            <span>{post.meta.readingTime} min read</span>
          </div>
        </Container>
      </section>

      {/* MDX Content */}
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <article className="prose-blog">
            <MDXRemote source={post.content} components={mdxComponents} />
          </article>
        </Container>
      </section>

      {/* Back to Blog */}
      <section className="border-t border-charcoal py-16">
        <Container className="text-center">
          <Button href="/blog" variant="secondary">
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </Container>
      </section>
    </>
  );
}
