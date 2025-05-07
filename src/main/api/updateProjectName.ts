import { axiosClient } from '@/global/api/axios';

export const updateProjectName = async (projectId: number, newName: string) => {
  const response = await axiosClient.put(`/projects/${projectId}/name`, { name: newName });
  return response.data;
};
