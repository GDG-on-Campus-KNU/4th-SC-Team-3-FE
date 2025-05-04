import { memo, useCallback, useRef, useEffect } from 'react';

import useDnDStore from '../../../stores/DnDStore';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { Node } from '@xyflow/react';

export interface CategoryNodeItemData {
  name: string;
  value: string;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
  width?: number;
  height?: number;
}

function CategoryItemNode({ id, data, selected }: NodeProps<Node<CategoryNodeItemData>>) {
  const ref = useRef<HTMLDivElement>(null);
  const { setDraggedItem, draggedItem } = useDnDStore();
  const { setNodes, getNodes } = useReactFlow();

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

  useEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, width, height } } : n)),
    );
  }, [id, setNodes]);

  return (
    <div
      ref={ref}
      className='flex w-[220px] flex-col rounded border border-gray-300 bg-white p-3 shadow-sm'
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
