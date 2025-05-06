import { useEffect } from 'react';

import { Edge } from '@xyflow/react';

export const useHighlightSelectedEdge = (
  selectedId: string | undefined,
  edges: Edge[],
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void,
) => {
  useEffect(() => {
    if (!selectedId) return;

    setEdges((prevEdges) => {
      return prevEdges.map((edge) => ({
        ...edge,
        zIndex: edge.id === selectedId ? 1000 : 0,
      }));
    });
  }, [selectedId, setEdges]);
};
