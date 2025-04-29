import { X } from 'lucide-react';

import useSelectedObjectStore from '@/main/stores/selectObjectStore';

import { EdgeLabelRenderer, getSmoothStepPath, useReactFlow, type EdgeProps } from '@xyflow/react';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 5,
  });
  const { selectedId } = useSelectedObjectStore();

  const onButtonClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
    console.log(edgePath);
  };

  return (
    <>
      <g style={{ zIndex: selectedId === id ? 1000 : 0 }}>
        <path
          style={{ zIndex: selectedId === id ? 1000 : 0 }}
          d={edgePath}
          fill='none'
          stroke='#3A7DE8'
          strokeWidth={16}
        />
        <EdgeLabelRenderer>
          {labelX - sourceX > 56 &&
            ((sourceY > targetY && sourceY - targetY > 28) ||
              (sourceY < targetY && targetY - sourceY > 28)) && (
              <div
                style={{
                  transform: `translate(${labelX - 28}px,${sourceY - 13}px)`,
                  zIndex: selectedId === id ? 1000 : 0,
                }}
                className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
              />
            )}
          {targetX - labelX > 56 &&
            ((sourceY > targetY && sourceY - targetY > 28) ||
              (sourceY < targetY && targetY - sourceY > 28)) && (
              <div
                style={{
                  zIndex: selectedId === id ? 1000 : 0,
                  transform: `translate(${labelX + 28}px,${targetY - 15}px)`,
                }}
                className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
              />
            )}
          {labelY - sourceY > 56 &&
            targetX > sourceX &&
            ((sourceX > targetX && sourceX - targetX > 50) ||
              (sourceX < targetX && targetX - sourceX > 50)) && (
              <>
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${labelX - 15}px,${sourceY + 28}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${labelX - 15}px,${targetY - 28}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
              </>
            )}
          {labelY - targetY > 56 &&
            targetX > sourceX &&
            ((sourceX > targetX && sourceX - targetX > 50) ||
              (sourceX < targetX && targetX - sourceX > 50)) && (
              <>
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${labelX - 15}px,${sourceY - 28}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${labelX - 15}px,${targetY + 28}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
              </>
            )}
          {sourceX > targetX && sourceX - targetX > 60 && (
            <>
              <div
                style={{
                  zIndex: selectedId === id ? 1000 : 0,
                  transform: `translate(${sourceX - 14}px,${labelY - 15}px)`,
                }}
                className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
              />
              <div
                style={{
                  zIndex: selectedId === id ? 1000 : 0,
                  transform: `translate(${targetX + 8}px,${labelY - 15}px)`,
                }}
                className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
              />
            </>
          )}
          {sourceX > targetX &&
            sourceX - targetX > 10 &&
            sourceY > targetY &&
            sourceY - targetY > 100 && (
              <>
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${sourceX + 5}px,${labelY + 28}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${targetX - 35}px,${labelY - 34}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
              </>
            )}

          {sourceX > targetX &&
            sourceX - targetX > 10 &&
            sourceY < targetY &&
            targetY - sourceY > 100 && (
              <>
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${sourceX + 5}px,${labelY - 28}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${targetX - 35}px,${labelY + 28}px)`,
                  }}
                  className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
                />
              </>
            )}

          {selectedId === id && (
            <button
              className='w-[26px] h-[26px] cursor-pointer rounded-full bg-[#E65429] flex justify-center items-center'
              style={{
                position: 'absolute',
                zIndex: 1000,
                pointerEvents: 'auto',
                transform: `translate(-13px, -13px) translate(${labelX}px,${labelY}px)`,
              }}
              onClick={onButtonClick}
            >
              <X className='text-white' size={20} />
            </button>
          )}
        </EdgeLabelRenderer>
      </g>
    </>
  );
}
