import { useEffect, useRef } from 'react';

import { toPng } from 'html-to-image';

import { ReactFlowInstance } from '@xyflow/react';

export const useThumbnailCache = (
  reactFlowWrapperRef: React.RefObject<HTMLDivElement>,
  reactFlowInstance: ReactFlowInstance,
) => {
  const latestPngRef = useRef<string | null>(null);

  // 1) 노드/엣지 변경 시 캡쳐
  useEffect(() => {
    // 디바운스나 쓰로틀을 걸어야 과도한 캡쳐를 막을 수 있습니다.
    let timeout: NodeJS.Timeout;

    const capture = () => {
      if (!reactFlowWrapperRef.current) return;
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        try {
          const png = await toPng(reactFlowWrapperRef.current, {
            cacheBust: true,
            backgroundColor: '#ffffff',
          });
          latestPngRef.current = png; // base64 문자열로 저장
          console.log('🎞️ 새 썸네일 저장됨');
        } catch (e) {
          console.warn('❗ 캡쳐 실패', e);
        }
      }, 500);
    };

    // React Flow 인스턴스가 제공하는 이벤트 구독
    const unsubNodes = (reactFlowInstance as any).on('nodesChange', capture);
    const unsubEdges = (reactFlowInstance as any).on('edgesChange', capture);

    // 처음 한 번 캡쳐
    capture();

    return () => {
      clearTimeout(timeout);
      unsubNodes();
      unsubEdges();
    };
  }, [reactFlowWrapperRef, reactFlowInstance]);

  return latestPngRef;
};
