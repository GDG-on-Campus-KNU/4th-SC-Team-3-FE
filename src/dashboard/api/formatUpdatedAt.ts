export function formatUpdatedAt(isoString: string): string {
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

  // 1일 이하 경과 시 n시간 전
  if (diffInMs < 1000 * 60 * 60 * 24) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours > 0) {
      return `${diffInHours}시간 전`;
    }
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes > 0) {
      return `${diffInMinutes}분 전`;
    }
    return '방금 전';
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

    return `${month}월 ${day}일 ${period} ${hour12}:${minutes}`;
  }

  // 작년이며 1년 미만 경과한 경우 → 2024년 12월 31일
  if (dateYear === currentYear - 1 && diffInYears < 1) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dateYear}년 ${month}월 ${day}일`;
  }

  return '알 수 없음';
}
