import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { time } from 'console';

import { axiosClient } from '../../../global/api/axios';
import { DEFAULT_FLOW_SNAPSHOT, FlowSnapshot } from '@/global/api/snapshot';
import { LOCAL_STORAGE_KEY } from '@/global/constant/localStorage';
import { Edge, Node, ReactFlowInstance } from '@xyflow/react';

export const fetchFlowFromServer = async (pid: number): Promise<any> => {
  const res = await axiosClient.get<FlowSnapshot>(`/projects/${pid}`);
  return res.data;
};

export const uploadFlowToServer = async (data: FlowSnapshot): Promise<void> => {
  await axiosClient.post(`/projects/${data.pid}`, data);
};

export const useSyncFlow = (
  reactFlowInstance: ReactFlowInstance | null,
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
) => {
  const { pid } = useParams<{ pid: string }>();

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
        const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY + pid);
        if (localRaw) {
          localSnapshot = JSON.parse(localRaw);
        }
      } catch (e) {
        console.warn('로컬 로딩 실패:', e);
      }

      try {
        // 서버에서 가져오기
        const serverData = await fetchFlowFromServer(Number(pid));

        // serverData.canvas가 JSON 문자열이라면 이 부분만 파싱해야 함
        serverSnapshot = {
          pid: serverData.projectId,
          name: serverData.name,
          timestamp: serverData.updatedAt,
          snapshot: JSON.parse(serverData.canvas),
        } as FlowSnapshot;
        console.log('server:', serverSnapshot);
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
      console.log(latestSnapshot);
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
