import React from 'react';

import { Settings } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  projectName,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-96 rounded-xl bg-white p-6 shadow-lg'>
        <h2 className='mb-2 flex items-center text-lg font-semibold'>
          '
          <span
            className='br-0 mr-0 pr-0'
            style={{
              display: 'inline-block',
              maxWidth: '57%', // 최대 너비 설정
              whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
              overflow: 'hidden', // 넘치는 텍스트 숨기기
              textOverflow: 'ellipsis', // 넘치는 텍스트에 '...' 표시
            }}
          >
            {projectName}
          </span>
          ' 프로젝트 삭제
        </h2>

        <p className='mb-1 text-sm text-gray-700'>해당 프로젝트를 삭제하시겠습니까?</p>
        <p className='mb-6 text-sm text-gray-500'>삭제를 하면 프로젝트를 복구할 수 없습니다.</p>
        <div className='flex justify-end gap-2'>
          <button
            onClick={onClose}
            // className='group flex scale-100 transform items-center justify-center gap-2 rounded-lg bg-[#e24646] px-4 py-2 text-sm text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]'
            className='group flex scale-100 transform rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:scale-[1.02] hover:bg-gray-200'
          >
            취소하기
          </button>

          <button
            onClick={onConfirm}
            className='group flex scale-100 transform items-center justify-center gap-2 rounded-lg bg-[#e24646] px-4 py-2 text-sm text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]'
          >
            삭제하기
            <Settings className='h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180' />
          </button>
        </div>
      </div>
    </div>
  );
};
