import { useCallback, useState, useEffect, useRef } from 'react';

import { X } from 'lucide-react';

import useDnDStore from '@/main/stores/DnDStore';
import useSelectedObjectStore from '@/main/stores/selectObjectStore';

import Funnel from '@/assets/main/icon-funnel.svg';
import { useReactFlow, Handle, Position, useStore } from '@xyflow/react';

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
  const { selectedId } = useSelectedObjectStore();
  const { setEdges } = useReactFlow();

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const nodePosition = useStore((store) => {
    const node = store.nodeLookup.get(id);
    return node?.position;
  });

  useEffect(() => {
    const updateBounds = () => {
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
    };

    updateBounds();
    // ResizeObserver를 사용하여 크기 변화 감지
    const observer = new ResizeObserver(updateBounds);
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    const positionObserver = setInterval(updateBounds, 100);

    return () => {
      observer.disconnect();
      clearInterval(positionObserver);
    };
  }, [id, setNodes, nodePosition]);

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
      className={`group w-[245px] flex-col justify-start overflow-y-auto overflow-x-hidden rounded-md border-2 bg-[#E3E3E3] transition-all duration-200 ease-in-out ${
        data.isHover
          ? 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.5)]'
          : 'border-[#808080] shadow-md'
      }`}
      style={{ height: `${80 + data.categories.length * 80}px` }}
      data-id={id}
    >
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
      <div className='m-[5px] mb-0 flex h-[30px] w-[235px] flex-row rounded-t-sm'>
        <div className='font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]'></div>
        <Handle
          className={`top-0 h-[30px] w-[8px] translate-x-[8px] translate-y-[45px] rounded-none border-none bg-pipy-blue opacity-100`}
          type='source'
          position={Position.Right}
          id='text-right'
          style={{ translate: '0px 0px' }}
          isConnectable={true}
          isConnectableStart={true}
          isConnectableEnd={false}
        />
      </div>

      <div className='p-2'>
        {data.categories.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, 'categoryItem', item)}
            className='nodrag relative mb-4 flex w-[220px] flex-col rounded border border-transparent bg-white p-1 shadow-md transition-all duration-300 hover:border-[#C9DCF9]/50 hover:shadow-lg'
          >
            <div className='absolute -top-2 left-0 h-3 w-[110px] rounded-sm bg-white'></div>
            <div className='mb-[6px] flex items-center gap-1'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-[#3A7DE8]'>
                <img src={Funnel} alt='funnel' className='nodrag h-4 w-4 object-contain' />
              </div>
              <input
                type='text'
                value={item.name}
                onChange={(e) => handleCategoryChange(item.id, 'name', e.target.value)}
                className='w-full rounded pl-1 font-medium text-gray-700'
              />
            </div>
            <input
              type='text'
              value={item.value}
              onChange={(e) => handleCategoryChange(item.id, 'value', e.target.value)}
              className='w-full rounded border border-gray-300 bg-[#C9DCF9] p-1 text-sm text-[#5B5B5B]'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryNode;
