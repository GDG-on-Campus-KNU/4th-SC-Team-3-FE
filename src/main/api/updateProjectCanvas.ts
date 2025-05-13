import { axiosClient } from '@/global/api/axios';

export const updateProjectCanvas = async (projectId: string, patch: any) => {
  try {
    await axiosClient.patch(`/projects/${projectId}/canvas`, patch, {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    });
  } catch (error) {
    console.error('failed to update project: ', error);
    throw error; // 에러를 throw하여 호출된 쪽에서 처리하도록 합니다.
  }
};
