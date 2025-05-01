import { useEffect } from 'react';

import { axiosClient } from '../../../global/api/axios';
import { Edge, Node, ReactFlowInstance, Viewport } from '@xyflow/react';

export interface FlowSnapshot {
  timestamp: string; // ISO string
  snapshot: {
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
  };
}

const DEFAULT_FLOW_SNAPSHOT: FlowSnapshot = {
  timestamp: new Date().toISOString(),
  snapshot: {
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 0.75 },
  },
};

export const fetchFlowFromServer = async (): Promise<FlowSnapshot> => {
  const res = await axiosClient.get<FlowSnapshot>('/projects');
  return res.data;
};

export const uploadFlowToServer = async (data: FlowSnapshot): Promise<void> => {
  await axiosClient.post('/projects', data);
};

const LOCAL_STORAGE_KEY = 'flow_latest';

export const useSyncFlow = (
  reactFlowInstance: ReactFlowInstance | null,
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
) => {
  const applySnapshot = (data: FlowSnapshot) => {
    setNodes(data.snapshot.nodes || []);
    setEdges(data.snapshot.edges || []);
    reactFlowInstance!.setViewport(data.snapshot.viewport || { x: 0, y: 0, zoom: 0.75 });
  };

  useEffect(() => {
    if (!reactFlowInstance) return;

    const sync = async () => {
      let localSnapshot: FlowSnapshot | null = null;
      let serverSnapshot: FlowSnapshot | null = null;

      try {
        // 로컬 먼저 시도
        const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localRaw) {
          localSnapshot = JSON.parse(localRaw);
        }
      } catch (e) {
        console.warn('로컬 로딩 실패:', e);
      }

      try {
        // 서버에서 가져오기
        serverSnapshot = await fetchFlowFromServer();
      } catch (e) {
        console.warn('서버 로딩 실패:', e);
      }

      // 아무 것도 없으면 기본값
      if (!localSnapshot && !serverSnapshot) {
        console.log('신규 Flow. 기본값 사용');
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_FLOW_SNAPSHOT));
        applySnapshot(DEFAULT_FLOW_SNAPSHOT);
        await uploadFlowToServer(DEFAULT_FLOW_SNAPSHOT);
        return;
      }

      // 둘 중 최신값 사용
      const latestSnapshot =
        !serverSnapshot ||
        (localSnapshot && new Date(localSnapshot.timestamp) > new Date(serverSnapshot.timestamp))
          ? localSnapshot!
          : serverSnapshot;

      applySnapshot(latestSnapshot);

      // 오래된 쪽 덮어쓰기
      if (latestSnapshot === serverSnapshot) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(latestSnapshot!));
      } else if (latestSnapshot === localSnapshot && serverSnapshot) {
        await uploadFlowToServer(latestSnapshot!);
      }
    };

    sync();
  }, []);
};
