import { axiosClient } from '@/global/api/axios';

export async function deleteProject(projectId: string): Promise<void> {
  try {
    await axiosClient.delete(`/api/projects/${projectId}`);
  } catch (error) {
    console.error('프로젝트 삭제 중 오류 발생:', error);
    throw error;
  }
}
