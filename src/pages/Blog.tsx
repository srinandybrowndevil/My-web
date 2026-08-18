import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, Sparkles, Tag, Search, Share2, Check } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { PageId } from '../types';
import { Image } from '../components/Image';

interface BlogProps {
  onNavigate: (page: PageId, customMsg?: string, hash?: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const categories = ['All', 'AI & Automation', 'Web Development', 'Cloud Computing'];

  const filteredPosts = selectedCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const handleShare = (post: BlogPost) => {
    const shareUrl = `${window.location.origin}/#blog?post=${post.slug}`;
    if (navigator.share) {
      navigator.share({
        title: `${post.title} | MUCO Labs Blog`,
        text: post.excerpt,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <header className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest shadow-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>MUCO Labs Insights & Blog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Engineering, AI & Digital Transformation Blog
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          In-depth technical guides, AI automation strategies, web architecture benchmarks, and cloud management insights written by MUCO Labs engineers.
        </p>
      </header>

      {/* Category Filter Bar */}
      <nav aria-label="Blog categories" className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActivePost(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat && !activePost
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Detailed Single Post Modal / View */}
      {activePost ? (
        <article className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 animate-fadeIn">
          <button
            onClick={() => setActivePost(null)}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5"
          >
            ← Back to all articles
          </button>

          <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-3 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span className="bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {activePost.category}
              </span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTime}
              </span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {activePost.publishedDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {activePost.title}
            </h2>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <Image
                  src={activePost.author.avatar}
                  alt={activePost.author.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {activePost.author.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {activePost.author.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleShare(activePost)}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </header>

          <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-800">
            <Image
              src={activePost.image}
              alt={activePost.title}
              priority={true}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {activePost.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Internal Links & Target Keywords */}
          <footer className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Related Services & Capabilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {activePost.relatedServices.map((service) => (
                  <button
                    key={service}
                    onClick={() => onNavigate('services', `Inquiry regarding ${service} from blog post: ${activePost.title}`)}
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{service}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {activePost.keywords.map((kw) => (
                <span key={kw} className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md">
                  #{kw}
                </span>
              ))}
            </div>
          </footer>
        </article>
      ) : (
        /* Grid of Blog Posts */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  aspectRatio="16/9"
                  title={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-amber-400 uppercase tracking-wider border border-amber-500/30">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      {post.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* SEO Callout Box */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 border border-amber-500/20 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-black text-white">Have a Project or Engineering Question?</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Our team of full-stack engineers and AI specialists in Erode, Tamil Nadu, India is ready to build your custom software platform.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact', 'Inquiry from MUCO Labs Blog')}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 shrink-0 transition-all"
        >
          Request Free Consultation
        </button>
      </div>
    </div>
  );
};
