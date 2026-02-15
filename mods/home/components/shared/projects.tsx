'use client';

import { ArrowUpRight, Server, Zap } from 'lucide-react';
// 1. Hapus import data statis & hook lama
// import { TRANSLATIONS } from "../../data/translations";
// import { PROJECTS } from "../../data/projects";
// import { useTranslation } from "../../hooks/use-translations";

import { TechCard } from '../ui/tech-card';
import Image from 'next/image';
import { Badge } from '@/common/components/public/ui/badge';
import { Button } from '@/common/components/public/ui/button';

// 2. Import hooks baru
import { useTranslations, useLocale } from 'next-intl';
import { Project, useSummary } from '../../hooks/use-summary';

export const Projects = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { projects, isLoading } = useSummary();

  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === 'en' ? enVal || idVal : idVal;
  };

  // 3. Loading State
  if (isLoading) {
    return (
      <div className="col-span-1 flex flex-col gap-6 md:col-span-12">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-50 p-1.5">
            <Server size={16} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">{t('projects.title')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {[1].map((i) => (
            <div key={i} className="h-80 w-full animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-1 flex flex-col gap-6 md:col-span-12">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-1.5 text-blue-600">
            <Server size={16} />
          </div>
          {/* Gunakan t() */}
          {t('projects.title')}
        </h2>
      </div>

      {/* Stacked Wide Project Cards */}
      <div className="grid grid-cols-1 gap-8">
        {projects?.map((project: Project) => (
          <TechCard
            key={project.id}
            noPadding
            className="group cursor-pointer !overflow-hidden border-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-full flex-col md:flex-row">
              {/* Project Image - Large & Wide */}
              <div className="group relative h-56 w-full overflow-hidden bg-slate-100 md:h-auto md:w-5/12">
                <Image
                  // Gunakan fill untuk cover area
                  fill
                  src={project.imageUrl ?? ''}
                  alt={getContent(project.titleId, project.titleEn) || 'Project'}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Stat Badge from API (Efficiency: 40%+) */}
                {project.statValue && (
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-slate-100 bg-white/95 px-3 py-1 font-mono text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur">
                    <span className="tracking-wider text-blue-600 uppercase">
                      {getContent(project.statLabelId ?? '', project.statLabelEn ?? '')}
                    </span>
                    <span className="h-3 w-px bg-slate-300"></span>
                    <span>{project.statValue}</span>
                  </div>
                )}

                {/* Image overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
              </div>

              {/* Project Details */}
              <div className="relative flex flex-1 flex-col justify-center bg-white p-6 md:p-10">
                {/* Top Right Corner Deco */}
                <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-slate-100"></div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                    <Zap size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600 md:text-2xl">
                    {/* Bilingual Title */}
                    {getContent(project.titleId, project.titleEn)}
                  </h3>
                </div>

                <p className="mb-8 line-clamp-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
                  {/* Bilingual Desc */}
                  {getContent(project.descId, project.descEn)}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-6 border-t border-slate-50 pt-6">
                  {/* Tech Stack Mapping */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                      <Badge
                        key={tech.id}
                        variant="secondary"
                        className="border border-slate-200 bg-slate-100 font-mono text-[10px] text-slate-600"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="ml-auto h-9 font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700 md:ml-0"
                  >
                    Case Study <ArrowUpRight size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </TechCard>
        ))}
      </div>
    </div>
  );
};
