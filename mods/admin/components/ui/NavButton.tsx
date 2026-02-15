import * as React from 'react';
import { LucideIcon } from 'lucide-react';
// Use relative import to ensure resolution within the same directory
import { cn } from '@/lib/utils';
import { AdminButton } from '@/common/components/admin/ui/button';

interface NavButtonProps extends React.ComponentProps<typeof AdminButton> {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  className?: string;
  //   onClick: () => void;
}

export const NavButton = ({
  icon: Icon,
  label,
  active,
  className,
  onClick,
  ...props
}: NavButtonProps) => {
  return (
    <AdminButton
      onClick={onClick}
      variant="ghost"
      className={cn(
        'mb-2 flex h-auto w-full items-center justify-start gap-3 overflow-hidden rounded-none rounded-r-2xl border-y-0 border-r-2 border-l-0 px-4 py-3.5',
        'relative font-mono text-xs tracking-wider',
        active
          ? 'border-indigo-500 bg-gradient-to-l from-slate-900 to-transparent text-indigo-300 shadow-[inset_-10px_0_20px_-10px_rgba(99,102,241,0.3)]'
          : 'border-transparent text-slate-500 hover:border-indigo-500/30 hover:bg-slate-900/50 hover:text-indigo-400',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'relative z-10 transition-transform duration-300',
          active ? 'scale-110' : 'group-hover:scale-110',
        )}
      >
        <Icon size={16} />
      </div>

      <span className="relative z-10 font-medium">{label}</span>

      {/* <div className="absolute inset-0 z-0 translate-x-[-100%] bg-slate-950 opacity-50 transition-transform duration-500 ease-out group-hover:translate-x-0"></div> */}
    </AdminButton>
  );
};
