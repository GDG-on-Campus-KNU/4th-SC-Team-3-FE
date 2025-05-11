import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { X } from 'lucide-react';

import { createProject } from '../api/createProject';
import { deleteProject } from '../api/deleteProject';
import { fetchProjectList, Project } from '../api/fetchProjectList';
import { formatUpdatedAt } from '../api/formatUpdatedAt';
import { CreateProjectModal } from './modals/CreateProjectModal';
import { DeleteConfirmModal } from './modals/DeleteConfirmModal';

export const ProjectSection = () => {
  const { t } = useTranslation();
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
    await createProject(navigate, newProjectName.trim() ? newProjectName : 'Untitled'); // 이름을 전달하도록 createFlow 수정 필요
    setIsCreateModalOpen(false);
    setNewProjectName('');
  };

  return (
    <>
      <div className='relative mt-14 flex h-full w-full items-center justify-between'>
        <h1 className='text-2xl font-medium tracking-wide text-[#505050]'>
          {t('dashboard.project.title')}
        </h1>
        <h3 className='text-[#808080]'>+ {t('dashboard.project.more')}</h3>
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
            {t('dashboard.project.create')}
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
              {project.thumbnail ? (
                <img
                  src={project.thumbnail || ''}
                  alt={project.name}
                  className='h-full w-full rounded-lg object-cover'
                />
              ) : (
                <div className='flex h-[200px] items-center justify-center bg-[#EDEDED] text-5xl text-[#D9D9D9] transition-all' />
              )}
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
            <p
              className='mt-2 text-base text-[#404040]'
              style={{
                display: 'inline-block',
                maxWidth: '99%', // 최대 너비 설정
                whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
                overflow: 'hidden', // 넘치는 텍스트 숨기기
                textOverflow: 'ellipsis', // 넘치는 텍스트에 '...' 표시
              }}
            >
              {project.name}
            </p>

            <p className='text-xs text-[#808080]'>
              {t('dashboard.project.lastModified')}: {formatUpdatedAt(project.updatedAt, t)}
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
        projectName={projects.find((p) => p.projectId === deleteTargetId)?.name || 'Untitled'}
      />
    </>
  );
};
