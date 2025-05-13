import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FilePlus, Image, Expand } from 'lucide-react';

import ImageExpandModal from '@/main/components/ImageExpandModal';

import { NodeProps, useReactFlow } from '@xyflow/react';

export function ImageUploadNodeInput({ id, data }: { id: string; data: { value?: string } }) {
  const { updateNodeData } = useReactFlow();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setImageUrl(url);
        // node 데이터의 value 필드만 업데이트
        updateNodeData(id, { value: url });
      };
      reader.readAsDataURL(file);
    },
    [id, updateNodeData],
  );

  const triggerFileInput = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (evt) =>
        handleImageUpload(evt as unknown as React.ChangeEvent<HTMLInputElement>);
      input.click();
    },
    [handleImageUpload],
  );

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
      </div>

      {/* 이미지 업로드 */}
      <div
        className={`relative m-[5px] flex h-[150px] w-[235px] flex-col justify-center overflow-hidden rounded-sm bg-[#FFF1D1] p-[5px] transition-all duration-300 group-hover:shadow-inner`}
        style={{ cursor: 'pointer' }}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt='Uploaded preview'
              className='h-full w-full object-contain transition-transform duration-700 group-hover:scale-105'
            />
            <button
              onClick={() => setModalOpen(true)}
              className='absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-200 hover:bg-black/70 group-hover:opacity-100'
              title='See original size'
            >
              <Expand size={16} />
            </button>
            <div
              onClick={triggerFileInput}
              className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
            >
              <FilePlus
                size='44'
                className={`text-white/90 transition-all duration-300 hover:scale-110 hover:text-white`}
              />
            </div>
          </>
        ) : (
          <div onClick={triggerFileInput} className='relative h-full w-full'>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <FilePlus
                size='44'
                className={`mb-1 self-center text-[#FFDD8E] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:text-[#FFC845]`}
              />
              <span
                className={`self-center text-[#808080] transition-all duration-300 group-hover:font-medium group-hover:text-[#666666]`}
              >
                {t('node.imagePlaceholder')}
              </span>
            </div>
            <div
              className={`absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFDD8E]/20 transition-all duration-700 group-hover:h-[200px] group-hover:w-[200px]`}
            />
          </div>
        )}
      </div>
      {isModalOpen && imageUrl && (
        <ImageExpandModal url={imageUrl} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export default ImageUploadNodeInput;
