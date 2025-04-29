import { useState } from 'react';

import Canvas from '../components/Canvas';
import SideButton from '../components/SideButton';
import SideMenu from '../components/SideMenu';
import { ReactFlowProvider } from '@xyflow/react';

export const menuType = ['text', 'image', 'video', 'audio'];

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className='flex h-full flex-row overflow-y-hidden bg-[#EDEDED]'>
      <ReactFlowProvider>
        <div className='relative z-20 h-full w-[70px] border-r-[0.5px] border-r-[#BBBBBB] bg-[#FFFFFF]'>
          <div className='mt-1 flex h-full flex-col items-start gap-3 space-y-1 p-[6px]'>
            <SideButton selectedType={selectedType} setSelectedType={setSelectedType} />
          </div>
        </div>
        <SideMenu selectedType={selectedType} />
        <Canvas />
      </ReactFlowProvider>
    </div>
  );
}
