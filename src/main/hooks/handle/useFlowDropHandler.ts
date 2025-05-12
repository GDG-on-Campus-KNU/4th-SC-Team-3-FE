import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!nodeType || !reactFlowInstance) return;

      if (nodeType === 'image' && modelName !== 'Gemini-2.0-flash') {
        toast({
          variant: 'info',
          title: t('toast.notYetTitle'),
          description: `${modelName} ${t('toast.notYetContent2')} ${t('toast.notYetContent3')}`,
        });
        return;
      }

      if (nodeType === 'text' || nodeType === 'video' || nodeType === 'audio') {
        toast({
          variant: 'info',
          title: t('toast.notYetTitle2'),
          description: t('toast.notYetContent'),
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
        id: `${nodeType}_node_${crypto.randomUUID()}`,
        type: nodeType,
        position,
        data: { model: modelName, data: null },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodeType, modelName, setNodes, t],
  );

  return onDrop;
};
