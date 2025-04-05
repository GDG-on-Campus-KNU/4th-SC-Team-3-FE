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

  return (
    <div className={`flex flex-col rounded-md bg-[#FFFFFF]`}>
      <div className={`m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end`}>
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
      <div
        className={`m-[5px] flex h-[150px] w-[235px] flex-col justify-center rounded-sm bg-[#FFF1D1] p-[5px]`}
      >
        <FilePlus size='44' className={`mb-1 self-center text-[#FFDD8E]`} />
        <span className={`self-center text-[#808080]`}>파일 가져오기</span>
      </div>
    </div>
  );
}

export default ImageNodeInput;
