import { Routes, Route } from 'react-router-dom';

import HomePage from '@/main/pages/HomePage';

import SignInPage from '@/auth/pages/SignInPage';
import DashBoardPage from '@/dashboard/pages/DashBoardPage';
import { RootLayout } from '@/global/layouts/RootLayout';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route path='' element={<DashBoardPage />} />
        <Route path='main/:pid' element={<HomePage />} />
        <Route path='signin' element={<SignInPage />} />
      </Route>
    </Routes>
  );
};
