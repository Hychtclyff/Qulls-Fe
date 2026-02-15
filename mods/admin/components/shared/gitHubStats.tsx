import { Github } from 'lucide-react';
import { Card } from '../ui/card';
import { GithubContribution } from '../../types/data'; // Pastikan import tipe ini

// Menerima data via Props, bukan memanggil Hook sendiri
interface GitHubStatsProps {
  contributions: GithubContribution[];
}

export const GitHubStats = ({ contributions }: GitHubStatsProps) => {
  return (
    <Card title="SYSTEM LOG / GITHUB CONTRIBUTIONS" icon={Github}>
      <div className="flex flex-wrap justify-center gap-1 sm:justify-start">
        {contributions.map((day, i) => {
          let colorClass = 'bg-slate-100';

          // Logika warna dipersingkat agar lebih rapi
          if (day.count > 8) colorClass = 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]';
          else if (day.count > 6) colorClass = 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]';
          else if (day.count > 3) colorClass = 'bg-cyan-300';
          else if (day.count > 0) colorClass = 'bg-cyan-100';

          return (
            <div
              key={i}
              className={`h-3 w-3 rounded-sm ${colorClass} cursor-help transition-all duration-300 hover:scale-125`}
              title={`${day.date}: ${day.count} commits`}
            ></div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-slate-400">
        <span>Less</span>
        <div className="h-2 w-2 rounded-sm bg-slate-100"></div>
        <div className="h-2 w-2 rounded-sm bg-cyan-100"></div>
        <div className="h-2 w-2 rounded-sm bg-cyan-500"></div>
        <div className="h-2 w-2 rounded-sm bg-indigo-500"></div>
        <span>More</span>
      </div>
    </Card>
  );
};
