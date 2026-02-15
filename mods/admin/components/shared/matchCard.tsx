import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Card } from '../ui/card';
import { Match } from '../../types/data';
import { MatchCard } from '../ui/MatchCard';

interface MatchCardProps {
  barca_matches: Match[];
}
export const MatchCards = ({ barca_matches }: MatchCardProps) => (
  <Card title="REAL WORLD MONITOR: FC BARCELONA" icon={Globe}>
    <div className="space-y-3">
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-slate-500">
        <span>LIGA SANTANDER FEED</span>
        <span className="flex items-center gap-1 text-emerald-500">
          <CheckCircle2 size={10} /> CONNECTED
        </span>
      </div>
      {barca_matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
      <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-bold text-[#004d98] transition-colors hover:bg-[#004d98] hover:text-white">
        FULL SCHEDULE <ArrowRight size={12} />
      </button>
    </div>
  </Card>
);
