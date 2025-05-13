import { fetchMember, MemberData } from '@/dashboard/api/fetchMember';
import { useQuery } from '@tanstack/react-query';

// 지연을 위한 유틸리티 함수
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useFetchMember = () => {
  const query = useQuery<MemberData | null, Error>({
    queryKey: ['member'],
    queryFn: async () => {
      try {
        const [member] = await Promise.all([fetchMember(), delay(400)]);
        return member;
      } catch (error) {
        await delay(400);
        return null;
      }
    },
    retry: false,
  });

  return {
    member: query.data || null,
    isFirstLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};
