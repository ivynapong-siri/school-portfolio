'use client'; // 👈 สำคัญมาก: บอกว่าเป็น Client Component เพื่อให้กดได้

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ title, slug }: { title: string, slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // สร้าง URL ของหน้านั้นๆ
    const url = `${window.location.origin}/projects/${slug}`;

    // 1. ลองใช้ Native Share (เมนูแชร์ของ iOS/Android)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out ${title}`,
          url: url,
        });
        return;
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }

    // 2. ถ้าแชร์ไม่ได้ (เช่นเปิดในคอม) ให้ Copy Link แทน
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true); // เปลี่ยนไอคอนเป็นติ๊กถูก
      setTimeout(() => setCopied(false), 2000); // คืนค่าเดิมหลัง 2 วิ
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      // ✅ ใช้ Class เดิมที่คุณมีอยู่เป๊ะๆ
      className="  cursor-pointer text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-2"
      title="Share this project"
    >
       {/* ถ้า Copy แล้วให้โชว์ติ๊กถูก ถ้ายังให้โชว์ปุ่ม Share */}
       {copied ? <Check size={20} className="text-green-500" /> : <Share2 size={20} />}
    </button>
  );
}