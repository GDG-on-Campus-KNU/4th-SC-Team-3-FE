import { memo, useCallback, useRef, useEffect } from 'react';

import Funnel from '@/assets/main/icon-funnel.svg';
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
  const { setNodes } = useReactFlow();

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
      className='relative flex w-[220px] flex-col rounded border border-transparent bg-white p-1 shadow-md transition-all duration-300 hover:border-[#C9DCF9]/50 hover:shadow-lg'
    >
      <div className='absolute -top-2 left-0 h-3 w-[110px] rounded-sm bg-white'></div>
      <div className='mb-[6px] flex items-center gap-1'>
        <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-[#3A7DE8]'>
          <img src={Funnel} alt='funnel' className='h-4 w-4 object-contain' />
        </div>
        <input
          type='text'
          value={data.name}
          onChange={(e) => handleFieldChange('name', e)}
          className='w-full rounded pl-1 font-medium text-gray-700'
        />
      </div>
      <input
        type='text'
        value={data.value}
        onChange={(e) => handleFieldChange('value', e)}
        className='w-full rounded border border-gray-300 bg-[#C9DCF9] p-1 text-sm text-[#5B5B5B]'
      />
    </div>
  );
}

export default memo(CategoryItemNode);
