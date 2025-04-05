import { getSmoothStepPath, Position } from '@xyflow/react';
import { ConnectionLineComponentProps, EdgeLabelRenderer } from '@xyflow/react';

export default function CustomConnectionLine({
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
      <path d={edgePath} fill='none' stroke='#3A7DE8' strokeWidth={16} />
      <EdgeLabelRenderer>
        {labelX - fromX > 56 &&
          ((fromY > toY && fromY - toY > 28) || (fromY < toY && toY - fromY > 28)) && (
            <div
              style={{
                transform: `translate(${labelX - 28}px,${fromY - 13}px)`,
              }}
              className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
            />
          )}
        {toX - labelX > 56 &&
          ((fromY > toY && fromY - toY > 28) || (fromY < toY && toY - fromY > 28)) && (
            <div
              style={{
                transform: `translate(${labelX + 28}px,${toY - 15}px)`,
              }}
              className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
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
                className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
              />
              <div
                style={{
                  transform: `translate(${labelX - 15}px,${toY - 28}px)`,
                }}
                className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
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
                className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
              />
              <div
                style={{
                  transform: `translate(${labelX - 15}px,${toY + 28}px)`,
                }}
                className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
              />
            </>
          )}
        {fromX > toX && fromX - toX > 60 && (
          <>
            <div
              style={{
                transform: `translate(${fromX - 14}px,${labelY - 15}px)`,
              }}
              className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
            />
            <div
              style={{
                transform: `translate(${toX + 8}px,${labelY - 15}px)`,
              }}
              className='w-[8px] h-[30px] bg-[#3A7DE8] absolute nodrag nopan'
            />
          </>
        )}
        {fromX > toX && fromX - toX > 10 && fromY > toY && fromY - toY > 100 && (
          <>
            <div
              style={{
                transform: `translate(${fromX + 5}px,${labelY + 28}px)`,
              }}
              className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
            />
            <div
              style={{
                transform: `translate(${toX - 35}px,${labelY - 34}px)`,
              }}
              className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
            />
          </>
        )}

        {fromX > toX && fromX - toX > 10 && fromY < toY && toY - fromY > 100 && (
          <>
            <div
              style={{
                transform: `translate(${fromX + 5}px,${labelY - 28}px)`,
              }}
              className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
            />
            <div
              style={{
                transform: `translate(${toX - 35}px,${labelY + 28}px)`,
              }}
              className='w-[30px] h-[8px] bg-[#3A7DE8] absolute nodrag nopan'
            />
          </>
        )}
      </EdgeLabelRenderer>
    </g>
  );
}
