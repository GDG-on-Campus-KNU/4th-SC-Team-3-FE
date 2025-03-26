import React, { useState } from 'react';

import SideButton from '../components/SideButton';
import SideMenu from '../components/SideMenu';

export const menuType = ['text', 'image', 'video', 'audio'];

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className='h-full flex flex-col bg-[#EDEDED]'>
      <div className='h-full w-[370px] bg-transparent relative flex'>
        <div className='w-[70px] h-full bg-[#FFFFFF] border-r-[#BBBBBB] border-r-[0.5px] z-10'>
          {/* todo: canvas */}
          <div className='h-full flex flex-col items-start p-[6px] space-y-1 gap-3 mt-1'>
            <SideButton selectedType={selectedType} setSelectedType={setSelectedType} />
          </div>
        </div>
        <SideMenu type={selectedType} />
      </div>
    </div>
  );
}
