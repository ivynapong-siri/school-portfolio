import { NextResponse } from 'next/server'
// 👇 ตรวจสอบว่า path นี้ถูกต้องไหม (บางทีอาจจะเป็น ../../lib/prisma)
// ถ้า Error ให้ลองเปลี่ยนเป็น: import { PrismaClient } from '@prisma/client'; const prisma = new PrismaClient();
import { prisma } from '@/lib/prisma' 

export async function POST(request: Request) {
  try {
    // 1. รับค่าที่หน้าเว็บส่งมา
    const body = await request.json()
    const { username, password } = body

    // 2. ค้นหาใน Database ว่ามี username นี้ไหม
    const user = await prisma.user.findUnique({
      where: { username: username }
    })

    // 3. เช็คความถูกต้อง (ถ้าไม่เจอ user หรือ รหัสผิด)
    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      )
    }

    // 4. ✅ ถ้าถูกต้อง! (โค้ดจะวิ่งมาถึงตรงนี้แปลว่าผ่านแน่นอน)
    // ส่งข้อมูล user กลับไปให้หน้าบ้าน (เพื่อเอาไปโชว์ใน Dashboard)
    return NextResponse.json({ 
      success: true, 
      message: "Login สำเร็จ!", 
      user: { 
        id: user.id,
        username: user.username, 
        // role: user.role // ⚠️ เปิดบรรทัดนี้เฉพาะถ้าใน schema.prisma คุณมี field role แล้ว
      } 
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาดของระบบ' }, { status: 500 })
  }
}