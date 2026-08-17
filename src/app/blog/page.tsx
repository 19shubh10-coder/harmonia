import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, type BlogPost } from "@/data/blog";
import HeroSection from "@/components/sections/HeroSection";
import CTABanner from "@/components/sections/CTABanner";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BlogCard from "@/components/cards/BlogCard";
import NewsletterForm from "@/components/forms/NewsletterForm";

import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog & Resources | Harmonic Learning Studio",
  description:
    "Insights, tips, and inspiration for your musical journey. Explore articles on music education, performance techniques, practice strategies, and more.",
  openGraph: {
    title: "Blog & Resources | Harmonic Learning Studio",
    description:
      "Insights, tips, and inspiration for your musical journey.",
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getAllCategories(allPosts: BlogPost[]): string[] {
  const cats = new Set(allPosts.map((p) => p.category));
  return Array.from(cats);
}

function getAllTags(allPosts: BlogPost[]): string[] {
  const tags = new Set(allPosts.flatMap((p) => p.tags));
  return Array.from(tags);
}

function getRecentPosts(allPosts: BlogPost[], count: number): BlogPost[] {
  return [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/* ------------------------------------------------------------------ */
/*  Featured Post Card                                                 */
/* ------------------------------------------------------------------ */

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-dark-surface md:flex">
        <div className="relative aspect-[16/10] md:aspect-auto md:w-1/2">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
          <span className="absolute top-4 left-4 rounded-full bg-gold px-4 py-1 text-sm font-semibold text-white">
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 md:w-1/2 md:p-10">
          <span className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent dark:bg-accent/20 dark:text-accent">
            {post.category}
          </span>
          <h2 className="font-heading text-2xl font-bold leading-tight text-navy transition-colors group-hover:text-gold dark:text-dark-text md:text-3xl">
            {post.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {post.authorImage && (
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-navy dark:text-dark-text">
                {post.author}
              </p>
              <p className="text-xs text-muted">{formatDate(post.date)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

function Sidebar({
  categories,
  recentPosts,
  tags,
}: {
  categories: string[];
  recentPosts: BlogPost[];
  tags: string[];
}) {
  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-surface">
        <h3 className="font-heading text-lg font-bold text-navy dark:text-dark-text">
          Categories
        </h3>
        <ul className="mt-4 space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-gold/5 hover:text-gold"
              >
                <span>{cat}</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-surface">
        <h3 className="font-heading text-lg font-bold text-navy dark:text-dark-text">
          Recent Posts
        </h3>
        <ul className="mt-4 space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-navy transition-colors group-hover:text-gold dark:text-dark-text line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted">
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags Cloud */}
      <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-dark-surface">
        <h3 className="font-heading text-lg font-bold text-navy dark:text-dark-text">
          Popular Tags
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-all hover:border-gold hover:bg-gold/5 hover:text-gold dark:border-dark-border"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="rounded-xl bg-navy p-6 text-white shadow-lg">
        <h3 className="font-heading text-lg font-bold">
          Stay in Tune
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Subscribe to our newsletter for the latest articles, tips, and academy news.
        </p>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Blog Listing Page                                                  */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost.slug).slice(0, 6);
  const categories = getAllCategories(posts);
  const recentPosts = getRecentPosts(posts, 4);
  const tags = getAllTags(posts);

  return (
    <>
      <main className="min-h-screen bg-background dark:bg-dark-bg">
        {/* Hero */}
        <HeroSection
          title="Blog & Resources"
          subtitle="Insights, tips, and inspiration for your musical journey"
          backgroundImage="/images/violin-sheet.png"
        />

        {/* Featured Post */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Featured Article"
                subtitle="Our editor's pick for this month"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="mt-10">
                <FeaturedPostCard post={featuredPost} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Blog Grid + Sidebar */}
        <section className="bg-surface py-16 dark:bg-dark-surface/50 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Latest Articles"
                subtitle="Explore our collection of articles, guides, and musical insights"
              />
            </ScrollReveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-3">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
                  {otherPosts.map((post, index) => (
                    <ScrollReveal key={post.slug} delay={index * 0.1}>
                      <BlogCard post={post} />
                    </ScrollReveal>
                  ))}
                </div>

                {/* Load More */}
                {posts.length > 7 && (
                  <div className="mt-12 text-center">
                    <Link
                      href="/blog?page=2"
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 font-semibold text-gold transition-all hover:bg-gold hover:text-white"
                    >
                      Load More Articles
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <Sidebar
                  categories={categories}
                  recentPosts={recentPosts}
                  tags={tags}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <CTABanner
          heading="Share Your Music Story"
          description="Are you a musician, educator, or music enthusiast? We'd love to feature your insights and experiences on our blog. Contribute to our growing community of music lovers."
          ctaLabel="Become a Contributor"
          ctaHref="/contact"
          secondaryLabel="Submission Guidelines"
          secondaryHref="/blog/guidelines"
        />
      </main>
    </>
  );
}
