import { Routes, Route } from 'react-router-dom';

import HomePage from '@/main/pages/HomePage';

import { AuthLayout } from '@/auth/layouts/AuthLayout';
import LandingPage from '@/auth/pages/LandingPage';
import SignInPage from '@/auth/pages/SignInPage';
import SignUpPage from '@/auth/pages/SignUpPage';
import { RootLayout } from '@/global/layouts/RootLayout';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route path='' element={<HomePage />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='' element={<LandingPage />} />
        <Route path='signin' element={<SignInPage />} />
        <Route path='signup' element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};
