import { Activity } from 'lucide-react';
import { Card } from '../ui/card';

export const VisualizerCard = () => (
  <Card title="LIFE VISUALIZER">
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between font-bold text-slate-600">
        <span className="flex items-center gap-2">
          <Activity size={14} className="text-red-500" /> HIT POINTS
        </span>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-emerald-500">
          MAX
        </span>
      </div>
      <div className="relative h-6 w-full overflow-hidden rounded-full border border-slate-300 bg-slate-200 shadow-inner">
        <div className="absolute top-0 left-0 h-full w-full bg-red-400"></div>
        <div className="clip-path-slant-right absolute top-0 left-0 h-full w-[85%] bg-yellow-400"></div>
        <div className="clip-path-slant-right absolute top-0 left-0 h-full w-[65%] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)]"></div>
        <div className="absolute top-0 left-0 h-[50%] w-full bg-white/20"></div>
      </div>
      <div className="flex justify-between text-[10px] font-bold text-slate-400">
        <span>325,000 / 500,000</span>
        <span>RECOVERING...</span>
      </div>
    </div>
  </Card>
);
