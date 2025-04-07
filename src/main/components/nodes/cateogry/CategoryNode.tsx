// src/components/nodes/category/CategoryNode.tsx
import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';

import { Minimize2 } from 'lucide-react';

import CategoryItemNodeData from './CategoryItemNode';
import { useReactFlow, NodeProps, Handle, Position, Node } from '@xyflow/react';

interface CategoryNodeData extends Node<Record<string, unknown>, string> {
  model: string;
  categories: Array<{ name: string; value: string }>;
}

export function CategoryNode({ id, data, isConnectable }: NodeProps<CategoryNodeData>) {
  const { getNodes, setNodes, getNode } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(200);

  const childItems = useMemo(() => {
    const nodes = getNodes();
    return nodes.filter(
      (node): node is Node<typeof CategoryItemNodeData> =>
        node.type === 'categoryItem' && node.data?.parentId === id,
    );
  }, [getNodes, id]);

  useEffect(() => {
    const headerFooterHeight = 60;
    const itemHeight = 35;
    const listPadding = 16;
    const minHeight = 150;
    const maxHeight = 400;

    const contentHeight =
      childItems.length * itemHeight + (childItems.length > 0 ? listPadding : 0);
    const totalHeight = headerFooterHeight + contentHeight;
    const newHeight = Math.min(Math.max(totalHeight, minHeight), maxHeight);

    setContainerHeight(newHeight);
  }, [childItems.length]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const draggedNodeId = event.dataTransfer.getData('application/reactflow-node-id');

      if (!draggedNodeId) return;

      const droppedNode = getNode(draggedNodeId);

      if (droppedNode && droppedNode.type === 'categoryItem' && droppedNode.data?.parentId !== id) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === draggedNodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  parentId: id, // parentId를 이 노드의 ID로 설정
                },
              };
            }
            return node;
          }),
        );
      }
    },
    [id, getNode, setNodes],
  );

  const releaseChildItem = useCallback(
    (childId: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === childId && node.type === 'categoryItem') {
            return {
              ...node,
              data: {
                ...node.data,
                parentId: null,
              },
            };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  return (
    <div
      ref={containerRef}
      className='flex flex-col rounded-md border border-blue-400 bg-blue-50 shadow-lg transition-all duration-200'
    ></div>
  );
}

export default memo(CategoryNode);
