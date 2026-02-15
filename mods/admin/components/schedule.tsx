import { CalendarDays, Map, Pencil, Plus, Trash2 } from 'lucide-react';
import { INITIAL_DATA } from '../data';
import { useDashboard } from '../hooks/useDashboard';
import { ActionButton } from './ui/ActionButton';

export const Schedule = () => {
  const { state, actions } = useDashboard(INITIAL_DATA);
  const data = state.data;

  const groupedSchedules = data.schedules.reduce(
    (groups, event) => {
      const date = event.date;
      if (!groups[date]) groups[date] = [];
      groups[date].push(event);
      return groups;
    },
    {} as Record<string, typeof data.schedules>,
  );
  const sortedDates = Object.keys(groupedSchedules).sort();

  return (
    <div className="animate-slide-in-up space-y-6">
      <div className="flex items-end justify-between border-b border-cyan-100 pb-4">
        <div>
          <h2 className="flex items-center gap-3 font-mono text-2xl font-bold text-slate-800">
            <CalendarDays className="text-indigo-500" size={24} /> CHRONOMETER
          </h2>
          <p className="mt-1 text-xs text-slate-500">Manage timeline and scheduled events.</p>
        </div>
        <ActionButton variant="primary" onClick={actions.handleCreate}>
          <Plus size={16} /> New Event
        </ActionButton>
      </div>
      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date}>
            <div className="sticky top-0 z-10 mb-4 flex items-baseline gap-3 border-b border-slate-200 bg-[#f1f5f9]/95 p-3 py-2 backdrop-blur-sm">
              <span className="text-2xl font-bold text-slate-800">{new Date(date).getDate()}</span>
              <span className="text-sm font-medium tracking-wide text-slate-500 uppercase">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="ml-auto text-xs text-slate-400">
                {new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="space-y-2">
              {groupedSchedules[date]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((event) => (
                  <div key={event.id} className="group flex">
                    <div className="flex w-16 flex-col items-end p-4">
                      <span className="p-2 text-xs font-bold text-slate-600">{event.time}</span>
                      <span className="text-[10px] text-slate-400">{event.endTime || ''}</span>
                    </div>
                    <div
                      className={`relative flex-1 cursor-pointer rounded-xl border p-3 transition-all hover:shadow-md ${event.color || 'border-slate-200 bg-white'}`}
                    >
                      <div
                        className={`absolute top-3 bottom-3 left-0 w-1 rounded-r-full ${event.color ? event.color.replace('bg-', 'bg-opacity-50') : 'bg-slate-300'}`}
                      ></div>
                      <div className="pl-3">
                        <div className="flex items-start justify-between">
                          <h4 className="mb-1 text-sm font-bold text-slate-800">{event.title}</h4>
                          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              onClick={() => actions.handleEdit(event)}
                              className="rounded p-1 hover:bg-black/5"
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              onClick={() => actions.handleDelete(event.id, 'schedules')}
                              className="rounded p-1 text-red-500 hover:bg-black/5"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs opacity-80">
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <Map size={10} /> {event.location}
                            </span>
                          )}
                          {event.type && (
                            <span className="rounded-md bg-black/5 px-1.5 py-0.5 text-[10px] font-medium uppercase">
                              {event.type}
                            </span>
                          )}
                        </div>
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
