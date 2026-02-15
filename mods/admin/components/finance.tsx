import {
  Coins,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { INITIAL_DATA } from '../data';
import { useDashboard } from '../hooks/useDashboard';
import { ActionButton } from './ui/ActionButton';
import { Card } from './ui/card';
import { formatCurrency } from '../utils/formatCurrency';

export const Finance = () => {
  const { state, actions } = useDashboard(INITIAL_DATA);
  const data = state.data ?? [];

  const totalBalance = data.finances.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = data.finances
    .filter((f) => f.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = data.finances
    .filter((f) => f.type === 'expense')
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  return (
    <div className="animate-slide-in-up space-y-6">
      <div className="flex items-end justify-between border-b border-cyan-100 pb-4">
        <div>
          <h2 className="flex items-center gap-3 font-mono text-2xl font-bold text-slate-800">
            <Coins className="text-amber-500" size={24} /> TREASURY
          </h2>
          <p className="mt-1 text-xs text-slate-500">Manage assets and Col transactions.</p>
        </div>
        <ActionButton variant="accent" onClick={actions.handleCreate}>
          <Plus size={16} /> New Transaction
        </ActionButton>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="!border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl shadow-slate-900/10">
          <div className="mb-4 flex items-center gap-3 opacity-80">
            <div className="rounded-xl bg-white/10 p-2">
              <Wallet size={20} className="text-cyan-400" />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase">Total Balance</span>
          </div>
          <div className="font-mono text-4xl font-bold text-cyan-300 drop-shadow-md">
            {formatCurrency(totalBalance)}
          </div>
        </Card>
        <Card className="!border-emerald-200 bg-white/60">
          <div className="mb-4 flex items-center gap-3 text-emerald-700">
            <div className="rounded-xl bg-emerald-100 p-2">
              <TrendingUp size={20} />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase">Total Income</span>
          </div>
          <div className="font-mono text-3xl font-bold text-emerald-600">
            +{formatCurrency(totalIncome)}
          </div>
        </Card>
        <Card className="!border-red-200 bg-white/60">
          <div className="mb-4 flex items-center gap-3 text-red-700">
            <div className="rounded-xl bg-red-100 p-2">
              <TrendingDown size={20} />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase">Total Expense</span>
          </div>
          <div className="font-mono text-3xl font-bold text-red-600">
            -{formatCurrency(totalExpense)}
          </div>
        </Card>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-mono text-sm font-bold tracking-widest text-slate-500 uppercase">
            Transaction History
          </h3>
          <button className="text-slate-400 hover:text-indigo-500">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {data.finances.map((item, idx) => (
            <div
              key={item.id}
              style={{ animationDelay: `${idx * 50}ms` }}
              className="group flex items-center justify-between rounded-2xl p-3 transition-colors hover:bg-white/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${item.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}
                >
                  {item.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700">{item.title}</h4>
                  <p className="mt-0.5 flex items-center gap-2 font-mono text-xs text-slate-500">
                    <span>{item.date}</span> •{' '}
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] tracking-wide uppercase">
                      {item.category}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span
                  className={`font-mono text-base font-bold ${item.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}
                >
                  {item.type === 'income' ? '+' : ''}
                  {formatCurrency(item.amount)}
                </span>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => actions.handleEdit(item)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-500"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => actions.handleDelete(item.id, 'finances')}
                    className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
