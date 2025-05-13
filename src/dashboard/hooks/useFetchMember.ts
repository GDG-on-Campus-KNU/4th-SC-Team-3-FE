import { fetchMember, MemberData } from '@/dashboard/api/fetchMember';
import { useQuery } from '@tanstack/react-query';

export const useFetchMember = () => {
  const query = useQuery<MemberData, Error>({
    queryKey: ['member'],
    queryFn: fetchMember,
  });

  return {
    member: query.data,
    isFirstLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};
