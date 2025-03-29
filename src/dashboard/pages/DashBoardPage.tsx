import ImageBottomPiper from '@/assets/dashboard/img-bottom-piper.png';
import ImagePiper from '@/assets/dashboard/img-piper.png';
import ProfilePiper from '@/assets/dashboard/img-profile-piper.png';
import Logo from '@/assets/logo.svg';
import { Button } from '@/global/ui';

export default function DashBoardPage() {
  return (
    <div className='h-screen w-screen overflow-y-scroll overflow-x-hidden bg-white fixed'>
      {/* top */}
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
      {/* Profile Section Container */}
      <div className='mx-[12%]'>
        {' '}
        {/* 1440px 기준 양측 280px 여백 */}
        <div className='w-full'>
          {' '}
          {/* Profile Section */}
          <div className='w-full h-full flex justify-between items-center relative'>
            <div className='absolute -top-28 left-0 w-[230px] h-[230px] rounded-full bg-[#4F846C] border-[16px] border-white overflow-hidden'>
              <img
                src={ProfilePiper}
                alt='profile-piper'
                className='absolute w-72 h-80 rounded-full object-cover'
              />
            </div>
            <h1 className='ml-[250px] text-[#5B5B5B] text-3xl font-medium mt-7 tracking-wide'>
              안녕하세요, <span className='font-bold'>하연</span>님! <br />
              오늘은 어떤 플로우를 만드시나요?
            </h1>
            <Button className='bg-[#5B5B5B] text-white w-44 h-10 mt-10'>마이페이지</Button>
          </div>
        </div>
        {/* 여기서부터 마이프로젝트 */}
        <div className='w-full h-full flex justify-between items-center relative mt-14'>
          <h1 className='text-[#505050] text-2xl font-medium tracking-wide'>My 프로젝트</h1>
          <h3 className='text-[#808080]'>+ My project 더보기</h3>
        </div>
        <div className='w-full h-full flex justify-between items-center gap-5 mt-5'>
          <button
            className='w-full h-full flex flex-col group transition-all duration-300 hover:scale-[1.02]'
            onClick={() => console.log('프로젝트 생성')} // TODO: 핸들러 연결
          >
            <div
              className='h-[200px] bg-[#EDEDED] rounded-lg flex justify-center items-center 
                   border-2 border-dashed border-[#D9D9D9] group-hover:border-[#3a7deb]
                   text-5xl text-[#D9D9D9] group-hover:text-[#3a7deb] transition-all'
            >
              +
            </div>
            <p className='text-base text-[#808080] mt-2 group-hover:text-[#3a7deb] transition-all'>
              새 프로젝트 생성하기
            </p>
            <p className='text-xs text-[#808080]'>
              <br />
            </p>
          </button>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
            <p className='text-xs text-[#808080]'>2025.03.30</p>
          </div>

          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
            <p className='text-xs text-[#808080]'>2025.03.30</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
            <p className='text-xs text-[#808080]'>2025.03.30</p>
          </div>
        </div>
        {/* 여기서부터 ai 모델 */}
        <div className='w-full h-full flex justify-between items-center relative mt-14'>
          <h1 className='text-[#505050] text-2xl font-bold tracking-wide'>
            <span className='text-[#3A7DE8]'>텍스트 중심 AI 모델</span> 구경하기
          </h1>
          <h3 className='text-[#808080]'>+ 더보기</h3>
        </div>
        <div className='w-full h-full flex justify-between items-center gap-5 mt-5'>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>

          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
        </div>
        {/* 여기서부터 ai 모델 */}
        <div className='w-full h-full flex justify-between items-center relative mt-14'>
          <h1 className='text-[#505050] text-2xl font-bold tracking-wide'>
            <span className='text-[#EAAF1E]'>이미지 중심 AI 모델</span> 구경하기
          </h1>
          <h3 className='text-[#808080]'>+ 더보기</h3>
        </div>
        <div className='w-full h-full flex justify-between items-center gap-5 mt-5'>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>

          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
        </div>
        {/* 여기서부터 ai 모델 */}
        <div className='w-full h-full flex justify-between items-center relative mt-14'>
          <h1 className='text-[#505050] text-2xl font-bold tracking-wide'>
            <span className='text-[#EF9EE1]'>비디오 중심 AI 모델</span> 구경하기
          </h1>
          <h3 className='text-[#808080]'>+ 더보기</h3>
        </div>
        <div className='w-full h-full flex justify-between items-center gap-5 mt-5'>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>

          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
        </div>
        {/* 여기서부터 ai 모델 */}
        <div className='w-full h-full flex justify-between items-center relative mt-14'>
          <h1 className='text-[#505050] text-2xl font-bold tracking-wide'>
            <span className='text-[#337758]'>오디오 중심 AI 모델</span> 구경하기
          </h1>
          <h3 className='text-[#808080]'>+ 더보기</h3>
        </div>
        <div className='w-full h-full flex justify-between items-center gap-5 mt-5'>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>

          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
          <div className='w-full h-full flex flex-col '>
            <div className=' h-[200px] bg-[#EDEDED] rounded-lg'></div>
            <p className='text-base text-black mt-2'>Cloude</p>
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className='relative w-full h-40 mt-40 overflow-visible'>
        <img
          src={ImageBottomPiper}
          alt='bottom-piper'
          className='absolute w-24 object-cover right-20 -top-36 z-10 '
        />
        <div className='relative w-full h-full bg-[#D9D9D9] flex flex-col items-center justify-center'>
          <p className='absolute top-10 text-sm text-[#A0A0A0] text-center'>
            All rights reserved © {new Date().getFullYear()}. PIPY
          </p>
        </div>
      </div>
    </div>
  );
}
