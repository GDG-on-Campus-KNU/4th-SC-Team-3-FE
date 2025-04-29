import { create } from 'zustand';

interface CategoryItemData {
  id: string;
  name: string;
  value: string;
  parentId: string | null;
}
interface DnDState {
  nodeType: string | undefined;
  modelName: string | undefined;
  draggedItem: CategoryItemData | null;

  setNodeType: (type: string | undefined) => void;
  setModelName: (modelName: string | undefined) => void;
  setDraggedItem: (item: CategoryItemData | null) => void;
}

const useDnDStore = create<DnDState>((set) => ({
  nodeType: undefined,
  modelName: undefined,
  draggedItem: null,

  setNodeType: (nodeType) => set({ nodeType }),
  setModelName: (modelName) => set({ modelName }),
  setDraggedItem: (item) => set({ draggedItem: item }),
}));

export default useDnDStore;
