import { Filter, Github, RefreshCw, Search, Terminal, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { useRepo } from '../hooks/useRepository';
import { RepoData } from '../services/repository.service';
import { RepositoryCard } from './shared/repositoryCard';
import { ProjectCard } from './shared/projectCard';

// --- Sub Component: ProjectCard (Gaya identity/cyber) ---

// --- Main Page Component ---
export const ProjectPage = () => {
  const {
    orgs,
    filteredRepos,
    categories,
    isLoading,
    selectedOrg,
    setSelectedOrg,
    searchQuery,
    setSearchQuery,
    selectedLang,
    setSelectedLang,
  } = useRepo();
  const handleSyncToDb = (repo: RepoData) => {
    console.log('Trigger Sync for:', repo.name);
    alert(`Syncing ${repo.name} to Database Protocol...`);
  };

  return (
    <div className="space-y-6 p-6">
      <Card title="GITHUB REPOSITORY COMMAND" icon={Terminal}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Github size={28} />
              <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,1)]"></div>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-800">
                REPOSITORY_SOURCES
              </h2>
              <p className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                Status: Connected // Identity: {selectedOrg ? `ORG::${selectedOrg}` : 'PERSONAL'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100/50 p-1.5 backdrop-blur-sm">
            <button
              onClick={() => setSelectedOrg(null)}
              className={`rounded-xl px-5 py-2.5 text-[10px] font-black tracking-widest transition-all ${
                !selectedOrg
                  ? 'bg-slate-900 text-cyan-400 shadow-lg'
                  : 'text-slate-500 hover:bg-slate-200'
              }`}
            >
              PERSONAL_NODE
            </button>
            {orgs.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org.login)}
                className={`rounded-xl px-5 py-2.5 text-[10px] font-black tracking-widest transition-all ${
                  selectedOrg === org.login
                    ? 'bg-cyan-600 text-white shadow-lg'
                    : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                {org.login.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Search Input */}
        <div className="relative lg:col-span-7">
          <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH_REPOSITORY_BY_NAME..."
            className="w-full rounded-2xl border border-cyan-100 bg-white/50 py-3 pr-4 pl-12 font-mono text-xs font-bold tracking-wider transition-all outline-none focus:border-cyan-400 focus:bg-white focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          />
        </div>

        {/* Category Dropdown/Scroll */}
        <div className="flex items-center gap-2 lg:col-span-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-100 bg-white text-cyan-500">
            <Filter size={18} />
          </div>
          <div className="scrollbar-hide flex flex-1 gap-2 overflow-x-auto pb-1">
            {categories.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`rounded-xl px-4 py-2 text-[10px] font-black whitespace-nowrap transition-all ${
                  selectedLang === lang
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'border border-cyan-50 bg-white text-slate-500 hover:border-cyan-200'
                }`}
              >
                {lang?.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex h-80 flex-col items-center justify-center space-y-6">
            <div className="relative">
              <RefreshCw className="animate-spin text-cyan-500" size={48} />
              <div className="absolute inset-0 animate-pulse bg-cyan-500/20 blur-xl filter"></div>
            </div>
            <div className="text-center">
              <p className="animate-pulse font-mono text-xs font-black tracking-[0.3em] text-slate-600">
                DECRYPTING_GITHUB_DATA...
              </p>
              <p className="mt-2 text-[10px] font-bold text-slate-400">
                Please stand by for mission briefing.
              </p>
            </div>
          </div>
        ) : filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <RepositoryCard key={repo.githubRepoId} repo={repo} onSync={handleSyncToDb} />
          ))
        ) : (
          /* Empty State jika filter tidak ketemu */
          <div className="col-span-full flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50">
            <XCircle size={48} className="mb-4 text-slate-300" />
            <h3 className="font-mono text-sm font-bold text-slate-500 uppercase">
              No Matching Mission Data
            </h3>
            <p className="text-xs text-slate-400">Try adjusting your search or category filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLang('ALL');
              }}
              className="mt-4 text-xs font-bold text-cyan-600 uppercase underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
