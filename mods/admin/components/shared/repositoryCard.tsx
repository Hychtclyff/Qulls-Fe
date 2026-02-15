import { Github, Database, Star, GitFork, Cpu, Code2, Clock, Layout, Globe } from 'lucide-react';
import { Badge } from '@/common/components/public/ui/badge';
import { RepoData } from '../../services/repository.service';
import { Card } from '../ui/card';

export const RepositoryCard = ({
  repo,
  onSync,
}: {
  repo: RepoData;
  onSync: (repo: RepoData) => void;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card title="MISSION_DATA_SYNC" icon={Cpu} className="group h-full">
      <div className="flex h-full flex-col justify-between">
        {/* 1. Header: Info Repo & Stats */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-cyan-600 uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
              </span>
              Node: {repo.owner ?? 'UNKNOWN'}
            </span>
            <h4 className="text-lg font-black tracking-tight text-slate-800 transition-colors group-hover:text-cyan-600">
              {repo.name.toUpperCase()}
            </h4>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="flex gap-2 text-slate-400">
              <span className="flex items-center gap-1 text-[10px] font-bold">
                <Star size={12} className="text-yellow-500" /> {repo.stars}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold">
                <GitFork size={12} className="text-cyan-500" /> {repo.forks}
              </span>
            </div>
            <Badge
              variant="outline"
              className="border-cyan-100 bg-cyan-50/30 text-[9px] font-bold text-cyan-700"
            >
              {repo.primaryLanguage || 'PLAIN_TEXT'}
            </Badge>
          </div>
        </div>

        {/* 2. Description Box */}
        <div className="mb-4 rounded-lg border border-slate-100/50 bg-slate-50/50 p-3">
          <p className="line-clamp-2 text-[11px] leading-relaxed text-slate-500 italic">
            &quot;{repo.description}&quot;
          </p>
        </div>

        {/* 3. Technology Analysis */}
        <div className="mb-4 space-y-2">
          <h5 className="flex items-center gap-1 font-mono text-[9px] font-bold text-slate-400 uppercase">
            <Code2 size={10} /> Stack_Analysis
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {repo.allLanguages.map((lang: string) => (
              <span
                key={lang}
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[9px] font-bold text-slate-600 shadow-sm"
              >
                <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Metadata Grid */}
        <div className="mb-6 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
          <div className="flex flex-col gap-1">
            <h5 className="flex items-center gap-1 font-mono text-[8px] font-bold text-slate-400 uppercase">
              <Clock size={10} /> Last_Update
            </h5>
            <span className="text-[10px] font-bold text-slate-600">
              {formatDate(repo.lastPushed.toDateString())}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="flex items-center gap-1 font-mono text-[8px] font-bold text-slate-400 uppercase">
              <Layout size={10} /> Deploy_Status
            </h5>
            <span
              className={`text-[10px] font-bold ${
                repo.homepage ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              {repo.homepage ? 'ACTIVE_PROD' : 'LOCAL_ONLY'}
            </span>
          </div>
        </div>

        {/* 5. Footer: Action Buttons */}
        <div className="mt-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold text-slate-600 transition-all hover:bg-slate-900 hover:text-white"
            >
              <Github size={12} /> SOURCE
            </a>
            {repo.homepage ? (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50/50 py-2.5 text-[10px] font-bold text-cyan-700 shadow-sm transition-all hover:bg-cyan-500 hover:text-white"
              >
                <Globe size={12} /> LIVE_DEMO
              </a>
            ) : (
              <div className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 py-2.5 text-[10px] font-bold text-slate-300">
                <Globe size={12} /> NO_HOST
              </div>
            )}
          </div>

          <button
            onClick={() => onSync(repo)}
            className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 py-3.5 text-[10px] font-bold text-white shadow-xl transition-all active:scale-[0.98]"
          >
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-[100%]"></div>
            <Database size={14} className="text-cyan-400" />
            INITIALIZE SYNC PROTOCOL
          </button>
        </div>
      </div>
    </Card>
  );
};
