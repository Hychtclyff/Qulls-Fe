import { CheckCircle2, Map, Plus, ShieldAlert, Sword, Terminal, Trash2 } from 'lucide-react';
import { ActionButton } from './ui/ActionButton';
import { INITIAL_DATA } from '../data';
import { useDashboard } from '../hooks/useDashboard';

export const QuestBoard = () => {
  const { state, actions } = useDashboard(INITIAL_DATA);
  const data = state.data;
  const columns = [
    {
      id: 'todo',
      label: 'PENDING ORDERS',
      color: 'border-slate-400',
      bg: 'bg-slate-50',
      icon: Terminal,
    },
    {
      id: 'active',
      label: 'ENGAGEMENT',
      color: 'border-cyan-400',
      bg: 'bg-cyan-50',
      icon: Sword,
    },
    {
      id: 'done',
      label: 'HISTORY LOG',
      color: 'border-emerald-400',
      bg: 'bg-emerald-50',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="animate-slide-in-up flex h-full flex-col space-y-4">
      <div className="flex items-end justify-between border-b border-cyan-100 pb-4">
        <div>
          <h2 className="flex items-center gap-3 font-mono text-2xl font-bold text-slate-800">
            <Map className="text-amber-500" size={24} /> MISSION LOG
          </h2>
          <p className="mt-1 text-xs text-slate-500">Manage Underworld quests and tasks.</p>
        </div>
        <ActionButton variant="accent" onClick={actions.handleCreate}>
          <Plus size={16} /> New Mission
        </ActionButton>
      </div>
      <div className="grid min-h-[500px] flex-1 grid-cols-1 gap-6 md:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`flex h-full flex-col rounded-3xl border ${col.color} ${col.bg} bg-opacity-30 p-3 backdrop-blur-sm`}
          >
            <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/50 bg-white/60 p-3 shadow-sm">
              <col.icon size={16} className="text-slate-600" />
              <span className="font-mono text-xs font-bold tracking-widest text-slate-700">
                {col.label}
              </span>
              <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                {data.tasks.filter((t) => t.status === col.id).length}
              </span>
            </div>
            <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto pr-1">
              {data.tasks
                .filter((t) => t.status === col.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className="group relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
                  >
                    {task.priority === 'Critical' && (
                      <div className="absolute top-3 right-3">
                        <ShieldAlert size={14} className="animate-pulse text-red-500" />
                      </div>
                    )}
                    <h4 className="mb-1 text-sm font-bold text-slate-800">{task.title}</h4>
                    <p className="mb-3 line-clamp-2 text-xs text-slate-500">{task.desc}</p>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                      <span className="rounded-full bg-cyan-50 px-2 py-0.5 font-mono text-[10px] text-cyan-600">
                        {task.due}
                      </span>
                      <div className="flex gap-1 opacity-50 transition-opacity group-hover:opacity-100">
                        {col.id !== 'active' && (
                          <button
                            onClick={() => actions.updateTaskStatus(task.id, 'active')}
                            className="rounded-lg p-1.5 transition-colors hover:bg-cyan-50 hover:text-cyan-500"
                          >
                            <Sword size={12} />
                          </button>
                        )}
                        {col.id !== 'done' && (
                          <button
                            onClick={() => actions.updateTaskStatus(task.id, 'done')}
                            className="rounded-lg p-1.5 transition-colors hover:bg-emerald-50 hover:text-emerald-500"
                          >
                            <CheckCircle2 size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => actions.handleDelete(task.id, 'tasks')}
                          className="rounded-lg p-1.5 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
