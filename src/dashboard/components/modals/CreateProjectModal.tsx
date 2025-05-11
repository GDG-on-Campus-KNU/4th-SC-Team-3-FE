import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { X, Settings } from 'lucide-react';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
      <div ref={modalRef} className='relative w-[360px] rounded-xl bg-white p-6 shadow-xl'>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-400 hover:text-gray-700'
        >
          <X size={20} />
        </button>

        <div className='flex items-center'>
          <h2 className='mb-2 text-lg font-semibold'>{t('modal.createProject.title')}</h2>
        </div>

        <p className='mb-4 text-sm text-gray-500'>{t('modal.createProject.description')}</p>
        <input
          type='text'
          className='h-10 w-full rounded-lg border border-gray-400 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-pipy-blue'
          placeholder='Untitled'
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <div className='mt-4 flex justify-end'>
          <button
            onClick={onCreate}
            className='group flex scale-100 transform items-center justify-center gap-2 rounded-lg bg-pipy-blue px-4 py-2 text-sm text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]'
          >
            {t('modal.createProject.create')}
            <Settings className='h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180' />
          </button>
        </div>
      </div>
    </div>
  );
};
