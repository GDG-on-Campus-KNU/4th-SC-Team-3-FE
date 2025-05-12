import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useToast } from '@/global/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useReactFlow, useStore, Position } from '@xyflow/react';

export const useImageGeneration = (id: string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLeftConnection, setHasLeftConnection] = useState(false);

  const abortCtrlRef = useRef<AbortController>();
  const queryClient = useQueryClient();
  const { getEdges, getNodes, setNodes } = useReactFlow();
  const { pid } = useParams<{ pid: string }>();

  const { toast } = useToast(); // useToast 훅 사용
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
        if (node?.type === 'textPrompt') {
          return {
            content: node.data.value,
            type: 'text_prompt',
          };
        }

        if (node?.type === 'category') {
          const categories = (node.data as any).categories || [];
          return {
            contents: categories.map((cat: any) => ({
              key: cat.name,
              value: cat.value,
              type: 'category_prompt',
            })),
            type: 'group',
          };
        }

        if (node?.type === 'categoryItem') {
          return {
            key: node.data.name,
            value: node.data.value,
            type: 'category_prompt',
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [id, edges, nodes]);

  // 이미지 생성 요청 (POST + 스트리밍 응답)

  const generateImage = useCallback(async () => {
    if (!hasLeftConnection) return;

    // 로딩 시작 시간 기록
    const startTime = Date.now();
    setIsLoading(true);

    const controller = new AbortController();
    abortCtrlRef.current = controller;

    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
    let buffer = '';

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/nodes/generate/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: Number(pid), nodes: getConnectedNodesData() }),
        signal: controller.signal,
        credentials: 'include',
      });
      // 상태 코드가 200이 아닌 경우 오류 처리
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `서버 오류 발생 (${res.status} ${res.statusText})`);
      }

      if (!res.body) throw new Error('응답 데이터가 없습니다');

      reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop()!;

        for (const part of parts) {
          const text = part.replace(/^data:\s*/, '').trim();
          if (!text) continue;

          let evt: { event: string; data?: { url: string }; message?: string };
          try {
            evt = JSON.parse(text);
          } catch {
            console.warn('불완전한 JSON, 다음 청크 대기…');
            continue;
          }

          if (evt.event === 'generated_image' && evt.data) {
            setImageUrl(evt.data.url);
            queryClient.setQueryData(['image', id], evt.data.url);
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, value: evt.data!.url } } : n,
              ),
            );
          }
          if (evt.event === 'generate_image_end') {
            // 최소 로딩 시간 계산 (2초)
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 2000 - elapsed);

            if (remaining > 0) {
              await new Promise((resolve) => setTimeout(resolve, remaining));
            }
            return;
          }
          if (evt.event === 'error') {
            const message = evt.message || '알 수 없는 오류가 발생했습니다.';
            toast({
              title: '사진 생성에 실패했습니다.',
              description: message,
              variant: 'destructive',
              duration: 3000,
            });
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
        toast({
          title: '사진 생성에 실패했습니다.',
          description: '알 수 없는 오류가 발생했습니다.',
          variant: 'destructive',
          duration: 3000,
        });
      }
    } finally {
      // 최소 로딩 시간 계산 (2초)
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 2000 - elapsed);

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }
      reader?.cancel();
      setIsLoading(false);
    }
  }, [hasLeftConnection, id, pid, queryClient, setNodes, getConnectedNodesData, toast]);

  return {
    imageUrl,
    isLoading,
    hasLeftConnection,
    generateImage,
  };
};
