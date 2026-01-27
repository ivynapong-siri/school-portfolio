'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';

// --- Helper: FadeIn ---
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Data ---
const TEACHERS_DATA = [
  {
    id: 1,
    name: "Dr. Eleanor Sterling",
    role: "HEAD OF SCIENCES",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Prof. Marcus Thorne",
    role: "MATHEMATICS LEAD",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "HEAD OF ARTS",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "ATHLETIC DIRECTOR",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Dr. Aiko Tanaka",
    role: "TECHNOLOGY INNOVATOR",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  }
];

export default function TeachersSection() {
  const [activeIndex, setActiveIndex] = useState(2); // เริ่มต้นที่คนตรงกลาง

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEACHERS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TEACHERS_DATA.length) % TEACHERS_DATA.length);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
              Meet our experts
            </h2>
            <p className="text-stone-500 mt-4 max-w-lg">
               Leaders from top institutions who are dedicated to shaping the future of education.
            </p>
          </FadeIn>

          {/* Navigation Arrows */}
          <FadeIn delay={0.2}>
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-orange-600 hover:text-white transition-colors active:scale-95"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-orange-600 hover:text-white transition-colors active:scale-95"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* --- Expanding Card Slider --- */}
        <div className="flex h-[500px] w-full gap-4">
          {TEACHERS_DATA.map((teacher, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={teacher.id}
                layout
                onClick={() => setActiveIndex(index)}
                // Animation Logic: ถ้า Active ให้กว้าง 45%, ถ้าไม่ Active ให้กว้าง 10% (เฉลี่ยๆ กัน)
                initial={false}
                animate={{ 
                    flex: isActive ? 3 : 1, // ใช้ Flex grow แทน width เพื่อความ Responsive
                    filter: isActive ? "grayscale(0%)" : "grayscale(100%)"
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-shadow duration-300 ${
                    isActive ? 'shadow-2xl shadow-stone-200' : 'hover:opacity-80'
                }`}
              >
                {/* Image Container: ต้องบังคับขนาดรูปไม่ให้บีบตาม Flex */}
                <div className="absolute inset-0 w-full h-full">
                    <Image 
                        src={teacher.image} 
                        alt={teacher.name} 
                        fill
                        className="object-cover"
                    />
                    
                    {/* Active Overlay Gradient (Purple/Orange tint as requested) */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent opacity-80" 
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Content: แสดงเฉพาะ Active */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <AnimatePresence mode='wait'>
                        {isActive ? (
                            <motion.div
                                key="active-content"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <span className="inline-block text-orange-400 font-bold tracking-widest uppercase text-xs mb-2">
                                    {teacher.role}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    {teacher.name}
                                </h3>
                            </motion.div>
                        ) : (
                            // Optional: แสดงชื่อแนวตั้งหรือซ่อนไปเลยสำหรับ Card ที่ไม่ Active
                            <motion.div 
                                key="inactive-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                className="hidden md:flex h-full items-center justify-center"
                            >
                                {/* ถ้าอยากให้มีชื่อแนวตั้งตอนหด ใส่ตรงนี้ได้ */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

              </motion.div>
            );
          })}
        </div>
      

      </div>
    </section>
  );
}