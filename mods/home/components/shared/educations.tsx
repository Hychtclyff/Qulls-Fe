"use client";

import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { TechCard } from "../ui/tech-card";
import { Badge } from "@/common/components/ui/badge";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Button } from "@/common/components/ui/button";

import { useTranslations, useLocale } from "next-intl";
import { Education, useSummary } from "../../hooks/use-summary";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/ui/collapsible";
import { useState } from "react";

export const Educations = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { education, isLoading } = useSummary();
  const [isOpen, setIsOpen] = useState(false);

  // Helper bahasa
  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === "en" ? enVal || idVal : idVal;
  };

  // Loading State
  if (isLoading) {
    return (
      <TechCard title={t("edu")} icon={GraduationCap} className="md:col-span-6">
        <div className="space-y-6 h-full justify-center flex flex-col pl-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200 mt-2 shrink-0" />
              <div className="space-y-2 w-full">
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
        className="flex items-start gap-4 group p-2 hover:bg-slate-50 rounded-xl transition-colors relative overflow-hidden"
      >
        {/* Timeline Line & Dot */}
        <div className="mt-1.5 relative h-full flex flex-col items-center shrink-0">
          <div className="w-2.5 h-2.5 bg-white border-2 border-slate-300 rounded-full group-hover:border-blue-500 transition-colors z-10 relative"></div>

          {/* Garis vertikal: Hanya muncul jika BUKAN item terakhir */}
          {!isLastItem && (
            <div className="w-[1px] h-full bg-slate-200 absolute top-2.5 min-h-[80px]"></div>
          )}
        </div>

        <div className="pb-2 w-full">
          <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-wide">
            {getContent(edu.degreeId, edu.degreeEn)}
          </h4>

          <p className="text-xs text-slate-500 mt-1 font-medium">
            {edu.school}
          </p>

          <Badge
            variant="secondary"
            className="mt-2 text-[10px] px-2 py-0 h-5 font-mono bg-slate-100 text-slate-600 border border-slate-200"
          >
            {edu.period}
          </Badge>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            {getContent(edu.descId, edu.descEn)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <TechCard title={t("edu")} icon={GraduationCap} className="md:col-span-6">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="h-full flex flex-col"
      >
        <div className="space-y-2 flex flex-col justify-center">
          {/* 1. Item Utama (Selalu Muncul) */}
          {initialItems.map((edu: Education, idx: number) =>
            renderEducationItem(edu, idx)
          )}

          {/* 2. Item Tersembunyi */}
          {hasMore && (
            <CollapsibleContent className="space-y-2">
              {collapsibleItems.map((edu: Education, idx: number) =>
                // Penting: pass index asli (idx + INITIAL_COUNT) untuk logika garis timeline
                renderEducationItem(edu, idx + INITIAL_COUNT)
              )}
            </CollapsibleContent>
          )}
        </div>

        {/* 3. Tombol Trigger */}
        {hasMore && (
          <div className="flex justify-center pt-2 mt-auto">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-2 text-xs text-slate-400 hover:text-blue-600 hover:bg-transparent"
              >
                {isOpen ? (
                  <>
                    Show Less <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Show More ({collapsibleItems.length}){" "}
                    <ChevronDown size={14} />
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
