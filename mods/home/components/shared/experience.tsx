'use client';

import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react'; // Tambah Icon Chevron
import { TechCard } from '../ui/tech-card';
import { Badge } from '@/common/components/public/ui/badge';
import { Skeleton } from '@/common/components/public/ui/skeleton';
import { Button } from '@/common/components/public/ui/button'; // Import Button

import { useTranslations, useLocale } from 'next-intl';
import { Experience, useSummary } from '../../hooks/use-summary';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/common/components/public/ui/collapsible'; // Import sub-komponen
import { useState } from 'react';

export const Experiences = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { experiences, isLoading } = useSummary();
  const [isOpen, setIsOpen] = useState(false);

  // Helper bahasa
  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === 'en' ? enVal || idVal : idVal;
  };

  const formatJobType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (isLoading) {
    return (
      <TechCard title={t('career')} icon={Briefcase} className="col-span-1 md:col-span-12">
        <div className="max-w-4xl space-y-8 pl-2 md:px-4">
          {[1, 2].map((i) => (
            <div key={i} className="relative border-l-2 border-slate-100 pl-8">
              <div className="absolute top-0 -left-[9px] h-4 w-4 rounded-full border-4 border-white bg-slate-200" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-1/3 bg-slate-200" />
                <Skeleton className="h-4 w-1/4 bg-slate-100" />
                <Skeleton className="h-4 w-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </TechCard>
    );
  }

  // LOGIC BARU: Pisahkan data menjadi "Utama" (tampil terus) dan "Sisa" (masuk collapsible)
  const INITIAL_COUNT = 2;
  const initialItems = experiences?.slice(0, INITIAL_COUNT) || [];
  const collapsibleItems = experiences?.slice(INITIAL_COUNT) || [];
  const hasMore = collapsibleItems.length > 0;

  // Render Item Component (dibuat fungsi agar tidak duplikasi kode)
  const renderExperienceItem = (exp: Experience, idx: number) => {
    const isInternship = exp.jobType === 'internship' || exp.jobType === 'contract';

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
              {getContent(exp.roleId, exp.roleEn)}
            </h4>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-bold tracking-wide text-blue-600 uppercase">
              {exp.company}
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block"></span>
              <span className="rounded border border-slate-200 bg-slate-50 px-1.5 text-xs font-medium text-slate-400 normal-case">
                {formatJobType(exp.jobType)}
              </span>
            </p>
          </div>

          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            {exp.jobType === 'internship' && (
              <Badge
                variant="secondary"
                className="border-amber-100 bg-amber-50 text-[10px] text-amber-600 uppercase"
              >
                {t('intern')}
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
          {getContent(exp.descId, exp.descEn)}
        </p>
      </div>
    );
  };

  return (
    <TechCard title={t('career')} icon={Briefcase} className="col-span-1 md:col-span-12">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-full flex-col gap-6" // Hapus w-[350px], ganti w-full
      >
        <div id="experience" className="max-w-4xl space-y-8 pl-2 md:px-4">
          {/* 1. Render item awal (selalu terlihat) */}
          {initialItems.map((exp: Experience, idx: number) => renderExperienceItem(exp, idx))}

          {/* 2. Render item sisa (tersembunyi dalam CollapsibleContent) */}
          {hasMore && (
            <CollapsibleContent className="space-y-8">
              {/* start index dilanjutkan dari initial count */}
              {collapsibleItems.map((exp: Experience, idx: number) =>
                renderExperienceItem(exp, idx + INITIAL_COUNT),
              )}
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
                className="gap-2 text-slate-500 hover:text-blue-600"
              >
                {isOpen ? (
                  <>
                    Show Less <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Show More ({collapsibleItems.length}) <ChevronDown size={16} />
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
