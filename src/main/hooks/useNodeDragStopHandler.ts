import { useCallback } from 'react';

import { Node } from '@xyflow/react';

type NodesSetter = React.Dispatch<React.SetStateAction<Node<any>[]>>;

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function isOverlap(a: { x: number; y: number; width: number; height: number }, b: Bounds) {
  return a.x < b.right && a.x + a.width > b.left && a.y < b.bottom && a.y + a.height > b.top;
}

export function useNodeDragStopHandler(
  setNodes: NodesSetter,
  handleDropIntoCategory: (itemId: string, categoryId: string) => void,
) {
  return useCallback(
    (_: MouseEvent, draggedNode: Node) => {
      if (draggedNode.type !== 'categoryItem') return;

      setNodes((nds) => {
        // ── 1) React Flow 내부 RF 데이터 꺼내기 ──
        const rfData = (draggedNode as any).__rf;
        // 화면(뷰포트) 기준 절대 좌표, fallback으로 node.position 사용
        const absPos = rfData?.positionAbsolute ?? {
          x: draggedNode.position.x,
          y: draggedNode.position.y,
        };
        const width = rfData?.width ?? draggedNode.data.width;
        const height = rfData?.height ?? draggedNode.data.height;

        const a = {
          x: absPos.x,
          y: absPos.y,
          width: width as number,
          height: height as number,
        };

        // ── 2) bounds(스크린 좌표)로 저장된 카테고리 찾기 ──
        const target = nds.find(
          (n) =>
            n.type === 'categoryNode' && n.data.bounds && isOverlap(a, n.data.bounds as Bounds),
        );

        // ── 3) 겹친 카테고리가 있으면 편입 로직 호출 ──
        if (target) {
          handleDropIntoCategory(draggedNode.id, target.id);
        }

        // ── 4) isHover 초기화 ──
        return nds.map((n) =>
          n.type === 'categoryNode' ? { ...n, data: { ...n.data, isHover: false } } : n,
        );
      });
    },
    [setNodes, handleDropIntoCategory],
  );
}
