import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { X } from 'lucide-react';

import { createProject } from '../api/createProject';
import { deleteProject } from '../api/deleteProject';
import { fetchProjectList, Project } from '../api/fetchProjectList';

// 최종 수정일 포멧팅 함수
function formatCreatedAt(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365);
  const currentYear = now.getFullYear();
  const dateYear = date.getFullYear();

  // 1년 이상 경과 시
  if (diffInYears >= 1) {
    return `${Math.floor(diffInYears)}년 전`;
  }

  // 올해 작성된 경우 → 5월 5일 오후 7:30
  if (dateYear === currentYear) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const isAM = hours < 12;
    const period = isAM ? '오전' : '오후';
    const hour12 = isAM ? hours : hours - 12 || 12; // 0시는 12로 처리

    return `${month}.${day}. ${period} ${hour12}:${minutes}`;
  }

  // 작년이며 1년 미만 경과한 경우 → 2024년 12월 31일
  if (dateYear === currentYear - 1 && diffInYears < 1) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dateYear}년 ${month}월 ${day}일`;
  }

  return '알 수 없음';
}

export const ProjectSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const loadProjects = async () => {
    const data = await fetchProjectList();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    await deleteProject(projectId); // 삭제 API 호출
    loadProjects(); // 다시 불러오기
  };

  const handleCreate = async () => {
    if (newProjectName.trim()) {
      await createProject(navigate, newProjectName); // 이름을 전달하도록 createFlow 수정 필요
      setIsModalOpen(false);
      setNewProjectName('');
    }
  };

  return (
    <>
      <div className='relative mt-14 flex h-full w-full items-center justify-between'>
        <h1 className='text-2xl font-medium tracking-wide text-[#505050]'>My 프로젝트</h1>
        <h3 className='text-[#808080]'>+ My project 더보기</h3>
      </div>

      <div className='mt-5 flex h-full w-full flex-wrap items-center justify-start gap-5'>
        {/* 새 프로젝트 생성 카드 */}
        <button
          className='group flex h-full w-[200px] flex-col transition-all duration-300 hover:scale-[1.02]'
          onClick={() => setIsModalOpen(true)}
        >
          <div className='flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-[#D9D9D9] bg-[#EDEDED] text-5xl text-[#D9D9D9] transition-all group-hover:border-[#3a7deb] group-hover:text-[#3a7deb]'>
            +
          </div>
          <p className='mt-2 text-base text-[#808080] transition-all group-hover:text-[#3a7deb]'>
            새 프로젝트 생성하기
          </p>
        </button>

        {/* 프로젝트 카드 리스트 */}
        {projects.map((project) => (
          <div
            key={project.projectId}
            className='group relative flex h-full w-[200px] cursor-pointer flex-col'
            onClick={() => navigate(`/main/${project.projectId}`)}
          >
            <div className='relative h-[200px] overflow-hidden rounded-lg'>
              <img
                src={project.thumbnail || ''}
                alt={project.name}
                className='h-full w-full rounded-lg object-cover'
              />
              <button
                className='absolute right-2 top-2 z-10 rounded-full bg-[#E65429] opacity-70 shadow-md hover:opacity-100'
                onClick={(e) => {
                  e.stopPropagation(); // 부모 클릭 막기
                  // handleDelete(project.projectId);
                }}
              >
                <X className='text-white' size={20} />
              </button>
            </div>
            <p className='mt-2 text-base text-black'>{project.name}</p>
            <p className='text-xs text-[#808080]'>
              최종 수정: {formatCreatedAt(project.createdAt)}
            </p>
          </div>
        ))}
      </div>

      {/* 이름 입력 모달 */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='w-96 rounded-xl bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-lg font-semibold'>새 프로젝트 이름 입력</h2>
            <input
              type='text'
              className='w-full rounded-md border p-2 text-sm'
              placeholder='프로젝트 이름을 입력하세요'
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <div className='mt-4 flex justify-end gap-2'>
              <button
                className='rounded-md bg-[#E65429] px-4 py-2 text-sm'
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
                onClick={handleCreate}
              >
                생성
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
