import { axiosClient } from '@/global/api/axios';

export interface MemberData {
  memberId: number;
  name: string;
  picture: string | null;
}

export async function fetchMember(): Promise<MemberData> {
  const response = await axiosClient.get('/member');
  return response.data;
}
