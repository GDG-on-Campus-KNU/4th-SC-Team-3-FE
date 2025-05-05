import { axiosClient } from '@/global/api/axios';

export const uploadProjectThumbnail = async (projectId: string, file: File) => {
  const formData = new FormData();
  formData.append('thumbnail', file);

  try {
    await axiosClient.put(`/projects/${projectId}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('✅ 썸네일 업로드 성공');
  } catch (error) {
    console.error('❌ 썸네일 업로드 실패:', error);
    throw error; // 에러를 throw하여 호출된 쪽에서 처리하도록 합니다.
  }
};
