'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { Poppins } from 'next/font/google';
import { 
  ArrowLeft, Share2, Facebook, Twitter, Linkedin, 
  Mail, Heart, Clock
} from 'lucide-react';

// ✅ Import ข้อมูลจากไฟล์กลาง
import { BLOG_POSTS } from '@/app/data/posts';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function SingleNewsPage() {
  const params = useParams();
  
  // Fix hydration mismatch by setting URL in useEffect
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  
  // 1. หาข่าวปัจจุบัน
  const post = BLOG_POSTS.find(item => item.id === Number(params.id));

  // ถ้าหาไม่เจอ ให้แสดง 404
  if (!post) return notFound();

  // 2. Logic "Related Articles" Loop
  const relatedArticles = BLOG_POSTS.filter(
    item => item.category === post.category && item.id !== post.id
  ).slice(0, 4);

  return (
    <div className={`bg-white min-h-screen text-stone-900 ${poppins.className}`}>
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        
        {/* Top Nav */}
        <div className="mb-8">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
                <ArrowLeft size={18} />
                Back to News
            </Link>
        </div>

        {/* Layout Container */}
        {/* ✅ เพิ่ม justify-between เพื่อจัดระยะห่างซ้าย-ขวาให้สวยงาม */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between">
            
            {/* ================= LEFT: Main Content ================= */}
            {/* ✅ กำหนดความกว้างคงที่ (Fixed Width) 780px เพื่อไม่ให้ยืดหด */}
            <article className="w-full lg:w-[780px] flex-shrink-0">
                
                {/* Category & Date */}
                <div className="flex items-center gap-3 text-sm text-stone-500 mb-4">
                     <span className="font-bold text-orange-600 uppercase tracking-wider">{post.category}</span>
                     <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                     <span>{post.date}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-stone-900">
                    {post.title}
                </h1>
                
                {/* Author Bar */}
                <div className="flex items-center justify-between border-y border-stone-100 py-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-100">
                            <Image src={post.authorImg || post.image} alt="Author" fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-stone-900">{post.author || 'Editorial Team'}</p>
                            <p className="text-xs text-stone-500">{post.readTime} read</p>
                        </div>
                    </div>
                    
                    {/* Share Button (Desktop) */}
                        <div className="hidden md:flex gap-2">
                            
                            {/* 1. Facebook */}
                            {/* เปลี่ยน button เป็น a และใส่ลิงก์ใน href */}
                            <a 
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                            >
                                <Facebook size={18}/>
                            </a>

                            {/* 2. Twitter (X) */}
                            <a 
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                            >
                                <Twitter size={18}/>
                            </a>

                            {/* 3. LinkedIn */}
                            <a 
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                            >
                                <Linkedin size={18}/>
                            </a>

                        </div>
                </div>

                   {/* Featured Image - Force Height & Cover */}
                    <div className="w-full mb-10 bg-stone-100 rounded-2xl overflow-hidden shadow-sm">
                        <Image 
                            src={post.image} 
                            alt={post.title} 
                            width={1200} 
                            height={675}
                            // ✅ สูตรแก้:
                            // 1. ลบ h-auto ออก (เพื่อไม่ให้ความสูงไหลตามความกว้าง)
                            // 2. กำหนด h-[300px] สำหรับมือถือ
                            // 3. กำหนด lg:h-[600px] สำหรับจอคอม (ล็อกตายตัวที่ 600px)
                            className="w-full object-cover h-[300px] lg:h-[600px]"
                            priority
                        />
                    </div>

                {/* Content Body */}
                <div 
                    className="prose prose-lg prose-stone max-w-none 
                    prose-headings:font-bold prose-headings:text-stone-900 
                    prose-p:text-stone-600 prose-p:leading-relaxed prose-p:mb-6
                    prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }} 
                />

               
            </article>

            {/* ================= RIGHT: Sidebar ================= */}
                <aside className="lg:w-[360px] flex-shrink-0 space-y-10">

                    {/* Share Links (Dynamic Share) */}
                    <div>
                        <h3 className="text-sm font-bold text-stone-900 mb-4">Share this article</h3>
                        <div className="flex gap-2">
                            {[
                                { 
                                    // LinkedIn Share
                                    icon: <Linkedin size={18} />, 
                                    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
                                    color: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]" // สีแบรนด์ LinkedIn
                                },
                                { 
                                    // Twitter (X) Share
                                    icon: <Twitter size={18} />, 
                                    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`,
                                    color: "hover:bg-black hover:text-white hover:border-black" // สีแบรนด์ X
                                },
                                { 
                                    // Facebook Share
                                    icon: <Facebook size={18} />, 
                                    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
                                    color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" // สีแบรนด์ FB
                                },
                                { 
                                    // Email Share
                                    icon: <Mail size={18} />, 
                                    href: `mailto:?subject=${encodeURIComponent(post.title)}&body=Check this out: ${encodeURIComponent(currentUrl)}`,
                                    color: "hover:bg-orange-600 hover:text-white hover:border-orange-600"
                                }
                            ].map((item, i) => (
                                <a 
                                    key={i} 
                                    href={item.href}
                                    target="_blank"             // เปิดแท็บใหม่
                                    rel="noopener noreferrer"   // เพื่อความปลอดภัย
                                    className={`w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-500 transition-all ${item.color}`}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 3. Related Articles (List Style) */}
                <div>
                    <h3 className="text-lg font-bold text-stone-900 mb-6">Related Articles</h3>
                    
                    <div className="flex flex-col gap-6">
                        {relatedArticles.length > 0 ? (
                            relatedArticles.map((article) => (
                                <Link 
                                    href={`/news/${article.id}`} 
                                    key={article.id} 
                                    className="group flex gap-4 items-start"
                                >
                                    {/* ✅ บังคับขนาดรูปด้วย width/height (Fixed Pixel) */}
                                    <div className="flex-shrink-0 rounded-xl overflow-hidden border border-stone-100 bg-stone-200">
                                        <Image 
                                            src={article.image} 
                                            alt={article.title} 
                                            width={96}   // 96px
                                            height={80}  // 80px
                                            className="object-cover w-24 h-20 group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    {/* Text Info */}
                                    <div className="flex flex-col py-0.5">
                                        <h4 className="text-sm font-bold text-stone-900 leading-snug mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                                            {article.title}
                                        </h4>
                                        <span className="text-xs text-stone-500 font-medium mt-1">
                                            {article.category}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-6 bg-stone-50 rounded-xl border border-dashed border-stone-200 text-center">
                                <p className="text-sm text-stone-400">No related articles.</p>
                            </div>
                        )}
                    </div>
                </div>

                </aside>
        </div>
      </main>
    </div>
  );
}