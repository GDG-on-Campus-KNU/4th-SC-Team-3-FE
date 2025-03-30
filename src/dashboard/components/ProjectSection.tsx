import { useNavigate } from 'react-router-dom';

export const ProjectSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='w-full h-full flex justify-between items-center relative mt-14'>
        <h1 className='text-[#505050] text-2xl font-medium tracking-wide'>My 프로젝트</h1>
        <h3 className='text-[#808080]'>+ My project 더보기</h3>
      </div>
      <div className='w-full h-full flex justify-between items-center gap-5 mt-5'>
        <button
          className='w-full h-full flex flex-col group transition-all duration-300 hover:scale-[1.02]'
          onClick={() => navigate('/main')}
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
    </>
  );
};
