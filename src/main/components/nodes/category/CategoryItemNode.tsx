import { memo } from 'react';

import useDnDStore from '../../../stores/DnDStore';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Node } from '@xyflow/react';

export interface CategoryNodeItemData {
  name: string;
  value: string;
}

function CategoryItemNode({ id, data }: NodeProps<CategoryNodeItemData>) {
  const { setDraggedItem, draggedItem } = useDnDStore();
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const item = {
      id,
      name: data.name,
      value: data.value,
      parentId: null,
    };
    setDraggedItem(item);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className='flex w-[220px] flex-col rounded border border-gray-300 bg-white p-3 shadow-sm'
      draggable
      onDragStart={handleDragStart}
    >
      {draggedItem && <p>{draggedItem.name} is being dragged</p>}
      <div className='mb-2 font-medium text-gray-700'>{data.name}</div>
      <div className='w-full rounded border border-gray-300 p-1 text-sm'>{data.value}</div>
    </div>
  );
}

export default memo(CategoryItemNode);
