import { useEffect, useRef } from 'react';

import { toPng } from 'html-to-image';

interface ThumbnailItem {
  projectId: string;
  timestamp: string;
  thumbnail: string;
}

export function useThumbnailCache(
  wrapperRef: React.RefObject<HTMLElement>,
  projectId: string,
  storageKey = 'flow-thumbnails',
) {
  const latestPngRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const capture = async () => {
      const el = wrapperRef.current;
      if (!el || !(el instanceof HTMLElement)) return;

      const HIDE_SELECTORS = ['.react-flow__minimap', '.react-flow__controls'];
      const originalDisplays = new Map<Element, string>();

      HIDE_SELECTORS.forEach((selector) => {
        el.querySelectorAll(selector).forEach((el) => {
          originalDisplays.set(el, (el as HTMLElement).style.display);
          (el as HTMLElement).style.display = 'none';
        });
      });

      try {
        const png = await toPng(el, {
          cacheBust: true,
          backgroundColor: '#EDEDED',
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
        });

        if (isMounted) {
          latestPngRef.current = png;

          const timestamp = new Date().toISOString();
          const newItem: ThumbnailItem = { projectId, timestamp, thumbnail: png };

          // 기존 저장된 배열을 불러오고, 해당 프로젝트 ID 항목은 제거
          const savedRaw = localStorage.getItem(storageKey);
          const savedList: ThumbnailItem[] = savedRaw ? JSON.parse(savedRaw) : [];

          const updatedList = [
            ...savedList.filter((item) => item.projectId !== projectId),
            newItem,
          ];

          localStorage.setItem(storageKey, JSON.stringify(updatedList));
          console.log(`✅ 썸네일 저장 완료 (projectId=${projectId})`);
        }
      } catch (err) {
        console.warn('❗ 썸네일 캡처 실패', err);
      } finally {
        originalDisplays.forEach((display, el) => {
          (el as HTMLElement).style.display = display || '';
        });
      }
    };

    const intervalId = setInterval(capture, 5_000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [wrapperRef, projectId, storageKey]);

  return latestPngRef;
}
