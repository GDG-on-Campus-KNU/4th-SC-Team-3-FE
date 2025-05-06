import { useCallback } from 'react';

import { Edge } from '@xyflow/react';

export const useEdgeClickHandler = (
  edges: Edge[],
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  setSelectedId: (id: string) => void,
) => {
  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      setSelectedId(edge.id);

      setEdges((prevEdges) =>
        prevEdges.map((e) => ({
          ...e,
          zIndex: e.id === edge.id ? 1000 : 0,
        })),
      );
    },
    [setEdges, setSelectedId],
  );

  return onEdgeClick;
};
