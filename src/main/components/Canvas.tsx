import { useCallback } from 'react';

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
  const { setSelectedId } = useSelectedObjectStore();

  const { type, modelName } = useDnDStore();
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

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: type,
        position,
        data: { model: modelName, data: null },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, modelName],
  );

  return (
    <div className={`w-full h-full relative`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
        onEdgeClick={(_, edge) => setSelectedId(edge.id)}
        onPaneClick={() => setSelectedId(undefined)}
        connectionLineComponent={CustomConnectionLine}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
