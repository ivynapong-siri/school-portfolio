'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className={`w-full min-h-screen flex bg-black text-white ${poppins.className}`}>
      
      {/* 🖼️ LEFT SIDE: Image Cover (เปลี่ยนรูปให้ต่างจาก Login) */}
      <div className="hidden lg:flex w-[45%] p-4 relative">
        <div className="w-full h-full relative rounded-3xl overflow-hidden">
             <img 
                src="https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Register Cover" 
                className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
             
             <div className="absolute top-8 left-8">
                <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">SchoolNext</span>
             </div>
             
             <div className="absolute bottom-12 left-8 max-w-md">
                 <h2 className="text-3xl font-bold mb-2">Create Your Future.</h2>
                 <p className="text-stone-300 text-sm leading-relaxed">
                     Join thousands of students and unlock a world of knowledge. Your journey starts here.
                 </p>
             </div>
        </div>
      </div>

      {/* 📝 RIGHT SIDE: Register Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 md:px-20 lg:px-24 relative">
        
        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-8 md:left-24 w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition-all">
            <ArrowLeft size={18} />
        </Link>

        <div className="w-full max-w-md mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold mb-3">Create Account</h1>
                <p className="text-stone-400 mb-10 flex items-center gap-2">
                    Already have an account? 
                    <Link href="/login" className="text-white underline decoration-stone-600 underline-offset-4 hover:text-orange-500 transition-colors">
                        Log in
                    </Link>
                </p>

                <form onSubmit={handleRegister} className="space-y-4">
                    
                    {/* Full Name Input */}
                    <div className="group">
                        <input 
                            type="text" 
                            placeholder="Full Name"
                            className="w-full bg-stone-900/50 border border-stone-800 rounded-2xl py-4 px-5 text-white placeholder:text-stone-600 focus:outline-none focus:border-stone-500 focus:bg-stone-900 focus:ring-1 focus:ring-stone-500 transition-all"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="group">
                        <input 
                            type="email" 
                            placeholder="Email address"
                            className="w-full bg-stone-900/50 border border-stone-800 rounded-2xl py-4 px-5 text-white placeholder:text-stone-600 focus:outline-none focus:border-stone-500 focus:bg-stone-900 focus:ring-1 focus:ring-stone-500 transition-all"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="group">
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Create Password"
                                className="w-full bg-stone-900/50 border border-stone-800 rounded-2xl py-4 px-5 pr-12 text-white placeholder:text-stone-600 focus:outline-none focus:border-stone-500 focus:bg-stone-900 focus:ring-1 focus:ring-stone-500 transition-all"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-stone-200 transition-all duration-300 flex items-center justify-between px-6 mt-6 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span>{isLoading ? "Creating..." : "Start Creating"}</span>
                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowRight size={16} />}
                        </div>
                    </button>

                </form>

                <p className="mt-12 text-xs text-stone-600 leading-relaxed">
                    By creating an account, you agree to SchoolNext's <a href="#" className="underline hover:text-stone-400">Terms of Service</a> and <a href="#" className="underline hover:text-stone-400">Data Usage Properties</a>.
                </p>
            </motion.div>
        </div>
      </div>
    </div>
  );
}