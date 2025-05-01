import { useCallback } from 'react';

export const useFlowDragOverHandler = () => {
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return onDragOver;
};
