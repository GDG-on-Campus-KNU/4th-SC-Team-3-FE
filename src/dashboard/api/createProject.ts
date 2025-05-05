import { useNavigate } from 'react-router-dom';

import { FlowSnapshot } from '../../global/api/snapshot';
import { axiosClient } from '@/global/api/axios';

export async function createProject(navigate: ReturnType<typeof useNavigate>, name: string) {
  const snapshot: FlowSnapshot = {
    pid: 0,
    name,
    timestamp: new Date().toISOString(),
    snapshot: {
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
    },
  };

  try {
    const response = await axiosClient.post('/projects', {
      name,
      canvas: JSON.stringify(snapshot.snapshot),
    });

    snapshot.pid = response.data.projectId;
    localStorage.setItem('flow_latest', JSON.stringify(snapshot));
    navigate(`/main/${response.data.projectId}`);
  } catch (err) {
    console.error('Failed to upload snapshot to server:', err);
  }
}
