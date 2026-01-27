'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Tag, Play } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/app/data/projects'; // ✅ Import ข้อมูลกลาง

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

// --- PROJECT CARD COMPONENT (ฉบับแก้คลิกไม่ได้) ---
const ProjectCard = ({ item }: { item: any }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group w-full h-full"
    >
      {/* ✅ LINK ต้องอยู่ตรงนี้ และครอบทุกอย่างไว้ */}
      <Link href={`/showcase/${item.slug}`} className="block w-full h-full cursor-pointer relative z-10">
        
        <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-stone-100 shadow-sm border border-stone-100 group-hover:shadow-2xl transition-all duration-500">
          
          {/* === MEDIA DISPLAY === */}
          {item.type === 'video' ? (
            <div className="w-full h-full relative">
               {/* ✅ FIX: ใส่ pointer-events-none ที่ iframe โดยตรง 
                  เพื่อให้คลิกทะลุ YouTube ไปโดน Link ได้ 
               */}
               <iframe
                 className="w-full h-full object-cover pointer-events-none"
                 src={`https://www.youtube.com/embed/${item.content}?autoplay=1&mute=1&loop=1&playlist=${item.content}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
                 title={item.title}
                 allow="autoplay; encrypted-media"
                 loading="lazy"
               />
               {/* Layer ใส ทับอีกชั้นเพื่อความชัวร์ */}
               <div className="absolute inset-0 bg-transparent z-20" />
            </div>
          ) : (
            <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-700">
              <Image 
                src={item.content}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* === OVERLAY & TEXT === */}
          <div className="absolute inset-0 z-30 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none z-40">
            <div className="flex justify-between items-end">
              <div className="flex-1 pr-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold text-white mb-2 border border-white/20 uppercase tracking-wide">
                  <Tag size={10} /> {item.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-light">
                  By {item.author}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg shrink-0">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

// --- MAIN PAGE ---
export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState('student');

  const filteredData = projects.filter(item => item.group === activeTab);

  return (
    <div className={`${poppins.className} bg-white min-h-screen relative`}>
      <div className="pt-36 pb-16">
        
        {/* Header */}
        <div className="w-full px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-3">
              Hall of Fame
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-2 leading-tight">
              Our Portfolio
            </h1>
            <p className="text-stone-500 text-lg font-light">
              Showcasing <span className="text-stone-900 font-semibold">{projects.length}</span> creative masterpieces.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="bg-stone-100 p-1.5 rounded-full flex gap-1 shrink-0">
            {['student', 'teacher'].map((tab) => {
              const count = projects.filter(p => p.group === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300
                    ${activeTab === tab 
                      ? 'bg-stone-900 text-white shadow-md' 
                      : 'text-stone-400 hover:text-stone-600'}
                  `}
                >
                  {tab}s <span className="ml-1 opacity-60 text-xs font-normal">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="w-full px-6 md:px-12">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}