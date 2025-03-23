import { Button } from '@/global/ui';

const variantClasses = {
  default: 'bg-primary-1',
  secondary: 'bg-primary-2',
};

interface ButtonProps {
  variant?: 'default' | 'secondary';
  children: React.ReactNode;
}

export function AuthButton({ variant = 'default', children }: ButtonProps) {
  return (
    <Button
      className={`${variantClasses[variant]} w-full h-[55px] rounded-md font-semiBold text-[16px] font-white hover:bg-primary-1`}
    >
      {children}
    </Button>
  );
}
