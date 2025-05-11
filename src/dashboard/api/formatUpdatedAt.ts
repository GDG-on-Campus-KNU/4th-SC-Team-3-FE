export function formatUpdatedAt(isoString: string, t: (key: string) => string): string {
  const date = new Date(isoString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365);
  const currentYear = now.getFullYear();
  const dateYear = date.getFullYear();

  if (diffInYears >= 1) {
    return `${Math.floor(diffInYears)}${t('dashboard.project.yearsAgo')}`;
  }

  if (diffInMs < 1000 * 60 * 60 * 24) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours > 0) {
      return `${diffInHours}${t('dashboard.project.hoursAgo')}`;
    }

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes > 0) {
      return `${diffInMinutes}${t('dashboard.project.minitesAgo')}`;
    }

    return t('dashboard.project.justNow');
  }

  if (dateYear === currentYear) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const isAM = hours < 12;
    const period = isAM ? t('dashboard.project.am') : t('dashboard.project.pm');
    const hour12 = isAM ? (hours === 0 ? 12 : hours) : hours - 12 || 12;

    return `${month}${t('dashboard.project.month')} ${day}${t('dashboard.project.day')} ${period} ${hour12}:${minutes}`;
  }

  if (dateYear === currentYear - 1 && diffInYears < 1) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dateYear}${t('dashboard.project.year')} ${month}${t('dashboard.project.month')} ${day}${t('dashboard.project.day')}`;
  }

  return t('dashboard.project.unknown');
}
