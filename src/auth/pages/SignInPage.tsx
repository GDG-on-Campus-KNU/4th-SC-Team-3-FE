import ImageAttention from '@/assets/signin/img-attention.png';
import LogoPipy from '@/assets/signin/img-logo.png';
import ImagePipe1 from '@/assets/signin/img-pipe1.png';
import ImagePipe2 from '@/assets/signin/img-pipe2.png';
import ImagePipe3 from '@/assets/signin/img-pipe3.png';
import ImagePipe4 from '@/assets/signin/img-pipe4.png';
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

        <div className='relative w-[34vw] h-[66vh] bg-[#EDEDED] mt-20'>
          <img
            src={ImagePipe1}
            alt='Pipe'
            className='absolute'
            style={{ left: '-4%', top: '-8%', width: '40%' }}
          />
          <img
            src={ImagePipe2}
            alt='Pipe'
            className='absolute'
            style={{ right: '4%', top: '-8%', width: '55%' }}
          />
          <img
            src={ImagePipe3}
            alt='Pipe'
            className='absolute'
            style={{ left: '-12%', bottom: '-17%', width: '61%' }}
          />
          <img
            src={ImagePipe4}
            alt='Pipe'
            className='absolute'
            style={{ right: '-5%', bottom: '5%', width: '61%' }}
          />
          <img
            src={LogoPipy}
            alt='Logo'
            className='absolute'
            style={{ right: '4%', top: '23%', width: '55%' }}
          />
          <img
            src={ImageAttention}
            alt='Attention'
            className='absolute'
            style={{ right: '6%', bottom: '-14%', width: '40%' }}
          />
        </div>
      </div>
    </div>
  );
}
