import { create } from 'zustand';

interface DnDState {
  type: string | undefined;
  modelName: string | undefined;
  setType: (type: string | undefined) => void;
  setModelName: (modelName: string | undefined) => void;
}

const useDnDStore = create<DnDState>((set) => ({
  type: undefined,
  modelName: undefined,
  setType: (type) => set({ type }),
  setModelName: (modelName) => set({ modelName }),
}));

export default useDnDStore;
