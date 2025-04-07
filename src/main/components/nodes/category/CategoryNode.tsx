import { useCallback, useState } from 'react';

import useDnDStore from '@/main/stores/DnDStore';

import { useReactFlow, Handle, Position } from '@xyflow/react';

export interface CategoryItemData {
  id: string;
  name: string;
  value: string;
  parentId: string | null;
}

interface CategoryNodeData {
  categories: CategoryItemData[];
}

export function CategoryNode({
  id,
  data,
  isConnectable,
}: {
  id: string;
  data: CategoryNodeData;
  isConnectable: boolean;
}) {
  const { setNodes, getNodes } = useReactFlow();
  const { setNodeType } = useDnDStore();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    item: CategoryItemData,
  ): void => {
    setNodeType?.(nodeType);

    event.dataTransfer.effectAllowed = 'move';

    event.dataTransfer.setData('application/reactflow-item', JSON.stringify(item));
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
      const updatedCategories = data.categories.map((cat) =>
        cat.id === itemId ? { ...cat, value: e.target.value } : cat,
      );
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: { categories: updatedCategories },
            };
          }
          return node;
        }),
      );
    },
    [data.categories, id, setNodes],
  );

  return (
    <div
      className='group flex w-[245px] flex-col rounded-md border-2 border-[#808080] bg-[#E3E3E3]'
      style={{ height: `${280 + data.categories.length * 40}px` }}
      data-id={id}
    >
      <div className='m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm'>
        <div className='font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]'></div>
        <Handle
          className='bg-pipy-blue h-[30px] w-[8px] -translate-y-[57px] translate-x-[8px] rounded-none border-none'
          type='source'
          position={Position.Right}
          id='right'
          isConnectable={isConnectable}
        />
      </div>

      <div className='overflow-y-auto p-2'>
        {data.categories.map((item) => (
          <div
            key={item.id}
            className='nodrag mb-2 flex w-full cursor-move flex-col rounded border border-gray-300 bg-white p-3 shadow-sm hover:border-gray-500 hover:bg-gray-100'
            draggable
            onDragStart={(e) => onDragStart(e, 'categoryItem', item)}
          >
            <div className='mb-2 font-medium text-gray-700'>{item.name}</div>
            <input
              className='nodrag w-full rounded border border-gray-300 p-1 text-sm'
              value={item.value}
              onChange={(e) => handleInputChange(e, item.id)}
            ></input>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryNode;
