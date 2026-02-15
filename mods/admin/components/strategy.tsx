import { Compass, Flag, Pencil, Plus, Target, Trash2 } from 'lucide-react';
import { INITIAL_DATA } from '../data';
import { useDashboard } from '../hooks/useDashboard';
import { ActionButton } from './ui/ActionButton';
import { CrystalStar } from './ui/decorations';

export const Strategy = () => {
  const { state, actions } = useDashboard(INITIAL_DATA);
  const data = state.data;

  const shortTerm = data.strategies.filter((s) => s.type === 'short');
  const longTerm = data.strategies.filter((s) => s.type === 'long');

  return (
    <div className="animate-slide-in-up space-y-8">
      <div className="flex items-end justify-between border-b border-cyan-100 pb-4">
        <div>
          <h2 className="flex items-center gap-3 font-mono text-2xl font-bold text-slate-800">
            <Compass className="text-amber-500" size={24} /> STRATEGY MAP
          </h2>
          <p className="mt-1 text-xs text-slate-500">Short-term tactics & Long-term campaigns.</p>
        </div>
        <ActionButton variant="primary" onClick={actions.handleCreate}>
          <Plus size={16} /> New Goal
        </ActionButton>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="mb-2 flex items-center gap-2">
            <Target size={18} className="text-indigo-500" />
            <h3 className="font-mono text-sm font-bold tracking-widest text-slate-600 uppercase">
              Tactical Maneuvers
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {shortTerm.map((item, idx) => (
              <div
                key={item.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group animate-slide-in-left rounded-2xl border border-indigo-100 bg-white/80 p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between">
                  <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 uppercase">
                    {item.category}
                  </span>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => actions.handleEdit(item)}
                      className="text-slate-400 hover:text-indigo-500"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => actions.handleDelete(item.id, 'strategies')}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h4 className="mb-1 text-sm font-bold text-slate-800">{item.title}</h4>
                <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Due: {item.deadline}</span>
                  <span className="font-mono text-indigo-500">{item.status}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100">
                  <div
                    className="h-1.5 rounded-full bg-indigo-500"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="mb-2 flex items-center gap-2">
            <Flag size={18} className="text-amber-500" />
            <h3 className="font-mono text-sm font-bold tracking-widest text-slate-600 uppercase">
              Grand Campaign
            </h3>
          </div>
          <div className="relative space-y-8 border-l-2 border-amber-200 py-2 pl-6">
            {longTerm.map((item, idx) => (
              <div
                key={item.id}
                style={{ animationDelay: `${idx * 150}ms` }}
                className="group animate-fade-in-up relative"
              >
                <div className="absolute top-0 -left-[33px] z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-50 shadow-sm transition-transform group-hover:scale-110">
                  <CrystalStar size={14} className="text-yellow-500" />
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-lg">
                  <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-20 w-20 rounded-full bg-amber-400/5 blur-2xl"></div>
                  <div className="mb-1 flex items-start justify-between">
                    <h4 className="text-base font-bold text-slate-800">{item.title}</h4>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => actions.handleEdit(item)}
                        className="text-slate-400 hover:text-amber-600"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => actions.handleDelete(item.id, 'strategies')}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="mb-3 font-mono text-xs tracking-wide text-amber-700/70 uppercase">
                    {item.deadline}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-slate-500">
                      {item.category}
                    </span>
                    <span className="ml-auto font-bold text-amber-600">
                      {item.progress}% Complete
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
