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

      try {
        const png = await toPng(el, {
          cacheBust: true,
          backgroundColor: '#EDEDED',
          canvasWidth: window.innerWidth,
          canvasHeight: window.innerHeight,
          filter: (node) => {
            if (node.classList) {
              return (
                !node.classList.contains('react-flow__minimap') &&
                !node.classList.contains('react-flow__controls')
              );
            }
            return true;
          },
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
        }
      } catch (err) {
        console.warn('faild to capture thumbnail', err);
      }
    };

    const intervalId = setInterval(capture, 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [wrapperRef, projectId, storageKey]);

  return latestPngRef;
}
