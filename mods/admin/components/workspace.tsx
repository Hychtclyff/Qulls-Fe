import {
  BrainCircuit,
  CheckCircle2,
  CheckSquare,
  Pause,
  Play,
  Plus,
  RotateCcw,
  StickyNote,
  X,
  Zap,
} from 'lucide-react';
import { Card } from './ui/card';
import { INITIAL_DATA } from '../data';
import { useDashboard } from '../hooks/useDashboard';
import { formatTime } from '../utils/formatTime';

export const Workspace = () => {
  const { state, actions } = useDashboard(INITIAL_DATA);
  const data = state.data;
  return (
    <div className="animate-slide-in-up space-y-8">
      <div className="flex items-end justify-between border-b border-cyan-100 pb-4">
        <div>
          <h2 className="flex items-center gap-3 font-mono text-2xl font-bold text-slate-800">
            <BrainCircuit className="text-indigo-500" size={24} /> WORKSPACE
          </h2>
          <p className="mt-1 text-xs text-slate-500">Daily productivity & personal growth OS.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          title="FOCUS LINK"
          icon={Zap}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="relative mb-6 flex h-48 w-48 items-center justify-center rounded-full border-4 border-slate-200 bg-slate-50 shadow-inner">
            <div
              className={`animate-spin-slow absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent ${!state.isTimerRunning && 'paused'}`}
            ></div>
            <span className="font-mono text-5xl font-bold text-slate-700">
              {formatTime(state.timer)}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => actions.setIsTimerRunning(!state.isTimerRunning)}
              className={`rounded-full p-4 shadow-lg transition-all ${state.isTimerRunning ? 'bg-amber-100 text-amber-600' : 'bg-indigo-600 text-white'}`}
            >
              {state.isTimerRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={() => {
                actions.setIsTimerRunning(false);
                actions.setTimer(25 * 60);
              }}
              className="rounded-full bg-slate-200 p-4 text-slate-600 shadow-lg"
            >
              <RotateCcw size={24} />
            </button>
          </div>
          <p className="mt-4 font-mono text-xs tracking-widest text-slate-400 uppercase">
            {state.isTimerRunning ? 'Full Dive Active' : 'Standby Mode'}
          </p>
        </Card>
        <Card title="DAILY GRIND" icon={CheckSquare}>
          <div className="space-y-3">
            {data.habits.map((habit) => (
              <div
                key={habit.id}
                onClick={() => actions.toggleHabit(habit.id)}
                className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all ${habit.completed ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-colors ${habit.completed ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 group-hover:border-indigo-400'}`}
                >
                  {habit.completed && <CheckCircle2 size={16} />}
                </div>
                <div className="flex-1">
                  <h4
                    className={`text-sm font-bold ${habit.completed ? 'text-emerald-700 line-through opacity-70' : 'text-slate-700'}`}
                  >
                    {habit.title}
                  </h4>
                  <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                    Streak: {habit.streak} days
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-slate-100 pt-4 text-center">
            <p className="text-[10px] text-slate-400 italic">
              &quot;Consistency builds authority.&quot;
            </p>
          </div>
        </Card>
        <Card title="SYSTEM MEMO" icon={StickyNote}>
          <div className="flex h-full flex-col">
            <div className="custom-scrollbar mb-4 max-h-[200px] space-y-2 overflow-y-auto">
              {data.notes.map((note) => (
                <div
                  key={note.id}
                  className="group relative rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs text-amber-900"
                >
                  <p>{note.content}</p>
                  <span className="mt-2 block text-[9px] font-bold text-amber-500 opacity-60">
                    {note.date}
                  </span>
                  <button
                    onClick={() => actions.handleDelete(note.id, 'notes')}
                    className="absolute top-2 right-2 text-amber-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {data.notes.length === 0 && (
                <p className="py-4 text-center text-xs text-slate-400">No data fragments found.</p>
              )}
            </div>
            <div className="mt-auto">
              <button
                onClick={() => {
                  actions.setActiveTab('workspace');
                  actions.handleCreate();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-xs font-bold text-slate-400 transition-colors hover:bg-slate-50 hover:text-indigo-500"
              >
                <Plus size={14} /> NEW FRAGMENT
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
