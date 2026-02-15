import { Clock } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

interface Match {
  id: number;
  opponent: string;
  date: Date | string;
  time: string;
  score: string;
  status: string;
  competition: string;
  home: boolean;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const isWin =
    match.score.includes('-') &&
    parseInt(match.score.split('-')[0]) > parseInt(match.score.split('-')[1]);
  return (
    <div className="group relative flex items-center justify-between overflow-hidden rounded-r-2xl border-y border-r border-l-4 border-slate-200 border-l-[#a50044] bg-white/80 p-4 shadow-sm transition-all hover:shadow-md">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#004d98]/5 to-[#a50044]/5"></div>
      <div className="z-10 flex items-center gap-4">
        <div className="w-12 text-center">
          <span className="block font-mono text-[10px] text-slate-400 uppercase">
            {match.competition}
          </span>
          <span
            className={`block text-lg font-bold ${match.status === 'Finished' ? 'text-slate-800' : 'text-slate-400'}`}
          >
            {match.score}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-2 text-sm font-bold text-[#004d98]">
            FC Barcelona{' '}
            {match.home && (
              <span className="rounded-full border bg-slate-100 px-1 text-[9px] text-slate-500">
                H
              </span>
            )}
          </span>
          <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
            vs {match.opponent}{' '}
            {!match.home && (
              <span className="rounded-full border bg-slate-100 px-1 text-[9px] text-slate-500">
                A
              </span>
            )}
          </span>
          <span className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
            <Clock size={10} /> {match.date.toString()} • {match.time}
          </span>
        </div>
      </div>
      <div className="z-10">
        {match.status === 'Upcoming' ? (
          <span className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700">
            SOON
          </span>
        ) : (
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-bold ${isWin ? 'border-emerald-200 bg-emerald-100 text-emerald-700' : 'border-slate-200 bg-slate-100 text-slate-600'}`}
          >
            {match.status.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};
