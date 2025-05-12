import { DashBoardHeader } from '../components/DashBoardHeader';
import { ModelSection } from '../components/ModelSection';
import { ProfileSection } from '../components/ProfileSection';
import { ProjectSection } from '../components/ProjectSection';
import { useFetchMember } from '../hooks/useFetchMember';
import ImageBottomPiper from '@/assets/dashboard/img-bottom-piper.png';

// import useMemberStore from '@/dashboard/stores/MemberStore';

export default function DashBoardPage() {
  const { isLoading, member } = useFetchMember();

  return (
    <div className='fixed h-screen w-screen overflow-x-hidden overflow-y-scroll bg-white'>
      <DashBoardHeader />

      <div className='mx-[12%]'>
        {/* 1440px 기준 양측 280px 여백 */}
        <ProfileSection isLoading={isLoading} member={member} />
        {/* 마이프로젝트 */}
        {member || isLoading ? <ProjectSection /> : <></>}
        {/* ai 모델 */}
        <ModelSection />
      </div>
      {/* bottom */}
      <div className='relative mt-40 h-40 w-full overflow-visible'>
        <img
          src={ImageBottomPiper}
          alt='bottom-piper'
          className='absolute -top-36 right-20 z-10 w-24 object-cover'
        />
        <div className='relative flex h-full w-full flex-col items-center justify-center bg-[#D9D9D9]'>
          <p className='absolute top-10 text-center text-sm text-[#A0A0A0]'>
            All rights reserved © {new Date().getFullYear()}. PIPY
          </p>
        </div>
      </div>
    </div>
  );
}
