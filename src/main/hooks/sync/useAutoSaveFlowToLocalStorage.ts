import { useEffect } from 'react';

import { Node, Edge, ReactFlowInstance } from '@xyflow/react';

const LOCAL_STORAGE_KEY = 'flow_latest';

export const useAutoSaveFlowToLocalStorage = (
  reactFlowInstance: ReactFlowInstance | null,
  nodes: Node[],
  edges: Edge[],
) => {
  useEffect(() => {
    if (!reactFlowInstance) return;

    const data = {
      timestamp: new Date().toISOString(),
      snapshot: {
        nodes: reactFlowInstance.getNodes(),
        edges: reactFlowInstance.getEdges(),
        viewport: reactFlowInstance.getViewport(),
      },
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [nodes, edges, reactFlowInstance]);
};
