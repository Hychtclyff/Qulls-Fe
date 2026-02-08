"use client";

import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react"; // Tambah Icon Chevron
import { TechCard } from "../ui/tech-card";
import { Badge } from "@/common/components/ui/badge";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Button } from "@/common/components/ui/button"; // Import Button

import { useTranslations, useLocale } from "next-intl";
import { Experience, useSummary } from "../../hooks/use-summary";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/ui/collapsible"; // Import sub-komponen
import { useState } from "react";

export const Experiences = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { experiences, isLoading } = useSummary();
  const [isOpen, setIsOpen] = useState(false);

  // Helper bahasa
  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === "en" ? enVal || idVal : idVal;
  };

  const formatJobType = (type: string) => {
    return type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (isLoading) {
    return (
      <TechCard
        title={t("career")}
        icon={Briefcase}
        className="col-span-1 md:col-span-12"
      >
        <div className="space-y-8 pl-2 md:px-4 max-w-4xl">
          {[1, 2].map((i) => (
            <div key={i} className="pl-8 border-l-2 border-slate-100 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-4 border-white" />
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
    const isInternship =
      exp.jobType === "internship" || exp.jobType === "contract";

    return (
      <div
        key={exp.id || idx}
        className="relative pl-8 border-l-2 border-slate-100 group hover:border-blue-200 transition-colors pb-2"
      >
        <div
          className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
            isInternship ? "bg-slate-400" : "bg-blue-600"
          } group-hover:scale-110 transition-transform z-10`}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
          <div>
            <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {getContent(exp.roleId, exp.roleEn)}
            </h4>
            <p className="text-sm text-blue-600 font-bold mt-1 uppercase tracking-wide flex items-center gap-2 flex-wrap">
              {exp.company}
              <span className="hidden sm:inline-block w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-slate-400 font-medium normal-case text-xs border border-slate-200 px-1.5 rounded bg-slate-50">
                {formatJobType(exp.jobType)}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            {exp.jobType === "internship" && (
              <Badge
                variant="secondary"
                className="text-[10px] uppercase bg-amber-50 text-amber-600 border-amber-100"
              >
                {t("intern")}
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-[11px] font-mono bg-slate-50 px-2 py-0.5 rounded flex items-center gap-1 border-slate-200 shrink-0"
            >
              <Calendar size={12} className="mr-1 text-slate-400" />
              {exp.period}
            </Badge>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-600 leading-relaxed mt-3">
          {getContent(exp.descId, exp.descEn)}
        </p>
      </div>
    );
  };

  return (
    <TechCard
      title={t("career")}
      icon={Briefcase}
      className="col-span-1 md:col-span-12"
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full flex flex-col gap-6" // Hapus w-[350px], ganti w-full
      >
        <div id="experience" className="space-y-8 pl-2 md:px-4 max-w-4xl">
          {/* 1. Render item awal (selalu terlihat) */}
          {initialItems.map((exp: Experience, idx: number) =>
            renderExperienceItem(exp, idx)
          )}

          {/* 2. Render item sisa (tersembunyi dalam CollapsibleContent) */}
          {hasMore && (
            <CollapsibleContent className="space-y-8">
              {/* start index dilanjutkan dari initial count */}
              {collapsibleItems.map((exp: Experience, idx: number) =>
                renderExperienceItem(exp, idx + INITIAL_COUNT)
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
                    Show More ({collapsibleItems.length}){" "}
                    <ChevronDown size={16} />
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
