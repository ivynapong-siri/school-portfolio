'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ใช้เช็คหน้าปัจจุบัน
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X } from 'lucide-react';
import { Poppins } from 'next/font/google'; // 1. Import Font

// 2. Config Font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // ดึง URL ปัจจุบันมาเช็ค

  // รายการเมนู (แก้ path ได้ตามจริง)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Staff', href: '/staff' },
    { name: 'Showcase', href: '/showcase' },
    { name: 'Academics', href: '/academics' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* ================= HEADER (Floating Pill) ================= */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        // 3. ใส่ poppins.className เข้าไปที่นี่เพื่อให้มีผลทั้งก้อน
        className={`${poppins.className} fixed top-5 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-50 bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm rounded-full px-6 py-3 flex items-center justify-between`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-orange-500 p-2 rounded-full text-white shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
            <BookOpen size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-stone-800">
            School<span className="text-orange-600">Next</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors relative ${isActive ? 'text-orange-600 font-bold' : 'text-stone-600 hover:text-orange-600'}`}
              >
                {link.name}
                {/* จุดส้มเล็กๆ ใใต้เมนูที่ Active */}
                {isActive && (
                  <motion.span 
                    layoutId="activeDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="text-stone-500 hover:text-orange-600 text-sm font-semibold transition-colors">
            Log In
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2.5 bg-stone-900 text-white font-semibold rounded-full hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2 text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-stone-800 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-3 w-full bg-white rounded-3xl border border-stone-100 shadow-2xl p-6 flex flex-col gap-2 origin-top"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)} // ปิดเมนูเมื่อกด
                  className={`p-3 rounded-xl font-medium transition-colors ${pathname === link.href ? 'bg-orange-50 text-orange-600' : 'text-stone-600 hover:bg-stone-50'}`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-stone-100 my-2" />
              <div className="flex flex-col gap-3">
                 <Link href="/login" className="w-full py-3 rounded-xl border border-stone-200 text-stone-600 font-bold text-center hover:bg-stone-50">
                    Log In
                 </Link>
                 <Link href="/register" className="w-full py-3 rounded-xl bg-stone-900 text-white font-bold text-center hover:bg-orange-600 transition-colors">
                    Get Started
                 </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}