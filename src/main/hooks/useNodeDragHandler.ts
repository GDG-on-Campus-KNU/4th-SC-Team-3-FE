import { useCallback } from 'react';

import type { Node } from '@xyflow/react';

type NodesSetter = React.Dispatch<React.SetStateAction<Node<any>[]>>;

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
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

export function useNodeDragHandler(setNodes: NodesSetter) {
  return useCallback(
    (_: MouseEvent, draggedNode: CustomNode) => {
      if (draggedNode.type !== 'categoryItem') return;

      setNodes((nds) =>
        nds.map((n) => {
          if (n.type !== 'category') return n;

          const absPos =
            draggedNode.positionAbsolute ||
            (draggedNode as any).__rf?.positionAbsolute ||
            draggedNode.position;
          const width = Number(
            draggedNode.width ?? (draggedNode as any).__rf?.width ?? draggedNode.data?.width ?? 0,
          );
          const height = Number(
            draggedNode.height ??
              (draggedNode as any).__rf?.height ??
              draggedNode.data?.height ??
              0,
          );

          const bounds = (n.data.bounds as Bounds) ?? null;
          const isHover =
            !!bounds &&
            absPos.x < bounds.right &&
            absPos.x + width > bounds.left &&
            absPos.y < bounds.bottom &&
            absPos.y + height > bounds.top;

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
