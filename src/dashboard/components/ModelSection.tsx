import React from 'react';

import ImgElevenLabs from '@/assets/dashboard/thumbnail/audio/img-elevenlabs.png';
import ImgMurf from '@/assets/dashboard/thumbnail/audio/img-murf.png';
import ImgPlay from '@/assets/dashboard/thumbnail/audio/img-play.png';
import ImgResemble from '@/assets/dashboard/thumbnail/audio/img-resemble.png';
import ImgSonantic from '@/assets/dashboard/thumbnail/audio/img-sonantic.png';
import ImgAdobe from '@/assets/dashboard/thumbnail/image/img-adobe.png';
import ImgDalle from '@/assets/dashboard/thumbnail/image/img-dale.png';
import ImgGemini2 from '@/assets/dashboard/thumbnail/image/img-gemini.png';
import ImgMidjourney from '@/assets/dashboard/thumbnail/image/img-midjourney.png';
import ImgStableDiffusion from '@/assets/dashboard/thumbnail/image/img-stable.png';
import ImgClaude from '@/assets/dashboard/thumbnail/text/img-claude.png';
import ImgGemini from '@/assets/dashboard/thumbnail/text/img-gemini.png';
import ImgGpt4o from '@/assets/dashboard/thumbnail/text/img-gpt.png';
import ImgLlama from '@/assets/dashboard/thumbnail/text/img-llama.png';
import ImgMistral from '@/assets/dashboard/thumbnail/text/img-mistral.png';
import ImgDescript from '@/assets/dashboard/thumbnail/video/img-descript.png';
import ImgKaiber from '@/assets/dashboard/thumbnail/video/img-kaiber.png';
import ImgRunway from '@/assets/dashboard/thumbnail/video/img-runway.png';
import ImgSkyReels from '@/assets/dashboard/thumbnail/video/img-skyreels.png';
import ImgSynthesia from '@/assets/dashboard/thumbnail/video/img-synthesia.png';

interface Model {
  name: string;
  thumbnail: string;
  url: string;
}

interface SectionConfig {
  key: string;
  label: string;
  color: string;
  models: Model[];
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    key: 'text',
    label: '텍스트 중심 AI 모델',
    color: '#3A7DE8',
    models: [
      { name: 'Gemini 1.5 Pro', thumbnail: ImgGemini, url: '#' },
      { name: 'Claude 3 Opus', thumbnail: ImgClaude, url: '#' },
      { name: 'GPT-4o Turbo', thumbnail: ImgGpt4o, url: '#' },
      { name: 'Llama 3 70B', thumbnail: ImgLlama, url: '#' },
      { name: 'Mistral Large', thumbnail: ImgMistral, url: '#' },
    ],
  },
  {
    key: 'image',
    label: '이미지 중심 AI 모델',
    color: '#EAAF1E',
    models: [
      { name: 'gemini-2.0-flash', thumbnail: ImgGemini2, url: '#' },
      { name: 'DALL·E 3', thumbnail: ImgDalle, url: '#' },
      { name: 'Stable Diffusion XL', thumbnail: ImgStableDiffusion, url: '#' },
      { name: 'Adobe Firefly', thumbnail: ImgAdobe, url: '#' },
      { name: 'Midjourney v6', thumbnail: ImgMidjourney, url: '#' },
    ],
  },
  {
    key: 'video',
    label: '비디오 중심 AI 모델',
    color: '#EF9EE1',
    models: [
      { name: 'Runway ML', thumbnail: ImgRunway, url: '#' },
      { name: 'Synthesia', thumbnail: ImgSynthesia, url: '#' },
      { name: 'SkyReels', thumbnail: ImgSkyReels, url: '#' },
      { name: 'Descript', thumbnail: ImgDescript, url: '#' },
      { name: 'Kaiber', thumbnail: ImgKaiber, url: '#' },
    ],
  },
  {
    key: 'audio',
    label: '오디오 중심 AI 모델',
    color: '#337758',
    models: [
      { name: 'ElevenLabs', thumbnail: ImgElevenLabs, url: '#' },
      { name: 'Murf AI', thumbnail: ImgMurf, url: '#' },
      { name: 'Resemble AI', thumbnail: ImgResemble, url: '#' },
      { name: 'Play.ht', thumbnail: ImgPlay, url: '#' },
      { name: 'Sonantic', thumbnail: ImgSonantic, url: '#' },
    ],
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
              <div key={model.name} className='flex flex-col'>
                <img src={model.thumbnail} alt={model.name} className='h-[200px] rounded-lg' />
                <p className='mt-2 truncate text-base text-black'>{model.name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};
