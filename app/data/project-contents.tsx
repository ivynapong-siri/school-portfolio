// app/data/project-contents.tsx
import React from 'react';

// เราจะสร้าง Object ที่ key คือ 'slug' และ value คือ 'เนื้อหา'
export const projectContents: Record<string, React.ReactNode> = {
  
  // 1. เนื้อหาสำหรับ: School Life VTR 2025
  'school-life-vtr-2025': (
    <>
      <h3 className="text-2xl font-bold mb-4">เบื้องหลังการถ่ายทำ VTR ปี 2025</h3>
      <p className="mb-6">
        โปรเจกต์นี้เริ่มต้นจากการรวมตัวของชมรมภาพยนตร์ (Film Club) ที่ต้องการถ่ายทอดมุมมองชีวิตในโรงเรียนที่แตกต่างออกไป...
        (เขียนเนื้อหายาวๆ ได้เลยครับ ใส่ <br/> หรือจัด class ได้อิสระ)
      </p>
      <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 my-8">
        <h4 className="font-bold text-orange-800 mb-2">💡 อุปกรณ์ที่ใช้</h4>
        <ul className="list-disc list-inside text-stone-700 space-y-1">
          <li>Camera: Sony A7S III</li>
          <li>Drone: DJI Mavic 3</li>
          <li>Editing: DaVinci Resolve</li>
        </ul>
      </div>
      <p>
        สุดท้ายนี้ เราหวังว่า VTR ตัวนี้จะเป็นความทรงจำที่ดีของทุกคนในปีการศึกษานี้...
      </p>
    </>
  ),

  // 2. เนื้อหาสำหรับ: AI Computer Vision
  'ai-computer-vision': (
    <>
      <h3 className="text-2xl font-bold mb-4">ระบบ AI ตรวจจับวัตถุด้วย Python</h3>
      <p className="mb-6">
        ในวิชา Computer Science เกรด 12 เราได้ทดลองสร้างโมเดล AI เพื่อตรวจจับการสวมหน้ากากอนามัย...
      </p>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-stone-500 my-6">
        "เทคโนโลยีที่ดี คือเทคโนโลยีที่ช่วยแก้ปัญหาในชีวิตจริง"
      </blockquote>
      <p>
        เราใช้ Library อย่าง OpenCV และ TensorFlow ในการเทรนข้อมูลกว่า 5,000 รูปภาพ...
      </p>
    </>
  ),

  // 3. เนื้อหาสำหรับ: Water Filter System
  'water-filter-system': (
    <>
      <h3 className="text-2xl font-bold mb-4">เครื่องกรองน้ำพลังงานแสงอาทิตย์</h3>
      <p className="mb-6">
        ชมรมวิทยาศาสตร์ได้คิดค้นระบบกรองน้ำต้นทุนต่ำ เพื่อนำไปใช้ในชุมชนห่างไกล...
      </p>
    </>
  ),

  // ... ใส่เนื้อหาของโปรเจกต์อื่นๆ ต่อท้ายตรงนี้ได้เลย โดยใช้ slug ให้ตรงกับ projects.ts
};

// เนื้อหาสำรอง (กรณีลืมเขียนเนื้อหา)
export const DefaultContent = () => (
  <div className="text-center py-10 opacity-60">
    <p>กำลังอัปเดตเนื้อหา...</p>
    <p className="text-sm">Content coming soon.</p>
  </div>
);