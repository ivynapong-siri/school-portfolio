import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. เช็คก่อนว่าชื่อซ้ำไหม?
    const existingUser = await prisma.user.findUnique({
      where: { username: username }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }

    // 2. ถ้าไม่ซ้ำ -> สร้าง User ใหม่ลง Database
    // (กำหนด role เริ่มต้นเป็น 'STUDENT' เสมอ เพื่อความปลอดภัย)
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password, // งานจริงต้องเข้ารหัส (Hash) แต่นี่ฝึกทำ ใส่สดไปก่อนครับ
        role: 'STUDENT'     // ต้องดูว่าใน prisma schema คุณตั้งชื่อ role ว่าอะไร (ถ้าไม่มี field นี้ให้ลบบรรทัดนี้ออก)
      }
    });

    return NextResponse.json({ success: true, message: 'สมัครสมาชิกสำเร็จ!' });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'เกิดข้อผิดพลาดในการสมัคร' }, { status: 500 });
  }
}