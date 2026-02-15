import { BarChart3, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { VisitorStat } from '../../types/data';

interface VisitorCardProps {
  visitorStats: VisitorStat[];
}

export const VisitorCard = ({ visitorStats }: VisitorCardProps) => (
  <Card title="VISITOR ANALYSIS" icon={BarChart3}>
    <div className="mt-2 flex h-40 items-end justify-between gap-2">
      {visitorStats.map((stat, i) => {
        const heightPercent = (stat.count / 1000) * 100;
        return (
          <div key={i} className="group flex flex-1 cursor-default flex-col items-center gap-2">
            <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-t-lg bg-slate-50">
              <div
                className={`w-full ${stat.color} absolute bottom-0 transition-all duration-700 ease-out group-hover:brightness-110`}
                style={{ height: `${heightPercent}%` }}
              ></div>
            </div>
            <span className="font-mono text-[10px] text-slate-400">{stat.day}</span>
          </div>
        );
      })}
    </div>
    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
      <span className="flex items-center gap-1">
        <Users size={12} /> Total Visitors
      </span>
      <span className="font-bold text-indigo-600">3,940</span>
    </div>
  </Card>
);
