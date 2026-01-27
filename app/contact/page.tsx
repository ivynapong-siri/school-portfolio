'use client';

import React, { useState, useMemo } from 'react'; // ✅ เพิ่ม useMemo
import { 
  MapPin, Phone, Mail, ArrowRight, Compass, Search, 
  Navigation, Building2, School, Library, XCircle 
} from 'lucide-react'; // ✅ เพิ่ม XCircle สำหรับปุ่มเคลียร์คำค้น
import dynamic from 'next/dynamic';
import { Poppins } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

// Import Map (Dynamic)
const ImageMap = dynamic(() => import('@/app/components/ImageMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400 font-bold animate-pulse">
        LOADING MAP...
    </div>
  )
});

// --- ข้อมูลสาขา (Branches Data) ---
const BRANCHES = [
  {
    id: 'main',
    name: 'Main Campus',
    type: 'Headquarters',
    icon: School,
    description: 'The heart of our institution, featuring the main stadium, administrative offices, and primary lecture halls.',
    phone: '+66 2 123 4567',
    email: 'main@school.ac.th',
    address: '123 Education Rd, Bangkok',
    googleMap: 'https://maps.app.goo.gl/C7MnyTfE8UJrLWJz5'
  },
  {
    id: 'science',
    name: 'Science Center',
    type: 'Research Hub',
    icon: Navigation,
    description: 'Advanced laboratories, innovation workspaces, and our botanical research gardens.',
    phone: '+66 2 987 6543',
    email: 'science@school.ac.th',
    address: '88 Innovation Park, Pathum Thani',
    googleMap: 'https://maps.app.goo.gl/8B2kCKbUssM6ucNJ8'
  },
  {
    id: 'arts',
    name: 'Creative Arts Wing',
    type: 'Design & Media',
    icon: Library,
    description: 'Home to our theater, art galleries, and digital media production studios.',
    phone: '+66 2 555 8888',
    email: 'arts@school.ac.th',
    address: '45 Design District, Thong Lo',
    googleMap: 'https://maps.app.goo.gl/D1jwDife8mjuuVvBA'
  }
];

export default function ContactPage() {
  const [activeBranchId, setActiveBranchId] = useState<string | null>(BRANCHES[0].id);
  
  // ✅ 1. เพิ่ม State สำหรับเก็บคำค้นหา
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ 2. สร้างตัวแปรกรองข้อมูล (Filtered Branches)
  const filteredBranches = useMemo(() => {
    return BRANCHES.filter((branch) => {
      const query = searchQuery.toLowerCase();
      return (
        branch.name.toLowerCase().includes(query) || 
        branch.description.toLowerCase().includes(query) ||
        branch.type.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const activeBranch = BRANCHES.find(b => b.id === activeBranchId) || BRANCHES[0];

  return (
    <div className={`w-screen h-screen overflow-hidden bg-stone-50 flex flex-col md:flex-row ${poppins.className}`}>
      
      {/* LEFT SIDEBAR */}
      <div className="relative z-20 w-full md:w-[480px] h-[45vh] md:h-full bg-white border-r border-stone-200 flex flex-col shadow-2xl shrink-0">
        
        {/* Header & Search */}
        <div className="p-6 md:p-8 border-b border-stone-100 bg-white z-10">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
                <MapPin size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Our Locations</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-6">Explore Campus</h1>
            
            {/* Search Bar (Visual Only) */}
<div className="relative">
    {/* ไอคอนแว่นขยาย (เปลี่ยนเป็นสีส้มอ่อนๆ ให้เข้ากันด้วยก็ได้ หรือจะคงเดิมไว้) */}
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" size={18} />
    
    <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search building or department..." 
        
        // ✅ แก้ตรงนี้: เปลี่ยน placeholder:text-stone-400 เป็น placeholder:text-orange-500
        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-orange-500 text-stone-700"
    />
    
    {/* ปุ่มเคลียร์คำค้นหา */}
    {searchQuery && (
        <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
        >
            <XCircle size={16} />
        </button>
    )}
</div>
        </div>

        {/* Branch List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
            
            {/* ✅ 4. ใช้ filteredBranches แทน BRANCHES ปกติ */}
            {filteredBranches.length > 0 ? (
                filteredBranches.map((branch) => {
                    const isActive = activeBranchId === branch.id;
                    const Icon = branch.icon;
                    
                    return (
                        <button
                            key={branch.id}
                            onClick={() => setActiveBranchId(branch.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                isActive 
                                ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/10' 
                                : 'bg-white border-stone-200 hover:border-orange-300 hover:shadow-md'
                            }`}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500" />}

                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    isActive ? 'bg-orange-50 text-orange-600' : 'bg-stone-100 text-stone-400 group-hover:bg-orange-50 group-hover:text-orange-500'
                                }`}>
                                    <Icon size={24} />
                                </div>

                                <div>
                                    <h3 className={`font-bold text-lg mb-0.5 ${isActive ? 'text-stone-900' : 'text-stone-600'}`}>
                                        {branch.name}
                                    </h3>
                                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">
                                        {branch.type}
                                    </p>
                                    
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-xs text-stone-500 leading-relaxed mb-3">
                                                    {branch.description}
                                                </p>
                                                <div className="space-y-2 mb-3">
                                                    <div className="flex items-center gap-2 text-xs text-stone-600">
                                                        <Phone size={14} className="text-orange-500"/> {branch.phone}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-stone-600">
                                                        <Mail size={14} className="text-orange-500"/> {branch.email}
                                                    </div>
                                                </div>
                                                <a href={branch.googleMap} target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-stone-900 transition-colors">
                                                    View on Google Maps <ArrowRight size={12} />
                                                </a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </button>
                    );
                })
            ) : (
                // ✅ 5. แสดงข้อความเมื่อค้นหาไม่เจอ
                <div className="flex flex-col items-center justify-center py-12 text-stone-400">
                    <Search size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-bold">No locations found</p>
                    <p className="text-xs">Try adjusting your search query</p>
                </div>
            )}
        </div>

        {/* Footer Status */}
        <div className="p-4 bg-white border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
            <span>Server status: Online</span>
            <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Live Update
            </span>
        </div>
      </div>

      {/* MAP AREA */}
      <div className="flex-1 relative h-[55vh] md:h-full bg-stone-200">
          <div className="absolute inset-0">
             {/* ✅ ส่ง activeId และ onActiveChange ลงไป */}
             <ImageMap 
                activeId={activeBranchId} 
                onActiveChange={setActiveBranchId}
             /> 
          </div>

          <div className="absolute top-6 right-6 hidden md:flex gap-3 pointer-events-none">
             <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-stone-200 text-xs font-bold text-stone-600 flex items-center gap-2">
                <Building2 size={16} className="text-orange-500"/>
                Viewing: {activeBranch.name}
             </div>
          </div>

          <div className="absolute bottom-8 right-8 z-30">
              <button 
                onClick={() => window.location.reload()}
                className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 hover:scale-110 transition-all duration-300"
              >
                  <Compass size={24} />
              </button>
          </div>
      </div>
    </div>
  );
}