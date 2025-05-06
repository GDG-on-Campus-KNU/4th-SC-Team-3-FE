import { toPng } from 'html-to-image';

import { axiosClient } from '@/global/api/axios';
import { ReactFlowInstance } from '@xyflow/react';

export const uploadProjectThumbnail = async (
  projectId: string,
  reactFlowWrapperRef: React.RefObject<any>,
  reactFlowInstance: ReactFlowInstance,
) => {
  try {
    if (!reactFlowWrapperRef.current) return;

    const wrapper = reactFlowWrapperRef.current;

    // ✅ 숨길 요소 셀렉터들
    const HIDE_SELECTORS = ['.react-flow__minimap', '.react-flow__controls'];
    const originalDisplays = new Map<Element, string>();

    // ✅ 요소 숨기기
    HIDE_SELECTORS.forEach((selector) => {
      wrapper.querySelectorAll(selector).forEach((el) => {
        originalDisplays.set(el, (el as HTMLElement).style.display);
        (el as HTMLElement).style.display = 'none';
      });
    });

    // // ✅ fitView 또는 줌 초기화
    // const originalViewport = reactFlowInstance.getViewport();
    // if (originalViewport.zoom < 1) {
    //   await reactFlowInstance.fitView({
    //     padding: 0.2,
    //     includeHiddenNodes: false,
    //     duration: 300,
    //   });
    // } else {
    //   await reactFlowInstance.setViewport({
    //     x: originalViewport.x,
    //     y: originalViewport.y,
    //     zoom: 1,
    //   });
    // }

    // ✅ PNG로 캡처
    const png = await toPng(wrapper, {
      cacheBust: true,
      backgroundColor: '#ffffff',
    });

    // ✅ 숨긴 요소 복구
    originalDisplays.forEach((display, el) => {
      (el as HTMLElement).style.display = display || '';
    });

    // ✅ viewport 복원
    // reactFlowInstance.setViewport(originalViewport);

    console.log('🖼️ 썸네일 캡처 성공');

    if (png) {
      const blob = await (await fetch(png)).blob();
      const file = new File([blob], 'thumbnail.png', { type: 'image/png' });

      const formData = new FormData();
      formData.append('thumbnail', file);

      await axiosClient.put(`/projects/${projectId}/thumbnail`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ 썸네일 업로드 성공');
    }
  } catch (error) {
    console.error('❌ 썸네일 업로드 실패:', error);
  }
};
