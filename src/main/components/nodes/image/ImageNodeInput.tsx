import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

import { Image, Play, Expand } from 'lucide-react';

import ImageExpandModal from '@/main/components/ImageExpandModal';

import { useImageGeneration } from '../../../hooks/useImageGeneration';
import testImg from '@/assets/main/img-test.png';
import pipeSpinner from '@/assets/main/spinner-pipe.gif';
import { Dialog, Transition } from '@headlessui/react';

export function ImageNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; value?: string };
}) {
  const { imageUrl, isLoading, hasLeftConnection, generateImage } = useImageGeneration(id);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isResultOpen, setResultOpen] = useState(false);

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
          onClick={() => {
            generateImage();
          }}
          disabled={!hasLeftConnection}
          title={hasLeftConnection ? 'execute' : 'A left node must be connected to execute.'}
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

      <div
        className='relative m-[5px] flex h-[150px] w-[235px] flex-col justify-center overflow-hidden rounded-sm bg-[#FFF1D1] p-[5px] transition-all duration-300 group-hover:shadow-inner'
        style={{ cursor: 'pointer' }}
      >
        {imageUrl || data.value ? (
          <>
            <img
              src={imageUrl ? imageUrl : data.value}
              alt='uploaded image'
              className='absolute inset-0 h-[150px] w-[235px] rounded-sm object-cover transition-all duration-300 group-hover:shadow-inner'
              onError={(e) => {
                (e.target as HTMLImageElement).src = testImg;
              }}
            />
            <button
              className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 hover:bg-black/70 group-hover:opacity-100'
              title='see original size'
              onClick={() => setModalOpen(true)}
            >
              <Expand size={16} />
            </button>
          </>
        ) : (
          <div className='flex h-full w-full items-center justify-center'></div>
        )}
        {isLoading && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50'>
            <img src={pipeSpinner} alt='loading...' className='h-10 w-10' />
            <p className='text-white'>Loading...</p>
          </div>
        )}
        <button
          className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 hover:bg-black/70 group-hover:opacity-100'
          title='see original size'
          onClick={() => setModalOpen(true)}
        >
          <Expand size={16} />
        </button>
      </div>

      {isModalOpen && (imageUrl || data.value) && (
        <ImageExpandModal url={data.value || imageUrl || ''} onClose={() => setModalOpen(false)} />
      )}

      <Transition appear show={isResultOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-50' onClose={() => setResultOpen(false)}>
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
              <Dialog.Panel className='overflow-hidden rounded-lg border-8 border-white bg-white shadow-lg'>
                <img src={imageUrl ?? undefined} className='max-h-[80vh] max-w-full' />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ImageNodeInput;
