import React, { memo } from 'react';

import { X } from 'lucide-react';

import useSelectedObjectStore from '@/main/stores/selectObjectStore';

import TextNodeInput from './TextNodeInput';
import { Position, Handle, type NodeProps, type Node, useReactFlow } from '@xyflow/react';

export function TextNodeWrapper({
  id,
  data,
  type,
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
        className={`h-[30px] w-[8px] -translate-y-[57px] translate-x-[8px] rounded-none border-none bg-pipy-blue opacity-100`}
        type='source'
        position={Position.Right}
        id='text-right'
        isConnectable={true}
        isConnectableStart={true}
        isConnectableEnd={false}
      />

      <Handle
        className={`h-[30px] w-[8px] -translate-x-[8px] -translate-y-[57px] rounded-none border-none bg-pipy-blue opacity-30`}
        type='target'
        position={Position.Left}
        id='text-left'
        isConnectable={false}
        isConnectableStart={false}
        isConnectableEnd={true}
      />
      <Handle
        className={`h-[30px] w-[8px] -translate-x-[8px] -translate-y-[19px] rounded-none border-none bg-pipy-yellow opacity-30`}
        type='target'
        position={Position.Left}
        id='image-left'
        isConnectable={false}
        isConnectableStart={false}
        isConnectableEnd={true}
      />
      <Handle
        className={`h-[30px] w-[8px] -translate-x-[8px] translate-y-[19px] rounded-none border-none bg-pipy-pink opacity-30`}
        type='target'
        position={Position.Left}
        id='video-left'
        isConnectable={false}
        isConnectableStart={false}
        isConnectableEnd={true}
      />
      <Handle
        className={`h-[30px] w-[8px] -translate-x-[8px] translate-y-[57px] rounded-none border-none bg-pipy-green opacity-30`}
        type='target'
        position={Position.Left}
        id='audio-left'
        isConnectable={false}
        isConnectableStart={false}
        isConnectableEnd={true}
      />
    </div>
  );
}

export default memo(TextNodeWrapper);
