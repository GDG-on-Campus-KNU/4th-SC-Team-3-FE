import { useCallback, useEffect, useRef, useState } from 'react';

import connectionLineTypeHandler from '../api/connectionLineTypeHandler';
import { CategoryItemData } from '../components/nodes/category/CategoryNode';
import { useConnectHandler } from '../hooks/handle/useConnectHandler';
import { useEdgeClickHandler } from '../hooks/handle/useEdgeClickHandler';
import { useFlowDragOverHandler } from '../hooks/handle/useFlowDragOverHandler';
import { useFlowDropHandler } from '../hooks/handle/useFlowDropHandler';
import { useSyncFlow } from '../hooks/sync/useSyncFlow';
import { useThumbnailCache } from '../hooks/sync/useThumbnailCache';
import { useTimeStampToLocalStorage } from '../hooks/sync/useTimeStampToLocalStorage';
import { useUpdateFlow } from '../hooks/sync/useUpdateFlow';
import { useHighlightSelectedEdge } from '../hooks/useHighlightSelectedEdge';
import { useNodeDragHandler } from '../hooks/useNodeDragHandler';
import { useNodeDragStopHandler } from '../hooks/useNodeDragStopHandler';
import { edgeTypes } from '../lib/edge.type';
import { nodeTypes } from '../lib/node.type';
import useDnDStore from '../stores/DnDStore';
import useSelectedObjectStore from '../stores/selectObjectStore';
import {
  ReactFlow,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function Canvas() {
  const reactFlowInstance = useReactFlow();

  const { nodeType, modelName } = useDnDStore();

  const handleDropIntoCategory = (itemId: string, categoryId: string) => {
    setNodes((nds) => {
      const itemNode = nds.find((n) => n.id === itemId);
      if (!itemNode) return nds;

      return nds
        .filter((n) => n.id !== itemId)
        .map((n) => {
          if (n.id === categoryId && Array.isArray(n.data.categories)) {
            return {
              ...n,
              data: {
                ...n.data,
                categories: [
                  ...n.data.categories,
                  {
                    id: itemId,
                    name: (itemNode.data as unknown as CategoryItemData).name,
                    value: (itemNode.data as unknown as CategoryItemData).value,
                    parentId: categoryId,
                  },
                ],
              },
            };
          }
          return n;
        });
    });

    setEdges((eds) => eds.filter((e) => e.source !== itemId && e.target !== itemId));
  };

  const { selectedId, setSelectedId } = useSelectedObjectStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const onNodeDrag = useNodeDragHandler(setNodes);
  const onNodeDragStop = useNodeDragStopHandler(setNodes, handleDropIntoCategory);


  // 서버&로컬스토리지 로드 -> 최신값 선택 -> 상호 동기화 커스텀 훅
  // useSyncFlow(reactFlowInstance, setNodes, setEdges);

  // 로컬 스토리지에 마지막 변경 시각을 기록하는 커스텀 훅
  // useTimeStampToLocalStorage(reactFlowInstance, nodes, edges);

  // 10초마다 timestamp 비교 및 썸네일 서버 전송 커스텀 훅

  // const latestPngRef = useThumbnailCache(wrapperRef);

  // useUpdateFlow(wrapperRef, latestPngRef);

  // 노드가 선택되었을 때 해당 노드의 zIndex를 조정하는 커스텀 훅
  useHighlightSelectedEdge(selectedId, edges, setEdges);

  return (
    <div className={`relative h-full w-full`} ref={wrapperRef}>
      <ReactFlow
        nodes={nodes}
        edges={edges.map((edge) => ({
          ...edge,
          style: { zIndex: selectedId === edge.id ? 1000 : 0 },
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={useConnectHandler(setEdges)}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={useFlowDragOverHandler()}
        onDrop={useFlowDropHandler(reactFlowInstance, nodeType, modelName, setNodes)}
        onNodeDrag={(e, node) => onNodeDrag(e as any, node)}
        onNodeDragStop={(e, node) => onNodeDragStop(e as any, node)}
        minZoom={0.1}
        maxZoom={5}
        onNodeClick={(_, node) => setSelectedId(node.id)}
        onEdgeClick={useEdgeClickHandler(edges, setEdges, setSelectedId)}
        onPaneClick={() => setSelectedId(undefined)}
        connectionLineComponent={connectionLineTypeHandler}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
