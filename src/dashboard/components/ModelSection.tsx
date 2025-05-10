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
import { useToast } from '@/global/hooks/use-toast';

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
      {
        name: 'Gemini 1.5 Pro',
        thumbnail: ImgGemini,
        url: 'https://ai.google/get-started/gemini-ecosystem/',
      },
      { name: 'Claude 3 Opus', thumbnail: ImgClaude, url: 'https://www.anthropic.com/' },
      { name: 'GPT-4o Turbo', thumbnail: ImgGpt4o, url: 'https://openai.com/chatgpt/overview/' },
      { name: 'Llama 3 70B', thumbnail: ImgLlama, url: 'https://www.llama.com/' },
      { name: 'Mistral Large', thumbnail: ImgMistral, url: 'https://mistral.ai/models' },
    ],
  },
  {
    key: 'image',
    label: '이미지 중심 AI 모델',
    color: '#EAAF1E',
    models: [
      {
        name: 'gemini-2.0-flash',
        thumbnail: ImgGemini2,
        url: 'https://ai.google/get-started/gemini-ecosystem/',
      },
      { name: 'DALL·E 3', thumbnail: ImgDalle, url: 'https://openai.com/chatgpt/overview/' },
      { name: 'Stable Diffusion XL', thumbnail: ImgStableDiffusion, url: 'https://stability.ai/' },
      {
        name: 'Adobe Firefly',
        thumbnail: ImgAdobe,
        url: 'https://www.adobe.com/products/firefly.html',
      },
      {
        name: 'Midjourney v6',
        thumbnail: ImgMidjourney,
        url: 'https://www.midjourney.com/explore?tab=top',
      },
    ],
  },
  {
    key: 'video',
    label: '비디오 중심 AI 모델',
    color: '#EF9EE1',
    models: [
      { name: 'Runway ML', thumbnail: ImgRunway, url: 'https://runwayml.com' },
      { name: 'Synthesia', thumbnail: ImgSynthesia, url: 'https://www.synthesia.io' },
      { name: 'SkyReels', thumbnail: ImgSkyReels, url: 'https://www.skyreels.ai/home' },
      { name: 'Descript', thumbnail: ImgDescript, url: 'https://www.descript.com/' },
      { name: 'Kaiber', thumbnail: ImgKaiber, url: 'https://www.kaiber.ai/superstudio' },
    ],
  },
  {
    key: 'audio',
    label: '오디오 중심 AI 모델',
    color: '#337758',
    models: [
      { name: 'ElevenLabs', thumbnail: ImgElevenLabs, url: 'https://elevenlabs.io/' },
      { name: 'Murf AI', thumbnail: ImgMurf, url: 'https://murf.ai/' },
      { name: 'Resemble AI', thumbnail: ImgResemble, url: 'https://www.resemble.ai/' },
      { name: 'Play.ht', thumbnail: ImgPlay, url: 'https://play.ht/' },
      {
        name: 'Sonantic',
        thumbnail: ImgSonantic,
        url: 'https://newsroom.spotify.com/2022-06-13/spotify-to-acquire-sonantic-an-ai-voice-platform/',
      },
    ],
  },
];

export const ModelSection = () => {
  const { toast } = useToast();
  const handleExpandClick = () => {
    toast({
      variant: 'info',
      duration: 2000,
      title: '준비 중입니다✨',
      description: '해당 기능은 현재 준비 중입니다.',
    });
  };
  return (
    <>
      {SECTION_CONFIGS.map(({ key, label, color, models }) => (
        <section key={key} className='mt-14'>
          {/* 헤더 */}
          <div className='mb-5 flex items-center justify-between'>
            <h1 className='text-2xl font-bold tracking-wide text-[#505050]'>
              <span style={{ color }}>{label}</span> 구경하기
            </h1>
            <button className='cursor-pointer text-[#808080]' onClick={handleExpandClick}>
              + 더보기
            </button>
          </div>

          {/* 카드 그리드 */}
          <div className='grid grid-cols-4 gap-5'>
            {models.map(({ name, thumbnail, url }) => (
              <a
                key={name}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex flex-col'
              >
                {/* 썸네일 */}
                <img
                  src={thumbnail}
                  alt={name}
                  className='h-[200px] rounded-lg transition-transform duration-300 group-hover:scale-105'
                />
                {/* 이름 */}
                <p className='mt-2 truncate text-base text-black'>{name}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};
