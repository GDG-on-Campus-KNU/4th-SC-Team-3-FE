// import { useState, memo } from 'react';

// import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';

// export interface CategoryNodeItemData {
//   id: string;
//   position: { x: number; y: number };
//   data: {
//     name: string;
//     value: string;
//     parentId: string | null;
//   };
// }
// function CategoryItemNode({ id, data, isConnectable }: NodeProps<CategoryNodeItemData>) {
//   const { updateNodeData } = useReactFlow();
//   const [currentValue, setCurrentValue] = useState(data.value);

//   const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(e.target.value);
//   };

//   const handleBlur = () => {
//     if (currentValue !== data.value) {
//       updateNodeData(id, { ...data, value: currentValue });
//     }
//   };

//   // 드래그 시작 시 노드 ID 전달
//   const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
//     e.dataTransfer.setData('application/reactflow-node-id', id);
//     e.dataTransfer.effectAllowed = 'move';
//   };

//   return (
//     <div
//       className='flex w-64 flex-col rounded border border-gray-300 bg-white p-3 shadow-sm'
//       draggable
//       onDragStart={handleDragStart}
//     >
//       {/* CategoryItem 노드도 다른 노드와 연결 가능하도록 핸들 추가 (선택 사항) */}
//       <Handle
//         type='target'
//         position={Position.Left}
//         id={`${id}-target`}
//         style={{ background: '#ccc', width: 8, height: 12, left: -4 }}
//         isConnectable={isConnectable}
//       />
//       <Handle
//         type='source'
//         position={Position.Right}
//         id={`${id}-source`}
//         style={{ background: '#ccc', width: 8, height: 12, right: -4 }}
//         isConnectable={isConnectable}
//       />

//       <div className='mb-2 font-medium text-gray-700'>{data.name}</div>
//       <input
//         type='text'
//         value={currentValue}
//         onChange={handleValueChange}
//         onBlur={handleBlur} // 포커스 아웃 시 업데이트
//         className='nodrag w-full rounded border border-gray-300 p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500' // nodrag 클래스로 내부 요소 드래그 방지
//         placeholder='값 입력2'
//       />
//     </div>
//   );
// }

// export default memo(CategoryItemNode);
