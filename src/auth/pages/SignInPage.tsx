import { PipyMoodBoard } from '../components/PipyMoodBoard';
import LogoGoogle from '@/assets/signin/logo-google.svg';

export default function SignInPage() {
  return (
    <div className='h-screen w-screen overflow-y-hidden fixed flex justify-center bg-white'>
      <div className='flex gap-[20%] w-full max-w-[80%]'>
        <div className='w-[40%] min-w-[400px]  mt-60'>
          <h1
            className='text-3xl
          text-center font-medium leading-tight'
          >
            로그인을 통해
            <br />
            <span className='block mt-2'>많은 기능과 플랜을 구경하세요!</span>
          </h1>

          <div className='flex flex-col items-center mt-12'>
            <button className='flex items-center justify-center w-full bg-black text-white text-2xl h-14 rounded-lg hover:bg-gray-800'>
              Log in with Google
              <img src={LogoGoogle} alt='Google Logo' className='w-7 h-7 ml-2' />
            </button>

            <div className='flex items-center text-base gap-1 mt-8'>
              <p>No account?</p>
              <p className='text-blue-500 hover:underline cursor-pointer'>Create one</p>
            </div>
          </div>
        </div>

        <PipyMoodBoard />
      </div>
    </div>
  );
}
