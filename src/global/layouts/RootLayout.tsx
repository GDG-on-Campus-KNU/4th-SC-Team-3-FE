import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import useProjectStore from '@/main/stores/projectStore';

import logo from '../../assets/logo.svg';

export const RootLayout = () => {
  const { projectName, setProjectName } = useProjectStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(projectName);
  const location = useLocation();
  const isCanvasPath = location.pathname.startsWith('/main');

  const handleSave = () => {
    setProjectName(editedName!.trim());

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedName(projectName);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setEditedName(projectName);
  }, [projectName]);

  return (
    <div className='fixed h-screen w-screen overflow-hidden'>
      <div className='bg-bgCanvasWhite sticky top-0 z-50 h-12'>
        <div className='flex h-full items-center gap-5 border-b border-b-[#BBBBBB] px-4'>
          <Link to='/' className='flex items-center gap-5 transition-opacity hover:opacity-80'>
            <img src={logo} alt='logo' className='h-8' />
            <h1 className='text-2xl font-bold'>PIPY</h1>
          </Link>
          {isCanvasPath && (
            <div className='flex items-center pt-1'>
              {isEditing ? (
                <input
                  ref={inputRef}
                  value={editedName ? editedName : ''}
                  autoFocus
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSave}
                  autoComplete='off'
                  autoCorrect='off'
                  autoCapitalize='off'
                  spellCheck={false}
                  className='w-32 border-b border-gray-300 bg-transparent pl-0.5 text-base font-semibold focus:outline-none'
                />
              ) : (
                <h2
                  className='cursor-pointer rounded-md p-0.5 text-base font-semibold text-[#303030] hover:bg-gray-200'
                  onClick={() => setIsEditing(true)}
                >
                  {projectName || ''}
                </h2>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='h-[calc(100dvh-3rem)] overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
};
