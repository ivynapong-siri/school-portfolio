'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);

  // โหลด Texture แผนที่โลก (ใช้ Link สาธารณะ)
  const [colorMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    'https://upload.wikimedia.org/wikipedia/commons/8/85/Solarsystemscope_texture_2k_earth_daymap.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c2/Solarsystemscope_texture_2k_earth_specular_map.jpg',
    // FYI: This is a texture of Mercury, not clouds. A proper cloud map would look better.
    'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_in_color_-_Prockter07_centered.jpg'
  ]);

  // สั่งให้โลกหมุนเองช้าๆ ตลอดเวลา
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = elapsedTime / 6; // หมุนแกน Y
    if (cloudsRef.current) cloudsRef.current.rotation.y = elapsedTime / 5; // เมฆหมุนเร็วกว่านิดหน่อย
  });

  return (
    <>
      {/* 1. ดวงอาทิตย์ (แสงหลัก) */}
      <ambientLight intensity={1} />
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />

      {/* 2. ชั้นเมฆ (Clouds) */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.505, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. ตัวโลก (Earth Sphere) */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        {/* A mesh can only have one material. The specularMap should be used within the meshStandardMaterial. */}
        <meshStandardMaterial
          map={colorMap}
          // In PBR, shininess is controlled by roughness. We can use the specular map as a roughness map.
          roughnessMap={specularMap}
          metalness={0.1} // Earth is not very metallic
          roughness={0.9} // Adjust base roughness
        />
      </mesh>
    </>
  );
};

export default function EarthCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          {/* ดวงดาวระยิบระยับเป็น Background */}
          <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade speed={1} />
          
          {/* ตัวโลก */}
          <Earth />
        </Suspense>
        
        {/* ตัวควบคุม: ให้ User หมุนได้ (ปิด Zoom เพื่อไม่ให้ขัดจังหวะการ Scroll เว็บ) */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={true} 
          enableRotate={true} 
          zoomSpeed={0.6} 
          panSpeed={0.5} 
          rotateSpeed={0.4} 
        />
      </Canvas>
    </div>
  );
}