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
            {menuType.map((type) => (
              <button
                key={type}
                className={`w-[58px] h-[58px] rounded-[8px] ${selectedType === type ? 'bg-[#C9DCF9]' : 'bg-[#FFFFFF]'} hover:bg-[#C9DCF9] flex flex-col justify-center pt-1`}
                onClick={() => toggleDrawer(type)}
              >
                <div className='w-[28px] h-[28px] rounded-sm border-2 border-[#3A7DE8] self-center flex flex-col justify-center'>
                  {type === 'text' ? (
                    <Baseline size='18' color='#3A7DE8' strokeWidth='2.5' className='self-center' />
                  ) : type === 'image' ? (
                    <Image size='18' color='#3A7DE8' strokeWidth='2.5' className='self-center' />
                  ) : type === 'video' ? (
                    <Play size='18' color='#3A7DE8' strokeWidth='2.5' className='self-center' />
                  ) : type === 'audio' ? (
                    <AudioLines
                      size='18'
                      color='#3A7DE8'
                      strokeWidth='2.5'
                      className='self-center'
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className='font-[Noto Sans] font-semibold text-center text-[12px] text-[#3A7DE8]'>
                  {type === 'text'
                    ? '텍스트'
                    : type === 'image'
                      ? '이미지'
                      : type === 'video'
                        ? '비디오'
                        : type === 'audio'
                          ? '오디오'
                          : ''}
                </div>
              </button>
            ))}
          </div>
        </div>
        <SideMenu type={selectedType} />
      </div>
    </div>
  );
}
