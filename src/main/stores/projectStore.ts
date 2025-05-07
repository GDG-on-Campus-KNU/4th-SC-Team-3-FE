import { create } from 'zustand';

interface ProjectState {
  pid: number | null;
  projectName: string | null;
  setProjectName: (name: string | null) => void;
  setPid: (pid: number | null) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  pid: null,
  projectName: null,
  setProjectName: (name) => set({ projectName: name }),
  setPid: (pid) => set({ pid }),
}));

export default useProjectStore;
