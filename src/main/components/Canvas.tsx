import { useCallback } from 'react';

import { edgeTypes } from '../lib/edge.type';
import { nodeTypes } from '../lib/node.type';
import useDnDStore from '../stores/DnDStore';
import {
  ReactFlow,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [];
const initialEdges = [{ id: 'e1-2', type: 'smoothstep', source: '1', target: '2' }];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { type, modelName } = useDnDStore();
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

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
      console.log(nodes);
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
        onDrop={onDrop}
        onDragOver={onDragOver}
        attributionPosition='bottom-left'
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
