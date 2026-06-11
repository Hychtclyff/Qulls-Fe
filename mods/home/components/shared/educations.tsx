'use client';

import { useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import Image from 'next/image'; // Tambahkan ini
import { TechCard } from '../ui/tech-card';

import { Badge } from '@/common/components/public/ui/badge';
import { Button } from '@/common/components/public/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/common/components/public/ui/collapsible';

const staticEducation = [
  {
    id: 'edu-1',
    degree: 'S1 Sistem Informasi',
    school: 'Universitas Jambi',
    period: 'Juli 2022 - Sekarang',
    // Tempatkan URL logo Universitas Jambi di sini (opsional)
    logoUrl: 'https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1SojrXx91yaS32AP4OiVQlfC5g0HxpDEcF8YdR',
    description:
      'Minor dalam Web Development. Fokus pada rekayasa perangkat lunak, arsitektur sistem, dan otomatisasi bisnis. Aktif mengaplikasikan teknologi untuk menyelesaikan studi kasus dunia nyata.',
    // Masukkan ke dalam objek
    research: 'https://ejurnal.seminar-id.com/index.php/josh/article/view/9461',
  },
];

export const Educations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const education = staticEducation;

  const INITIAL_COUNT = 1;
  const initialItems = education.slice(0, INITIAL_COUNT);
  const collapsibleItems = education.slice(INITIAL_COUNT);
  const hasMore = collapsibleItems.length > 0;
  const totalItems = education.length;

  const renderEducationItem = (edu: (typeof staticEducation)[0], actualIndex: number) => {
    const isLastItem = actualIndex === totalItems - 1;

    return (
      <div
        key={edu.id}
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
          {/* Header & Logo Section */}
          <div className="flex items-center gap-3">
            {/* Space untuk Logo */}
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white p-1">
              {edu.logoUrl ? (
                <Image
                  src={edu.logoUrl}
                  alt={edu.school}
                  fill
                  className="object-contain p-1"
                  sizes="40px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
                  <GraduationCap size={16} />
                </div>
              )}
            </div>

            {/* Title & School */}
            <div className="flex flex-col">
              <h4 className="text-sm leading-tight font-bold tracking-wide text-slate-800 uppercase transition-colors group-hover:text-blue-600">
                {edu.degree}
              </h4>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{edu.school}</p>
            </div>
          </div>

          {/* Badge Period */}
          <Badge
            variant="secondary"
            className="mt-3 h-5 border border-slate-200 bg-slate-100 px-2 py-0 font-mono text-[10px] text-slate-600"
          >
            {edu.period}
          </Badge>

          {/* Description */}
          <p className="mt-2 text-xs leading-relaxed text-slate-500">{edu.description}</p>

          {/* Research / Publikasi Link */}
          {edu.research && (
            <a
              href={edu.research}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 transition-colors hover:text-blue-800"
            >
              Lihat Publikasi Riset <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <TechCard title="Pendidikan" icon={GraduationCap} className="md:col-span-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex h-full flex-col">
        <div className="flex flex-col justify-center space-y-2">
          {/* 1. Item Utama (Selalu Muncul) */}
          {initialItems.map((edu, idx) => renderEducationItem(edu, idx))}

          {/* 2. Item Tersembunyi */}
          {hasMore && (
            <CollapsibleContent className="space-y-2">
              {collapsibleItems.map((edu, idx) => renderEducationItem(edu, idx + INITIAL_COUNT))}
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
                className="h-8 gap-2 text-xs text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                {isOpen ? (
                  <>
                    Tampilkan Lebih Sedikit <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Lihat Semua ({collapsibleItems.length}) <ChevronDown size={14} />
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
