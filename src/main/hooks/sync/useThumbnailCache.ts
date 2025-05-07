import { useEffect, useRef } from 'react';

import { toPng } from 'html-to-image';

import { getNodesBounds, getViewportForBounds, ReactFlowInstance } from '@xyflow/react';

/**
 * @param wrapperRef 캡처할 DOM을 가리키는 ref
 *
 * @returns latestPngRef.current 에 base64 png 문자열
 */
export function useThumbnailCache(
  reactFlowInstance: ReactFlowInstance,
  wrapperRef: React.RefObject<HTMLElement>, // 캡처할 DOM을 나타내는 ref
) {
  const latestPngRef = useRef<string | null>(null); // PNG 이미지 데이터 저장용 ref

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트되어 있는지 체크하는 변수
    const capture = async () => {
      const el = wrapperRef.current; // wrapperRef가 가리키는 DOM 요소
      if (!el) return; // DOM 요소가 없으면 캡처를 중단

      // ✅ 숨길 요소 셀렉터들
      const HIDE_SELECTORS = ['.react-flow__minimap', '.react-flow__controls'];
      const originalDisplays = new Map<Element, string>(); // 원래의 display 스타일을 저장할 맵

      // ✅ 요소 숨기기
      HIDE_SELECTORS.forEach((selector) => {
        el.querySelectorAll(selector).forEach((el) => {
          originalDisplays.set(el, (el as HTMLElement).style.display); // 원래 스타일을 맵에 저장
          (el as HTMLElement).style.display = 'none'; // 요소를 숨김
        });
      });

      // useReactFlow 훅을 사용해 노드 정보 가져오기
      const nodes = reactFlowInstance.getNodes();
      const nodesBounds = getNodesBounds(nodes);
      console.log(nodesBounds); // 노드들의 바운드를 계산
      const viewport = getViewportForBounds(nodesBounds, 400, 400, 0.1, 5, 0.5); // 노드 바운드를 기준으로 뷰포트 계산

      try {
        // HTML을 PNG로 변환
        const png = await toPng(el, {
          cacheBust: true, // 캐시를 우회하여 새로 캡처
          backgroundColor: '#EDEDED', // 배경 색상을 흰색으로 설정
          width: 400, // 캡처할 이미지의 너비
          height: 400, // 캡처할 이미지의 높이
          style: {
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`, // 뷰포트 이동 및 줌 적용
          },
        });
        latestPngRef.current = png; // 캡처한 PNG를 ref에 저장
        console.log('🎞️ 썸네일 캡처 완료');
      } catch (err) {
        console.warn('❗ 썸네일 캡처 실패', err);
      }

      // ✅ 숨긴 요소 복구
      originalDisplays.forEach((display, el) => {
        (el as HTMLElement).style.display = display || ''; // 숨긴 요소들 원래대로 복구
      });
    };

    // 첫 번째 캡처 실행
    // capture();

    // 10초마다 주기적으로 캡처 실행
    const intervalId = setInterval(capture, 10_000);

    return () => {
      isMounted = false; // 컴포넌트가 언마운트되면 isMounted를 false로 설정
      clearInterval(intervalId); // 주기적인 캡처를 멈춤
    };
  }, [wrapperRef]); // wrapperRef가 변경될 때마다 effect 실행

  return latestPngRef; // 최신 PNG 데이터를 반환
}
