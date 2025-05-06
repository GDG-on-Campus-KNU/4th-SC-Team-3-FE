// components/CreateProjectModal.tsx
import React from 'react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  name: string;
  onNameChange: (value: string) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  name,
  onNameChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-96 rounded-xl bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-lg font-semibold'>새 프로젝트 이름 입력</h2>
        <input
          type='text'
          className='w-full rounded-md border p-2 text-sm'
          placeholder='프로젝트 이름을 입력하세요'
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <div className='mt-4 flex justify-end gap-2'>
          <button
            className='rounded-md bg-[#E65429] px-4 py-2 text-sm text-white hover:bg-[#cc4320]'
            onClick={onClose}
          >
            취소
          </button>
          <button
            className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
            onClick={onCreate}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
};
