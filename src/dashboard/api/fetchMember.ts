import { axiosClient } from '@/global/api/axios';

export async function fetchMember() {
  try {
    const response = await axiosClient.get('/member');
    return response.data;
  } catch (err) {
    console.log('Error fetching member data:', err);
    return null;
  }
}
