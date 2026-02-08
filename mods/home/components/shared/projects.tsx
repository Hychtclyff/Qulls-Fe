"use client";

import { ArrowUpRight, Server, Zap } from "lucide-react";
// 1. Hapus import data statis & hook lama
// import { TRANSLATIONS } from "../../data/translations";
// import { PROJECTS } from "../../data/projects";
// import { useTranslation } from "../../hooks/use-translations";

import { TechCard } from "../ui/tech-card";
import Image from "next/image";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";

// 2. Import hooks baru
import { useTranslations, useLocale } from "next-intl";
import { Project, useSummary } from "../../hooks/use-summary";

export const Projects = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { projects, isLoading } = useSummary();

  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === "en" ? enVal || idVal : idVal;
  };

  // 3. Loading State
  if (isLoading) {
    return (
      <div className="col-span-1 md:col-span-12 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <Server size={16} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {t("projects.title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {[1].map((i) => (
            <div
              key={i}
              className="h-80 w-full bg-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-1 md:col-span-12 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
          <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
            <Server size={16} />
          </div>
          {/* Gunakan t() */}
          {t("projects.title")}
        </h2>
      </div>

      {/* Stacked Wide Project Cards */}
      <div className="grid grid-cols-1 gap-8">
        {projects?.map((project: Project) => (
          <TechCard
            key={project.id}
            noPadding
            className="group cursor-pointer hover:-translate-y-1 hover:shadow-xl !overflow-hidden border-slate-200/80 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Project Image - Large & Wide */}
              <div className="w-full md:w-5/12 h-56 md:h-auto relative overflow-hidden bg-slate-100 group">
                <Image
                  // Gunakan fill untuk cover area
                  fill
                  src={project.imageUrl ?? ""}
                  alt={
                    getContent(project.titleId, project.titleEn) || "Project"
                  }
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Stat Badge from API (Efficiency: 40%+) */}
                {project.statValue && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-800 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border border-slate-100 font-mono z-10 flex items-center gap-2">
                    <span className="text-blue-600 uppercase tracking-wider">
                      {getContent(
                        project.statLabelId ?? "",
                        project.statLabelEn ?? ""
                      )}
                    </span>
                    <span className="w-px h-3 bg-slate-300"></span>
                    <span>{project.statValue}</span>
                  </div>
                )}

                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Project Details */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center bg-white relative">
                {/* Top Right Corner Deco */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-slate-100"></div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <Zap size={18} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {/* Bilingual Title */}
                    {getContent(project.titleId, project.titleEn)}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-slate-500 mb-8 leading-relaxed max-w-2xl line-clamp-3">
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
                        className="font-mono text-[10px] bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold h-9 ml-auto md:ml-0"
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
