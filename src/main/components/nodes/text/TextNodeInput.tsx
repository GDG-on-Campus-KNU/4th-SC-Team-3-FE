import { useState, useEffect, useCallback } from 'react';

import { Baseline, FunnelPlus, Play } from 'lucide-react';

import { analyzeTextNode } from '@/main/api/analyzeTextNode';

import { useReactFlow, useStore } from '@xyflow/react';

export function TextNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; value?: string };
}) {
  const mockCategories = [
    { id: `${id}-item-1`, name: 'Category 1', value: 'Value 1', parentId: id },
    { id: `${id}-item-2`, name: 'Category 2', value: 'Value 2', parentId: id },
    { id: `${id}-item-3`, name: 'Category 3', value: 'Value 3', parentId: id },
    { id: `${id}-item-4`, name: 'Category 4', value: 'Value 4', parentId: id },
  ];

  const { setNodes, updateNodeData } = useReactFlow();
  const [isConverting, setIsConverting] = useState(false);

  const edges = useStore((state) => state.edges);
  const [hasRightConnection, setHasRightConnection] = useState(false);

  useEffect(() => {
    const hasRight = edges.some((edge) => edge.source === id && edge.sourceHandle === 'text-right');
    setHasRightConnection(hasRight);
  }, [edges, id]);

  const onPlayClick = useCallback(() => {
    if (!hasRightConnection) return;
    // TODO: 실행 로직
    console.log('▶ play!');
  }, [hasRightConnection]);

  const handleConvertClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConverting(true);

    const categories = (await analyzeTextNode(data.value!)).map((category: any, index: number) => {
      return {
        id: `${id}-item-${index + 1}`,
        name: category.key,
        value: category.value,
        parentId: id,
      };
    });

    console.log('Converted categories:', categories);

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            type: 'category',
            data: {
              categories: categories,
            },
            position: node.position,
          };
        }
        return node;
      }),
    );

    setIsConverting(false);
  };

  const handleTextareaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(id, { value: evt.target.value });
  };

  return (
    <div className='group flex flex-col rounded-md border border-transparent bg-white transition-all duration-300 hover:border-[#C9DCF9]/50 hover:shadow-lg'>
      <div className='m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm'>
        <div className='flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2 border-pipy-blue'>
          <Baseline size='18' strokeWidth='2.5' className='self-center text-pipy-blue' />
        </div>
        <div className='font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]'>
          {data.model}
        </div>
        <button
          onClick={onPlayClick}
          disabled={hasRightConnection}
          title={!hasRightConnection ? '실행' : '왼쪽 노드가 연결되어야 실행할 수 있습니다'}
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
            !hasRightConnection
              ? 'cursor-pointer text-[#0a0702] hover:scale-125'
              : 'pointer-events-none cursor-not-allowed text-gray-300'
          } `}
        >
          <Play
            strokeWidth='3'
            className={`size-15px place-self-end self-center text-[#C9DCF9] ${hasRightConnection ? 'hover:text-[#C9DCF9]' : 'hover:text-pipy-blue'}`}
          />
        </button>
      </div>

      <div className='m-[5px] flex h-[150px] w-[235px] flex-col items-stretch rounded-sm bg-[#C9DCF9] p-[5px] transition-all duration-300'>
        <textarea
          className='m-[5px] h-[100px] w-[215px] resize-none bg-transparent placeholder-[#808080] focus-visible:outline-none group-hover:placeholder-[#666666]'
          onClick={handleTextareaClick}
          onChange={handleTextareaChange}
          placeholder='텍스트를 입력해 주세요'
          value={data.value || ''}
        />

        <button
          onClick={handleConvertClick}
          disabled={isConverting || !mockCategories || hasRightConnection}
          className={`group/btn flex h-[35px] w-[225px] flex-row items-center justify-center self-end rounded-sm transition-all duration-300 ${
            isConverting || !mockCategories || hasRightConnection
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-[#808080] hover:bg-[#3A7DE8] hover:shadow-md'
          }`}
        >
          {isConverting ? (
            <span className='text-white'>변환 중...</span>
          ) : (
            <>
              <FunnelPlus
                size='20'
                className={`size-[20px] text-[#FFFFFF] transition-transform duration-300 ${
                  !isConverting && 'group-hover/btn:rotate-12'
                }`}
              />
              <span
                className={`ml-1 text-[#FFFFFF] transition-all duration-300 ${
                  !isConverting && 'group-hover/btn:font-semibold'
                }`}
              >
                카테고리로 변환
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TextNodeInput;
