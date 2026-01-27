'use client';
import ShareButton from '@/app/components/ShareButton';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from './Navbar';
import { ArrowLeft, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';

// ✅ 1. Import ทั้ง Poppins (อังกฤษ) และ Noto Sans Thai (ไทย)
import { Poppins, Noto_Sans_Thai } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

interface ProjectLayoutProps {
  title: string;
  slug: string;
  subtitle?: string;
  category: string;
  author: string;
  date: string;
  heroContent: {
    type: 'image' | 'video';
    url: string;
  };
  children: React.ReactNode;
}

export default function ProjectLayout({
  title,
  slug,
  subtitle,
  category,
  author,
  date,
  heroContent,
  children
}: ProjectLayoutProps) {

  return (
    // ✅ 2. ใช้ style fontFamily เพื่อรวม 2 ฟอนต์เข้าด้วยกัน (Poppins นำหน้า, Noto ตามหลัง)
    <div 
      className="bg-white min-h-screen text-stone-900"
      style={{ 
        fontFamily: `${poppins.style.fontFamily}, ${notoSansThai.style.fontFamily}, sans-serif` 
      }}
    >
      <Navbar />

      {/* --- PART 1: HEADER SECTION --- */}
      <div className="pt-32 pb-12 px-6">
        <header className="text-center mb-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center gap-3 text-xs font-bold uppercase tracking-widest text-orange-600 mb-4">
               <span>{category}</span>
               <span className="w-1 h-1 rounded-full bg-stone-300"></span>
               <span className="text-stone-400">{date}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-stone-900 mb-6 tracking-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg text-stone-500 leading-relaxed font-light">
                {subtitle}
              </p>
            )}
          </motion.div>
        </header>
      </div>

      {/* --- PART 2: HERO MEDIA (FULL SCREEN) --- */}
      <div className="relative w-full h-[100vh] bg-stone-900 mb-20 overflow-hidden">
         
         {heroContent.type === 'video' ? (
           <iframe
             className="absolute inset-0 w-full h-full object-cover"
             src={heroContent.url}
             title={title}
             allow="autoplay; encrypted-media; fullscreen"
             loading="lazy"
           />
         ) : (
           <Image
             src={heroContent.url}
             alt={title}
             fill
             className="object-cover"
             priority
             sizes="100vw"
             unoptimized={true} 
           />
         )}

         {/* Overlay บางๆ */}
         <div className="absolute inset-0 pointer-events-none border-y border-white/10"></div>
      </div>

      {/* --- PART 3: CONTENT BODY --- */}
      <main className="container mx-auto px-6 pb-20">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* MAIN CONTENT (Width ~70%) */}
          <article className="w-full lg:w-[70%]">
             <div className="prose prose-lg prose-stone max-w-none 
                 prose-headings:font-bold prose-headings:text-stone-900 prose-headings:mt-8
                 prose-p:text-stone-600 prose-p:leading-8
                 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                 prose-img:rounded-xl prose-img:my-8"
             >
                {children}
             </div>
             
             <div className="mt-12 pt-8 border-t border-stone-100 flex justify-between items-center">
                <Link href="/showcase" className="group inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium transition-colors">
                   <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                   Back to Portfolio
                </Link>
                <ShareButton title={title} slug={slug} />
             </div>
          </article>

          {/* SIDEBAR (Width ~30%) */}
          <aside className="w-full lg:w-[30%] space-y-8">
             <div className="sticky top-32">
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                   <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">About Author</h3>
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 font-bold text-lg shadow-sm">
                         {author.charAt(0)}
                      </div>
                      <div>
                         <p className="font-bold text-stone-900">{author}</p>
                         <p className="text-xs text-stone-500">Content Creator</p>
                      </div>
                   </div>
                   <p className="text-sm text-stone-500 leading-relaxed mb-4">
                      Passionate about exploring new technologies and sharing insights on {category.toLowerCase()}.
                   </p>
                   <div className="flex items-center gap-2 text-xs text-stone-400 border-t border-stone-200 pt-4 mt-2">
                      <Clock size={14} />
                      <span>5 min read</span>
                   </div>
                </div>
             </div>
          </aside>

        </div>
      </main>
    </div>
  );
}