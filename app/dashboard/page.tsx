'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  // 👇 ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    // 1. ล้างข้อมูลในเครื่อง
    localStorage.removeItem('currentUser');
    // 2. ดีดกลับไปหน้า Homepage
    router.push('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* ส่วนหัว (Header) แบบมีปุ่ม Logout */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">
            ยินดีต้อนรับ, {user ? user.username : '...'}! 🎓
          </h1>
          <p className="text-gray-600 mt-2">นี่คือหน้าจัดการการเรียนของคุณ</p>
        </div>

        {/* 👇 ปุ่ม Logout อยู่ตรงนี้ */}
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition flex items-center gap-2"
        >
          ออกจากระบบ 🚪
        </button>
      </div>

      {/* ... (ส่วน Grid การ์ด 3 ใบ เหมือนเดิม ไม่ต้องแก้) ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-xl font-bold mb-2">📅 ตารางเรียน</h3>
          <p className="text-gray-500">ดูวิชาที่ต้องเรียนวันนี้</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
          <h3 className="text-xl font-bold mb-2">📚 การบ้าน</h3>
          <p className="text-gray-500">งานที่ค้างส่ง (Pending)</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-bold mb-2">🏆 ผลการเรียน</h3>
          <p className="text-gray-500">GPAX: 3.85</p>
        </div>
      </div>

    </div>
  );
}