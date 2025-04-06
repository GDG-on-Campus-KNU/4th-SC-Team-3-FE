import { useState, useRef, useEffect } from 'react';

import { useReactFlow, NodeProps, useUpdateNodeInternals } from '@xyflow/react';

export function CategoryNode({
  id,
  data,
  isConnectable,
}: NodeProps<{
  model: string;
  categories: Array<{ name: string; value: string }>;
}>) {
  const { updateNodeData } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(200);

  // 카테고리 값 변경 핸들러
  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...data.categories];
    newCategories[index].value = value;
    updateNodeData(id, { ...data, categories: newCategories });
  };

  // 드래그 앤 드롭 로직
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    handleCategoryChange(index, item);
  };

  // 동적 높이 조정
  useEffect(() => {
    if (containerRef.current) {
      const height = Math.min(
        Math.max(data.categories.length * 50 + 50, 200), // 최소 200px, 항목당 50px
        500, // 최대 500px
      );
      setContainerHeight(height);
      updateNodeInternals(id);
    }
  }, [data.categories.length, id, updateNodeInternals]);

  return (
    <div
      ref={containerRef}
      className='rounded-md bg-white p-4 shadow-lg'
      style={{ height: `${containerHeight}px`, minHeight: '200px', maxHeight: '500px' }}
    >
      <div className='mb-4 font-semibold'>{data.model}</div>

      <div className='space-y-2 overflow-y-auto' style={{ maxHeight: `${containerHeight - 50}px` }}>
        {data.categories.map((category, index) => (
          <div
            key={index}
            className='flex items-center rounded border p-2'
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', category.value)}
          >
            <span className='mr-2 w-24 font-medium'>{category.name}</span>
            <input
              type='text'
              value={category.value}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
              className='flex-1 rounded border p-1'
              placeholder='값 입력'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryNode;
