import { useCallback, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { ScaleLoader } from 'react-spinners';

import { Image, Play, FilePlus, Expand } from 'lucide-react';

import ImageExpandModal from '@/main/components/ImageExpandModal';

import testImg from '@/assets/main/img-test.png';
import pipeSpinner from '@/assets/main/spinner-pipe.gif';
import { Dialog, Transition } from '@headlessui/react';
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
  const [isResultOpen, setResultOpen] = useState(false);
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
      setResultOpen(true);
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
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
            <img src={pipeSpinner} alt='로딩중...' className='h-24 w-24' />
          </div>
        )}
        <button
          className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 hover:bg-black/70 group-hover:opacity-100'
          title='원본 크기로 보기'
          onClick={() => setModalOpen(true)}
        >
          <Expand size={16} />
        </button>
      </div>
      {isModalOpen && (imageUrl || testImg) && (
        <ImageExpandModal url={testImg} onClose={() => setModalOpen(false)} />
      )}
      <Transition appear show={isResultOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-50' onClose={() => setResultOpen(false)}>
          {/* 백드롭 */}
          <div className='fixed inset-0 bg-black/50' />

          <div className='fixed inset-0 flex items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-out duration-200 transform'
              enterFrom='scale-75 opacity-0'
              enterTo='scale-100 opacity-100'
              leave='transition ease-in duration-150 transform'
              leaveFrom='scale-100 opacity-100'
              leaveTo='scale-75 opacity-0'
            >
              <Dialog.Panel className='overflow-hidden rounded-lg bg-white'>
                <img src={testImg} className='max-h-[80vh] max-w-full' />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ImageNodeInput;
