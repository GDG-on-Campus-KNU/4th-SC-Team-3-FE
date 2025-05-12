import { fetchMember, MemberData } from '@/dashboard/api/fetchMember';
import { useQuery } from '@tanstack/react-query';

export const useFetchMember = () => {
  const {
    data: member,
    isLoading,
    isError,
  } = useQuery<MemberData, Error>({
    queryKey: ['member'],
    queryFn: fetchMember,
  });

  return { member, isLoading, isError };
};
