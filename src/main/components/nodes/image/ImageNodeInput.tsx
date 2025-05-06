import { useCallback, useState } from 'react';

import { Image, Play, FilePlus, Expand } from 'lucide-react';

import ImageExpandModal from '@/main/components/ImageExpandModal';

import testImg from '@/assets/main/img-test.png';
import { useReactFlow } from '@xyflow/react';

export function ImageNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; value?: string };
}) {
  const { updateNodeData } = useReactFlow();
  const [imageUrl, setImageUrl] = useState<string | null>(data.value || null);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`group flex flex-col rounded-md border border-transparent bg-[#FFFFFF] transition-all duration-300 hover:border-[#FFDD8E]/50 hover:shadow-lg`}
    >
      <div className={`m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm`}>
        <div
          className={`flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2 border-pipy-yellow`}
        >
          <Image size='18' strokeWidth='2.5' className={`self-center text-pipy-yellow`} />
        </div>
        <div
          className={`font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]`}
        >
          {data.model}
        </div>
        <Play strokeWidth='3' className={`size-15px place-self-end self-center text-[#FFDD8E]`} />
      </div>

      {/* 이미지 업로드 */}
      <div
        className={`relative m-[5px] flex h-[150px] w-[235px] flex-col justify-center overflow-hidden rounded-sm bg-[#FFF1D1] p-[5px] transition-all duration-300 group-hover:shadow-inner`}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={imageUrl || testImg}
          alt='업로드된 이미지'
          className={`h-[150px] w-[235px] rounded-sm object-cover transition-all duration-300 group-hover:shadow-inner`}
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
