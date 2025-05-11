import { useTranslation } from 'react-i18next';

import { Baseline, Image, Play, AudioLines } from 'lucide-react';

export default function SideButton(props: {
  selectedType: string | null;
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const toggleDrawer = (type: string) => {
    props.setSelectedType(!type ? null : type === props.selectedType ? null : type);
  };

  const { t } = useTranslation();

  return (
    <>
      <button
        key='text'
        className={`h-[58px] w-[58px] rounded-[8px] ${
          props.selectedType === 'text' ? 'bg-[#C9DCF9]' : 'bg-[#FFFFFF]'
        } group flex flex-col justify-center pt-1 hover:bg-[#C9DCF9]`}
        onClick={() => toggleDrawer('text')}
      >
        <div
          className={`h-[28px] w-[28px] rounded-sm border-2 ${
            props.selectedType === 'text' ? 'border-[#3A7DE8]' : 'border-[#808080]'
          } flex flex-col justify-center self-center group-hover:border-[#3A7DE8]`}
        >
          <Baseline
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${
              props.selectedType === 'text' ? 'text-[#3A7DE8]' : 'text-[#808080]'
            } group-hover:text-[#3A7DE8]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] text-center text-[12px] font-semibold ${
            props.selectedType === 'text' ? 'text-[#3A7DE8]' : 'text-[#808080]'
          } group-hover:text-[#3A7DE8]`}
        >
          {t('sideButton.text')}
        </div>
      </button>

      <button
        key='image'
        className={`h-[58px] w-[58px] rounded-[8px] ${
          props.selectedType === 'image' ? 'bg-[#FFF1D1]' : 'bg-[#FFFFFF]'
        } group flex flex-col justify-center pt-1 hover:bg-[#FFF1D1]`}
        onClick={() => toggleDrawer('image')}
      >
        <div
          className={`h-[28px] w-[28px] rounded-sm border-2 ${
            props.selectedType === 'image' ? 'border-[#FFBD1E]' : 'border-[#808080]'
          } flex flex-col justify-center self-center group-hover:border-[#FFBD1E]`}
        >
          <Image
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${
              props.selectedType === 'image' ? 'text-[#FFBD1E]' : 'text-[#808080]'
            } group-hover:text-[#FFBD1E]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] text-center text-[12px] font-semibold ${
            props.selectedType === 'image' ? 'text-[#FFBD1E]' : 'text-[#808080]'
          } group-hover:text-[#FFBD1E]`}
        >
          {t('sideButton.image')}
        </div>
      </button>

      <button
        key='video'
        className={`h-[58px] w-[58px] rounded-[8px] ${
          props.selectedType === 'video' ? 'bg-[#FBE6F7]' : 'bg-[#FFFFFF]'
        } group flex flex-col justify-center pt-1 hover:bg-[#FBE6F7]`}
        onClick={() => toggleDrawer('video')}
      >
        <div
          className={`h-[28px] w-[28px] rounded-sm border-2 ${
            props.selectedType === 'video' ? 'border-[#EF9EE1]' : 'border-[#808080]'
          } flex flex-col justify-center self-center group-hover:border-[#EF9EE1]`}
        >
          <Play
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${
              props.selectedType === 'video' ? 'text-[#EF9EE1]' : 'text-[#808080]'
            } group-hover:text-[#EF9EE1]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] text-center text-[12px] font-semibold ${
            props.selectedType === 'video' ? 'text-[#EF9EE1]' : 'text-[#808080]'
          } group-hover:text-[#EF9EE1]`}
        >
          {t('sideButton.video')}
        </div>
      </button>

      <button
        key='audio'
        className={`h-[58px] w-[58px] rounded-[8px] ${
          props.selectedType === 'audio' ? 'bg-[#B2CBC0]' : 'bg-[#FFFFFF]'
        } group flex flex-col justify-center pt-1 hover:bg-[#B2CBC0]`}
        onClick={() => toggleDrawer('audio')}
      >
        <div
          className={`h-[28px] w-[28px] rounded-sm border-2 ${
            props.selectedType === 'audio' ? 'border-[#337758]' : 'border-[#808080]'
          } flex flex-col justify-center self-center group-hover:border-[#337758]`}
        >
          <AudioLines
            size='18'
            strokeWidth='2.5'
            className={`self-center group-hover:bottom-0 ${
              props.selectedType === 'audio' ? 'text-[#337758]' : 'text-[#808080]'
            } group-hover:text-[#337758]`}
          />
        </div>
        <div
          className={`font-[Noto Sans] text-center text-[12px] font-semibold ${
            props.selectedType === 'audio' ? 'text-[#337758]' : 'text-[#808080]'
          } group-hover:text-[#337758]`}
        >
          {t('sideButton.audio')}
        </div>
      </button>
    </>
  );
}
