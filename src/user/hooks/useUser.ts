import { UserModel } from '@/user/api/user-response.ts';
import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/user/api/user-api.ts';

interface UserState {
  user?: UserModel;
  error: unknown;
}
export function useUser(): UserState {
  const { data, error } = useQuery<UserModel, UserModel>({
    queryKey: ['userInfo'],
    enabled: localStorage.getItem('accessToken') !== null, // 토큰이 없으면 쿼리를 실행x
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 60, // 1시간동안 캐시 유지
  });
  return {
    user: data,
    error: error,
  };
}
