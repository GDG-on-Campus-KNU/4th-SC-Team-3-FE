import { cn } from '@/global/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // animate-pulse + animation-duration을 700ms로 오버라이드
        'animate-pulse rounded-md bg-gray-300 [animation-duration:700ms]',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
