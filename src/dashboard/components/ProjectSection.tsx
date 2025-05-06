import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { X } from 'lucide-react';

import { createProject } from '../api/createProject';
import { deleteProject } from '../api/deleteProject';
import { fetchProjectList, Project } from '../api/fetchProjectList';
import { formatUpdatedAt } from '../api/formatUpdatedAt';
import { CreateProjectModal } from './modals/CreateProjectModal';
import { DeleteConfirmModal } from './modals/DeleteConfirmModal';

export const ProjectSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const loadProjects = async () => {
    const data = await fetchProjectList();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = useCallback(async (projectId: number) => {
    await deleteProject(projectId);
    loadProjects();
    setDeleteTargetId(null); // 모달 닫기
  }, []);

  const handleCreate = async () => {
    if (newProjectName.trim()) {
      await createProject(navigate, newProjectName); // 이름을 전달하도록 createFlow 수정 필요
      setIsCreateModalOpen(false);
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
          onClick={() => setIsCreateModalOpen(true)}
        >
          <div className='flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-[#D9D9D9] bg-[#EDEDED] text-5xl text-[#D9D9D9] transition-all group-hover:border-[#3a7deb] group-hover:text-[#3a7deb]'>
            +
          </div>
          <p className='mb-4 mt-2 text-base text-[#808080] transition-all group-hover:text-[#3a7deb]'>
            새 프로젝트 생성하기
          </p>
        </button>

        {/* 프로젝트 카드 리스트 */}
        {projects.map((project) => (
          <div
            key={project.projectId}
            className='group relative flex h-full w-[200px] min-w-[200px] cursor-pointer flex-col hover:scale-[1.02]'
            onClick={() => navigate(`/main/${project.projectId}`)}
          >
            <div className='relative h-[200px] overflow-hidden rounded-lg border-2 border-dashed border-[#D9D9D9] transition-all group-hover:border-[#3a7deb]'>
              <img
                src={project.thumbnail || ''}
                alt={project.name}
                className='h-full w-full rounded-lg object-cover'
              />
              <button
                className='group absolute right-2 top-2 z-10 hidden rounded-full bg-[#E65429] opacity-70 shadow-md ease-in-out hover:opacity-100 group-hover:block'
                onClick={(e) => {
                  e.stopPropagation(); // 부모 클릭 막기
                  setDeleteTargetId(project.projectId);
                }}
              >
                <X className='text-white' size={20} />
              </button>
            </div>
            <p className='mt-2 text-base text-[#404040]'>{project.name}</p>

            <p className='text-xs text-[#808080]'>
              최종 수정: {formatUpdatedAt(project.updatedAt)}
            </p>
          </div>
        ))}
      </div>

      <CreateProjectModal
        isOpen={!!isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
        name={newProjectName}
        onNameChange={setNewProjectName}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => handleDelete(deleteTargetId!)}
      />
    </>
  );
};
