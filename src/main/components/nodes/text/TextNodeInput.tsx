import { useState } from 'react';

import { Baseline, FunnelPlus, Play } from 'lucide-react';

import { useReactFlow, Node, Edge } from '@xyflow/react';

export function TextNodeInput({
  id,
  data,
}: {
  id: string;
  data: { model: string; value?: string };
}) {
  const { updateNodeData, getNodes, setNodes, addEdges } = useReactFlow();
  const [isConverting, setIsConverting] = useState(false);

  const handleConvertClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConverting(true);

    const nodes = getNodes();
    const currentNode = nodes.find((n) => n.id === id);

    if (!currentNode) return;

    const categoryNode: Node = {
      id: `category-${Date.now()}`,
      type: 'categoryNode',
      position: {
        x: currentNode.position.x + 300,
        y: currentNode.position.y,
      },
      data: {
        value: data.value || '',
        categories: [
          { name: '카테고리 1', value: data.value || '' },
          { name: '카테고리 2', value: '' },
          { name: '카테고리 3', value: '' },
          { name: '카테고리 4', value: '' },
        ],
      },
    };

    const newEdge: Edge = {
      id: `edge-${id}-${categoryNode.id}`,
      source: id,
      target: categoryNode.id,
    };

    setNodes((nds) => [...nds, categoryNode]);
    addEdges([newEdge]);

    setIsConverting(false);
  };

  //textarea input 안이랑 전환 버튼 클릭했을 때 click event가 전파되지 않도록

  const handleTextareaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTextareaChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(id, { text: evt.target.value });
  };

  return (
    <div
      className={`group flex flex-col rounded-md border border-transparent bg-[#FFFFFF] transition-all duration-300 hover:border-[#C9DCF9]/50 hover:shadow-lg`}
    >
      <div className={`m-[5px] mb-0 flex h-[30px] w-[235px] flex-row place-items-end rounded-t-sm`}>
        <div
          className={`border-pipy-blue flex h-[28px] w-[28px] flex-col justify-center self-center rounded-sm border-2`}
        >
          <Baseline size='18' strokeWidth='2.5' className={`text-pipy-blue self-center`} />
        </div>
        <div
          className={`font-[Noto Sans] ml-2 h-[28px] w-[180px] pt-0.5 text-left text-[16px] font-semibold text-[#000000]`}
        >
          {data.model}
        </div>
        <Play strokeWidth='3' className={`size-15px place-self-end self-center text-[#C9DCF9]`} />
      </div>

      <div
        className={`m-[5px] flex h-[150px] w-[235px] flex-col items-stretch rounded-sm bg-[#C9DCF9] p-[5px] transition-all duration-300`}
      >
        <textarea
          className={`m-[5px] h-[100px] w-[215px] resize-none bg-transparent placeholder-[#808080] focus-visible:outline-none group-hover:placeholder-[#666666]`}
          onClick={handleTextareaClick}
          onChange={handleTextareaChange}
          placeholder='텍스트를 입력해 주세요'
          value={data.value ? data.value : undefined}
        />

        <button
          onClick={handleConvertClick}
          className={`group/btn flex h-[35px] w-[225px] flex-row items-center justify-center self-end rounded-sm bg-[#808080] transition-all duration-300 hover:bg-[#3A7DE8] hover:shadow-md`}
        >
          <FunnelPlus
            size='20'
            className={`size-[20px] text-[#FFFFFF] transition-transform duration-300 group-hover/btn:rotate-12`}
          />
          <span
            className={`ml-1 text-[#FFFFFF] transition-all duration-300 group-hover/btn:font-semibold`}
          >
            카테고리로 변환
          </span>
        </button>
      </div>
    </div>
  );
}

export default TextNodeInput;
