// app/data/teachers.ts

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  image: string;
  // ✅ ต้องมี Type นี้
  education?: { 
    bachelors: string;
    masters: string;
  };
};

export const subjects = ['All', 'Mathematics', 'Science', 'Languages', 'Technology', 'Arts & Creativity'];

const portraitIds = [
  '1544005313-94ddf0286df2', '1506794778202-cad84cf45f1d', '1507003211169-0a1dd7228f2d', '1573496359142-b8d87734a5a2',
  '1500648767791-00dcc994a43e', '1535713875002-d1d0cf377fde', '1580489944761-15a19d654956', '1438761681033-6461ffad8d80',
  '1472099645785-5658abf4ff4e', '1494790108377-be9c29b29330', '1560250097-0b93528c311a', '1519085360753-af0119f7cbe7'
];

const getPhoto = (i: number) => {
  const id = portraitIds[i % portraitIds.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
};

export const teachers: Teacher[] = [];

const subjectList = ['Mathematics', 'Science', 'Languages', 'Technology', 'Arts & Creativity'];
const names = [
  'Sarah Johnson', 'Michael Chen', 'David Smith', 'Jessica Williams', 
  'Robert Brown', 'Emily Davis', 'James Wilson', 'Linda Taylor',
  'William Thomas', 'Elizabeth Garcia'
];

const universities = ['Harvard', 'Stanford', 'Oxford', 'Cambridge', 'MIT', 'Chulalongkorn', 'Mahidol', 'Thammasat', 'UCLA', 'Yale'];
const degrees = ['Education', 'Science', 'Arts', 'Mathematics', 'Engineering', 'Psychology'];

let idCounter = 1;

subjectList.forEach((sub) => {
  for (let i = 0; i < 10; i++) {
    const uni1 = universities[Math.floor(Math.random() * universities.length)];
    const uni2 = universities[Math.floor(Math.random() * universities.length)];
    const deg = degrees[Math.floor(Math.random() * degrees.length)];

    teachers.push({
      id: `t-${idCounter}`,
      name: names[idCounter % names.length], 
      subject: sub,
      image: getPhoto(idCounter),
      // ✅ ต้องมีข้อมูลชุดนี้ครับ
      education: {
        bachelors: `B.A. in ${deg}, ${uni1} Univ.`,
        masters: `M.Ed. in ${sub}, ${uni2} Univ.`
      }
    });
    idCounter++;
  }
});