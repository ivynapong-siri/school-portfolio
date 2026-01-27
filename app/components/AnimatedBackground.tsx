'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    // ✅ เปลี่ยน z-[-1] เป็น z-0 เพื่อให้แน่ใจว่ามันไม่จมหายไปลึกเกิน
    // ✅ pointer-events-none สำคัญมาก เพื่อให้คลิกทะลุไปโดนปุ่มต่างๆ ได้
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* 1. วงกลมสีส้ม (ลูกใหญ่ซ้ายบน) - ปรับ Opacity เพิ่มเป็น 0.4 */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-400 blur-[100px]"
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.5, 0.3], // ทำให้สีเข้มขึ้น
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. วงกลมสีฟ้า/ขาว (ลูกขวาบน) - เปลี่ยนเป็นสีฟ้าอ่อนๆ ให้ตัดกันสวยๆ */}
      <motion.div
        className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-300 blur-[80px]"
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -30, 0] // ขยับซ้ายขวานิดหน่อย
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. วงกลมสีส้ม (ลูกเล็กข้างล่าง) */}
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-orange-300 blur-[80px]"
        initial={{ opacity: 0.3, y: 0 }}
        animate={{
          scale: [1, 1.4, 1],
          y: [0, -50, 0], // ลอยขึ้นลง
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* 4. Pattern จุดจางๆ (ทำให้ดูมี Texture) */}
      <div 
        className="absolute inset-0 opacity-[0.1]" // เพิ่มความชัดของจุด
        style={{
            backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', // จุดใหญ่ขึ้นนิดนึง
            backgroundSize: '30px 30px'
        }}
      />

    </div>
  );
}