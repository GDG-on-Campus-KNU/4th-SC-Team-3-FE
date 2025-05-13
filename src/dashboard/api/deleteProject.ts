import { axiosClient } from '@/global/api/axios';

export async function deleteProject(projectId: number): Promise<void> {
  try {
    await axiosClient.delete(`/projects/${projectId}`);

    const raw = localStorage.getItem('flow-thumbnails');
    if (!raw) return;

    const thumbnails = JSON.parse(raw);

    const filtered = thumbnails.filter((item: any) => {
      return item.projectId !== String(projectId); // 문자열 비교
    });

    localStorage.setItem('flow-thumbnails', JSON.stringify(filtered));
  } catch (error) {
    console.error('error while saving project:', error);
    throw error;
  }
}
