import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
  readingTime: number;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parsePost(
  fileName: string
): { meta: BlogPost; content: string } | null {
  const filePath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date || !data.excerpt) return null;

  const slug = fileName.replace(/\.mdx?$/, "");

  return {
    meta: {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author ?? "Smart AI Workspace Team",
      tags: data.tags ?? [],
      coverImage: data.coverImage,
      readingTime: calculateReadingTime(content),
    },
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f));

  const posts = files
    .map((f) => parsePost(f))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(
  slug: string
): { meta: BlogPost; content: string } | null {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(BLOG_DIR, fileName);

  if (!fs.existsSync(filePath)) return null;

  return parsePost(fileName);
}
