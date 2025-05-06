import React, { memo } from 'react';

import { X } from 'lucide-react';

import useSelectedObjectStore from '@/main/stores/selectObjectStore';

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
    <div className={`z-10000 flex h-[195px] w-[245px] flex-col rounded-md bg-[#FFFFFF]`}>
      <TextNodeInput id={id} data={data} />
      {selectedId === id && (
        <div className='absolute right-0 top-0 z-10 translate-x-[10px] translate-y-[-10px]'>
          <button
            className='flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#E65429]'
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
        className={`h-[30px] w-[8px] -translate-y-[57px] translate-x-[8px] rounded-none border-none bg-[#3A7DE8]`}
        type='source'
        position={Position.Right}
        id='right'
        isConnectable={isConnectable}
        isConnectableStart={true}
        isConnectableEnd={false}
      />
      <Handle
        className={`h-[30px] w-[8px] -translate-x-[8px] -translate-y-[57px] rounded-none border-none bg-[#3A7DE8]`}
        type='target'
        position={Position.Left}
        id='left'
        isConnectable={isConnectable}
        isConnectableStart={false}
        isConnectableEnd={true}
      />
    </div>
  );
}

export default memo(TextNodeWrapper);
