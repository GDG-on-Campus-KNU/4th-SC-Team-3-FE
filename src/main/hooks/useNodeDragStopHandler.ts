import { useCallback } from 'react';

import type { Node } from '@xyflow/react';

type NodesSetter = React.Dispatch<React.SetStateAction<Node<any>[]>>;

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CustomNode extends Node {
  positionAbsolute?: { x: number; y: number };
  width?: number;
  height?: number;
  __rf?: {
    positionAbsolute?: { x: number; y: number };
    width?: number;
    height?: number;
  };
}

function isOverlap(a: Rect, b: Bounds): boolean {
  return a.x < b.right && a.x + a.width > b.left && a.y < b.bottom && a.y + a.height > b.top;
}

export function useNodeDragStopHandler(
  setNodes: NodesSetter,
  handleDropIntoCategory: (itemId: string, categoryId: string) => void,
) {
  return useCallback(
    (_: MouseEvent, draggedNode: CustomNode) => {
      if (draggedNode.type !== 'categoryItem') return;

      setNodes((nds) => {
        const absPos =
          draggedNode.positionAbsolute ||
          (draggedNode as any).__rf?.positionAbsolute ||
          draggedNode.position;
        const width = Number(
          draggedNode.width ?? (draggedNode as any).__rf?.width ?? draggedNode.data?.width ?? 0,
        );
        const height = Number(
          draggedNode.height ?? (draggedNode as any).__rf?.height ?? draggedNode.data?.height ?? 0,
        );

        const a: Rect = {
          x: absPos.x,
          y: absPos.y,
          width,
          height,
        };

        const target = nds.find(
          (n) => n.type === 'category' && n.data.bounds && isOverlap(a, n.data.bounds as Bounds),
        );

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
