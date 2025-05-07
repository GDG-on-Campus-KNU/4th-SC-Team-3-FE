import { useCallback } from 'react';

import type { Node } from '@xyflow/react';

type NodesSetter = React.Dispatch<React.SetStateAction<Node<any>[]>>;

export function useNodeDragStopHandler(
  setNodes: NodesSetter,
  handleDropIntoCategory: (itemId: string, categoryId: string) => void,
) {
  return useCallback(
    (_: MouseEvent, draggedNode: Node) => {
      if (draggedNode.type !== 'categoryItem') return;

      setNodes((nds) => {
        // 드래그된 노드의 실시간 위치 정보
        const draggedElement = document.querySelector(`[data-id="${draggedNode.id}"]`);
        const draggedRect = draggedElement?.getBoundingClientRect();

        if (!draggedRect) return nds;

        // 모든 카테고리 노드와 충돌 검사
        const target = nds.find((n) => {
          if (n.type !== 'category') return false;

          const categoryElement = document.querySelector(`[data-id="${n.id}"]`);
          if (!categoryElement) return false;

          const bounds = categoryElement.getBoundingClientRect();

          return (
            draggedRect.left < bounds.right &&
            draggedRect.right > bounds.left &&
            draggedRect.top < bounds.bottom &&
            draggedRect.bottom > bounds.top
          );
        });

        if (target) {
          handleDropIntoCategory(draggedNode.id, target.id);
        }

        return nds.map((n) =>
          n.type === 'category' ? { ...n, data: { ...n.data, isHover: false } } : n,
        );
      });
    },
    [setNodes, handleDropIntoCategory],
  );
}
