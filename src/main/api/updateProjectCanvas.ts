import { axiosClient } from '@/global/api/axios';

export const updateProjectCanvas = async (projectId: string, patch: any) => {
  try {
    await axiosClient.patch(`/projects/${projectId}/canvas`, patch, {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    });
    console.log('✅ 캔버스 업데이트 성공');
  } catch (error) {
    console.error('❌ 캔버스 업데이트 실패:', error);
    throw error; // 에러를 throw하여 호출된 쪽에서 처리하도록 합니다.
  }
};
