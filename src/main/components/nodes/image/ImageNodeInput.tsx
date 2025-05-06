import { useCallback, useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';

import { Image, Play, FilePlus, Expand } from 'lucide-react';

import ImageExpandModal from '@/main/components/ImageExpandModal';

import testImg from '@/assets/main/img-test.png';
import { useStore, useReactFlow } from '@xyflow/react';

export function ImageNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; value?: string };
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(data.value || null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLeftConnection, setHasLeftConnection] = useState(false);

  // 왼쪽 handle (targetHandle === 'left')에 연결된 엣지가 있는지 확인

  const edges = useStore((state) => state.edges);

  useEffect(() => {
    const hasLeft = edges.some(
      (edge) =>
        edge.target === id &&
        (edge.targetHandle === 'text-left' || edge.targetHandle === 'image-left'),
    );
    setHasLeftConnection(hasLeft);
  }, [edges, id]);

  const onPlayClick = useCallback(() => {
    if (!hasLeftConnection) return;

    // TODO: 실행 로직
    console.log('▶ play!');
    setIsLoading(true);
    setTimeout(() => {
      setImageUrl('https://example.com/new-image.png'); // 예시 URL
      setIsLoading(false);
    }, 2000); // 2초 후에 이미지 URL 변경
  }, [hasLeftConnection]);

  return (
    <div
      className={`group flex flex-col rounded-md border border-transparent bg-[#FFFFFF] transition-all duration-300 hover:border-[#FFDD8E]/50 hover:shadow-lg`}
    >
      <div className='m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm'>
        <div className='flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2 border-pipy-yellow'>
          <Image size='18' strokeWidth='2.5' className='self-center text-pipy-yellow' />
        </div>
        <div className='font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]'>
          {data.model}
        </div>
        <button
          onClick={onPlayClick}
          disabled={!hasLeftConnection}
          title={hasLeftConnection ? '실행' : '왼쪽 노드가 연결되어야 실행할 수 있습니다'}
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
            hasLeftConnection
              ? 'cursor-pointer text-[#0a0702] hover:scale-125 hover:text-[#FFC845]'
              : 'pointer-events-none cursor-not-allowed text-gray-300'
          } `}
        >
          {isLoading ? (
            <ScaleLoader
              color='#FFC845'
              className='absolute mr-4'
              loading={isLoading}
              height={16}
              width={2}
            />
          ) : (
            <Play
              strokeWidth='3'
              className={`size-15px place-self-end self-center text-[#FFDD8E] ${hasLeftConnection ? 'hover:text-pipy-yellow' : 'hover:text-[#FFDD8E]'} `}
            />
          )}
        </button>
      </div>

      {/* 이미지 업로드 */}
      <div
        className='relative m-[5px] flex h-[150px] w-[235px] flex-col justify-center overflow-hidden rounded-sm bg-[#FFF1D1] p-[5px] transition-all duration-300 group-hover:shadow-inner'
        style={{ cursor: 'pointer' }}
      >
        <img
          src={imageUrl || testImg}
          alt='업로드된 이미지'
          className='h-[150px] w-[235px] rounded-sm object-cover transition-all duration-300 group-hover:shadow-inner'
          onError={(e) => {
            (e.target as HTMLImageElement).src = testImg;
          }}
        />
        <button
          className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 hover:bg-black/70 group-hover:opacity-100'
          title='원본 크기로 보기'
          onClick={() => setModalOpen(true)}
        >
          <Expand size={16} />
        </button>
      </div>
      {isModalOpen && (imageUrl || testImg) && (
        <ImageExpandModal url={imageUrl || testImg} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export default ImageNodeInput;
