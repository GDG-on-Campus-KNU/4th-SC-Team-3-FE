import { useCallback } from 'react';

import { useToast } from '@/global/hooks/use-toast';
import { Node, ReactFlowInstance } from '@xyflow/react';

export interface CategoryItemData {
  id: string;
  name: string | undefined;
  value: any;
  parentId: string;
}

export const useFlowDropHandler = (
  reactFlowInstance: ReactFlowInstance | null,
  nodeType: string | undefined,
  modelName: string | undefined,
  nodeLength: number,
  setNodes: (updater: (nodes: Node[]) => Node[]) => void,
) => {
  const { toast } = useToast();
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!nodeType || !reactFlowInstance) return;

      if (nodeType === 'image' && modelName !== 'gemini-2.0-flash') {
        toast({
          title: '지원 예정인 모델입니다✨',
          description: `${modelName} 노드는 아직 사용하실 수 없어요. 
“gemini-2.0-flash” 모델만 드롭 가능합니다.`,
        });
        return;
      }

      if (nodeType === 'text') {
        event.preventDefault();
        toast({
          title: '지원 예정인 기능입니다✨',
          description: '곧 사용 가능한 노드가 추가될 예정이에요.',
        });
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const raw = event.dataTransfer.getData('application/reactflow-item');

      if (nodeType === 'categoryItem' && raw) {
        const item = JSON.parse(raw) as CategoryItemData;

        const newNode: Node = {
          id: item.id,
          type: 'categoryItem',
          position,
          data: {
            name: item.name,
            value: item.value,
          },
          draggable: true,
        };

        setNodes((nds) => {
          const updated = nds.map((node) => {
            if (node.id === item.parentId && Array.isArray(node.data?.categories)) {
              return {
                ...node,
                data: {
                  ...node.data,
                  categories: (node.data.categories as CategoryItemData[]).filter(
                    (c) => c.id !== item.id,
                  ),
                },
              };
            }
            return node;
          });

          return [...updated, newNode];
        });

        return;
      }

      const newNode: Node = {
        id: `${nodeType}_node_${1 + nodeLength++}`,
        type: nodeType,
        position,
        data: { model: modelName, data: null },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodeType, modelName, setNodes],
  );

  return onDrop;
};
