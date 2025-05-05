import { toPng } from 'html-to-image';

import { axiosClient } from '@/global/api/axios';

export const uploadProjectThumbnail = async (
  projectId: string,
  reactFlowWrapperRef: React.RefObject<any>,
) => {
  try {
    // 썸네일 캡처
    if (reactFlowWrapperRef.current) {
      const png = await toPng(reactFlowWrapperRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
      });

      console.log('🖼️ 썸네일 캡처 성공');

      if (png) {
        const file = new File([png], 'thumbnail.png', { type: 'image/png' });

        // FormData 생성 및 이미지 파일 추가
        const formData = new FormData();
        formData.append('thumbnail', file);

        // 썸네일 업로드
        await axiosClient.put(`/projects/${projectId}/thumbnail`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('✅ 썸네일 업로드 성공');
      }
    }
  } catch (error) {
    console.error('❌ 썸네일 업로드 실패:', error);
  }
};
