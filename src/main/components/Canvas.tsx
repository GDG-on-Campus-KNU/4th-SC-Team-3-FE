import react, { useCallback } from 'react';

import { UUID } from 'crypto';

import { MyNode } from '../lib/initialElements';
import CategoryNode from './CategoryNode';
import ImageNode from './ImageNode';
import TextNode from './TextNode';
import {
  ReactFlow,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  SmoothStepEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  text: TextNode,
  category: CategoryNode,
  image: ImageNode,
};

const edgeTypes = {
  smoothStep: SmoothStepEdge,
};

const initialNodes: MyNode[] = [
  { id: '1', type: 'text', position: { x: 0, y: 0 }, data: { text: '1' } },
  { id: '2', type: 'text', position: { x: 300, y: 300 }, data: { text: undefined } },
];
const initialEdges = [{ id: 'e1-2', type: 'smoothstep', source: '1', target: '2' }];

export default function Canvas(props: { selectedType: string | null }) {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

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
        attributionPosition='bottom-left'
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
