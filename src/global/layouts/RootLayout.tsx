import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import logo from '../../assets/logo.svg';

export const RootLayout = () => {
  return (
    <div className='h-screen w-screen overflow-hidden fixed'>
      <div className='h-12 bg-bgCanvasWhite sticky top-0 z-50'>
        <div className='h-full flex items-center px-4 gap-5 border-b border-b-[#BBBBBB]'>
          <img src={logo} alt='logo' className='h-8' />
          <h1 className='text-2xl font-bold'>PIPY</h1>
        </div>
      </div>
      <div className='h-[calc(100dvh-3rem)] overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
};
