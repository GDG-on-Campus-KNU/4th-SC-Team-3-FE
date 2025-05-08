import { axiosClient } from '@/global/api/axios';

export async function deleteProject(projectId: number): Promise<void> {
  try {
    await axiosClient.delete(`/projects/${projectId}`);

    const raw = localStorage.getItem('flow-thumbnails');
    if (!raw) return;

    const thumbnails = JSON.parse(raw);

    console.log('✅ 삭제 전:', thumbnails);

    const filtered = thumbnails.filter((item: any) => {
      console.log('❓ 비교:', item.projectId, String(projectId));
      return item.projectId !== String(projectId); // 문자열 비교
    });

    console.log('✅ 삭제 후:', filtered);

    localStorage.setItem('flow-thumbnails', JSON.stringify(filtered));
  } catch (error) {
    console.error('프로젝트 삭제 중 오류 발생:', error);
    throw error;
  }
}
