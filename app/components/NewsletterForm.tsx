'use client';

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // ⚠️ เอา URL จาก Google Apps Script ที่ได้มาแปะตรงนี้ครับ
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwRdSXndJBzYe6pQ4p26ePZ31YvWcAWrBIcezPYaw1_CtqaBSZCO9ZedAQIR5J-0cMAQ/exec"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ email: email }),
        mode: "no-cors" // สำคัญมาก สำหรับส่งข้อมูลข้าม Domain ไป Google
      });

      // Google Script แบบ no-cors จะไม่คืนค่ากลับมา ให้สมมติว่าสำเร็จถ้าไม่ error
      setStatus('success');
      setEmail('');
      
      // คืนค่าสถานะหลังจาก 3 วิ
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full" >
      {status === 'success' ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3 text-green-400 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={24} />
          <div>
            <p className="font-bold text-sm cursor-pointer">Subscribed!</p>
            <p className="text-xs opacity-80">Check our Google Sheet!</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address" 
            required
            disabled={status === 'loading'}
            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-600 transition-colors disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="cursor-pointer w-full bg-orange-600 text-white font-bold text-sm py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-colors flex items-center justify-center gap-2 disabled:bg-stone-700 disabled:text-stone-500"
          >
            {status === 'loading' ? (
                <>Sending... <Loader2 size={14} className="animate-spin"/></>
            ) : (
                <>Subscribe <Send size={14} /></>
            )}
          </button>
          {status === 'error' && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle size={12}/> Failed to send. Try again.
              </p>
          )}
        </form>
      )}
    </div>
  );
}