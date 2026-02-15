'use client';

import { GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { TechCard } from '../ui/tech-card';
import { Badge } from '@/common/components/public/ui/badge';
import { Skeleton } from '@/common/components/public/ui/skeleton';
import { Button } from '@/common/components/public/ui/button';

import { useTranslations, useLocale } from 'next-intl';
import { Education, useSummary } from '../../hooks/use-summary';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/common/components/public/ui/collapsible';
import { useState } from 'react';

export const Educations = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { education, isLoading } = useSummary();
  const [isOpen, setIsOpen] = useState(false);

  // Helper bahasa
  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === 'en' ? enVal || idVal : idVal;
  };

  // Loading State
  if (isLoading) {
    return (
      <TechCard title={t('edu')} icon={GraduationCap} className="md:col-span-6">
        <div className="flex h-full flex-col justify-center space-y-6 pl-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-200" />
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-3/4 bg-slate-200" />
                <Skeleton className="h-3 w-1/2 bg-slate-100" />
                <Skeleton className="h-5 w-16 rounded-md bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </TechCard>
    );
  }

  // --- LOGIC COLLAPSIBLE ---
  // Tampilkan 1 item terbaru secara default, sisanya di-collapse
  const INITIAL_COUNT = 1;
  const initialItems = education?.slice(0, INITIAL_COUNT) || [];
  const collapsibleItems = education?.slice(INITIAL_COUNT) || [];
  const hasMore = collapsibleItems.length > 0;
  const totalItems = education?.length || 0;

  // Helper render item (agar tidak duplikasi kode)
  const renderEducationItem = (edu: Education, actualIndex: number) => {
    const isLastItem = actualIndex === totalItems - 1;

    return (
      <div
        key={edu.id || actualIndex}
        className="group relative flex items-start gap-4 overflow-hidden rounded-xl p-2 transition-colors hover:bg-slate-50"
      >
        {/* Timeline Line & Dot */}
        <div className="relative mt-1.5 flex h-full shrink-0 flex-col items-center">
          <div className="relative z-10 h-2.5 w-2.5 rounded-full border-2 border-slate-300 bg-white transition-colors group-hover:border-blue-500"></div>

          {/* Garis vertikal: Hanya muncul jika BUKAN item terakhir */}
          {!isLastItem && (
            <div className="absolute top-2.5 h-full min-h-[80px] w-[1px] bg-slate-200"></div>
          )}
        </div>

        <div className="w-full pb-2">
          <h4 className="text-sm leading-tight font-bold tracking-wide text-slate-800 uppercase transition-colors group-hover:text-blue-600">
            {getContent(edu.degreeId, edu.degreeEn)}
          </h4>

          <p className="mt-1 text-xs font-medium text-slate-500">{edu.school}</p>

          <Badge
            variant="secondary"
            className="mt-2 h-5 border border-slate-200 bg-slate-100 px-2 py-0 font-mono text-[10px] text-slate-600"
          >
            {edu.period}
          </Badge>

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {getContent(edu.descId, edu.descEn)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <TechCard title={t('edu')} icon={GraduationCap} className="md:col-span-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex h-full flex-col">
        <div className="flex flex-col justify-center space-y-2">
          {/* 1. Item Utama (Selalu Muncul) */}
          {initialItems.map((edu: Education, idx: number) => renderEducationItem(edu, idx))}

          {/* 2. Item Tersembunyi */}
          {hasMore && (
            <CollapsibleContent className="space-y-2">
              {collapsibleItems.map((edu: Education, idx: number) =>
                // Penting: pass index asli (idx + INITIAL_COUNT) untuk logika garis timeline
                renderEducationItem(edu, idx + INITIAL_COUNT),
              )}
            </CollapsibleContent>
          )}
        </div>

        {/* 3. Tombol Trigger */}
        {hasMore && (
          <div className="mt-auto flex justify-center pt-2">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-2 text-xs text-slate-400 hover:bg-transparent hover:text-blue-600"
              >
                {isOpen ? (
                  <>
                    Show Less <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Show More ({collapsibleItems.length}) <ChevronDown size={14} />
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
