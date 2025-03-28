import { FunctionComponent } from 'react';

import { Baseline, Image, Play, AudioLines } from 'lucide-react';

import { menuType } from '../pages/HomePage';

export default function SideButton(props: {
  selectedType: string | null;
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const toggleDrawer = (type: string) => {
    props.setSelectedType(!type ? null : type === props.selectedType ? null : type);
  };

  return (
    <>
      <button
        key='text'
        className={`w-[58px] h-[58px] rounded-[8px] ${props.selectedType === 'text' ? 'bg-[#C9DCF9]' : 'bg-[#FFFFFF]'} hover:bg-[#C9DCF9] flex flex-col justify-center pt-1 group`}
        onClick={() => toggleDrawer('text')}
      >
        <div
          className={`w-[28px] h-[28px] rounded-sm border-2 ${props.selectedType === 'text' ? 'border-[#3A7DE8]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#3A7DE8]`}
        >
          <Baseline
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${props.selectedType == 'text' ? 'text-[#3A7DE8]' : 'text-[#808080]'} group-hover:text-[#3A7DE8]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] font-semibold text-center text-[12px] ${props.selectedType == 'text' ? 'text-[#3A7DE8]' : 'text-[#808080]'} group-hover:text-[#3A7DE8]`}
        >
          텍스트
        </div>
      </button>
      <button
        key='image'
        className={`w-[58px] h-[58px] rounded-[8px] ${props.selectedType === 'image' ? 'bg-[#FFF1D1]' : 'bg-[#FFFFFF]'} hover:bg-[#FFF1D1] flex flex-col justify-center pt-1 group`}
        onClick={() => toggleDrawer('image')}
      >
        <div
          className={`w-[28px] h-[28px] rounded-sm border-2 ${props.selectedType === 'image' ? 'border-[#FFBD1E]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#FFBD1E]`}
        >
          <Image
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${props.selectedType == 'image' ? 'text-[#FFBD1E]' : 'text-[#808080]'} group-hover:text-[#FFBD1E]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] font-semibold text-center text-[12px] ${props.selectedType == 'image' ? 'text-[#FFBD1E]' : 'text-[#808080]'} group-hover:text-[#FFBD1E]`}
        >
          이미지
        </div>
      </button>
      <button
        key='video'
        className={`w-[58px] h-[58px] rounded-[8px] ${props.selectedType === 'video' ? 'bg-[#FBE6F7]' : 'bg-[#FFFFFF]'} hover:bg-[#FBE6F7] flex flex-col justify-center pt-1 group`}
        onClick={() => toggleDrawer('video')}
      >
        <div
          className={`w-[28px] h-[28px] rounded-sm border-2 ${props.selectedType === 'video' ? 'border-[#EF9EE1]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#EF9EE1]`}
        >
          <Play
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${props.selectedType == 'video' ? 'text-[#EF9EE1]' : 'text-[#808080]'} group-hover:text-[#EF9EE1]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] font-semibold text-center text-[12px] ${props.selectedType == 'video' ? 'text-[#EF9EE1]' : 'text-[#808080]'} group-hover:text-[#EF9EE1]`}
        >
          비디오
        </div>
      </button>
      <button
        key='audio'
        className={`w-[58px] h-[58px] rounded-[8px] ${props.selectedType === 'audio' ? 'bg-[#B2CBC0]' : 'bg-[#FFFFFF]'} hover:bg-[#B2CBC0] flex flex-col justify-center pt-1 group`}
        onClick={() => toggleDrawer('audio')}
      >
        <div
          className={`w-[28px] h-[28px] rounded-sm border-2 ${props.selectedType === 'audio' ? 'border-[#337758]' : 'border-[#808080]'} self-center flex flex-col justify-center group-hover:border-[#337758]`}
        >
          <AudioLines
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${props.selectedType == 'audio' ? 'text-[#337758]' : 'text-[#808080]'} group-hover:text-[#337758]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] font-semibold text-center text-[12px] ${props.selectedType == 'audio' ? 'text-[#337758]' : 'text-[#808080]'} group-hover:text-[#337758]`}
        >
          오디오
        </div>
      </button>
    </>
  );
}
