'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { teachers, subjects, Teacher } from '@/app/data/teachers';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export default function StaffPage() {
  const [selectedSubject, setSelectedSubject] = useState('All');

  const filteredTeachers = selectedSubject === 'All' 
    ? teachers 
    : teachers.filter(t => t.subject === selectedSubject);

  return (
    <div className={`bg-white min-h-screen text-stone-900 ${poppins.className}`}>
   

      {/* CSS Force Grid */}
      <style jsx global>{`
        .force-staff-grid {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(4, 1fr); 
        }
        @media (min-width: 768px) {
          .force-staff-grid {
            grid-template-columns: repeat(8, 1fr);
          }
        }
      `}</style>

      <main className="pt-32 pb-0">
        
        {/* --- Header & Filter --- */}
        <div className="container mx-auto px-6 mb-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
               >
                 <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Meet Our Teachers</h1>
                 <p className="text-stone-500 text-lg leading-relaxed">
                   Our dedicated team of educators is committed to inspiring creativity, 
                   fostering critical thinking, and guiding every student toward success.
                 </p>
               </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
               {subjects.map((subject) => (
                 <button
                   key={subject}
                   onClick={() => setSelectedSubject(subject)}
                   className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                     ${selectedSubject === subject 
                       ? 'bg-stone-900 text-white shadow-lg scale-105' 
                       : 'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900'
                     }`}
                 >
                   {subject}
                 </button>
               ))}
            </div>
        </div>

        {/* --- Grid Layout --- */}
        <div className="w-full"> 
           <div className="force-staff-grid">
              <AnimatePresence mode='popLayout'>
                 {filteredTeachers.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                 ))}
              </AnimatePresence>
           </div>
        </div>

      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// Component TeacherCard (Final Polish: Smaller Text, Popping Labels)
// ----------------------------------------------------------------------
function TeacherCard({ teacher }: { teacher: Teacher }) {
  const [imgError, setImgError] = useState(false);

  // ค่าสี LAB ที่ต้องการ
  const labelColorLAB = 'lab(57.1026% 64.2584 89.8886)';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative w-full overflow-hidden cursor-pointer bg-stone-200"
      style={{ aspectRatio: '4/5' }}
    >
      
      {/* Background Image */}
      <div className={`absolute inset-0 w-full h-full 
        ${imgError ? 'bg-gradient-to-tr from-orange-400 via-rose-400 to-amber-300' : 'bg-stone-200'}`}
      >
        {!imgError ? (
          <Image 
              src={teacher.image} 
              alt={teacher.name}
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 25vw, 12vw"
              onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
             <span className="text-2xl md:text-4xl font-bold text-white/50 select-none">
                {teacher.name.charAt(0)}
             </span>
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} // เพิ่มความมืดอีกนิด (0.7) ให้สีส้มเด้งๆ
      >
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full text-white"
          >
            {/* 1. ชื่อครู: ลดขนาดลง (text-sm) */}
            <h3 className="text-sm font-bold mb-0.5 leading-tight tracking-wide">{teacher.name}</h3>
            
            <p className="text-white/60 text-[9px] font-medium uppercase tracking-wider mb-3">
              {teacher.subject}
            </p>

            {teacher.education && (
              // 2. รายละเอียด: ลดขนาดลง (text-[9px]) และใช้ font-light เพื่อให้ไม่แย่งซีน
              <div className="space-y-1.5 text-white/90 text-[9px] leading-tight border-t border-white/10 pt-2 mt-1">
                <div>
                  {/* หัวข้อสีส้ม LAB */}
                  <span 
                    className="block text-[8px] font-bold uppercase tracking-widest mb-0.5" 
                    style={{ color: labelColorLAB }}
                  >
                    Bachelor's
                  </span>
                  {/* เนื้อหาสีขาว ตัวเล็กและบาง */}
                  <span className="font-light opacity-80 block">
                    {teacher.education.bachelors}
                  </span>
                </div>
                
                <div>
                  {/* หัวข้อสีส้ม LAB */}
                  <span 
                    className="block text-[8px] font-bold uppercase tracking-widest mb-0.5"
                    style={{ color: labelColorLAB }}
                  >
                    Master's
                  </span>
                  {/* เนื้อหาสีขาว ตัวเล็กและบาง */}
                  <span className="font-light opacity-80 block">
                    {teacher.education.masters}
                  </span>
                </div>
              </div>
            )}

          </motion.div>
      </div>
    </motion.div>
  );
}