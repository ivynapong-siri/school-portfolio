'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// ✅ 1. แก้ ID ให้ตรงกับหน้า Contact ('main', 'science', 'arts')
const LOCATIONS = [
  {
    id: 'main', 
    name: 'Main Campus',
    description: 'Football field and running track.',
    top: 40, left: 50,
    googleMapUrl: 'https://maps.app.goo.gl/C7MnyTfE8UJrLWJz5',
  },
  {
    id: 'arts', // (เดิมคือ Library)
    name: 'Creative Arts Wing',
    description: 'Theater, art galleries, and studios.',
    top: 60, left: 10,
    googleMapUrl: 'https://maps.app.goo.gl/8B2kCKbUssM6ucNJ8',
  },
  {
    id: 'science', // (เดิมคือ Science Lab)
    name: 'Science Center',
    description: 'Chemistry and Physics laboratories.',
    top: 25, left: 70,
    googleMapUrl: 'https://maps.app.goo.gl/D1jwDife8mjuuVvBA',
  }
];

const DEFAULT_MAP_IMAGE = "https://i0.wp.com/greennews.agency/wp-content/uploads/2017/08/S__18423898.jpg?resize=768%2C512&ssl=1";
const STADIUM_IMAGE = "/map click.jpg"; 
const STADIUM_IMAGE_TWO = "/2-map.jpg"; 
const STADIUM_IMAGE_THREE = "/3-map.jpg"; 

// ✅ 2. รับ Props เข้ามาเพื่อเชื่อมกับตัวแม่
interface ImageMapProps {
    activeId?: string | null;
    onActiveChange?: (id: string | null) => void;
}

export default function ImageMap({ activeId, onActiveChange }: ImageMapProps) {
  // ตัด activePoint state ออก เพราะเราจะใช้ activeId จาก props แทน
  const [isMobile, setIsMobile] = useState(false);

  // ✅ 3. เช็คจาก activeId ที่ส่งมา
  const currentImage = 
    activeId === 'main' ? STADIUM_IMAGE : 
    activeId === 'arts' ? STADIUM_IMAGE_TWO : 
    activeId === 'science' ? STADIUM_IMAGE_THREE : 
    DEFAULT_MAP_IMAGE;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ฟังก์ชันช่วยตอนกดเลือก (เรียก function แม่)
  const handleSelect = (id: string | null) => {
      if (onActiveChange) {
          onActiveChange(id);
      }
  };

  return (
    <div className="w-full h-full bg-stone-200 overflow-hidden relative">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit={true}
        disabled={!isMobile} 
        wheel={{ disabled: true }}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            {isMobile && (
                <div className="absolute bottom-32 right-6 z-50 flex flex-col gap-2 pointer-events-auto">
                    <button onClick={() => zoomIn()} className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-stone-600 hover:bg-orange-600 hover:text-white transition-colors"><Plus size={20} /></button>
                    <button onClick={() => zoomOut()} className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-stone-600 hover:bg-orange-600 hover:text-white transition-colors"><Minus size={20} /></button>
                </div>
            )}

            <TransformComponent 
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%" }}
            >
                <div className="relative w-full h-full" style={{ width: "100%", height: "100%" }}> 
                        <motion.img 
                            // ใช้ activeId เป็น key เพื่อให้เปลี่ยนรูปแล้ว animate
                            key={activeId ?? 'default'} 
                            src={currentImage}
                            alt="Campus Map"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover block"
                            draggable={false}
                        />

                    {/* --- Pins --- */}
                    {LOCATIONS.map((loc) => (
                    <div 
                        key={loc.id}
                        className="absolute z-10 w-0 h-0"
                        style={{ top: `${loc.top}%`, left: `${loc.left}%` }}
                    >
                        <button
                            // ✅ 4. เมื่อกดปุ่ม ให้ส่งค่ากลับไปบอกแม่ (onActiveChange)
                            onClick={(e) => { e.stopPropagation(); handleSelect(loc.id); }}
                            onTouchEnd={(e) => { e.stopPropagation(); handleSelect(loc.id); }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer outline-none"
                        >
                            <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping"></span>
                            <span className={`relative inline-flex items-center justify-center rounded-full h-8 w-8 border-4 border-white/80 shadow-lg transition-all duration-300 ${
                                activeId === loc.id ? 'bg-stone-900 scale-125' : 'bg-orange-500 hover:bg-orange-600'
                            }`}>
                                {activeId === loc.id && <MapPin size={14} className="text-white fill-white/20" />}
                            </span>
                        </button>

                        <AnimatePresence>
                            {/* เช็คจาก activeId */}
                            {activeId === loc.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className="absolute top-0 left-0 mt-6 w-64 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-stone-100 z-50 text-left origin-top"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-stone-900 text-sm">{loc.name}</h3>
                                        {/* ปุ่มปิด Card */}
                                        <button onClick={(e) => { e.stopPropagation(); handleSelect(null); }} className="text-stone-400 hover:text-stone-900"><X size={16} /></button>
                                    </div>
                                    <p className="text-xs text-stone-500 mb-3">{loc.description}</p>
                                    <a href={loc.googleMapUrl} target="_blank" className="block w-full bg-stone-900 text-white text-xs font-bold py-2 rounded text-center hover:bg-orange-600 transition-colors">
                                        Google Maps
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    ))}
                </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}