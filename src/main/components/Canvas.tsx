import { useCallback, useEffect, useRef, useState } from 'react';

import { CategoryItemData } from '../components/nodes/category/CategoryNode';
import { useConnectHandler } from '../hooks/handle/useConnectHandler';
import { useEdgeClickHandler } from '../hooks/handle/useEdgeClickHandler';
import { useFlowDragOverHandler } from '../hooks/handle/useFlowDragOverHandler';
import { useFlowDropHandler } from '../hooks/handle/useFlowDropHandler';
import { useSyncFlow } from '../hooks/sync/useSyncFlow';
import { useTimeStampToLocalStorage } from '../hooks/sync/useTimeStampToLocalStorage';
import { useUpdateFlow } from '../hooks/sync/useUpdateFlow';
import { useHighlightSelectedEdge } from '../hooks/useHighlightSelectedEdge';
import { edgeTypes } from '../lib/edge.type';
import { nodeTypes } from '../lib/node.type';
import useDnDStore from '../stores/DnDStore';
import useSelectedObjectStore from '../stores/selectObjectStore';
import CustomConnectionLine from './edges/text/TextConnectionLine';
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

  const { selectedId, setSelectedId } = useSelectedObjectStore();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // 서버&로컬스토리지 로드 -> 최신값 선택 -> 상호 동기화 커스텀 훅
  useSyncFlow(reactFlowInstance, setNodes, setEdges);

  // 로컬 스토리지에 마지막 변경 시각을 기록하는 커스텀 훅
  useTimeStampToLocalStorage(reactFlowInstance, nodes, edges);

  // 10초마다 timestamp 비교 및 썸네일 서버 전송 커스텀 훅
  useUpdateFlow(wrapperRef);

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
        minZoom={0.1}
        maxZoom={5}
        onNodeClick={(_, node) => setSelectedId(node.id)}
        onEdgeClick={useEdgeClickHandler(edges, setEdges, setSelectedId)}
        onPaneClick={() => setSelectedId(undefined)}
        connectionLineComponent={CustomConnectionLine}
        onNodeDragStop={(_, node) => setSelectedId(node.id)}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
