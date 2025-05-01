import { memo, useCallback } from 'react';

import useDnDStore from '../../../stores/DnDStore';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { Node } from '@xyflow/react';

export interface CategoryNodeItemData {
  name: string;
  value: string;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

function CategoryItemNode({ id, data, selected }: NodeProps<Node<CategoryNodeItemData>>) {
  const { setDraggedItem, draggedItem } = useDnDStore();
  const { setNodes, getNodes } = useReactFlow();
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

  const handleFieldChange = useCallback(
    (field: 'name' | 'value', e: React.ChangeEvent<HTMLInputElement>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                [field]: e.target.value,
              },
            };
          }
          return node;
        }),
      );
    },
    [id],
  );

  return (
    <div
      className='nodrag flex w-[220px] flex-col rounded border border-gray-300 bg-white p-3 shadow-sm'
      draggable
      onDragStart={handleDragStart}
    >
      {draggedItem && <p>{draggedItem.name} is being dragged</p>}
      <input
        type='text'
        value={data.name}
        onChange={(e) => handleFieldChange('name', e)}
        className='mb-2 w-full rounded border border-gray-300 p-1 font-medium text-gray-700'
      />
      <input
        type='text'
        value={data.value}
        onChange={(e) => handleFieldChange('value', e)}
        className='w-full rounded border border-gray-300 p-1 text-sm'
      />
    </div>
  );
}

export default memo(CategoryItemNode);
