import { Connection, Edge, addEdge } from '@xyflow/react';

export const useConnectHandler = (setEdges: React.Dispatch<React.SetStateAction<Edge[]>>) => {
  return (connection: Connection) => {
    const { sourceHandle, targetHandle } = connection;

    // 초기 기본값
    let edgeType = 'default';

    // sourceHandle에 따라 edgeType 지정
    if (sourceHandle === 'text-right') {
      edgeType = 'text';
    } else if (sourceHandle === 'image-right') {
      edgeType = 'image';
    }

    // targetHandle이 잘못되었을 경우 연결을 막기
    if (
      (sourceHandle === 'text-right' && targetHandle !== 'text-left') ||
      (sourceHandle === 'image-right' && targetHandle !== 'image-left')
    ) {
      return; // 연결을 막고 종료
    }

    // edges에 새로운 edge 추가
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          id: `${connection.source}-${connection.target}`,
          type: edgeType, // type 지정
        },
        eds,
      ),
    );
  };
};
