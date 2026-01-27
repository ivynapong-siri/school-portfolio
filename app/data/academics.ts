// app/data/academics.ts

export type AcademicProgram = {
  id: string;
  title: string;
  description: string;
  tuition: string; // ค่าเทอม
  level: string;   // ระดับชั้น
  capacity: string; // จำนวนรับ
  image: string;
  subjects: string[]; // รายวิชาที่โดดเด่น
};

export const academicPrograms: AcademicProgram[] = [
  {
    id: 'p-01',
    title: 'Science & Mathematics',
    description: 'The rigorous foundation for future innovators, engineers, and scientists. Focuses on analytical thinking and advanced problem-solving skills.',
    tuition: '฿ 65,000',
    level: 'Grade 10-12',
    capacity: '40 Students',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    subjects: ['Advanced Calculus', 'Quantum Physics', 'Organic Chemistry', 'Biology', 'Computer Science']
  },
  {
    id: 'p-02',
    title: 'Pre-Medical Track',
    description: 'A specialized intensive program designed for aspiring doctors and healthcare professionals, with hands-on lab experience and hospital internships.',
    tuition: '฿ 85,000',
    level: 'Grade 10-12',
    capacity: '25 Students',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    subjects: ['Human Anatomy', 'Medical Ethics', 'Physiology', 'Biochemistry', 'Clinical Internship']
  },
  {
    id: 'p-03',
    title: 'Arts - Chinese Language',
    description: 'Immerse in the language of the future economy. Our curriculum integrates cultural studies with intensive Mandarin proficiency aimed at HSK 5-6.',
    tuition: '฿ 55,000',
    level: 'Grade 10-12',
    capacity: '30 Students',
    image: 'https://images.unsplash.com/photo-1515165592879-545f622a8f91?auto=format&fit=crop&w=800&q=80',
    subjects: ['Mandarin Listening & Speaking', 'Chinese History', 'Calligraphy', 'Business Chinese', 'Chinese Literature']
  },
  {
    id: 'p-04',
    title: 'Arts - French Language',
    description: 'Experience the elegance of French culture and language. A gateway to international relations, fashion, and culinary arts careers.',
    tuition: '฿ 55,000',
    level: 'Grade 10-12',
    capacity: '30 Students',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    subjects: ['French Grammar', 'Francophone Culture', 'French Literature', 'Translation Skills', 'European History']
  },
  {
    id: 'p-05',
    title: 'Arts - Japanese Language',
    description: 'Master the Japanese language with native speakers. Focuses on communication skills, modern pop culture, and traditional customs.',
    tuition: '฿ 55,000',
    level: 'Grade 10-12',
    capacity: '30 Students',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80',
    subjects: ['Japanese Conversation', 'Kanji Mastery', 'Japanese Society', 'Anime & Media Studies', 'JLPT Preparation']
  }
];