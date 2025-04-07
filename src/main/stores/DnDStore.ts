import { create } from 'zustand';

interface DnDState {
  nodeType: string | undefined;
  modelName: string | undefined;
  categoryName: string | undefined;
  categoryValue: string | undefined;
  setCategoryName: (categoryName: string | undefined) => void;
  setCategoryValue: (categoryValue: string | undefined) => void;
  setNodeType: (type: string | undefined) => void;
  setModelName: (modelName: string | undefined) => void;
}

const useDnDStore = create<DnDState>((set) => ({
  nodeType: undefined,
  modelName: undefined,
  categoryName: undefined,
  categoryValue: undefined,
  setCategoryName: (categoryName) => set({ categoryName }),
  setCategoryValue: (categoryValue) => set({ categoryValue }),
  setNodeType: (nodeType) => set({ nodeType }),
  setModelName: (modelName) => set({ modelName }),
}));

export default useDnDStore;
