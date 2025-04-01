import { Baseline, FunnelPlus, Play } from 'lucide-react';

import { useReactFlow } from '@xyflow/react';

export function TextNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; text?: string };
}) {
  const { updateNodeData } = useReactFlow();

  return (
    <div className={`rounded-md bg-[#FFFFFF] flex flex-col `}>
      <div className={`w-[235px] h-[30px] flex flex-row m-[5px] mb-0 place-items-end`}>
        <div
          className={`w-[28px] h-[28px] rounded-sm border-2 border-[#3A7DE8] self-center flex flex-col justify-center`}
        >
          <Baseline size='18' strokeWidth='2.5' className={`self-center text-[#3A7DE8] `} />
        </div>
        <div
          className={`h-[28px] w-[180px] text-[#000000] font-[Noto Sans] font-semibold text-left text-[16px] ml-2 pt-0.5`}
        >
          {data.model}
        </div>
        <Play strokeWidth='3' className={`size-15px self-center place-self-end text-[#C9DCF9]`} />
      </div>
      <div
        className={`p-[5px] w-[235px] h-[150px] m-[5px] rounded-sm bg-[#C9DCF9] flex flex-col items-stretch`}
      >
        <textarea
          className={`w-[215px] h-[100px] resize-none bg-transparent m-[5px] focus-visible:outline-none placeholder-[#808080] `}
          onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
          placeholder='텍스트를 입력해 주세요'
          value={data.text ? data.text : undefined}
        />
        <button
          className={`w-[225px] h-[35px] rounded-sm flex flex-row items-center place-content-center bg-[#808080] self-end`}
        >
          <FunnelPlus size='20' className={`size-[20px] text-[#FFFFFF]`} />
          <div className={`text-[#FFFFFF] ml-1`}>카테고리로 변환</div>
        </button>
      </div>
    </div>
  );
}

export default TextNodeInput;
