import { useEffect, useRef } from 'react';

import { toPng } from 'html-to-image';

/**
 * @param wrapperRef 캡처할 DOM을 가리키는 ref
 * @param nodes React Flow 의 노드 배열
 * @param edges React Flow 의 엣지 배열
 *
 * @returns latestPngRef.current 에 base64 png 문자열
 */
export function useThumbnailCache(
  wrapperRef: React.RefObject<HTMLElement>,
  nodes: any[],
  edges: any[],
) {
  const latestPngRef = useRef<string | null>(null);

  useEffect(() => {
    // nodes 또는 edges 가 바뀔 때마다 캡처
    if (!wrapperRef.current) return;
    const element = wrapperRef.current;
    (async () => {
      try {
        const png = await toPng(element, {
          cacheBust: true,
          backgroundColor: '#ffffff',
        });
        latestPngRef.current = png;
      } catch (err) {
        console.warn('❗ 썸네일 캡처 실패', err);
      }
    })();
  }, [
    // wrapperRef 가 바뀌지는 않으니 생략 가능
    nodes,
    edges,
  ]);

  return latestPngRef;
}
