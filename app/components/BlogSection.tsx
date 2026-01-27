"use client";

import React, { useState, useEffect } from "react"; // ✅ เพิ่ม useEffect
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Bookmark,
  Share2,
  GraduationCap,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { BLOG_POSTS } from "@/app/data/posts";

// --- Types ---
type Category = "All" | "University" | "Awards" | "Career" | "Study Abroad";
const CATEGORIES: Category[] = [
  "All",
  "University",
  "Awards",
  "Career",
  "Study Abroad",
];

const SOCIALS = [
  {
    icon: Facebook,
    name: "Facebook",
    followers: "12k",
    color: "hover:text-blue-600",
    link: "https://www.facebook.com/SchoolName", // 🔗 ใส่ลิงก์ Facebook ตรงนี้
  },
  {
    icon: Instagram,
    name: "Instagram",
    followers: "8.5k",
    color: "hover:text-pink-600",
    link: "https://www.instagram.com/SchoolName", // 🔗 ใส่ลิงก์ Instagram ตรงนี้
  },
  {
    icon: Twitter,
    name: "Twitter",
    followers: "5k",
    color: "hover:text-sky-500",
    link: "https://twitter.com/SchoolName", // 🔗 ใส่ลิงก์ Twitter ตรงนี้
  },
  {
    icon: Youtube,
    name: "Youtube",
    followers: "20k",
    color: "hover:text-red-600",
    link: "https://www.youtube.com/SchoolName", // 🔗 ใส่ลิงก์ Youtube ตรงนี้
  },
];

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  // ✅ 1. สร้าง State สำหรับกำหนดจำนวนข่าวที่จะโชว์ (เริ่มต้น 6 ข่าว)
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS.filter((p) => !p.featured)
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featuredPosts = BLOG_POSTS.filter((p) => p.featured);

  // ✅ 2. Reset จำนวนข่าว เมื่อเปลี่ยนหมวดหมู่
  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  // ✅ 3. ฟังก์ชันสำหรับกดปุ่ม Load More (เพิ่มทีละ 6)
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="py-24 bg-stone-50" id="blog">
      <div className="container mx-auto px-6">
        {/* Header & Categories (เหมือนเดิม) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <FadeIn>
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              News & <span className="text-orange-600">Insights</span>
            </h2>
            <p className="text-stone-500 text-lg max-w-md">
              Stay updated with the latest academic guidance, student
              achievements, and school activities.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Featured Content (Magazine Layout) - (เหมือนเดิม) */}
        {activeCategory === "All" && (
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredPosts.length > 0 && (
              <FadeIn delay={0.3}>
                <Link href={`/news/${featuredPosts[0].id}`}>
                  <div className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer">
                    <Image
                      src={featuredPosts[0].image}
                      alt={featuredPosts[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full">
                      <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        {featuredPosts[0].category}
                      </span>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:underline decoration-orange-500 decoration-2 underline-offset-4">
                        {featuredPosts[0].title}
                      </h3>
                      <div className="flex items-center gap-4 text-stone-300 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {featuredPosts[0].date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {featuredPosts[0].readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )}
            <div className="flex flex-col gap-8">
              {featuredPosts.slice(1, 3).map((post, idx) => (
                <FadeIn key={post.id} delay={0.4 + idx * 0.1}>
                  <Link href={`/news/${post.id}`}>
                    <div className="group relative h-[234px] rounded-[2rem] overflow-hidden cursor-pointer flex">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 lg:p-8 relative z-10 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                              {post.category}
                            </span>
                            <h3 className="text-xl font-bold text-white leading-snug group-hover:text-orange-300 transition-colors">
                              {post.title}
                            </h3>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* 3. Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Article List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-8">
              <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                <Bookmark size={20} className="text-orange-600" />
                {activeCategory === "All"
                  ? "Latest Articles"
                  : `${activeCategory} Articles`}
              </h3>
              {/* บอกจำนวนข่าวที่แสดงอยู่ */}
              <span className="text-sm text-stone-500">
                Showing {Math.min(visibleCount, filteredPosts.length)} of{" "}
                {filteredPosts.length}
              </span>
            </div>

            {filteredPosts.length > 0 ? (
              // ✅ 4. ใช้ slice เพื่อตัด Array ตาม visibleCount
              filteredPosts.slice(0, visibleCount).map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.05}>
                  <Link href={`/news/${post.id}`} className="block w-full">
                    <div className="group flex flex-col md:flex-row gap-6 items-start bg-white p-5 rounded-[2rem] border border-stone-100 hover:border-orange-200 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 cursor-pointer">
                      <div className="w-full md:w-48 h-48 md:h-32 shrink-0 rounded-2xl overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                            {post.category}
                          </span>
                          <span className="text-xs text-stone-400 flex items-center gap-1">
                            <Clock size={12} /> {post.readTime}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-stone-500 text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-stone-400 group-hover:text-stone-600 transition-colors">
                          Read Article <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-stone-100 border-dashed">
                <p className="text-stone-400">
                  No articles found in this category.
                </p>
              </div>
            )}

            {/* Pagination (Load More Button) */}
            {/* ✅ 5. โชว์ปุ่มเฉพาะเมื่อยังมีข่าวเหลืออยู่ */}
            {visibleCount < filteredPosts.length && (
              <div className="pt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-stone-100 text-stone-600 font-bold rounded-full hover:bg-stone-200 transition-colors text-sm"
                >
                  Load More Articles ({filteredPosts.length - visibleCount}{" "}
                  remaining)
                </button>
              </div>
            )}
          </div>

          {/* Sidebar (เหมือนเดิม) */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-lg shadow-stone-200/40">
                <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <Share2 size={18} className="text-orange-600" />
                  Stay Connected
                </h3>
                <div className="space-y-4">
                  {SOCIALS.map((social, i) => (
                    <a
                      key={i}
                      href={social.link} // ✅ 1. ดึงลิงก์มาจากข้อมูลด้านบน
                      target="_blank" // ✅ 2. สั่งให้เปิดแท็บใหม่
                      rel="noopener noreferrer" // ✅ 3. เพื่อความปลอดภัย
                      className={`flex items-center justify-between p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors group ${social.color}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                          <social.icon size={18} />
                        </div>
                        <span className="font-semibold text-stone-700 group-hover:text-inherit">
                          {social.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-stone-400 bg-white px-2 py-1 rounded-md shadow-sm border border-stone-100">
                        {social.followers}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
