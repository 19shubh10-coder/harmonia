import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/data/blog";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BlogCard from "@/components/cards/BlogCard";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static Generation                                                  */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Harmonic Learning Studio Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getRelatedPosts(currentSlug: string, category: string, count = 3) {
  return posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (b.category === category && a.category !== category) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, count);
}

/** Very basic markdown-to-HTML converter for article content */
function renderMarkdown(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="font-heading text-xl font-bold text-navy dark:text-dark-text mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-heading text-2xl font-bold text-navy dark:text-dark-text mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-heading text-3xl font-bold text-navy dark:text-dark-text mt-12 mb-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold italic">$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    // Lists
    .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-muted leading-relaxed">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal text-muted leading-relaxed">$1</li>')
    // Blockquotes
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-gold pl-6 py-2 my-6 italic text-muted bg-gold/5 rounded-r-lg"><p>$1</p></blockquote>'
    )
    // Line breaks → paragraphs
    .replace(/\n\n/g, '</p><p class="text-base leading-relaxed text-muted mb-4">')
    // Clean up
    .replace(/\n/g, "<br />");

  // Wrap in paragraph tags
  html = `<p class="text-base leading-relaxed text-muted mb-4">${html}</p>`;

  return html;
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);
  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const articleHtml = renderMarkdown(post.content);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background dark:bg-dark-bg">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 bg-navy">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
        </div>

        {/* Article Header */}
        <article className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8 md:pt-16">
          <ScrollReveal>
            <div className="text-center">
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent dark:bg-accent/20">
                {post.category}
              </span>
              <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-navy dark:text-dark-text md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
                {post.excerpt}
              </p>

              {/* Author & Meta */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <div className="flex items-center gap-3">
                  {post.authorImage && (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold/30">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-semibold text-navy dark:text-dark-text">
                      {post.author}
                    </p>
                    <p className="text-sm text-muted">
                      {formatDate(post.date)}
                    </p>
                  </div>
                </div>
                <span className="hidden h-6 w-px bg-border dark:bg-dark-border sm:block" />
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Image */}
          <ScrollReveal delay={0.2}>
            <div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Article Content */}
          <ScrollReveal delay={0.3}>
            <div
              className="prose-custom mx-auto mt-12 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: articleHtml }}
            />
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal>
            <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-8 dark:border-dark-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-navy dark:text-dark-text">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted transition-all hover:border-gold hover:text-gold dark:border-dark-border dark:bg-dark-surface"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Author Bio */}
          <ScrollReveal>
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-surface p-8 dark:bg-dark-surface">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {post.authorImage && (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-gold/20">
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium text-gold">About the Author</p>
                  <h3 className="mt-1 font-heading text-xl font-bold text-navy dark:text-dark-text">
                    {post.author}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    A passionate music educator and writer at Harmonic Learning Studio,
                    dedicated to sharing insights and inspiring the next generation of
                    musicians. With years of experience in music education, they bring
                    both expertise and warmth to every article.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3 sm:justify-start">
                    <Link
                      href={`/blog?author=${encodeURIComponent(post.author)}`}
                      className="text-sm font-medium text-gold hover:underline"
                    >
                      View all articles →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </article>

        {/* Related Posts */}
        <section className="mt-16 border-t border-border bg-surface py-16 dark:border-dark-border dark:bg-dark-surface/50 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-dark-text md:text-3xl">
                You Might Also Enjoy
              </h2>
              <p className="mt-2 text-muted">
                Continue your reading with these related articles
              </p>
            </ScrollReveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relPost, index) => (
                <ScrollReveal key={relPost.slug} delay={index * 0.1}>
                  <BlogCard post={relPost} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-navy py-16 md:py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
                Never Miss an Article
              </h2>
              <p className="mt-3 text-white/70">
                Subscribe to our newsletter and receive the latest articles, practice tips,
                and academy news directly in your inbox.
              </p>
              <div className="mt-8 mx-auto max-w-md">
                <NewsletterForm />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
