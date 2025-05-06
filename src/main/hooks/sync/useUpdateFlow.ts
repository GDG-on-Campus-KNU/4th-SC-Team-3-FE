import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ← 추가
import { compare } from 'fast-json-patch';

import { updateProjectCanvas } from '@/main/api/updateProjectCanvas';
import { uploadProjectThumbnail } from '@/main/api/updateProjectThumbnail';

import {
  LOCAL_CHANGE_TIMESTAMP_KEY,
  LOCAL_STORAGE_KEY,
} from '../../../global/constant/localStorage';
import { useReactFlow } from '@xyflow/react';

export const useUpdateFlow = (reactFlowWrapperRef: React.RefObject<HTMLDivElement>) => {
  const reactFlowInstance = useReactFlow();
  const location = useLocation(); // ← 추가

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

  // 2) location(경로)이 변경되어 이 컴포넌트가 언마운트될 때 실행
  useEffect(() => {
    return () => {
      const rawLocalData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!rawLocalData || !reactFlowWrapperRef.current) return;

      const localData = JSON.parse(rawLocalData);
      const currentSnapshot = {
        nodes: reactFlowInstance.getNodes(),
        edges: reactFlowInstance.getEdges(),
        viewport: reactFlowInstance.getViewport(),
      };
      const patch = compare(localData.snapshot, currentSnapshot);

      // 마지막 캔버스 패치
      if (patch.length > 0) {
        updateProjectCanvas(localData.pid, patch).catch(() => {});
      }
      // 썸네일 캡처 & 업로드
      uploadProjectThumbnail(localData.pid, reactFlowWrapperRef, reactFlowInstance).catch(() => {});
    };
  }, [location, reactFlowInstance, reactFlowWrapperRef]);

  // 3) (선택) 브라우저 닫거나 새로고침할 때
  useEffect(() => {
    const handleUnload = () => {
      const rawLocalData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!rawLocalData) return;
      const localData = JSON.parse(rawLocalData);

      const currentSnapshot = {
        nodes: reactFlowInstance.getNodes(),
        edges: reactFlowInstance.getEdges(),
        viewport: reactFlowInstance.getViewport(),
      };
      const patch = compare(localData.snapshot, currentSnapshot);

      if (patch.length > 0) {
        updateProjectCanvas(localData.pid, patch).catch(() => {});
      }
      uploadProjectThumbnail(localData.pid, reactFlowWrapperRef, reactFlowInstance).catch(() => {});
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
    };
  }, [reactFlowInstance, reactFlowWrapperRef]);
};
