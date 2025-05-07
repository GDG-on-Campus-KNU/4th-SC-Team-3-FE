import { useCallback } from 'react';

import type { Node } from '@xyflow/react';

type NodesSetter = React.Dispatch<React.SetStateAction<Node<any>[]>>;

interface CustomNode extends Node {
  positionAbsolute?: { x: number; y: number };
  width?: number;
  height?: number;
}

export function useNodeDragHandler(setNodes: NodesSetter) {
  return useCallback(
    (_: MouseEvent, draggedNode: CustomNode) => {
      if (draggedNode.type !== 'categoryItem') return;

      setNodes((nds) =>
        nds.map((n) => {
          if (n.type !== 'category') return n;

          // 실시간으로 DOM에서 bounds 계산
          const categoryElement = document.querySelector(`[data-id="${n.id}"]`);
          if (!categoryElement) return n;

          const bounds = categoryElement.getBoundingClientRect();

          // 드래그된 노드의 절대 위치 계산 (viewport 기준)
          const draggedElement = document.querySelector(`[data-id="${draggedNode.id}"]`);
          const draggedRect = draggedElement?.getBoundingClientRect() || {
            left: draggedNode.positionAbsolute?.x || 0,
            top: draggedNode.positionAbsolute?.y || 0,
            width: Number(draggedNode.width ?? 0),
            height: Number(draggedNode.height ?? 0),
            right: (draggedNode.positionAbsolute?.x || 0) + Number(draggedNode.width ?? 0),
            bottom: (draggedNode.positionAbsolute?.y || 0) + Number(draggedNode.height ?? 0),
          };

          const isHover =
            draggedRect.left < bounds.right &&
            draggedRect.right > bounds.left &&
            draggedRect.top < bounds.bottom &&
            draggedRect.bottom > bounds.top;

          return {
            ...n,
            data: { ...n.data, isHover },
          };
        }),
      );
    },
    [setNodes],
  );
}
