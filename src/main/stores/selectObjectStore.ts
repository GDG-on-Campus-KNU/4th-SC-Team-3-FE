import { create } from 'zustand';

interface SelectedObject {
  selectedId: string | undefined;
  setSelectedId: (selectedId: string | undefined) => void;
}

const useSelectedObjectStore = create<SelectedObject>((set) => ({
  selectedId: undefined,
  setSelectedId: (selectedId: string | undefined) => set({ selectedId }),
}));

export default useSelectedObjectStore;
