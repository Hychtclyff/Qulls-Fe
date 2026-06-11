'use client';

import { useState } from 'react';
import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { TechCard } from '../ui/tech-card';

import { Badge } from '@/common/components/public/ui/badge';
import { Button } from '@/common/components/public/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/common/components/public/ui/collapsible';
import { portfolioData } from '@/common/data/project-id';

export const Experiences = () => {
  const [isOpen, setIsOpen] = useState(false);

  const experiences = portfolioData.experiences;

  const INITIAL_COUNT = 2;
  const initialItems = experiences.slice(0, INITIAL_COUNT);
  const collapsibleItems = experiences.slice(INITIAL_COUNT);
  const hasMore = collapsibleItems.length > 0;

  const renderExperienceItem = (exp: any, idx: number) => {
    const isInternship =
      exp.role.toLowerCase().includes('intern') ||
      exp.company.toLowerCase().includes('magang') ||
      exp.company.toLowerCase().includes('kampus merdeka') ||
      exp.company.toLowerCase().includes('Coding Camp');

    return (
      <div
        key={exp.id || idx}
        className="group relative border-l-2 border-slate-100 pb-2 pl-8 transition-colors hover:border-blue-200"
      >
        <div
          className={`absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-white shadow-sm ${
            isInternship ? 'bg-slate-400' : 'bg-blue-600'
          } z-10 transition-transform group-hover:scale-110`}
        />

        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h4 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600">
              {exp.role}
            </h4>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-bold tracking-wide text-blue-600 uppercase">
              {exp.company}
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block"></span>
              <span className="rounded border border-slate-200 bg-slate-50 px-1.5 text-xs font-medium text-slate-400 normal-case">
                {isInternship ? 'Internship' : 'Full-time'}
              </span>
            </p>
          </div>

          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            {isInternship && (
              <Badge
                variant="secondary"
                className="border-amber-100 bg-amber-50 text-[10px] text-amber-600 uppercase hover:bg-amber-100"
              >
                Magang
              </Badge>
            )}
            <Badge
              variant="outline"
              className="flex shrink-0 items-center gap-1 rounded border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px]"
            >
              <Calendar size={12} className="mr-1 text-slate-400" />
              {exp.period}
            </Badge>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
          {exp.description}
        </p>
      </div>
    );
  };

  return (
    <TechCard title="Pengalaman Kerja" icon={Briefcase} className="col-span-1 md:col-span-12">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-6">
        <div id="experience" className="max-w-4xl space-y-8 pl-2 md:px-4">
          {/* 1. Render item awal (selalu terlihat) */}
          {initialItems.map((exp, idx) => renderExperienceItem(exp, idx))}

          {/* 2. Render item sisa (tersembunyi dalam CollapsibleContent) */}
          {hasMore && (
            <CollapsibleContent className="space-y-8">
              {collapsibleItems.map((exp, idx) => renderExperienceItem(exp, idx + INITIAL_COUNT))}
            </CollapsibleContent>
          )}
        </div>

        {/* 3. Tombol Trigger */}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                {isOpen ? (
                  <>
                    Tampilkan Lebih Sedikit <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Lihat Semua ({collapsibleItems.length}) <ChevronDown size={16} />
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        )}
      </Collapsible>
    </TechCard>
  );
};
