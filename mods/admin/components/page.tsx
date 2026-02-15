import { SidebarInset, SidebarTrigger } from '@/common/components/public/ui/sidebar';
import { INITIAL_DATA, SCHEMA_CONFIG } from '../data';
import { useDashboard } from '../hooks/useDashboard';
import { Overview } from './overview';
import { IceVines, PetalRain, SwordBackground } from './ui/decorations';
import { AppSidebar } from './ui/sidebar';
import { Clock, Map, Snowflake } from 'lucide-react';
import { Workspace } from './workspace';
import { Schedule } from './schedule';
import { Finance } from './finance';
import { Chat } from './chat';
import { QuestBoard } from './questBoard';
import { Strategy } from './strategy';
import { AILab } from './aILab';
import { GenericTable } from './genericTable';
import { ProfilePage } from './profilePage';
import { ProjectPage } from './projectsPage';

export default function AlicizationDualWieldDashboard() {
  const { state, actions } = useDashboard(INITIAL_DATA);

  // --- RENDERERS ---

  return (
    <div className="relative flex min-h-screen w-screen overflow-hidden bg-[#f1f5f9] font-sans text-slate-700 selection:bg-cyan-200 selection:text-cyan-900">
      <SwordBackground />
      <IceVines />
      <PetalRain />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 right-0 h-[60%] w-[60%] rounded-full bg-cyan-200/20 blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 h-[50%] w-[50%] rounded-full bg-indigo-200/20 blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>
      </div>

      {/* {toast && (
        <div className="animate-slide-in-right fixed top-8 right-8 z-[100]">
          <div className="clip-path-slant flex items-center gap-4 rounded-r-xl border-l-4 border-amber-500 bg-white/90 px-6 py-4 shadow-xl backdrop-blur">
            <CheckCircle2 size={20} className="text-amber-500" />
            <div>
              <span className="block font-mono text-[10px] font-bold text-amber-600 uppercase">
                System Call
              </span>
              <span className="text-sm font-medium">{toast}</span>
            </div>
          </div>
        </div>
      )} */}

      <div className="relative z-10 flex h-screen w-full">
        <AppSidebar
          variant="inset"
          activeTab={state.activeTab}
          setActiveTab={actions.setActiveTab}
        />
        <SidebarInset>
          <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden">
            <header
              className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-cyan-100 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
              // className="relative z-20 flex h-16 items-center justify-between border-b border-cyan-100 bg-white/60 px-8 backdrop-blur-md"
            >
              <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />

                <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  <span className="flex items-center gap-1 text-cyan-500">
                    <Snowflake size={12} className="animate-spin-slow" /> SYSTEM CALL:
                  </span>{' '}
                  GENERATE LUMINOUS ELEMENT
                </div>
                <div className="hidden items-center gap-6 font-mono text-xs font-bold text-slate-500 md:flex">
                  <span className="flex items-center gap-2 text-amber-600">
                    <Clock size={12} /> HE 380.5.24
                  </span>
                  <span className="flex items-center gap-2 text-indigo-600">
                    <Map size={12} /> CENTRAL CATHEDRAL
                  </span>
                </div>
              </div>
            </header>

            <div className="custom-scrollbar relative z-10 w-full flex-1 overflow-y-auto p-4 md:p-8">
              {state.activeTab === 'overview' && <Overview data={state.data} />}
              {state.activeTab === 'workspace' && <Workspace />}
              {state.activeTab === 'chat' && <Chat />}
              {state.activeTab === 'ai' && <AILab />}
              {state.activeTab === 'tasks' && <QuestBoard />}
              {state.activeTab === 'schedules' && <Schedule />}
              {state.activeTab === 'finances' && <Finance />}
              {state.activeTab === 'strategies' && <Strategy />}
              {state.activeTab === 'profiles' && <ProfilePage />}
              {state.activeTab === 'projects' && <ProjectPage />}/
              {/* Fallback for generic tables */}
              {SCHEMA_CONFIG[state.activeTab] &&
                !['tasks', 'schedules', 'finances', 'strategies', 'profiles', 'projects'].includes(
                  state.activeTab,
                ) && <GenericTable SCHEMA_CONFIG={SCHEMA_CONFIG} />}
            </div>
          </div>
        </SidebarInset>
      </div>

      {/* {isModalOpen && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-2 border-cyan-200 bg-white shadow-[0_0_50px_rgba(165,243,252,0.5)]">
            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-cyan-100 to-transparent opacity-50"></div>
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-6">
              <h3 className="flex items-center gap-2 font-mono font-bold tracking-widest text-slate-700 uppercase">
                <Wrench size={16} className="text-indigo-500" />{' '}
                {editingItem?.id ? 'MODIFY ELEMENT' : 'GENERATE ELEMENT'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="transition-colors hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="custom-scrollbar overflow-y-auto p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {SCHEMA_CONFIG[activeTab]?.fields.map((field) => (
                  <div
                    key={field.name}
                    className={`${field.width === 'full' ? 'col-span-full' : 'col-span-1'}`}
                  >
                    <label className="mb-1.5 ml-1 block font-mono text-[10px] font-bold text-slate-400 uppercase">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm transition-all focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] focus:outline-none"
                        rows={3}
                        value={editingItem?.[field.name] || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, [field.name]: e.target.value })
                        }
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-sm transition-all focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)] focus:outline-none"
                        value={editingItem?.[field.name] || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, [field.name]: e.target.value })
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 p-6">
              <ActionButton variant="secondary" onClick={() => setIsModalOpen(false)}>
                Abort
              </ActionButton>
              <ActionButton variant="primary" onClick={handleSaveModal}>
                Execute
              </ActionButton>
            </div>
          </div>
        </div>
      )} */}

      <style>{`
        @keyframes fall-spin { 0% { transform: translateY(-10%) rotate(0deg); opacity: 0; } 10% { opacity: 0.8; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes glint { 0% { left: -150%; } 100% { left: 150%; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fall-spin { animation-timing-function: linear; iteration-count: infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-glint { animation: glint 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .clip-path-slant-right { clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%); }
        .clip-path-sword-blade { clip-path: polygon(50% 0, 100% 10%, 80% 100%, 20% 100%, 0 10%); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .paused { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
