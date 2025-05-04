// src/hooks/useNodeDragHandler.ts
import { useCallback } from 'react';

import type { Node } from '@xyflow/react';

type NodesSetter = React.Dispatch<React.SetStateAction<Node<any>[]>>;

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function useNodeDragHandler(setNodes: NodesSetter) {
  return useCallback(
    (_: MouseEvent, draggedNode: Node) => {
      if (draggedNode.type !== 'categoryItem') return;

      setNodes((nds) =>
        nds.map((n) => {
          if (n.type !== 'categoryNode') return n;

          // ── 1) ReactFlow v11 에서 제공하는 절대좌표 우선 사용 ──
          //    드래그 도중 node.positionAbsolute 가 바로 들어있는 경우
          let absPos = (draggedNode as any).positionAbsolute as
            | { x: number; y: number }
            | undefined;

          // ── 2) 없으면 내부 __rf 필드에서 꺼내보기 ──
          if (!absPos && (draggedNode as any).__rf?.positionAbsolute) {
            absPos = (draggedNode as any).__rf.positionAbsolute;
          }

          // ── 3) 그래도 없으면 node.position 으로 (canvas 좌표계) ──
          if (!absPos) {
            absPos = draggedNode.position;
          }

          // ── 4) 가로/세로 크기 꺼내기 ──
          const width =
            (draggedNode as any).width ??
            (draggedNode as any).__rf?.width ??
            draggedNode.data.width ??
            0;
          const height =
            (draggedNode as any).height ??
            (draggedNode as any).__rf?.height ??
            draggedNode.data.height ??
            0;

          // (디버깅 로그, 화면에 찍어보거나 console.log로)
          // console.log('absPos=', absPos, ' size=', width, height);

          // ── 5) 카테고리 노드 bounds 와 충돌 판정 ──
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
