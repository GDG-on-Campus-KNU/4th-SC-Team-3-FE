import { axiosClient } from '@/global/api/axios';

export const analyzeTextNode = async (content: string) => {
  try {
    const response = await axiosClient.post('/nodes/analyze', {
      content,
    });
    return response.data;
  } catch (error) {
    console.error('failed to analyze nodes:', error);
    throw error;
  }
};
