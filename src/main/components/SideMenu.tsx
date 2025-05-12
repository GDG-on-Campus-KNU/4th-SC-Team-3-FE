import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Search } from 'lucide-react';

import useDnDStore from '../stores/DnDStore';
import AudioNodeInput from './nodes/audio/AudioNodeInput';
import ImageNodeInput from './nodes/image/ImageNodeInput';
import ImageUploadNodeInput from './nodes/image/ImageUploadNodeInput';
import TextNodeInput from './nodes/text/TextNodeInput';
import TextPromptNodeInput from './nodes/text/TextPromptNodeInput';
import VideoNodeInput from './nodes/video/VideoNodeInput';
import { useToast } from '@/global/hooks/use-toast';

export interface AIModels {
  type: string;
  models: string[];
}

export default function SideMenu(props: { selectedType: string | null }) {
  const { t } = useTranslation();
  const { setNodeType, setModelName } = useDnDStore();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');

  const searchType =
    props.selectedType === 'text'
      ? t('sideMenu.textSerach')
      : props.selectedType === 'image'
        ? t('sideMenu.imageSerach')
        : props.selectedType === 'video'
          ? t('sideMenu.videoSerach')
          : props.selectedType === 'audio'
            ? t('sideMenu.audioSerach')
            : '';

  const models: AIModels[] = [
    {
      type: 'text',
      models: [
        'Gemini 1.5 Pro',
        'OpenAI GPT-4o Turbo',
        'Anthropic Claude 3 Opus',
        'Meta Llama 3 70B',
        'Mistral Large',
      ],
    },
    {
      type: 'image',
      models: [
        'Gemini-2.0-flash',
        'OpenAI DALL·E 3',
        'Midjourney v6',
        'Stability AI SDXL',
        'Adobe Firefly',
      ],
    },
    {
      type: 'audio',
      models: ['ElevenLabs', 'Murf AI', 'Resemble AI', 'Descript', 'PlayHT'],
    },
    {
      type: 'video',
      models: ['Runway ML', 'Synthesia', 'SkyReels', 'Descript'],
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

  const filteredModels = models
    .find((model) => model.type === props.selectedType)
    ?.models.filter((modelName) => modelName.toLowerCase().includes(searchTerm.toLowerCase()));

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
            placeholder={searchType}
            className='font-[Noto Sans] h-[30px] w-[180px] self-center bg-transparent text-left text-[16px] font-medium placeholder-[#666666] focus-visible:outline-none'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div
        className={`flex h-[calc(100%-130px)] flex-col items-center self-center overflow-x-hidden overflow-y-scroll scroll-smooth p-4`}
      >
        {props.selectedType === 'image' && (
          <>
            <p className='flex items-start px-4 text-center text-sm font-semibold text-[#666666]'>
              {t('sideMenu.imageNode')}
            </p>
            <div
              key='special-image-node'
              className='m-3 h-[200px] text-black'
              draggable
              onDragStart={(e) => onDragStart(e, 'imageUpload', 'SPECIAL_MODEL')}
            >
              <ImageUploadNodeInput id='imageUpload' data={{ value: 'default' }} />
            </div>
            <div className='w-full border-b-[2px] border-[#666666] opacity-15' />
            <p className='flex items-start px-4 pt-4 text-center text-sm font-semibold text-[#666666]'>
              {t('sideMenu.imageAINode')}
            </p>
          </>
        )}

        {props.selectedType === 'text' && (
          <>
            <p className='flex items-start px-4 text-center text-sm font-semibold text-[#666666]'>
              {t('sideMenu.textNode')}
            </p>
            <div
              key='special-text-node'
              className='m-3 h-[200px] text-black'
              draggable
              onDragStart={(e) => onDragStart(e, 'textPrompt', 'SPECIAL_MODEL')}
            >
              <TextPromptNodeInput id='text' data={{ model: 'text', value: '' }} />
            </div>
            <div className='w-full border-b-[2px] border-[#666666] opacity-15' />
            <p className='flex items-start px-4 pt-4 text-center text-sm font-semibold text-[#666666]'>
              {t('sideMenu.textAINode')}
            </p>
          </>
        )}

        {filteredModels?.map((modelName, index) => (
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
            {props.selectedType === 'video' && (
              <VideoNodeInput id={modelName} data={{ model: modelName }} />
            )}
            {props.selectedType === 'audio' && (
              <AudioNodeInput id={modelName} data={{ model: modelName }} />
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
