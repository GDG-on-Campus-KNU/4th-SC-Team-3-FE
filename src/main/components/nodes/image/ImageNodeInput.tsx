import { useCallback, useState } from 'react';

import { Image, Play, FilePlus } from 'lucide-react';

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

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.match('image.*')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
        updateNodeData(id, { ...data, value: result });
      };
      reader.readAsDataURL(file);
    },
    [id, data, updateNodeData],
  );

  const triggerFileInput = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (event) =>
        handleImageUpload(event as unknown as React.ChangeEvent<HTMLInputElement>);
      fileInput.click();
    },
    [handleImageUpload],
  );

  return (
    <div
      className={`group flex flex-col rounded-md border border-transparent bg-[#FFFFFF] transition-all duration-300 hover:border-[#FFDD8E]/50 hover:shadow-lg`}
    >
      <div className={`m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm`}>
        <div
          className={`border-pipy-yellow flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2`}
        >
          <Image size='18' strokeWidth='2.5' className={`text-pipy-yellow self-center`} />
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
        onClick={triggerFileInput}
        style={{ cursor: 'pointer' }}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt='Uploaded preview'
              className='h-full w-full object-contain transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              <FilePlus
                size='44'
                className={`text-white/90 transition-all duration-300 hover:scale-110 hover:text-white`}
              />
            </div>
          </>
        ) : (
          <div className='relative h-full w-full'>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <FilePlus
                size='44'
                className={`mb-1 self-center text-[#FFDD8E] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:text-[#FFC845]`}
              />
              <span
                className={`self-center text-[#808080] transition-all duration-300 group-hover:font-medium group-hover:text-[#666666]`}
              >
                파일 가져오기
              </span>
            </div>
            <div
              className={`absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFDD8E]/20 transition-all duration-700 group-hover:h-[200px] group-hover:w-[200px]`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageNodeInput;
