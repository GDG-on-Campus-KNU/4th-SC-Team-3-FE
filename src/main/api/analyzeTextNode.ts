import { axiosClient } from '@/global/api/axios';

export const analyzeTextNode = async (content: string) => {
  try {
    const response = await axiosClient.post('/nodes/analyze', {
      content,
    });
    return response.data;
  } catch (error) {
    console.error('❌ 노드 분석 실패:', error);
    throw error;
  }
};
