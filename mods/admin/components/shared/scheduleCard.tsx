import { AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Schedule, Task } from '../../types/data';

interface BaseItem {
  id: number;
  title: string;
  date: string;
}

// 2. Definisikan tipe spesifik (gabungan Base + Unik)
interface MissionItem extends BaseItem {
  type: 'Mission'; // Gunakan literal string agar Type Guard berfungsi
  status: 'active' | 'todo' | 'done' | string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | string;
  due: string;
  desc: string;
}

interface EventItem extends BaseItem {
  type: 'Event';
  time: string;
  endTime: string;
  location: string;
  color: string;
}

// 3. Gabungkan menjadi satu tipe utama
type UpcomingItem = MissionItem | EventItem;

interface ScheduleCradProps {
  upcomingItems: UpcomingItem[];
}

export const ScheduleCard = ({ upcomingItems }: ScheduleCradProps) => (
  <Card title="IMPENDING DEADLINES (1 WEEK)" icon={AlertCircle}>
    <div className="space-y-3">
      {upcomingItems.map((item, i) => (
        <div
          key={i}
          className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/50 p-3 transition-colors hover:border-indigo-200"
        >
          <div
            className={`flex h-12 w-12 flex-col items-center justify-center rounded-xl text-xs font-bold shadow-sm ${item.type === 'Mission' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}
          >
            <span className="text-sm">{new Date(item.date).getDate()}</span>
            <span className="text-[8px] uppercase">
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-700 transition-colors group-hover:text-indigo-600">
              {item.title}
            </h4>
            <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
              <span
                className={`rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase ${item.type === 'Mission' ? 'border-amber-200 text-amber-600' : 'border-indigo-200 text-indigo-600'}`}
              >
                {item.type}
              </span>
              <span className="font-mono text-[10px]">
                {item.type === 'Event' ? item.time : item.priority}
              </span>
            </p>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-300 transition-colors group-hover:text-indigo-400"
          />
        </div>
      ))}
      {upcomingItems.length === 0 && (
        <div className="py-4 text-center text-xs text-slate-400 italic">
          No imminent threats detected.
        </div>
      )}
    </div>
  </Card>
);
