import { LucideIcon, Pencil, Plus, Trash2 } from 'lucide-react';
import { INITIAL_DATA } from '../data';
import { useDashboard } from '../hooks/useDashboard';
import { ActionButton } from './ui/ActionButton';

interface SchemaItem {
  icon: LucideIcon;
  label: string;
}

interface GenericTableProps {
  SCHEMA_CONFIG: Record<string, SchemaItem>;
}

export const GenericTable = ({ SCHEMA_CONFIG }: GenericTableProps) => {
  const { state, actions } = useDashboard(INITIAL_DATA);
  const { data, activeTab } = state;

  const config = SCHEMA_CONFIG[activeTab];

  const items = data ? (Array.isArray(data) ? data : [data]) : [];

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex items-end justify-between border-b border-cyan-100 pb-4">
        {config ? (
          <div>
            <h2 className="flex items-center gap-3 font-mono text-2xl font-bold text-slate-800">
              <config.icon className="text-indigo-500" size={24} /> {config.label.toUpperCase()}
            </h2>
            <p className="mt-1 text-xs text-slate-500">System Registry Access.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-slate-800">UNKNOWN REGISTRY</h2>
          </div>
        )}

        <ActionButton variant="primary" onClick={actions.handleCreate}>
          <Plus size={16} /> Add Record
        </ActionButton>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 p-12 text-center text-slate-400">
            No records found in the Light Cube Cluster.
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{ animationDelay: `${idx * 50}ms` }}
              className="animate-slide-in-left group flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-cyan-300 hover:shadow-lg md:flex-row"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 transition-colors group-hover:bg-cyan-500 group-hover:text-white">
                <span className="font-mono text-lg font-bold">#{idx + 1}</span>
              </div>

              <div className="flex-1 overflow-hidden text-center md:text-left">
                <h4 className="truncate text-lg font-bold text-slate-800 transition-colors group-hover:text-cyan-700">
                  {item.title_en || item.company || item.title || item.name || 'Untitled Record'}
                </h4>
                <p className="font-mono text-xs tracking-wider text-indigo-500 uppercase">
                  {item.title_id || item.role_id || item.degree_id || item.type || 'Generic Type'}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {item.desc_en || item.desc || 'No description available.'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {(item.stat_value || item.period) && (
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-600">
                    {item.stat_value || item.period}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => actions.handleEdit(item)}
                    className="rounded-xl p-2 text-slate-400 transition-all hover:bg-indigo-50 hover:text-indigo-500"
                  >
                    <Pencil size={18} />
                  </button>
                  {/* <button
                    onClick={() => actions.handleDelete(item.id, activeTab)} 
                    className="rounded-xl p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
