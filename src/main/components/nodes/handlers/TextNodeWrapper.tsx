import { memo } from 'react';

import TextNodeInput from '../inputs/TextNodeInput';
import { Position, Handle, type NodeProps, type Node } from '@xyflow/react';

export function TextNodeWrapper({
  id,
  data,
  type,
  isConnectable,
}: NodeProps<Node<{ model: string; text: string | undefined }>>) {
  return (
    <div className={`w-[245px] h-[195px] rounded-md bg-[#FFFFFF] flex flex-col`}>
      <TextNodeInput id={id} data={data} />
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
