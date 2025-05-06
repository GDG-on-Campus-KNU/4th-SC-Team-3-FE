import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { compare } from 'fast-json-patch';

import { updateProjectCanvas } from '@/main/api/updateProjectCanvas';

import {
  LOCAL_CHANGE_TIMESTAMP_KEY,
  LOCAL_STORAGE_KEY,
} from '../../../global/constant/localStorage';
import { axiosClient } from '@/global/api/axios';
import { useReactFlow } from '@xyflow/react';

export const useUpdateFlow = (
  reactFlowWrapperRef: React.RefObject<HTMLDivElement>,
  latestPngRef: React.MutableRefObject<string | null>,
) => {
  const reactFlowInstance = useReactFlow();
  const location = useLocation();

  // 1) 주기적 캔버스 업데이트
  useEffect(() => {
    const interval = setInterval(async () => {
      const rawLocalData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const rawLocalTimestamp = localStorage.getItem(LOCAL_CHANGE_TIMESTAMP_KEY);
      if (!rawLocalData || !rawLocalTimestamp) return;

      const now = new Date();
      const diffInMs = now.getTime() - new Date(rawLocalTimestamp).getTime();
      if (diffInMs < 10 * 1000) return;

      const localData = JSON.parse(rawLocalData);
      const currentSnapshot = {
        nodes: reactFlowInstance.getNodes(),
        edges: reactFlowInstance.getEdges(),
        viewport: reactFlowInstance.getViewport(),
      };
      const patch = compare(localData.snapshot, currentSnapshot);
      if (patch.length === 0) return;

      try {
        await updateProjectCanvas(localData.pid, patch);
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
    }, 1000);

    return () => clearInterval(interval);
  }, [reactFlowInstance]);

  useEffect(() => {
    return () => {
      const rawLocalData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const png = latestPngRef.current;
      if (!rawLocalData || !png) return;
      const localData = JSON.parse(rawLocalData);

      // 2-1) 마지막 캔버스 패치
      const currentSnapshot = {
        nodes: reactFlowInstance.getNodes(),
        edges: reactFlowInstance.getEdges(),
        viewport: reactFlowInstance.getViewport(),
      };
      const patch = compare(localData.snapshot, currentSnapshot);
      if (patch.length > 0) {
        updateProjectCanvas(localData.pid, patch).catch(() => {});
      }

      // 2-2) 미리 저장된 PNG(base64) → Blob → FormData 로 업로드
      (async () => {
        try {
          const blob = await (await fetch(png)).blob();
          const file = new File([blob], 'thumbnail.png', { type: 'image/png' });
          const formData = new FormData();
          formData.append('thumbnail', file);
          await axiosClient.put(`/projects/${localData.pid}/thumbnail`, formData);
          console.log('✅ 언마운트 시 썸네일 업로드 성공');
        } catch {
          console.warn('❌ 언마운트 시 썸네일 업로드 실패');
        }
      })();
    };
  }, [location, reactFlowInstance, reactFlowWrapperRef]);
};
