import { useCallback, useState, useEffect, useRef } from 'react';

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
  isHover: boolean;
  bounds?: { left: number; top: number; right: number; bottom: number };
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { setNodes, getNodes } = useReactFlow();
  const { setNodeType, draggedItem } = useDnDStore();

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                bounds: {
                  left: r.left,
                  top: r.top,
                  right: r.right,
                  bottom: r.bottom,
                },
              },
            }
          : n,
      ),
    );
  }, [data.categories.length, setNodes, id]);

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    item: CategoryItemData,
  ): void => {
    setNodeType?.(nodeType);

    event.dataTransfer.effectAllowed = 'move';

    event.dataTransfer.setData('application/reactflow-item', JSON.stringify(item));
  };

  // categories 0 되면 삭제
  useEffect(() => {
    if (data.categories.length === 0) {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    }
  }, [data.categories, id, setNodes]);

  const handleCategoryChange = useCallback(
    (itemId: string, field: 'name' | 'value', newValue: string) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id !== id) return node;
          // 이 노드 안의 categories 배열만 업데이트
          const newCategories = (node.data as unknown as CategoryNodeData).categories.map((cat) =>
            cat.id === itemId ? { ...cat, [field]: newValue } : cat,
          );
          return {
            ...node,
            data: {
              ...node.data,
              categories: newCategories,
            },
          };
        }),
      );
    },
    [setNodes, id],
  );

  return (
    <div
      ref={wrapperRef}
      className={`group flex w-[245px] flex-col rounded-md border-2 ${data.isHover ? 'border-blue-500' : 'border-[#808080]'}`}
      style={{ height: `${280 + data.categories.length * 40}px` }}
      data-id={id}
    >
      <div className='m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm'>
        <div className='font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]'></div>
        <Handle
          className='h-[30px] w-[8px] -translate-y-[57px] translate-x-[8px] rounded-none border-none bg-pipy-blue'
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
            <input
              type='text'
              value={item.name}
              onChange={(e) => handleCategoryChange(item.id, 'name', e.target.value)}
              className='mb-2 w-full rounded border border-gray-300 p-1 font-medium text-gray-700'
            />
            <input
              className='nodrag w-full rounded border border-gray-300 p-1 text-sm'
              value={item.value}
              onChange={(e) => handleCategoryChange(item.id, 'value', e.target.value)}
            ></input>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryNode;
