import { Search } from 'lucide-react';

import useDnDStore from '../stores/DnDStore';
import ImageNodeInput from './nodes/image/ImageNodeInput';
import ImageUploadNodeInput from './nodes/image/ImageUploadNodeInput';
import TextNodeInput from './nodes/text/TextNodeInput';
import TextPromptNodeInput from './nodes/text/TextPromptNodeInput';
import { useToast } from '@/global/hooks/use-toast';

export interface AIModels {
  type: string;
  models: string[];
}

export default function SideMenu(props: { selectedType: string | null }) {
  const { setNodeType, setModelName } = useDnDStore();
  const { toast } = useToast();

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
      models: [
        'gemini-2.0-flash',
        'OpenAI DALL·E 3',
        'Stability AI Stable Diffusion XL',
        'Adobe Firefly',
        'Midjourney v6',
      ],
    },
    {
      type: 'audio',
      models: ['AudioMD1', 'AudioMD2', 'AudioMD3'],
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
        {props.selectedType === 'image' && (
          <div>
            <p className='flex items-start px-4 text-center text-sm font-semibold text-[#666666]'>
              이미지 업로드용 노드
            </p>
            <div
              key='special-image-node'
              className='m-3 h-[200px] text-black'
              draggable
              onDragStart={(e) => onDragStart(e, 'imageUpload', 'SPECIAL_MODEL')}
            >
              {/* 이 컴포넌트를 원하는 대로 구현하세요 */}
              <ImageUploadNodeInput id='imageUpload' data={{ value: 'default' }} />
            </div>
            <div className='w-full border-b-[2px] border-[#666666] opacity-15' />
            <p className='flex items-start px-4 pt-4 text-center text-sm font-semibold text-[#666666]'>
              이미지 AI 모델 노드
            </p>
          </div>
        )}
        {props.selectedType === 'text' && (
          <div>
            <p className='flex items-start px-4 text-center text-sm font-semibold text-[#666666]'>
              텍스트 입력용 노드
            </p>
            <div
              key='special-text-node'
              className='m-3 h-[200px] text-black'
              draggable
              onDragStart={(e) => onDragStart(e, 'textPrompt', 'SPECIAL_MODEL')}
            >
              {/* 이 컴포넌트를 원하는 대로 구현하세요 */}
              <TextPromptNodeInput id='text' data={{ model: 'text', value: '' }} />
            </div>
            <div className='w-full border-b-[2px] border-[#666666] opacity-15' />
            <p className='flex items-start px-4 pt-4 text-center text-sm font-semibold text-[#666666]'>
              텍스트 AI 모델 노드
            </p>
          </div>
        )}
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
              {props.selectedType === 'text' && (
                <TextNodeInput id={modelName} data={{ model: modelName }} />
              )}
              {props.selectedType === 'image' && (
                <ImageNodeInput id={modelName} data={{ model: modelName }} />
              )}
            </div>
          ))}
      </div>
    </aside>
  );
}
