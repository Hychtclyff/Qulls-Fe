import { Activity } from 'lucide-react';
import { Project } from '../../types/data';
import { Card } from '../ui/card';

interface ProjectCardProps {
  projects: Project[];
}

export const ProjectCard = ({ projects }: ProjectCardProps) => (
  <Card title="ACTIVE ARMAMENT PROJECTS" icon={Activity}>
    <div className="space-y-5">
      {projects.map((proj, i) => (
        <div key={proj.id} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">{proj.title_en}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${proj.status === 'Optimizing' ? 'bg-emerald-100 text-emerald-700' : proj.status === 'Active' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}
            >
              {proj.status}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-1000 ease-out"
              style={{ width: `${proj.progress}%`, animationDelay: `${i * 200}ms` }}
            ></div>
          </div>
          <div className="text-right font-mono text-[10px] text-slate-400">
            {proj.progress}% Complete
          </div>
        </div>
      ))}
    </div>
  </Card>
);
