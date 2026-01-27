import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import AnimatedBackground from "@/app/components/AnimatedBackground";
import Footer from "@/app/components/Footer"; // ✅ 1. Import Footer
import { Poppins } from "next/font/google"; // ✅ 1. Import Poppins
import { contain } from "three/src/extras/TextureUtils.js"; 

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins", // ตั้งชื่อตัวแปร CSS
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchoolNext",
  description: "Empowering the next generation of leaders through innovation, creativity, and academic excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* 1. Background (อยู่ชั้นล่างสุด z-0) */}
        <AnimatedBackground />

        {/* ✅ 2. เพิ่ม Div ห่อเนื้อหาเว็บทั้งหมด (Navbar + เนื้อหา) 
               กำหนดให้เป็น relative z-10 เพื่อให้ลอยทับ Background เสมอ */}
        <div className="relative z-10">
           <Navbar />
           {children}
           <Footer />
        </div>

      </body>
      
    </html>
  );
}