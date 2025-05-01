import { useCallback } from 'react';

import { Connection, Edge, addEdge } from '@xyflow/react';

export const useConnectHandler = (setEdges: React.Dispatch<React.SetStateAction<Edge[]>>) => {
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'textEdge',
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  return onConnect;
};
