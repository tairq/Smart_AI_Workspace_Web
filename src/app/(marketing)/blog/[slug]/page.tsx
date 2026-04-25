import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowLeft, BadgeCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/data/blog";
import {
  JsonLd,
  buildArticle,
  buildBreadcrumbList,
} from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
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
  return buildPageMetadata({
    title: post.meta.seoTitle ?? post.meta.title,
    description: post.meta.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.meta.date,
    authorName: post.meta.author,
    tags: post.meta.tags,
    absoluteTitle: true,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const postUrl = `${siteConfig.url}/blog/${slug}`;
  const article = buildArticle(post.meta, postUrl);
  const crumbs = buildBreadcrumbList([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.meta.title, url: postUrl },
  ]);

  return (
    <>
      <JsonLd data={[article, crumbs]} />
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
            <Link
              href="/about/tariq-osmani"
              className="group flex items-center gap-2 transition-colors hover:text-off-white"
            >
              <Image
                src="/team/tariq-osmani.jpeg"
                alt={post.meta.author}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover ring-1 ring-accent-cyan/30"
              />
              <span className="flex items-center gap-1">
                {post.meta.author}
                <BadgeCheck
                  size={14}
                  className="fill-accent-cyan text-navy"
                  aria-label="Verified"
                />
              </span>
            </Link>
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

      {/* Cover Image */}
      {post.meta.coverImage && (
        <section className="pb-0 pt-12 md:pt-16">
          <Container className="max-w-4xl">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80 md:h-96">
              <Image
                src={post.meta.coverImage}
                alt={post.meta.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </Container>
        </section>
      )}

      {/* MDX Content */}
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <article className="prose-blog">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
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
