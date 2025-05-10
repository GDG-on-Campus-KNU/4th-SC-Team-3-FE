import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfilePiper from '@/assets/dashboard/img-profile-piper.png';
import { fetchMember } from '@/dashboard/api/fetchMember';
import useMemberStore from '@/dashboard/stores/MemberStore';
import { useToast } from '@/global/hooks/use-toast';
import { Button } from '@/global/ui';

const getLargerGoogleProfileImage = (url: string, size: number = 256): string => {
  return url.replace(/=s\d+-c$/, `=s${size}-c`);
};

export const ProfileSection = () => {
  const { member } = useMemberStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profileImageError, setProfileImageError] = useState(false);
  const handleMyPageClick = () => {
    toast({
      duration: 2000,
      title: '준비 중입니다.',
      description: '해당 기능은 현재 준비 중입니다.',
    });
  };

  return (
    <div className='w-full'>
      {/* Profile Section */}
      <div className='relative flex h-full w-full items-center justify-between'>
        <div className='absolute -top-28 left-0 h-[230px] w-[230px] overflow-hidden rounded-full border-[16px] border-white bg-[#4F846C]'>
          {member?.picture && !profileImageError ? (
            <img
              src={getLargerGoogleProfileImage(member.picture)}
              alt='profile'
              className='absolute object-cover'
              onError={() => setProfileImageError(true)}
            />
          ) : (
            <img
              src={ProfilePiper}
              alt='profile-piper'
              className='absolute h-72 w-72 rounded-full object-cover'
            />
          )}
        </div>
        <h1 className='ml-[250px] mt-7 text-3xl font-medium tracking-wide text-[#5B5B5B]'>
          안녕하세요
          {member ? (
            <>
              , <span className='font-bold'>{member.name}</span>님
            </>
          ) : (
            <></>
          )}
          !<br />
          오늘은 어떤 플로우를 만드시나요?
        </h1>
        {member ? (
          <Button className='mt-10 h-10 w-44 bg-[#5B5B5B] text-white' onClick={handleMyPageClick}>
            마이페이지
          </Button>
        ) : (
          <Button
            className='mt-10 h-10 w-44 border border-[#3A7DE8] text-[#3A7DE8]'
            onClick={() => navigate('/signin')}
          >
            로그인하기
          </Button>
        )}
      </div>
    </div>
  );
};
