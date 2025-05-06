import { axiosClient } from '@/global/api/axios';

export interface Project {
  projectId: number;
  name: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchProjectList = async (): Promise<Project[]> => {
  try {
    const response = await axiosClient.get<Project[]>('/projects');
    console.log('프로젝트 목록:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로젝트 목록 조회 실패:', error);
    return [];
  }
};
