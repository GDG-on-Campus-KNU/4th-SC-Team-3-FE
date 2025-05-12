import { useState } from 'react';

import { X } from 'lucide-react';

import useSelectedObjectStore from '@/main/stores/selectObjectStore';

import { EdgeLabelRenderer, getSmoothStepPath, useReactFlow, type EdgeProps } from '@xyflow/react';

export default function TextEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [hovered, setHovered] = useState(false);
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
  };

  return (
    <>
      <defs>
        <filter id='edge-shadow' x='-100%' y='-100%' width='300%' height='300%'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='6' result='blur' />
          <feOffset in='blur' dx='0' dy='0' result='offsetBlur' />
          <feFlood floodColor='#333333' floodOpacity='0.6' result='color' />
          <feComposite in='color' in2='offsetBlur' operator='in' result='shadow' />
          <feMerge>
            <feMergeNode in='shadow' />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>
      <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* 그림자 path - 항상 렌더하고 투명도로 제어 */}
        <path
          d={edgePath}
          fill='none'
          stroke='#3A7DE8'
          strokeWidth={18}
          strokeOpacity={0.3}
          filter='url(#edge-shadow)'
          style={{
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />

        {/* 실선 path */}
        <path d={edgePath} fill='none' stroke='#3A7DE8' strokeWidth={16} />
        <EdgeLabelRenderer>
          {labelX - sourceX > 56 &&
            ((sourceY > targetY && sourceY - targetY > 28) ||
              (sourceY < targetY && targetY - sourceY > 28)) && (
              <div
                style={{
                  transform: `translate(${labelX - 28}px,${sourceY - 13}px)`,
                  zIndex: selectedId === id ? 1000 : 0,
                }}
                className='nodrag nopan absolute h-[30px] w-[8px] bg-[#3A7DE8]'
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
                className='nodrag nopan absolute h-[30px] w-[8px] bg-[#3A7DE8]'
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
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${labelX - 15}px,${targetY - 28}px)`,
                  }}
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
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
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${labelX - 15}px,${targetY + 28}px)`,
                  }}
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
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
                className='nodrag nopan absolute h-[30px] w-[8px] bg-[#3A7DE8]'
              />
              <div
                style={{
                  zIndex: selectedId === id ? 1000 : 0,
                  transform: `translate(${targetX + 8}px,${labelY - 15}px)`,
                }}
                className='nodrag nopan absolute h-[30px] w-[8px] bg-[#3A7DE8]'
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
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${targetX - 35}px,${labelY - 34}px)`,
                  }}
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
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
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
                />
                <div
                  style={{
                    zIndex: selectedId === id ? 1000 : 0,
                    transform: `translate(${targetX - 35}px,${labelY + 28}px)`,
                  }}
                  className='nodrag nopan absolute h-[8px] w-[30px] bg-[#3A7DE8]'
                />
              </>
            )}

          {selectedId === id && (
            <button
              className='flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full bg-[#E65429]'
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
