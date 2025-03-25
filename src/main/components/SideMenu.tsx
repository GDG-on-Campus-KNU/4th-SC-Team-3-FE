import React from 'react';

import { Search } from 'lucide-react';

export default function SideMenu(props: { type: string | null }) {
  const searchType =
    props.type === 'text'
      ? '텍스트'
      : props.type === 'image'
        ? '이미지'
        : props.type === 'video'
          ? '비디오'
          : props.type === 'audio'
            ? '오디오'
            : '';

  return (
    <aside
      className={`${
        props.type === null ? '-translate-x-full' : 'translate-x-0'
      } ease-in-out duration-500 transform z-0 delay-0
        h-full w-[300px] flex-1 rounded-r-lg bg-[#D9D9D9] overflow-y-auto `}
    >
      <div className='flex flex-col items-center p-4 mt-1 gap-8'>
        <div className='h-[40px] w-[240px] rounded-[8px] flex flex-row justify-center gap-2 bg-transparent border-[1px] border-[#808080]'>
          <Search size={16} color='#808080' className='self-center' />
          <input
            type='text'
            name='searchModel'
            placeholder={`${searchType} AI 모델 검색`}
            className='w-[180px] h-[30px] bg-transparent self-center focus-visible:outline-none font-[Noto Sans] font-medium text-left text-[16px]'
          />
        </div>
      </div>
    </aside>
  );
}
