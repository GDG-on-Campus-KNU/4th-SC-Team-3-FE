import { useCallback, useEffect } from 'react';

import { CategoryItemData } from '../components/nodes/category/CategoryNode';
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
  addEdge,
  useReactFlow,
  Node,
  Edge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { selectedId, setSelectedId } = useSelectedObjectStore();

  const { nodeType, modelName } = useDnDStore();
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'textEdge' }, eds)),
    [],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // 드래그한 item 정보 dataTransfer 객체에서 꺼냄

      const raw = event.dataTransfer.getData('application/reactflow-item');
      if (nodeType === 'categoryItem' && raw) {
        const item = JSON.parse(raw) as CategoryItemData;

        // 새 CategoryItemNode 생성

        const newNode: Node = {
          id: item.id,
          type: 'categoryItem',
          position,
          data: {
            name: item.name,
            value: item.value,
          },
          draggable: true,
        };

        // 기존 부모 CategoryNode에서 해당 item 제거

        setNodes((nds) => {
          const updated = nds.map((node) => {
            if (node.id === item.parentId && Array.isArray(node.data?.categories)) {
              return {
                ...node,
                data: {
                  ...node.data,
                  categories: (node.data.categories as CategoryItemData[]).filter(
                    (c: CategoryItemData) => c.id !== item.id,
                  ),
                },
              };
            }
            return node;
          });

          return [...updated, newNode];
        });

        return;
      }

      const newNode: Node = {
        id: getId(),
        type: nodeType,
        position,
        data: { model: modelName, data: null },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, nodeType, modelName, setNodes],
  );

  useEffect(() => {
    edges
      .filter((edge) => edge.id !== selectedId)
      .map((edge) => {
        edge.zIndex = 0;
      });
    edges
      .filter((edge) => edge.id === selectedId)
      .map((edge) => {
        edge.zIndex = 1000;
      });
    setEdges((edges) => [...edges]);

    console.log('selectedId', selectedId);
  }, [selectedId, setSelectedId, edges]);

  return (
    <div className={`relative h-full w-full`}>
      <ReactFlow
        nodes={nodes}
        edges={edges.map((edge) => ({
          ...edge,
          style: { zIndex: selectedId === edge.id ? 1000 : 0 },
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        minZoom={0.1}
        maxZoom={5}
        onNodeClick={(_, node) => setSelectedId(node.id)}
        onEdgeClick={(_, edge) => {
          setSelectedId(edge.id);
          edges
            .filter((edge) => edge.id !== selectedId)
            .map((edge) => {
              edge.zIndex = 0;
            });
          edges
            .filter((edge) => edge.id === selectedId)
            .map((edge) => {
              edge.zIndex = 1000;
            });
        }}
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
