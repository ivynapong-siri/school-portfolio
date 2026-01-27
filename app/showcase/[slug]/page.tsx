
import { notFound } from 'next/navigation';
import { projects } from '@/app/data/projects'; 
import ProjectLayout from '@/app/components/ProjectLayout';

// ✅ Import ไฟล์เนื้อหาที่เราเพิ่งสร้าง
import { projectContents, DefaultContent } from '@/app/data/project-contents';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | School Showcase`,
  };
}

export default async function ProjectDetail({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // --- LOGIC แปลง Video URL (อันเดิม) ---
  let finalUrl = project.content;
  if (project.type === 'video') {
    if (!project.content.includes('http')) {
      finalUrl = `https://www.youtube.com/embed/${project.content}?autoplay=1&mute=1&loop=1&playlist=${project.content}`;
    }
  }

  // 🔥 จุดสำคัญ: ดึงเนื้อหาเฉพาะของหน้านั้นๆ มาเก็บไว้ในตัวแปร
  // ถ้าไม่มีเนื้อหา (key ไม่ตรง) ให้ใช้ DefaultContent
  const contentBody = projectContents[slug] || <DefaultContent />;

  return (
    <ProjectLayout
      title={project.title}
      slug={project.slug}
      category={project.category}
      author={project.author}
      date={project.date}
      heroContent={{
        type: project.type as 'image' | 'video',
        url: finalUrl,
      }}
    >
      {/* ✅ แสดงเนื้อหาที่ดึงมา แทนข้อความซ้ำๆ */}
      {contentBody}

    </ProjectLayout>
  );
}