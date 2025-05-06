import { useEffect, useRef } from 'react';

import { toPng } from 'html-to-image';

/**
 * @param wrapperRef 캡처할 DOM을 가리키는 ref
 *
 * @returns latestPngRef.current 에 base64 png 문자열
 */
export function useThumbnailCache(wrapperRef: React.RefObject<HTMLElement>) {
  const latestPngRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const capture = async () => {
      const el = wrapperRef.current;
      if (!el || !isMounted) return;
      try {
        const png = await toPng(el, {
          cacheBust: true,
          backgroundColor: '#ffffff',
        });
        latestPngRef.current = png;
        console.log('🎞️ 썸네일 캡처 완료');
      } catch (err) {
        console.warn('❗ 썸네일 캡처 실패', err);
      }
    };

    // 첫 캡처 한 번
    capture();

    // 이후 10초마다 캡처
    const intervalId = setInterval(capture, 10_000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [wrapperRef]);

  return latestPngRef;
}
