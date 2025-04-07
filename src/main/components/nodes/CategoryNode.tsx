import { useCallback, useState } from 'react';

import { Image, Play, FilePlus } from 'lucide-react';

import { useReactFlow, Handle, Position } from '@xyflow/react';

export function CategoryNode({
  id,
  data,
  isConnectable,
}: {
  id: string;
  data: { model: string; value?: string };
  isConnectable: boolean;
}) {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      className={`group flex flex-col rounded-md border border-transparent bg-[#FFFFFF] transition-all duration-300 hover:border-[#FFDD8E]/50 hover:shadow-lg`}
    >
      <div className={`m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm`}>
        <div
          className={`font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]`}
        ></div>
        <Handle
          className={`bg-pipy-yellow h-[30px] w-[8px] -translate-y-[57px] translate-x-[8px] rounded-none border-none`}
          type='source'
          position={Position.Right}
          id='right'
          isConnectable={isConnectable}
        />
        <Handle
          className={`bg-pipy-yellow h-[30px] w-[8px] -translate-x-[8px] -translate-y-[57px] rounded-none border-none`}
          type='target'
          position={Position.Left}
          id='left'
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}

export default CategoryNode;
