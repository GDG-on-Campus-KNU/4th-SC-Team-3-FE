import React, { useEffect, useRef } from 'react';

import pipe3 from '../../../assets/signin/img-pipe3.png';

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

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div ref={modalRef} className='w-96 rounded-2xl bg-white p-6 shadow-lg'>
        <div className='flex items-center'>
          <img src={pipe3} alt='logo' className='mb-3 mr-2 h-7 w-7' />
          <h2 className='mb-4 text-xl font-semibold'>새 프로젝트 만들기</h2>
        </div>
        <input
          type='text'
          className='h-10 w-full rounded-lg bg-gray-200 p-2 text-sm placeholder:text-gray-600 focus:border-none focus:placeholder-transparent focus:outline-none focus:ring-0'
          placeholder='프로젝트 이름을 입력해주세요'
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />

        <button
          className='mt-2 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-pipy-blue'
          onClick={onCreate}
        >
          프로젝트 생성하기
        </button>
      </div>
    </div>
  );
};
