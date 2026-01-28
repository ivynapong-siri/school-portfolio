import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ดึงกุญแจจากไฟล์ .env มาใช้งาน
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(request: Request) {
  try {
    // 1. รับข้อมูลที่ส่งมาจากหน้าฟอร์ม (AcademicsPage)
    const body = await request.json();
    const { name, email, phone, program } = body;

    // 2. สั่งให้ Resend ส่งอีเมล
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // อีเมลผู้ส่ง (ใช้ของ Resend ไปก่อน)
      to: ['napong.sirivat@gmail.com'],  // ⚠️ แก้ตรงนี้! ใส่อีเมล Gmail ของคุณที่จะให้ส่งไปหา
      subject: `New Student Application: ${name}`,
      html: `
        <h1>มีนักเรียนสมัครเรียนใหม่! 🎉</h1>
        <p><strong>ชื่อ:</strong> ${name}</p>
        <p><strong>อีเมล:</strong> ${email}</p>
        <p><strong>เบอร์โทร:</strong> ${phone}</p>
        <p><strong>หลักสูตรที่สนใจ:</strong> ${program}</p>
        <hr />
        <p>ส่งจากระบบรับสมัคร SchoolNext</p>
      `,
    });

    // 3. ส่งผลลัพธ์กลับไปบอกหน้าเว็บว่า "สำเร็จ"
    return NextResponse.json({ success: true, data });

  } catch (error) {
    // กรณีมี error ส่งกลับไปบอกว่า "ล้มเหลว"
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}