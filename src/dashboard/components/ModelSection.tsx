import React from 'react';

interface SectionConfig {
  key: string;
  label: string;
  color: string;
  models: string[];
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    key: 'text',
    label: '텍스트 중심 AI 모델',
    color: '#3A7DE8',
    models: ['Gemini 1.5 Pro', 'Claude 3 Opus', 'GPT-4o Turbo', 'Llama 3 70B', 'Mistral Large'],
  },
  {
    key: 'image',
    label: '이미지 중심 AI 모델',
    color: '#EAAF1E',
    models: [
      'gemini-2.0-flash',
      'DALL·E 3',
      'Stable Diffusion XL',
      'Adobe Firefly',
      'Midjourney v6',
    ],
  },
  {
    key: 'video',
    label: '비디오 중심 AI 모델',
    color: '#EF9EE1',
    models: ['Runway ML', 'Synthesia', 'SkyReels', 'Descript', 'Kaiber'],
  },
  {
    key: 'audio',
    label: '오디오 중심 AI 모델',
    color: '#337758',
    models: ['ElevenLabs', 'Murf AI', 'Resemble AI', 'Play.ht', 'Sonantic'],
  },
];

export const ModelSection = () => {
  return (
    <>
      {SECTION_CONFIGS.map(({ key, label, color, models }) => (
        <section key={key} className='mt-14'>
          {/* 헤더 */}
          <div className='mb-5 flex items-center justify-between'>
            <h1 className='text-2xl font-bold tracking-wide text-[#505050]'>
              <span style={{ color }}>{label}</span> 구경하기
            </h1>
            <h3 className='cursor-pointer text-[#808080]'>+ 더보기</h3>
          </div>

          {/* 카드 그리드 */}
          <div className='grid grid-cols-4 gap-5'>
            {models.map((model) => (
              <div key={model} className='flex flex-col'>
                <div className='h-[200px] rounded-lg bg-[#EDEDED]' />
                <p className='mt-2 truncate text-base text-black'>{model}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};
