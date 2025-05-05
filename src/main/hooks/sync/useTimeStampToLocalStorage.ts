import { useEffect } from 'react';

import { LOCAL_CHANGE_TIMESTAMP_KEY } from '@/global/constant/localStorage';
import { Node, Edge, ReactFlowInstance } from '@xyflow/react';

export const useTimeStampToLocalStorage = (
  reactFlowInstance: ReactFlowInstance | null,
  nodes: Node[],
  edges: Edge[],
) => {
  useEffect(() => {
    if (!reactFlowInstance) return;

    localStorage.setItem(LOCAL_CHANGE_TIMESTAMP_KEY, new Date().toISOString());
  }, [nodes, edges, reactFlowInstance]);
};
