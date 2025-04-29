import { axiosClient } from '@/global/api/axios.ts';
import { UserModel } from '@/user/api/user-response.ts';

/**
 * 현재 사용자 정보 가져오기
 * @returns {Promise<UserModel>} - 현재 사용자 정보
 */
export async function getMyInfo(): Promise<UserModel> {
  const useMockData = import.meta.env.VITE_USE_MOCK === 'true' || false;

  if (useMockData) {
    // 더미 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          username: '테스트',
          email: 'test@test.com',
          userType: 'Mentee',
        });
      }, 500);
    });
  }

  try {
    const response = await axiosClient.get<UserModel>('/api/users/me');
    return response.data; // response.data 반환
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
    console.error('Error fetching user info:', errorMessage);
    throw new Error('Failed to fetch user info');
  }
}
