import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. สร้าง Admin (ครูใหญ่) - username: admin, pass: password123
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'password123', 
      role: 'admin',
    },
  })
  console.log('Created Admin:', admin.username)

  // 2. สร้างนักเรียน 3 คน - password: 1234
  const studentsData = [
    { user: 'student1', first: 'koi', last: 'sucha', gpa: 3.50 },
    { user: 'student2', first: 'ivy', last: 'napong', gpa: 3.85 },
    { user: 'student3', first: 'มาโนช', last: 'ยิ่งยืนนาน', gpa: 2.50 },
  ]

  for (const s of studentsData) {
    await prisma.user.upsert({
      where: { username: s.user },
      update: {},
      create: {
        username: s.user,
        password: '1234',
        role: 'student',
        student: {
          create: { firstName: s.first, lastName: s.last, gpax: s.gpa },
        },
      },
    })
    console.log(`Created Student: ${s.first}`)
  }
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })