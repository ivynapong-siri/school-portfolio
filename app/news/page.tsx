'use client';


import BlogSection from '@/app/components/BlogSection';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export default function NewsPage() {
  return (
    <div className={`bg-stone-50 min-h-screen ${poppins.className}`}>
    
      
      {/* เพิ่ม Padding ด้านบน เพื่อไม่ให้เนื้อหาชน Navbar */}
      <main className="pt-32 pb-20">
        

        {/* เรียกใช้ Component News Grid */}
        <BlogSection />
        
      </main>
    </div>
  );
}