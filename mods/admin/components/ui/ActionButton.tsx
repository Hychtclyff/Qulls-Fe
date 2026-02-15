import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  isLoading?: boolean;
  className?: string;
}

export const ActionButton = ({
  children,
  onClick,
  variant = 'primary',
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

  const baseStyles =
    'group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border px-5 py-2.5 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isLoading && <Loader2 size={14} className="animate-spin" />}
        {children}
      </span>

      {!isLoading && !disabled && variant !== 'ghost' && (
        <div className="absolute top-0 left-[-150%] h-full w-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:left-[150%]"></div>
      )}
    </button>
  );
};
