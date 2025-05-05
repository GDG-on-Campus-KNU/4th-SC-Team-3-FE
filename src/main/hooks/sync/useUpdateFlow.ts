import { useEffect } from 'react';

import { compare } from 'fast-json-patch';
import { toPng } from 'html-to-image';

import { updateProjectCanvas } from '@/main/api/updateProjectCanvas';
import { uploadProjectThumbnail } from '@/main/api/updateProjectThumbnail';

import {
  LOCAL_CHANGE_TIMESTAMP_KEY,
  LOCAL_STORAGE_KEY,
} from '../../../global/constant/localStorage';
import { useReactFlow } from '@xyflow/react';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

export const useUpdateFlow = (reactFlowWrapperRef: React.RefObject<HTMLDivElement>) => {
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    const interval = setInterval(async () => {
      const rawLocalData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const rawLocalTimestamp = localStorage.getItem(LOCAL_CHANGE_TIMESTAMP_KEY);
      const now = new Date();

      if (!rawLocalData || !rawLocalTimestamp) return;

      const diffInMs = now.getTime() - new Date(rawLocalTimestamp).getTime();
      const localData = JSON.parse(rawLocalData);

      if (diffInMs >= 10 * 1000) {
        const localSnapshot = localData.snapshot;

        const currentSnapshot = {
          nodes: reactFlowInstance.getNodes(),
          edges: reactFlowInstance.getEdges(),
          viewport: reactFlowInstance.getViewport(),
        };

        const patch = compare(localSnapshot, currentSnapshot);

        // 로컬 스토리지에 저장된 데이터와 현재 상태를 비교하여 변경점 감지
        if (patch.length > 0) {
          try {
            // 캔버스 업데이트
            await updateProjectCanvas(localData.pid, patch);

            // 썸네일 캡처 & 업로드
            if (reactFlowWrapperRef.current) {
              const png = await toPng(reactFlowWrapperRef.current, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                // width: 540,
                // height: 540,
              });
              // .then(downloadImage);
              console.log('🖼️ 썸네일 캡처 성공');

              if (png) {
                const file = new File([png], 'thumbnail.png', { type: 'image/png' });
                try {
                  await uploadProjectThumbnail(localData.pid, file); // 썸네일 업로드
                } catch (err) {}
              }
            }

            // 로컬 스토리지 업데이트
            localStorage.setItem(
              LOCAL_STORAGE_KEY,
              JSON.stringify({
                pid: localData.pid,
                name: localData.name,
                timestamp: now.toISOString(),
                snapshot: currentSnapshot,
              }),
            );
            localStorage.setItem(LOCAL_CHANGE_TIMESTAMP_KEY, now.toISOString());
          } catch (err) {
            console.error('❌ 서버 전송 실패:', err);
          }
        }
      }
    }, 1 * 1000); // 1초

    return () => clearInterval(interval);
  }, []);
};
