import { Node, Edge, Viewport } from '@xyflow/react';

export interface FlowSnapshot {
  pid: number;
  name: string;
  timestamp: string; // ISO string
  snapshot: {
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
  };
}

export const DEFAULT_FLOW_SNAPSHOT: FlowSnapshot = {
  pid: 0,
  name: 'tester',
  timestamp: new Date().toISOString(),
  snapshot: {
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 0.75 },
  },
};
