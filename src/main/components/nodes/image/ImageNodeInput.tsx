import { Baseline, FunnelPlus, Play } from 'lucide-react';

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
          className={`flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2 border-[#3A7DE8]`}
        >
          <Baseline size='18' strokeWidth='2.5' className={`self-center text-[#3A7DE8]`} />
        </div>
        <div
          className={`font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]`}
        >
          {data.model}
        </div>
        <Play strokeWidth='3' className={`size-15px place-self-end self-center text-[#C9DCF9]`} />
      </div>
      <div
        className={`m-[5px] flex h-[150px] w-[235px] flex-col items-stretch rounded-sm bg-[#C9DCF9] p-[5px]`}
      >
        <textarea
          className={`m-[5px] h-[100px] w-[215px] resize-none bg-transparent placeholder-[#808080] focus-visible:outline-none`}
          onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
          placeholder='텍스트를 입력해 주세요'
          value={data.value ? data.value : undefined}
        />
      </div>
    </div>
  );
}

export default ImageNodeInput;
