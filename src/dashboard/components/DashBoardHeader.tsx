import ImagePiper from '@/assets/dashboard/img-piper.png';
import Logo from '@/assets/logo.svg';

export const DashBoardHeader = () => {
  return (
    <div className='w-full h-[32%] bg-[#EDEDED] overflow-hidden relative'>
      <div className='absolute left-0 w-full h-full bg-[#EDEDED] flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center'>
          <img src={Logo} alt='logo' className='w-16 h-16' />
          <h1 className='text-7xl font-bold tracking-widest  text-[#4D4D4D] ml-4'>PIPY</h1>
        </div>
        <div className='text-lg mt-3'>
          <p className='  text-[#808080]'> AI 플랫폼의 탄생,</p>
          <div className='flex items-center'>
            <p className='  text-[#3a7deb] font-bold'> 파이피</p>
            <p className='  text-[#808080] '>와 함께해요!</p>
          </div>
        </div>
      </div>
      <img
        src={ImagePiper}
        alt='piper'
        className=' w-[40%] absolute object-cover -top-16 right-16'
      />
    </div>
  );
};
