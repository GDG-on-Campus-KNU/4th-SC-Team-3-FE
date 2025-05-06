import { useState, useEffect, useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useReactFlow, useStore } from '@xyflow/react';

export const useImageGeneration = (id: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLeftConnection, setHasLeftConnection] = useState(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const queryClient = useQueryClient();
  const { getEdges, getNodes, setNodes } = useReactFlow();

  const edges = useStore((state) => state.edges);
  const nodes = useStore((state) => state.nodes);
  // 왼쪽 연결 확인
  useEffect(() => {
    const hasLeft = edges.some(
      (edge) =>
        edge.target === id &&
        (edge.targetHandle === 'text-left' || edge.targetHandle === 'image-left'),
    );
    setHasLeftConnection(hasLeft);
  }, [edges, id]);

  // 연결된 노드 데이터 수집
  const getConnectedNodesData = useCallback(() => {
    return edges
      .filter(
        (edge) =>
          edge.target === id &&
          (edge.targetHandle === 'text-left' || edge.targetHandle === 'image-left'),
      )
      .map((edge) => nodes.find((node) => node.id === edge.source))
      .filter(Boolean)
      .map((node) => {
        if (node?.type === 'text') {
          return {
            nodeId: node.id,
            content: node.data.value,
            type: 'text_prompt',
          };
        }

        if (node?.type === 'category') {
          const categories = (node.data as any).categories || [];
          return {
            nodeId: node.id,
            contents: categories.map((cat: any) => ({
              nodeId: cat.id,
              key: cat.name,
              value: cat.value,
              type: 'category_prompt',
            })),
            type: 'group',
          };
        }

        if (node?.type === 'categoryItem') {
          return {
            nodeId: node.id,
            key: node.data.name,
            value: node.data.value,
            type: 'category_prompt',
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [id, getEdges, getNodes]);

  // 이미지 생성 요청
  const generateImage = useCallback(async () => {
    if (!hasLeftConnection) return;

    setIsLoading(true);

    try {
      const connectedNodes = getConnectedNodesData();
      const requestData = {
        projectId: 1,
        nodes: connectedNodes,
      };

      const es = new EventSource(`${import.meta.env.VITE_API_URL}/nodes/generate/image`);
      setEventSource(es);

      es.onmessage = (event) => {
        const eventData = JSON.parse(event.data);

        if (eventData.event === 'generated_image') {
          const newImageUrl = eventData.data.url;
          setImageUrl(newImageUrl);
          queryClient.setQueryData(['image', id], newImageUrl);

          // 노드 데이터 업데이트
          setNodes((nds) =>
            nds.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, value: newImageUrl } } : node,
            ),
          );
        }

        if (eventData.event === 'generate_image_end') {
          es.close();
          setIsLoading(false);
        }
      };

      es.onerror = () => {
        es.close();
        setIsLoading(false);
      };
    } catch (error) {
      console.error('Error generating image:', error);
      setIsLoading(false);
    }
  }, [hasLeftConnection, getConnectedNodesData, id, queryClient, setNodes]);

  // 컴포넌트 언마운트 시 SSE 연결 해제
  useEffect(() => {
    return () => {
      eventSource?.close();
    };
  }, [eventSource]);

  return {
    imageUrl,
    isLoading,
    hasLeftConnection,
    generateImage,
    setImageUrl,
  };
};
