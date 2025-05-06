// components/DeleteConfirmModal.tsx
import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-96 rounded-xl bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-lg font-semibold'>프로젝트 삭제</h2>
        <p className='mb-6 text-sm text-gray-700'>
          이 프로젝트를 정말 삭제하시겠습니까? 복구할 수 없습니다.
        </p>
        <div className='flex justify-end gap-2'>
          <button
            className='rounded-md bg-gray-300 px-4 py-2 text-sm hover:bg-gray-400'
            onClick={onClose}
          >
            취소
          </button>
          <button
            className='rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600'
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
