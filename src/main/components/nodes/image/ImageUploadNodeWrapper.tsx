import { memo } from 'react';

import { X } from 'lucide-react';

import useSelectedObjectStore from '@/main/stores/selectObjectStore';

import ImageUploadNodeInput from './ImageUploadNodeInput';
import { Position, Handle, useReactFlow, type NodeProps, type Node } from '@xyflow/react';

function ImageUploadNode({
  id,
  data,
  isConnectable,
}: NodeProps<Node<{ model: string; value: string | undefined }>>) {
  const { setNodes } = useReactFlow();
  const { setEdges } = useReactFlow();
  const { selectedId } = useSelectedObjectStore();

  return (
    <div className={`flex h-[195px] w-[245px] flex-col rounded-md bg-[#FFFFFF]`}>
      <ImageUploadNodeInput id={id} data={data} />
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
        className={`h-[30px] w-[8px] -translate-y-[57px] translate-x-[8px] rounded-none border-none bg-pipy-yellow opacity-100`}
        type='source'
        position={Position.Right}
        id='image-right'
        isConnectable={true}
        isConnectableStart={true}
        isConnectableEnd={false}
      />
    </div>
  );
}

export default memo(ImageUploadNode);
