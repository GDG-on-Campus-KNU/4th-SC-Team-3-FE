import { Search } from 'lucide-react';

import useDnDStore from '../stores/DnDStore';
import TextNodeInput from './nodes/text/TextNodeInput';

export interface AIModels {
  type: string;
  models: string[];
}

export default function SideMenu(props: { selectedType: string | null }) {
  const { setType, setModelName } = useDnDStore();

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
    if (setType) {
      setType(nodeType);
    }
    setModelName(selectedModel);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside
      className={`${
        props.selectedType === null ? '-translate-x-full' : 'translate-x-[70px]'
      } ease-in-out duration-500 transform delay-0 z-10 fixed
        h-full w-[300px] flex-1 rounded-r-lg bg-[#D9D9D9] overflow-hidden`}
    >
      <div className='h-[75px] flex flex-col p-4 mt-1 ml-2'>
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
      <div
        className={`h-[calc(100%-130px)] scroll-smooth self-center items-center p-4 flex flex-col overflow-y-scroll overflow-x-hidden`}
      >
        {models
          .find((model) => model.type === props.selectedType)
          ?.models.map((modelName, index) => (
            <div
              key={index}
              id={modelName}
              className='text-black h-[200px] m-3'
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
