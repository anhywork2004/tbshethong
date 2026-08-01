"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar, Footer } from "@/components/home";
import { IconCalendar, IconEye, IconArrowLeft, IconExternalLink, IconTag } from "@tabler/icons-react";

interface NewsDetail {
  id: number; title: string; slug: string; summary: string; content: string;
  category_name: string; category_slug: string; category_color: string;
  branch_name: string | null; author_name: string | null;
  featured_image: string | null; tags: string;
  is_featured: boolean; view_count: number;
  source_url: string | null; source_name: string | null;
  published_at: string; created_at: string; updated_at: string;
}

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/v1/news/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);

          // Fetch related articles from same category
          if (data.category_slug) {
            const relRes = await fetch(
              `http://localhost:8000/api/v1/news?category_slug=${data.category_slug}&limit=3`
            );
            if (relRes.ok) {
              const relData = await relRes.json();
              setRelated((relData.items || []).filter((a: any) => a.slug !== slug).slice(0, 3));
            }
          }
        }
      } catch { console.warn("Failed to load article"); }
      finally { setLoading(false); }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8faf9]">
        <Navbar />
        <div className="flex-grow pt-28 pb-20">
          <div className="max-w-3xl mx-auto px-5 animate-pulse space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8faf9]">
        <Navbar />
        <div className="flex-grow pt-28 pb-20 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-2xl font-black mb-2">Không tìm thấy bài viết</p>
            <Link href="/news" className="text-emerald-600 font-bold hover:underline">← Quay lại Tin tức</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8faf9]">
      <Navbar />

      <article className="flex-grow pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Back link */}
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-emerald-600 transition-colors mb-6">
            <IconArrowLeft size={16} /> Tin tức
          </Link>

          {/* Category + Date */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {article.category_name && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase text-white"
                style={{ backgroundColor: (article.category_color || "#1a56db") + "CC" }}>
                {article.category_name}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <IconCalendar size={14} />
              {new Date(article.published_at).toLocaleDateString("vi-VN", {
                day: "numeric", month: "long", year: "numeric"
              })}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <IconEye size={14} /> {article.view_count} lượt xem
            </span>
            {article.author_name && (
              <span className="text-xs text-gray-400">— {article.author_name}</span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#08221a] leading-[1.15] mb-4">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-emerald-400 pl-5 italic">
              {article.summary}
            </p>
          )}

          {/* Featured Image */}
          {article.featured_image && (
            <div className="rounded-3xl overflow-hidden mb-10 shadow-lg">
              <img src={article.featured_image} alt={article.title} className="w-full object-cover max-h-[500px]" />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#08221a] prose-headings:font-black prose-a:text-emerald-600 prose-strong:text-[#08221a] prose-img:rounded-2xl prose-li:text-gray-600 prose-p:text-gray-600 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && (
            <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-gray-200">
              <IconTag size={16} className="text-gray-400" />
              {article.tags.split(",").map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500 font-medium">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Source link */}
          {article.source_url && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a href={article.source_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-bold hover:underline">
                <IconExternalLink size={16} />
                Xem bài gốc tại {article.source_name || "TBS Group"}
              </a>
            </div>
          )}
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="pb-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <h3 className="font-black text-xl text-[#08221a] mb-6">Bài viết liên quan</h3>
            <div className="grid gap-4">
              {related.map((r: any) => (
                <Link key={r.id} href={`/news/${r.slug}`}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#f8faf9] transition-colors group">
                  <div className="flex-1">
                    <h4 className="font-bold text-[#08221a] group-hover:text-emerald-600 transition-colors leading-snug">{r.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{new Date(r.published_at).toLocaleDateString("vi-VN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
