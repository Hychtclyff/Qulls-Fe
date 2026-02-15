import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/public/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface TechCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  noPadding?: boolean;
}

export const TechCard = ({
  children,
  className,
  title,
  icon: Icon,
  action,
  noPadding = false,
}: TechCardProps) => {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-500 hover:border-blue-300/50 hover:shadow-md',
        className,
      )}
    >
      {/* SAO Decorations */}
      <div className="absolute top-0 left-0 z-20 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-8"></div>
      <div className="absolute top-0 left-0 z-20 h-0 w-[2px] bg-blue-500 transition-all duration-500 group-hover:h-8"></div>
      <div className="absolute right-0 bottom-0 z-20 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-8"></div>
      <div className="absolute right-0 bottom-0 z-20 h-0 w-[2px] bg-blue-500 transition-all duration-500 group-hover:h-8"></div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[size:4px_4px] opacity-[0.03] transition-opacity group-hover:opacity-[0.05]" />

      {(title || Icon) && !noPadding && (
        // Reduced padding-bottom (pb-2 -> pb-1) to tighten gap between title and content
        <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 px-6 pt-5 pb-1">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="group/icon relative">
                <div className="absolute inset-0 rounded-full bg-blue-400/30 opacity-0 blur-lg transition-opacity duration-500 group-hover/icon:opacity-100"></div>
                <div className="relative rounded-md bg-slate-100 p-2 text-slate-500 transition-colors group-hover:text-blue-600">
                  <Icon size={18} />
                </div>
              </div>
            )}
            <CardTitle className="font-mono text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors group-hover:text-slate-800">
              {title}
            </CardTitle>
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
      )}

      {/* Reduced padding-top (pt-4 -> pt-2) to tighten gap */}
      <CardContent className={cn('relative z-10', noPadding ? 'p-0' : 'px-6 pt-2 pb-5')}>
        {children}
      </CardContent>
    </Card>
  );
};
