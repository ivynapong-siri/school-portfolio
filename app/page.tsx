"use client";
import BlogSection from "./components/BlogSection";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import TeachersSection from "./components/TeachersSection"; // ✅ อันใหม่ (เพิ่มบรรทัดนี้)
import React, { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import {
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Play,
  Users,
  Star,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

// 1. Config Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// 2. FadeIn Component
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const YOUTUBE_VIDEO_ID = "qd0GF5XH9bs";

  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 500], [0, 200]);

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    // Base Theme: Warm Neutral (Stone-50) with Orange Accents
    <div
      className={`relative min-h-screen bg-stone-50 text-stone-900 ${poppins.className} overflow-x-hidden selection:bg-orange-100 selection:text-orange-900`}
    >
      {/* ================= HERO SECTION (Video BG + Right Composition) ================= */}
      <section
        id="hero"
        className="relative min-h-[110vh] flex items-center pt-32 pb-20 overflow-hidden bg-stone-100"
      >
        {/* 1. Video Background (Fixed & Subtle) */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          {/* Overlay: Warm White Gradient to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-5/90 to-transparent z-10" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-full min-h-full opacity-60 mix-blend-multiply grayscale-[20%]">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
              allow="autoplay; encrypted-media"
              className="w-full h-full object-cover"
              style={{ border: "none" }}
            />
          </div>
        </div>

        {/* 2. Main Content Grid */}
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div style={{ y: yHeroText }} className="max-w-xl space-y-8">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 border border-orange-200 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  v2.0 is Live
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] text-stone-900 tracking-tight">
                  Elevate your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                    Learning Curve.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-xl text-stone-500 leading-relaxed font-light">
                  The all-in-one platform for schools to manage, teach, and
                  track progress effortlessly. Built for the modern classroom.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/register"
                    className="px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 hover:shadow-orange-300 transform hover:-translate-y-1"
                  >
                    Start Free Trial
                  </Link>
                  <button className="px-8 py-4 bg-white border border-stone-200 text-stone-700 text-lg font-semibold rounded-full hover:bg-stone-50 transition-all shadow-sm flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <Play
                        size={14}
                        className="ml-1 text-stone-600 group-hover:text-orange-600"
                        fill="currentColor"
                      />
                    </div>
                    See How It Works
                  </button>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="flex items-center gap-4 pt-4 border-t border-stone-200/60">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        alt="User"
                      />
                    ))}
                    <div className="w-10 h-10 rounded-full bg-stone-100 border-2 border-white flex items-center justify-center text-xs font-bold text-stone-500">
                      +2k
                    </div>
                  </div>
                  <div className="text-sm font-medium text-stone-500">
                    Trusted by{" "}
                    <span className="text-stone-900 font-bold">2,000+</span>{" "}
                    schools
                  </div>
                </div>
              </FadeIn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION (With SVG Animation) ================= */}
      <section id="services" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-stone-900 mb-6">
                Everything you need to{" "}
                <span className="text-orange-600">succeed</span>.
              </h2>
              <p className="text-stone-500 text-lg">
                Streamline administration, engage students, and empower teachers
                with our comprehensive suite of tools.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Student Analytics",
                // SVG Path: กราฟแท่ง (Bar Chart)
                path: "M12 20V10 M18 20V4 M6 20v-4",
                desc: "Track performance trends and identify areas for improvement instantly.",
                bgColor: "bg-blue-50",
                iconColor: "#2563EB", // blue-600
              },
              {
                title: "Smart Scheduling",
                // SVG Path: ปฏิทิน (Calendar)
                path: "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
                desc: "Automated timetables that resolve conflicts and optimize resources.",
                bgColor: "bg-orange-50",
                iconColor: "#EA580C", // orange-600
              },
              {
                title: "Parent Portal",
                // SVG Path: กลุ่มผู้ใช้ (Users Group)
                path: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
                desc: "Keep parents in the loop with real-time updates and direct messaging.",
                bgColor: "bg-purple-50",
                iconColor: "#9333EA", // purple-600
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2} className="h-full">
                <div className="group h-full bg-stone-50 hover:bg-white rounded-[2rem] p-8 transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-stone-100 hover:border-orange-100 cursor-pointer">
                  {/* Icon Container with SVG Animation */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${item.bgColor}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      style={{ stroke: item.iconColor }} // ใช้สี Stroke ตามที่กำหนด
                    >
                      <motion.path
                        d={item.path}
                        fill="transparent"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: false }} // เล่นซ้ำทุกครั้งที่เลื่อนมาเจอ
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: 0.2 + i * 0.2,
                        }}
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 leading-relaxed mb-8">
                    {item.desc}
                  </p>

                  <div className="flex items-center -space-x-2 mb-6">
                    {[1, 2, 3].map((u) => (
                      <img
                        key={u}
                        src={`https://i.pravatar.cc/100?img=${u + i * 5}`}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        alt="User"
                      />
                    ))}
                  </div>

                  <div className="inline-flex items-center text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    Learn more{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Ready to transform your school?
          </h2>
          <p className="text-stone-400 text-xl max-w-2xl mx-auto mb-10">
            Join over 2,000+ institutions using SchoolNext to power their
            education.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-5 bg-orange-600 text-white font-bold text-xl rounded-full hover:bg-orange-500 transition-all shadow-2xl shadow-orange-900/50 hover:-translate-y-1"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* ================= CONTENT SECTION 01: Image Left / Text Right ================= */}
      <section className="py-32 bg-stone-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* LEFT: Image Collage with Floating UI */}
            <div className="w-full lg:w-1/2 relative">
              <FadeIn delay={0.2}>
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80"
                    alt="Teacher Dashboard"
                    className="w-full object-cover transform hover:scale-105 transition duration-700"
                  />
                  {/* Floating Badge (Bottom Right) */}
                  <div className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-4 max-w-xs">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-400 uppercase">
                        Status
                      </div>
                      <div className="text-sm font-bold text-stone-800">
                        All Systems Operational
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Decorative Elements behind */}
              <div className="absolute top-10 -left-10 w-full h-full border-2 border-stone-200 rounded-[2.5rem] -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* RIGHT: Text Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <FadeIn delay={0.4}>
                <h2 className="text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                  Streamlined admin <br />
                  <span className="text-stone-400">for modern schools.</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.5}>
                <p className="text-lg text-stone-500 leading-relaxed font-light">
                  Reduce administrative workload by up to 40%. Our intelligent
                  dashboard centralizes data, automates reporting, and
                  simplifies fee management so you can focus on education.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <ul className="space-y-5">
                  {[
                    "Automated Attendance Tracking",
                    "Real-time Financial Reporting",
                    "Secure Cloud Storage",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-stone-700 font-medium"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <CheckCircle size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.7}>
                <button className="mt-4 px-8 py-3 border border-stone-300 text-stone-700 font-semibold rounded-full hover:border-orange-500 hover:text-orange-600 transition-colors">
                  View Admin Features
                </button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT SECTION 02: Text Left / Image Right ================= */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            {/* RIGHT: Image with Rounded Style */}
            <div className="w-full lg:w-1/2 relative">
              <FadeIn delay={0.2}>
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-200 border border-stone-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80"
                    alt="Student Learning"
                    className="w-full object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  {/* Floating Avatar Stack (Top Left) */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-white flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/100?img=${i + 20}`}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-stone-600">
                      Active Students
                    </span>
                  </div>
                </div>
              </FadeIn>
              {/* Decorative Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-stone-50 to-orange-50/50 rounded-full blur-3xl -z-10"></div>
            </div>

            {/* LEFT: Text Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <FadeIn delay={0.4}>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                  Student Success
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                  Engage students <br />
                  <span className="text-orange-600">like never before.</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.5}>
                <p className="text-lg text-stone-500 leading-relaxed font-light">
                  Turn passive listening into active learning. Our platform
                  supports gamified quizzes, interactive assignments, and
                  peer-to-peer collaboration tools.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Star, text: "Gamified Learning" },
                    { icon: Users, text: "Group Projects" },
                    { icon: BarChart3, text: "Instant Feedback" },
                    { icon: ShieldCheck, text: "Safe Environment" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-orange-200 transition-colors"
                    >
                      <item.icon size={20} className="text-orange-500" />
                      <span className="font-semibold text-stone-700">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.7}>
                <button className="mt-4 px-8 py-3 bg-stone-900 text-white font-semibold rounded-full hover:bg-orange-600 transition-all shadow-lg">
                  Explore Student Tools
                </button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHOWCASE SECTION (Ecosystem & Impact) ================= */}
      <section className="py-32 bg-stone-100 relative overflow-hidden">
        <div className="container mx-auto px-6">
          {/* 1. Section Header: Title Left / Desc Right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            {/* Title */}
            <div className="lg:w-1/2">
              <FadeIn>
                <h2 className="text-4xl lg:text-6xl font-bold text-stone-900 leading-tight">
                  Building a better <br />
                  <span className="text-orange-600">education ecosystem.</span>
                </h2>
              </FadeIn>
            </div>
            {/* Desc */}
            <div className="lg:w-5/12">
              <FadeIn delay={0.2}>
                <p className="text-lg text-stone-500 font-light leading-relaxed">
                  We connect administrators, teachers, parents, and students in
                  one seamless loop. See how our impact scales across the entire
                  institution.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* 2. Featured Card (Split Layout) */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid lg:grid-cols-2 min-h-[550px] mb-8 group border border-stone-200">
              {/* Left: Image with Floating Tags */}
              <div className="relative h-[400px] lg:h-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
                  alt="Business Meeting"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Floating Tags */}
                <div className="absolute bottom-8 left-8 flex flex-wrap gap-3">
                  {["Strategy", "Growth", "Mentoring"].map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-stone-800 shadow-lg border border-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Dark Content Area */}
              <div className="bg-stone-900 p-10 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden">
                {/* Decorative Gradient Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    <span className="text-orange-400 font-bold tracking-wider uppercase text-xs">
                      Our Mission
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    Empowering the next generation of leaders.
                  </h3>

                  <p className="text-stone-400 mb-10 leading-relaxed font-light text-lg">
                    SchoolNext provides the infrastructure for growth. From
                    detailed analytics to automated workflows, we ensure your
                    focus remains on what matters most: education.
                  </p>

                  {/* Logo Icons Row (Abstract Brand Symbols) */}
                  <div className="flex gap-6 mb-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <Facebook size={20} className="text-white" />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <Instagram size={20} className="text-white" />
                    </a>

                    {/* Twitter */}
                    <a
                      href="https://x.com/"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <Twitter size={20} className="text-white" />
                    </a>

                    {/* Youtube */}
                    <a
                      href="https://www.youtube.com/"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
                    >
                      <Youtube size={20} className="text-white" />
                    </a>
                  </div>

                  <button className="self-start px-8 py-4 bg-white text-stone-900 font-bold rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-lg hover:shadow-orange-900/50">
                    Read Our Impact Report
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 3. Supporting Cards (Bottom Row) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card: Text Focused */}
            <FadeIn delay={0.4} className="h-full">
              <div className="h-full bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-xl border border-stone-100 flex flex-col justify-between hover:border-orange-200 transition-colors group">
                <div>
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Star
                      size={32}
                      fill="currentColor"
                      className="text-orange-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">
                    Community Driven Development
                  </h3>
                  <p className="text-stone-500 leading-relaxed text-lg">
                    We build features based on feedback from over 5,000 active
                    teachers and administrators. Your voice shapes our roadmap.
                  </p>
                </div>
                <div className="mt-10 pt-8 border-t border-stone-100 flex items-center gap-4 text-sm font-bold text-stone-900">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 40}`}
                        className="w-10 h-10 rounded-full border-2 border-white"
                        alt="User"
                      />
                    ))}
                  </div>
                  <span>Joined by 10k+ educators</span>
                </div>
              </div>
            </FadeIn>

            {/* Right Card: Image Based (Teamwork) */}
            <FadeIn delay={0.5} className="h-full">
              <div className="relative h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl group border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team Collaboration"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-10 left-10 text-white z-10 max-w-md">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4 border border-white/10">
                    Collaboration
                  </div>
                  <h3 className="text-3xl font-bold mb-3">
                    Seamless Connection
                  </h3>
                  <p className="text-stone-200 font-light text-lg">
                    Work together across departments, anywhere, anytime.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================= ALUMNI SHOWCASE SECTION ================= */}
      <TeachersSection />
    </div>
  );
}
