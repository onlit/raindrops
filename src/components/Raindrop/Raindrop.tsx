import RainDrop from '@/types/RainDrop';
import React from 'react';

interface RaindropProps {
  drop: RainDrop;
}

export default function Raindrop({ drop }: RaindropProps) {
  return (
    <div
      key={drop.id}
      style={{ left: `${drop.position}px` }}
      className='bg-[#254052] flex items-center justify-center text-white font-semibold text-xl raindrop border-white border-4 w-20 h-20'
    >
      {drop.expression}
    </div>
  );
}
