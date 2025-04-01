import { useState } from 'react';

import Canvas from '../components/Canvas';
import SideButton from '../components/SideButton';
import SideMenu from '../components/SideMenu';
import { ReactFlowProvider } from '@xyflow/react';

export const menuType = ['text', 'image', 'video', 'audio'];

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className='h-full flex flex-row bg-[#EDEDED] overflow-y-hidden'>
      <ReactFlowProvider>
        <div className='w-[70px] h-full relative  bg-[#FFFFFF] border-r-[#BBBBBB] border-r-[0.5px] z-20'>
          <div className='h-full flex flex-col items-start p-[6px] space-y-1 gap-3 mt-1'>
            <SideButton selectedType={selectedType} setSelectedType={setSelectedType} />
          </div>
        </div>
        <SideMenu selectedType={selectedType} />
        <Canvas />
      </ReactFlowProvider>
    </div>
  );
}
