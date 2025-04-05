import React, { memo } from 'react';

import { X } from 'lucide-react';

import useSelectedObjectStore from '../../../stores/selectObjectStore';
import TextNodeInput from './TextNodeInput';
import { Position, Handle, type NodeProps, type Node, useReactFlow } from '@xyflow/react';

export function TextNodeWrapper({
  id,
  data,
  type,
  isConnectable,
}: NodeProps<Node<{ model: string; value: string | undefined }>>) {
  const { setNodes } = useReactFlow();
  const { setEdges } = useReactFlow();
  const { selectedId } = useSelectedObjectStore();

  return (
    <div className={`w-[245px] h-[195px] rounded-md bg-[#FFFFFF] flex flex-col`}>
      <TextNodeInput id={id} data={data} />
      {selectedId === id && (
        <div className='absolute top-0 right-0 translate-x-[10px] translate-y-[-10px] z-10'>
          <button
            className='w-[26px] h-[26px] rounded-full bg-[#E65429] flex justify-center items-center'
            onClick={() => {
              setNodes((nds) => nds.filter((node) => node.id !== id));
              setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
            }}
          >
            <X className='text-white' size={20} />
          </button>
        </div>
      )}
      <Handle
        className={`w-[8px] h-[30px] rounded-none border-none bg-[#3A7DE8] translate-x-[8px] -translate-y-[57px]`}
        type='source'
        position={Position.Right}
        id='right'
        isConnectable={isConnectable}
      />
      <Handle
        className={`w-[8px] h-[30px] rounded-none border-none bg-[#3A7DE8] -translate-x-[8px] -translate-y-[57px]`}
        type='target'
        position={Position.Left}
        id='left'
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default memo(TextNodeWrapper);
