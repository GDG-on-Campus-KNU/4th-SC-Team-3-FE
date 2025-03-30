import { DashBoardHeader } from '../components/DashBoardHeader';
import { ModelSection } from '../components/ModelSection';
import { ProfileSection } from '../components/ProfileSection';
import { ProjectSection } from '../components/ProjectSection';
import ImageBottomPiper from '@/assets/dashboard/img-bottom-piper.png';

export default function DashBoardPage() {
  return (
    <div className='h-screen w-screen overflow-y-scroll overflow-x-hidden bg-white fixed'>
      <DashBoardHeader />

      <div className='mx-[12%]'>
        {/* 1440px 기준 양측 280px 여백 */}
        <ProfileSection />
        {/* 마이프로젝트 */}
        <ProjectSection />
        {/* ai 모델 */}
        <ModelSection />
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
