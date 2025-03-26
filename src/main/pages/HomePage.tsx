import React, { useState } from 'react';

import { Baseline, Image, Play, AudioLines } from 'lucide-react';

import SideMenu from '../components/SideMenu';

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const menuType = ['text', 'image', 'video', 'audio'];

  const toggleDrawer = (type: string) => {
    setSelectedType(!type ? null : type === selectedType ? null : type);
  };

  return (
    <div className='h-full flex flex-col bg-[#EDEDED]'>
      <div className='h-full w-[370px] bg-transparent relative flex'>
        <div className='w-[70px] h-full bg-[#FFFFFF] border-r-[#BBBBBB] border-r-[0.5px] z-10'>
          <div className='h-full flex flex-col items-start p-[6px] space-y-1 gap-3 mt-1'>
            {menuType.map((type) =>
              type === 'text' ? (
                <button
                  key={type}
                  className={`w-[58px] h-[58px] rounded-[8px] ${selectedType === type ? 'bg-[#C9DCF9]' : 'bg-[#FFFFFF]'} hover:bg-[#C9DCF9] flex flex-col justify-center pt-1 group`}
                  onClick={() => toggleDrawer(type)}
                >
                  <div
                    className={`w-[28px] h-[28px] rounded-sm border-2 ${selectedType === type ? 'border-[#3A7DE8]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#3A7DE8]`}
                  >
                    <Baseline
                      size='18'
                      strokeWidth='2.5'
                      className={`self-center group-hover:bottom-0 ${selectedType == type ? 'text-[#3A7DE8]' : 'text-[#808080]'} group-hover:text-[#3A7DE8]`}
                    />
                  </div>
                  <div
                    className={`font-[Noto Sans] font-semibold text-center text-[12px] ${selectedType == type ? 'text-[#3A7DE8]' : 'text-[#808080]'} group-hover:text-[#3A7DE8]`}
                  >
                    텍스트
                  </div>
                </button>
              ) : type === 'image' ? (
                <button
                  key={type}
                  className={`w-[58px] h-[58px] rounded-[8px] ${selectedType === type ? 'bg-[#FFF1D1]' : 'bg-[#FFFFFF]'} hover:bg-[#FFF1D1] flex flex-col justify-center pt-1 group`}
                  onClick={() => toggleDrawer(type)}
                >
                  <div
                    className={`w-[28px] h-[28px] rounded-sm border-2 ${selectedType === type ? 'border-[#FFBD1E]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#FFBD1E]`}
                  >
                    <Image
                      size='18'
                      strokeWidth='2.5'
                      className={`self-center group-hover:bottom-0 ${selectedType == type ? 'text-[#3A7DE8]' : 'text-[#808080]'} group-hover:text-[#FFBD1E]`}
                    />
                  </div>
                  <div
                    className={`font-[Noto Sans] font-semibold text-center text-[12px] ${selectedType == type ? 'text-[#FFBD1E]' : 'text-[#808080]'} group-hover:text-[#FFBD1E]`}
                  >
                    이미지
                  </div>
                </button>
              ) : type === 'video' ? (
                <button
                  key={type}
                  className={`w-[58px] h-[58px] rounded-[8px] ${selectedType === type ? 'bg-[#FBE6F7]' : 'bg-[#FFFFFF]'} hover:bg-[#FBE6F7] flex flex-col justify-center pt-1 group`}
                  onClick={() => toggleDrawer(type)}
                >
                  <div
                    className={`w-[28px] h-[28px] rounded-sm border-2 ${selectedType === type ? 'border-[#EF9EE1]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#EF9EE1]`}
                  >
                    <Play
                      size='18'
                      strokeWidth='2.5'
                      className={`self-center group-hover:bottom-0 ${selectedType == type ? 'text-[#EF9EE1]' : 'text-[#808080]'} group-hover:text-[#EF9EE1]`}
                    />
                  </div>
                  <div
                    className={`font-[Noto Sans] font-semibold text-center text-[12px] ${selectedType == type ? 'text-[#EF9EE1]' : 'text-[#808080]'} group-hover:text-[#EF9EE1]`}
                  >
                    비디오
                  </div>
                </button>
              ) : type === 'audio' ? (
                <button
                  key={type}
                  className={`w-[58px] h-[58px] rounded-[8px] ${selectedType === type ? 'bg-[#B2CBC0]' : 'bg-[#FFFFFF]'} hover:bg-[#B2CBC0] flex flex-col justify-center pt-1 group`}
                  onClick={() => toggleDrawer(type)}
                >
                  <div
                    className={`w-[28px] h-[28px] rounded-sm border-2 ${selectedType === type ? 'border-[#337758]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#337758]`}
                  >
                    <AudioLines
                      size='18'
                      strokeWidth='2.5'
                      className={`self-center group-hover:bottom-0 ${selectedType == type ? 'text-[#337758]' : 'text-[#808080]'} group-hover:text-[#337758]`}
                    />
                  </div>
                  <div
                    className={`font-[Noto Sans] font-semibold text-center text-[12px] ${selectedType == type ? 'text-[#337758]' : 'text-[#808080]'} group-hover:text-[#337758]`}
                  >
                    오디오
                  </div>
                </button>
              ) : (
                <></>
              ),
            )}
          </div>
        </div>
        <SideMenu type={selectedType} />
      </div>
    </div>
  );
}
