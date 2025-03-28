import React from 'react';

import { Search } from 'lucide-react';

export default function SideMenu(props: { selectedType: string | null }) {
  const searchType =
    props.selectedType === 'text'
      ? '텍스트'
      : props.selectedType === 'image'
        ? '이미지'
        : props.selectedType === 'video'
          ? '비디오'
          : props.selectedType === 'audio'
            ? '오디오'
            : '';

  return (
    <aside
      className={`${
        props.selectedType === null ? '-translate-x-full' : 'translate-x-[70px]'
      } ease-in-out duration-500 transform delay-0 z-10 fixed
        h-full w-[300px] flex-1 rounded-r-lg bg-[#D9D9D9] overflow-y-auto`}
    >
      <div className='flex flex-col items-center p-4 mt-1 gap-8'>
        <div className='h-[40px] w-[240px] rounded-[8px] border-[#666666] flex flex-row justify-center gap-2 bg-transparent border-[1px] '>
          <Search size={16} className='text-[#808080] self-center' />
          <input
            type='search'
            name='searchAIModel'
            placeholder={`${searchType} AI 모델 검색`}
            className='w-[180px] h-[30px] bg-transparent placeholder-[#666666] self-center focus-visible:outline-none font-[Noto Sans] font-medium text-left text-[16px]'
          />
        </div>
      </div>
    </aside>
  );
}
