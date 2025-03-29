import ProfilePiper from '@/assets/dashboard/img-profile-piper.png';
import { Button } from '@/global/ui';

export const ProfileSection = () => {
  return (
    <div className='w-full'>
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
  );
};
