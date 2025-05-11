import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
              maxWidth: '57%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {projectName}
          </span>
          ' {t('modal.deleteProject.title')}
        </h2>

        <p className='mb-1 text-sm text-gray-700'>{t('modal.deleteProject.description')}</p>
        <p className='mb-6 text-sm text-gray-500'>{t('modal.deleteProject.description2')}</p>

        <div className='flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='group flex scale-100 transform rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-700 hover:scale-[1.02]'
          >
            {t('modal.deleteProject.cancel')}
          </button>

          <button
            onClick={onConfirm}
            className='group flex scale-100 transform items-center justify-center gap-2 rounded-lg bg-[#e24646] px-4 py-2 text-sm text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]'
          >
            {t('modal.deleteProject.delete')}
            <Settings className='h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-180' />
          </button>
        </div>
      </div>
    </div>
  );
};
