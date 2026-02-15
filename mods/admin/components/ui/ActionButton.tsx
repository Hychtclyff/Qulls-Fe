import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  className?: string;
}

export const ActionButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  type = 'button',  
  ...props
}: ActionButtonProps) => {
  const variants = {
    primary:
      'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:border-indigo-600 hover:shadow-indigo-300',
    secondary:
      'border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900',
    accent:
      'border-amber-400/50 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-500',
    ghost:
      'border-transparent bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700 shadow-none',
    danger: 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-sm',
  };

  const sizes = {
    sm: 'h-8 px-3 text-[10px]',
    md: 'h-10 px-5 text-xs',
    lg: 'h-12 px-8 text-sm',
    icon: 'h-9 w-9 p-0 justify-center',
  };

  const baseStyles =
    'group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border font-mono font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isLoading && <Loader2 size={size === 'sm' ? 12 : 14} className="animate-spin" />}
        {children}
      </span>

      {/* Animasi Shimmer (Tidak muncul di size icon agar tidak aneh) */}
      {!isLoading && !disabled && variant !== 'ghost' && size !== 'icon' && (
        <div className="absolute top-0 left-[-150%] h-full w-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-[150%]"></div>
      )}
    </button>
  );
};
