import { create } from 'zustand';

interface DnDState {
  nodeType: string | undefined;
  modelName: string | undefined;
  setNodeType: (type: string | undefined) => void;
  setModelName: (modelName: string | undefined) => void;
}

const useDnDStore = create<DnDState>((set) => ({
  nodeType: undefined,
  modelName: undefined,
  setNodeType: (nodeType) => set({ nodeType }),
  setModelName: (modelName) => set({ modelName }),
}));

export default useDnDStore;
