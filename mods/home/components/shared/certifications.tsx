"use client";

import { Shield, Calendar, Hash, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

// Components
import { TechCard } from "../ui/tech-card";
import { Badge } from "@/common/components/ui/badge";
import { Skeleton } from "@/common/components/ui/skeleton";
import { Button } from "@/common/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/common/components/ui/collapsible";

// Hooks
import { useTranslations, useLocale } from "next-intl";
import { Certification, useSummary } from "../../hooks/use-summary";
import { useState } from "react";

export const Certifications = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { certifications, isLoading } = useSummary();
  const [isOpen, setIsOpen] = useState(false);

  // Helper untuk memilih bahasa konten
  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === "en" ? enVal || idVal : idVal;
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <TechCard
        title={t("certs")}
        icon={Shield}
        className="col-span-1 md:col-span-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </TechCard>
    );
  }

  if (!certifications || certifications.length === 0) return null;

  // --- LOGIC COLLAPSIBLE ---
  const INITIAL_COUNT = 3; // Tampilkan 1 baris (3 item) pertama
  const initialItems = certifications.slice(0, INITIAL_COUNT);
  const collapsibleItems = certifications.slice(INITIAL_COUNT);
  const hasMore = collapsibleItems.length > 0;

  // Helper Render Item (Agar kode lebih bersih)
  const renderCertItem = (cert: Certification) => (
    <div
      key={cert.id}
      className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* --- 1. IMAGE SECTION --- */}
      <div className="relative w-full aspect-[16/9] bg-slate-50 overflow-hidden border-b border-slate-100">
        {cert.imageUrl ? (
          <Image
            src={cert.imageUrl}
            alt={cert.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
            <Shield size={32} />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* --- 2. CONTENT SECTION --- */}
      <div className="flex flex-col flex-1 p-5">
        {/* Header: Issuer & Year */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 text-[10px] px-2 py-0.5 h-auto font-bold uppercase tracking-wider"
          >
            {cert.issuer}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <Calendar size={12} />
            <span>{cert.year}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-800 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
          {cert.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
          {getContent(cert.descId, cert.descEn)}
        </p>

        {/* Footer: Credential ID */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
          <div className="p-1 bg-slate-100 rounded text-slate-400">
            <Hash size={12} />
          </div>
          <span className="text-[10px] font-mono text-slate-400 tracking-wide">
            ID:{" "}
            <span className="text-slate-600 font-semibold select-all">
              {cert.credentialId}
            </span>
          </span>
        </div>
      </div>

      {/* Decorative Corner Glow */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );

  return (
    <TechCard
      title={t("certs")}
      icon={Shield}
      className="col-span-1 md:col-span-12"
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full flex flex-col gap-6"
      >
        <div className="flex flex-col">
          {/* Grid Utama (Initial Items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {initialItems.map(renderCertItem)}
          </div>

          {/* Collapsible Content (Sisa Items) */}
          {hasMore && (
            <CollapsibleContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
                {collapsibleItems.map(renderCertItem)}
              </div>
            </CollapsibleContent>
          )}
        </div>

        {/* Tombol Trigger */}
        {hasMore && (
          <div className="flex justify-center pt-2">
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
