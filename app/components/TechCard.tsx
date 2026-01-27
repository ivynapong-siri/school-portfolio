// app/components/TechCard.tsx
import React from 'react';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

export default function TechCard({ children, className = "", noBorder = false }: TechCardProps) {
  return (
    <div className={`relative p-6 ${className}`}>
      {/* Corner Points & Lines Logic mimicking the provided HTML */}
      {!noBorder && (
        <div className="absolute inset-0 pointer-events-none">
           {/* Top Left */}
           <span className="absolute top-0 left-0 w-2 h-2 bg-stone-900" />
           <span className="absolute top-0 left-0 w-8 h-[1px] bg-stone-900" />
           <span className="absolute top-0 left-0 w-[1px] h-8 bg-stone-900" />
           
           {/* Top Right */}
           <span className="absolute top-0 right-0 w-2 h-2 bg-stone-900" />
           <span className="absolute top-0 right-0 w-8 h-[1px] bg-stone-900" />
           <span className="absolute top-0 right-0 w-[1px] h-8 bg-stone-900" />

           {/* Bottom Left */}
           <span className="absolute bottom-0 left-0 w-2 h-2 bg-stone-900" />
           <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-stone-900" />
           <span className="absolute bottom-0 left-0 w-[1px] h-8 bg-stone-900" />

           {/* Bottom Right */}
           <span className="absolute bottom-0 right-0 w-2 h-2 bg-stone-900" />
           <span className="absolute bottom-0 right-0 w-8 h-[1px] bg-stone-900" />
           <span className="absolute bottom-0 right-0 w-[1px] h-8 bg-stone-900" />
        </div>
      )}
      {children}
    </div>
  );
}