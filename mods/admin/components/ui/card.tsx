import { LucideIcon, Snowflake } from 'lucide-react';
import { ReactNode } from 'react';
import { CrystalStar } from './decorations';

interface CardProops {
  children: ReactNode;
  className?: string;
  title?: string;
  decoration?: string;
  icon?: LucideIcon;
}

export const Card = ({
  children,
  className = '',
  title,
  decoration,
  icon: TitleIcon,
}: CardProops) => (
  <div
    className={`relative overflow-hidden rounded-3xl border border-cyan-100 bg-white/70 p-1 shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(165,243,252,0.3)] ${className}`}
  >
    <div className="absolute top-0 left-0 h-8 w-8 rounded-tl-3xl border-t-2 border-l-2 border-cyan-300 opacity-50" />
    <div className="absolute right-0 bottom-0 h-8 w-8 rounded-br-3xl border-r-2 border-b-2 border-cyan-300 opacity-50" />
    {decoration === 'gold' && (
      <div className="absolute top-0 right-0 p-3">
        <CrystalStar
          className="rotate-12 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
          size={64}
        />
      </div>
    )}
    {title && (
      <div className="relative z-10 mb-2 flex items-center justify-between border-b border-cyan-100 bg-gradient-to-r from-cyan-50/50 to-transparent px-6 py-4">
        <h3 className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-slate-700 uppercase">
          {TitleIcon ? (
            <TitleIcon size={14} className="text-cyan-500" />
          ) : (
            <Snowflake size={14} className="animate-spin-slow text-cyan-500" />
          )}
          {title}
        </h3>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          <div className="h-2 w-2 rounded-full bg-cyan-300"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-300"></div>
        </div>
      </div>
    )}
    <div className="relative z-10 p-6 text-slate-700">{children}</div>
  </div>
);
