'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn, formatDate, truncateText } from '@/lib/utils';
import { type BlogPost } from '@/data/blog';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogCard({ post, className }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className={cn('group', className)}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative overflow-hidden rounded-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full uppercase tracking-wide">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Date & Author */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-navy dark:text-white truncate">
                  {post.author}
                </p>
                <p className="text-xs text-muted dark:text-muted-dark">
                  {formatDate(post.date)}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-heading font-bold text-navy dark:text-white mb-2 group-hover:text-gold dark:group-hover:text-gold transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-muted dark:text-muted-dark line-clamp-3 mb-4 flex-1">
              {post.excerpt}
            </p>

            {/* Read more link */}
            <div className="flex items-center gap-1.5 text-gold dark:text-gold-light text-sm font-semibold group-hover:gap-3 transition-all duration-300">
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* Gold accent line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </Link>
    </motion.article>
  );
}
