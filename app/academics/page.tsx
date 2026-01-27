'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { academicPrograms } from '@/app/data/academics'; 
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export default function AcademicsPage() {
  return (
    <div className={`bg-white min-h-screen text-stone-900 ${poppins.className}`}>
      
      <main className="pt-36 pb-16 container mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-16 border-b border-stone-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Academics</h1>
            <p className="mt-4 text-stone-500 max-w-lg text-sm md:text-base">
                Explore our specialized tracks designed to unlock potential.
            </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Column */}
            <div className="w-full lg:w-[70%] flex flex-col gap-8 min-w-0"> 
               {academicPrograms.map((program, index) => (
                  <div id={program.id} key={program.id}>
                      <ProgramItem program={program} index={index} />
                  </div>
               ))}
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[30%] flex-shrink-0 relative">
                <div className="sticky top-28">
                    <ApplicationForm />
                </div>
            </div>

        </div>

      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// Component: Application Form (Updated with Modal Trigger)
// ----------------------------------------------------------------------
function ApplicationForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', program: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // ✅ 1. เพิ่ม State เพื่อควบคุมการแสดงผลของ Modal
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                // ✅ 2. แทนที่จะ Alert ให้เปิด Modal แทน
                setShowSuccess(true); 
                
                // ล้างฟอร์ม
                setFormData({ name: '', email: '', phone: '', program: '' }); 
            } else {
                alert('เกิดข้อผิดพลาดในการส่งอีเมล');
            }
        } catch (error) {
            alert('Something went wrong!');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="bg-stone-900 text-white rounded-[30px] shadow-xl overflow-hidden relative z-0">
                <div className="relative h-48 w-full">
                    <img src="/Form detail image.jpg" alt="Student" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply"></div>
                </div>

                <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-2">Apply Now</h3>
                    <p className="text-stone-400 text-sm mb-6">Ready to start your journey?</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase font-bold text-stone-500 mb-1">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                                placeholder="John Doe" className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-stone-500 mb-1">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                                placeholder="john@example.com" className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-stone-500 mb-1">Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required 
                                placeholder="+66..." className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-stone-500 mb-1">Program</label>
                            <select name="program" value={formData.program} onChange={handleChange} required 
                                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-500">
                                <option value="">Select a program...</option>
                                {academicPrograms.map(p => (
                                    <option key={p.id} value={p.title} className="bg-stone-900">{p.title}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" disabled={isSubmitting} 
                            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-stone-600 text-white font-bold py-4 rounded-xl mt-4 transition-colors">
                            {isSubmitting ? 'Sending...' : 'Submit Application'}
                        </button>
                    </form>
                    <p className="text-xs text-stone-600 mt-4 text-center">We will contact you within 24 hours.</p>
                </div>
            </div>

            {/* ✅ 3. เรียกใช้ Success Modal */}
            <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
        </>
    );
}

// ----------------------------------------------------------------------
// Component: Success Modal (Popup สวยๆ + Animation)
// ----------------------------------------------------------------------
function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    
                    {/* Backdrop (พื้นหลังเบลอ) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Box */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative bg-white rounded-[32px] p-8 md:p-12 w-[400px] max-w-sm text-center shadow-2xl overflow-hidden"
                    >
                        {/* Green Glow Background Effect */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-200 rounded-full blur-[80px] opacity-50" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-green-200 rounded-full blur-[80px] opacity-50" />

                        {/* ✅ Animated Checkmark Icon */}
                        <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center">
                            {/* วงกลมพื้นหลัง */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring" }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                            >
                                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    {/* เส้นติ๊กถูกที่วาดตัวเอง */}
                                    <motion.path 
                                        d="M5 13l4 4L19 7" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                                    />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold text-stone-900 mb-2">Success!</h3>
                            <p className="text-stone-500 mb-8">
                                We have received your application. Check your email for confirmation.
                            </p>
                            
                            <button 
                                onClick={onClose}
                                className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition-colors active:scale-95"
                            >
                                Great, thanks!
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// ----------------------------------------------------------------------
// Component: ProgramItem (ตัวเดิม ไม่ต้องแก้)
// ----------------------------------------------------------------------
function ProgramItem({ program, index }: { program: any, index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group bg-white border border-stone-200 rounded-[30px] shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 p-8">
            <div className="w-full">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">{program.title}</h3>
                    <p className="text-stone-500 text-base leading-relaxed">{program.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 border-t border-stone-100 pt-6">
                    <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">{program.tuition} / term</span>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-sm font-semibold text-stone-900 hover:text-orange-600 transition-colors ml-auto">{isOpen ? 'Close Details' : 'View Subjects ↓'}</button>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="pt-6">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {program.subjects.map((subj: string) => (<li key={subj} className="text-sm text-stone-600 flex items-center gap-3 p-2 rounded bg-stone-50"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>{subj}</li>))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}