import { Search } from 'lucide-react';

import useDnDStore from '../stores/DnDStore';
import TextNodeInput from './nodes/text/TextNodeInput';

export interface AIModels {
  type: string;
  models: string[];
}

export default function SideMenu(props: { selectedType: string | null }) {
  const { setNodeType, setModelName } = useDnDStore();

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

  const models: AIModels[] = [
    {
      type: 'text',
      models: ['ChatGPT', 'aaaaaa', 'bbbbbb', 'cccccc', 'dddddT', 'asdfasdfasdf'],
    },
    {
      type: 'image',
      models: ['Gemi', 'Gemi', 'Gemi', 'Gemi', 'Gemi'],
    },
    {
      type: 'audio',
      models: ['AudioMD', 'AudioMD', 'AudioMD'],
    },
    {
      type: 'video',
      models: ['vdmd', 'vdmdvdmd'],
    },
  ];

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    selectedModel: string,
  ): void => {
    if (setNodeType) {
      setNodeType(nodeType);
    }
    setModelName(selectedModel);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside
      className={`${
        props.selectedType === null ? '-translate-x-full' : 'translate-x-[70px]'
      } fixed z-10 h-full w-[300px] flex-1 transform overflow-hidden rounded-r-lg bg-[#D9D9D9] delay-0 duration-500 ease-in-out`}
    >
      <div className='ml-2 mt-1 flex h-[75px] flex-col p-4'>
        <div className='flex h-[40px] w-[240px] flex-row justify-center gap-2 rounded-[8px] border-[1px] border-[#666666] bg-transparent'>
          <Search size={16} className='self-center text-[#808080]' />
          <input
            type='search'
            name='searchAIModel'
            placeholder={`${searchType} AI 모델 검색`}
            className='font-[Noto Sans] h-[30px] w-[180px] self-center bg-transparent text-left text-[16px] font-medium placeholder-[#666666] focus-visible:outline-none'
          />
        </div>
      </div>
      <div
        className={`flex h-[calc(100%-130px)] flex-col items-center self-center overflow-x-hidden overflow-y-scroll scroll-smooth p-4`}
      >
        {models
          .find((model) => model.type === props.selectedType)
          ?.models.map((modelName, index) => (
            <div
              key={index}
              id={modelName}
              className='m-3 h-[200px] text-black'
              draggable
              onDragStart={(event) =>
                onDragStart(event, props.selectedType ? props.selectedType : '', modelName)
              }
            >
              <TextNodeInput id={modelName} data={{ model: modelName }} />
            </div>
          ))}
      </div>
    </aside>
  );
}
