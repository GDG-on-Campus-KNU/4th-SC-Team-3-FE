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
    const serverProjects = response.data;

    const localData = localStorage.getItem('flow-thumbnails');
    const localThumbnails: {
      projectId: string;
      thumbnail: string;
      timestamp: number;
    }[] = localData ? JSON.parse(localData) : [];

    const mergedProjects = serverProjects.map((project) => {
      const local = localThumbnails.find((t) => t.projectId === project.projectId.toString());
      if (local && !project.thumbnail) {
        return {
          ...project,
          thumbnail: local.thumbnail,
        };
      } else if (local && local.timestamp > new Date(project.updatedAt).getTime() - 10 * 1000) {
        return {
          ...project,
          thumbnail: local.thumbnail, // 최신이 로컬일 경우 덮어쓰기
        };
      }

      return project;
    });

    return mergedProjects;
  } catch (error) {
    console.error('failed to load projects: ', error);
    return [];
  }
};
