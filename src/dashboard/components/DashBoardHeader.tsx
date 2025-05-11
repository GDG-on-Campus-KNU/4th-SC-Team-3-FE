import { useTranslation } from 'react-i18next';

import ImagePiper from '@/assets/dashboard/img-piper.png';
import Logo from '@/assets/logo.svg';

export const DashBoardHeader = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className='relative h-[32%] w-full overflow-hidden bg-[#EDEDED]'>
      <div className='absolute left-0 flex h-full w-full flex-col items-center justify-center bg-[#EDEDED]'>
        <div className='flex items-center justify-center'>
          <img src={Logo} alt='logo' className='h-16 w-16' />
          <h1 className='ml-4 text-7xl font-bold tracking-widest text-[#4D4D4D]'>PIPY</h1>
        </div>
        <div className='mt-3 text-lg'>
          <p className='text-[#808080]'>{t('dashboard.title.top')}</p>
          <div className='flex items-center'>
            { i18n.language === 'en' ?
              <>
                <p className='font-bold text-[#3a7deb]'>{t('dashboard.title.middle')}</p>
                <div className='border-t border-[#808080] mx-2 w-3'></div>
                <p className='text-[#808080]'>{t('dashboard.title.bottom')}</p>
              </>
              : 
              <>
                <p className='font-bold text-[#3a7deb]'>{t('dashboard.title.middle')}</p>
                <p className='text-[#808080]'>{t('dashboard.title.bottom')}</p>
              </> }
          </div>
        </div>
      </div>
      <img
        src={ImagePiper}
        alt='piper'
        className='absolute -top-16 right-16 w-[40%] object-cover'
      />
    </div>
  );
};
