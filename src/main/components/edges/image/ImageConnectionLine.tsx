import { getSmoothStepPath, Position } from '@xyflow/react';
import { ConnectionLineComponentProps, EdgeLabelRenderer } from '@xyflow/react';

export default function ImageConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    borderRadius: 5,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    // centerY: (fromY + toY) / 2 + 45,
  });

  return (
    <g>
      <path d={edgePath} className='stroke-pipy-yellow' fill='none' strokeWidth={16} />
      <EdgeLabelRenderer>
        {labelX - fromX > 56 &&
          ((fromY > toY && fromY - toY > 28) || (fromY < toY && toY - fromY > 28)) && (
            <div
              style={{
                transform: `translate(${labelX - 28}px,${fromY - 13}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[30px] w-[8px] bg-pipy-yellow'
            />
          )}
        {toX - labelX > 56 &&
          ((fromY > toY && fromY - toY > 28) || (fromY < toY && toY - fromY > 28)) && (
            <div
              style={{
                transform: `translate(${labelX + 28}px,${toY - 15}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[30px] w-[8px] bg-pipy-yellow'
            />
          )}
        {labelY - fromY > 56 &&
          toX > fromX &&
          ((fromX > toX && fromX - toX > 50) || (fromX < toX && toX - fromX > 50)) && (
            <>
              <div
                style={{
                  transform: `translate(${labelX - 15}px,${fromY + 28}px)`,
                }}
                className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
              />
              <div
                style={{
                  transform: `translate(${labelX - 15}px,${toY - 28}px)`,
                }}
                className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
              />
            </>
          )}
        {labelY - toY > 56 &&
          toX > fromX &&
          ((fromX > toX && fromX - toX > 50) || (fromX < toX && toX - fromX > 50)) && (
            <>
              <div
                style={{
                  transform: `translate(${labelX - 15}px,${fromY - 28}px)`,
                }}
                className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
              />
              <div
                style={{
                  transform: `translate(${labelX - 15}px,${toY + 28}px)`,
                }}
                className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
              />
            </>
          )}
        {fromX > toX && fromX - toX > 60 && (
          <>
            <div
              style={{
                transform: `translate(${fromX - 14}px,${labelY - 15}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[30px] w-[8px] bg-pipy-yellow'
            />
            <div
              style={{
                transform: `translate(${toX + 8}px,${labelY - 15}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[30px] w-[8px] bg-pipy-yellow'
            />
          </>
        )}
        {fromX > toX && fromX - toX > 10 && fromY > toY && fromY - toY > 100 && (
          <>
            <div
              style={{
                transform: `translate(${fromX + 5}px,${labelY + 28}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
            />
            <div
              style={{
                transform: `translate(${toX - 35}px,${labelY - 34}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
            />
          </>
        )}

        {fromX > toX && fromX - toX > 10 && fromY < toY && toY - fromY > 100 && (
          <>
            <div
              style={{
                transform: `translate(${fromX + 5}px,${labelY - 28}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
            />
            <div
              style={{
                transform: `translate(${toX - 35}px,${labelY + 28}px)`,
              }}
              className='nodrag nopan absolute z-10 h-[8px] w-[30px] bg-pipy-yellow'
            />
          </>
        )}
      </EdgeLabelRenderer>
    </g>
  );
}
