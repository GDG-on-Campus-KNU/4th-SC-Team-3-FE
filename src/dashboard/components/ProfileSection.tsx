import ProfilePiper from '@/assets/dashboard/img-profile-piper.png';
import { Button } from '@/global/ui';
import { fetchMember } from '@/dashboard/api/fetchMember';
import { useEffect } from 'react';
import useMemberStore from '@/dashboard/stores/MemberStore';
import { useNavigate } from 'react-router-dom';

const getLargerGoogleProfileImage = (url: string, size: number = 256): string => {
  return url.replace(/=s\d+-c$/, `=s${size}-c`);
}

export const ProfileSection = () => {
  const { member } = useMemberStore();
  const navigate = useNavigate();

  return (
    <div className='w-full'>
      {/* Profile Section */}
      <div className='w-full h-full flex justify-between items-center relative'>
        <div className='absolute -top-28 left-0 w-[230px] h-[230px] rounded-full bg-[#4F846C] border-[16px] border-white overflow-hidden'>
          <img
            src={ member?.picture ? getLargerGoogleProfileImage(member.picture) : ProfilePiper }
            alt='profile-piper'
            className='absolute w-72 h-80 rounded-full object-cover'
          />
        </div>
        <h1 className='ml-[250px] text-[#5B5B5B] text-3xl font-medium mt-7 tracking-wide'>
          안녕하세요{ member ? <>, <span className='font-bold'>{member.name}</span>님</> : <></> }!<br />
          오늘은 어떤 플로우를 만드시나요?
        </h1>
        { 
          member ? 
          <Button className='bg-[#5B5B5B] text-white w-44 h-10 mt-10'>마이페이지</Button> : 
          <Button 
            className='border border-[#3A7DE8] text-[#3A7DE8] w-44 h-10 mt-10'
            onClick={() => navigate('/signin')}
          >
            로그인하기
          </Button> 
        }
      </div>
    </div>
  );
};
