import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PipyMoodBoard } from '../components/PipyMoodBoard';
import LogoGoogle from '@/assets/signin/logo-google.svg';
import { axiosClient } from '@/global/api/axios';

export default function SignInPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='fixed flex h-screen w-screen justify-center overflow-y-hidden bg-white'>
      <div className='flex w-full max-w-[80%] gap-[20%]'>
        <div className='mt-60 w-[40%] min-w-[400px]'>
          <h1 className='text-center text-3xl font-medium leading-tight'>
            {t('loginPrompt1')}
            <br />
            <span className='mt-2 block'>{t('loginPrompt2')}</span>
          </h1>

          <div className='mt-12 flex flex-col items-center'>
            <button
              onClick={() => {
                window.location.href = axiosClient.getUri({
                  url: '/auth/login/google',
                  params: { redirect: window.location.origin },
                });
              }}
              className='flex h-14 w-full items-center justify-center rounded-lg bg-black text-2xl text-white hover:bg-gray-800'
            >
              Log in with Google
              <img src={LogoGoogle} alt='Google Logo' className='ml-2 h-7 w-7' />
            </button>

            <div className='mt-8 flex items-center gap-1 text-base'>
              <p>No account?</p>
              <p className='cursor-pointer text-blue-500 hover:underline'>Create one</p>
            </div>
          </div>
        </div>

        <PipyMoodBoard />
      </div>
    </div>
  );
}
