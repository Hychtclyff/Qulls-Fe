import { CalendarDays, Coins, ShieldAlert, Sword } from 'lucide-react';
import { DashboardData } from '../../types/data';

interface CardSummaryProps {
  data: DashboardData;
}

export const CardSummary = ({ data }: CardSummaryProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    {[
      {
        label: 'ARMAMENT AUTHORITY',
        val: data.projects.length,
        icon: Sword,
        color: 'text-indigo-400',
        border: 'border-indigo-200',
      },
      {
        label: 'ACTIVE MISSIONS',
        val: data.tasks.filter((t) => t.status === 'active').length,
        icon: ShieldAlert,
        color: 'text-yellow-500',
        border: 'border-yellow-200',
      },
      {
        label: 'UPCOMING EVENTS',
        val: data.schedules.length,
        icon: CalendarDays,
        color: 'text-cyan-500',
        border: 'border-cyan-200',
      },
      {
        label: 'TREASURY STATUS',
        val: data.finances.length,
        icon: Coins,
        color: 'text-emerald-500',
        border: 'border-emerald-200',
      },
    ].map((stat, idx) => (
      <div
        key={idx}
        style={{ animationDelay: `${idx * 100}ms` }}
        className={`relative border-b-2 bg-white/40 p-6 backdrop-blur-md ${stat.border} group overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1`}
      >
        <div
          className={`absolute top-0 right-0 p-4 opacity-10 transition-all duration-500 group-hover:rotate-12 group-hover:opacity-20 ${stat.color}`}
        >
          <stat.icon size={64} strokeWidth={1} />
        </div>
        <p className="mb-2 flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest text-slate-500">
          <span className={`h-2 w-2 rounded-full ${stat.color.replace('text', 'bg')}`}></span>
          {stat.label}
        </p>
        <h3 className={`font-mono text-4xl font-bold ${stat.color} drop-shadow-sm`}>
          {stat.val.toString().padStart(2, '0')}
        </h3>
      </div>
    ))}
  </div>
);
