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
      ></div>
    </div>
  );
}

export default ImageNodeInput;
