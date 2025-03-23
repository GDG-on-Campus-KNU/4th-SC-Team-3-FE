import { Routes, Route } from 'react-router-dom';

import { RootLayout } from '@/global/layouts/RootLayout';
import { AuthLayout } from '@/auth/layouts/AuthLayout';

import HomePage from '@/home/pages/HomePage';
import LandingPage from '@/auth/pages/LandingPage';
import SignInPage from '@/auth/pages/SignInPage';
import SignUpPage from '@/auth/pages/SignUpPage';
import PipyPage from '@/home/pages/PipyPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="pipu" element={<PipyPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};
