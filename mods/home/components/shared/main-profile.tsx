"use client"; // Pastikan ada ini karena pakai hooks

import { Briefcase, Download, Mail, MapPin, Shield } from "lucide-react";
import { TechCard } from "../ui/tech-card";
import Image from "next/image";
import { Button } from "@/common/components/ui/button";
import { SocialLink, useSummary } from "../../hooks/use-summary";
import { CONTACT_DATA } from "../../data/contact";
import * as Icons from "lucide-react";
import { Skeleton } from "@/common/components/ui/skeleton";
// 1. Import useLocale
import { useTranslations, useLocale } from "next-intl";

export const MainProfile = () => {
  const t = useTranslations();
  const locale = useLocale(); // 2. Ambil locale ('id' atau 'en')

  const { profile, isLoading } = useSummary();

  // 3. Helper Function: Pilih konten berdasarkan bahasa
  // Jika bahasa Inggris kosong, fallback ke bahasa Indonesia
  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === "en" ? enVal || idVal : idVal;
  };

  if (isLoading || !profile) {
    return (
      <TechCard
        className="col-span-1 md:col-span-12 !p-0 bg-white/80 border border-white/20 shadow-sm"
        noPadding
      >
        <div className="p-6 md:p-10 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 justify-between h-full">
          {/* Skeleton Loading... (Sama seperti sebelumnya) */}
          <div className="flex-1 space-y-8 w-full">
            <div className="space-y-5">
              <Skeleton className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="space-y-3">
                <Skeleton className="h-10 md:h-14 w-3/4 rounded-lg bg-slate-200" />
                <Skeleton className="h-10 md:h-14 w-1/2 rounded-lg bg-slate-200" />
              </div>
              <div className="space-y-2 max-w-xl">
                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-5/6 bg-slate-100" />
                <Skeleton className="h-4 w-4/6 bg-slate-100" />
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32 rounded-full bg-slate-200" />
              <Skeleton className="h-12 w-32 rounded-full bg-slate-100" />
            </div>
            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-6 mt-2">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-10 w-10 rounded-lg bg-slate-100" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-12 bg-slate-100" />
                  <Skeleton className="h-4 w-24 bg-slate-200" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-lg bg-slate-100" />
                <Skeleton className="h-10 w-10 rounded-lg bg-slate-100" />
                <Skeleton className="h-10 w-10 rounded-lg bg-slate-100" />
              </div>
            </div>
          </div>
          <div className="relative shrink-0">
            <Skeleton className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-slate-200" />
          </div>
        </div>
      </TechCard>
    );
  }

  const nameParts = profile.fullName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <TechCard
      className="col-span-1 md:col-span-12 !p-0 bg-white/80 backdrop-blur-sm border border-white/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-visible"
      noPadding
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 rounded-3xl z-0"></div>
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent blur-3xl"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] mask-image-gradient"></div>

      <div className="p-6 md:p-10 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 relative z-10 h-full justify-between">
        <div className="flex-1 space-y-8 text-center md:text-left w-full">
          <div className="space-y-5">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white/80 border border-emerald-100/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-full text-emerald-700 shadow-sm hover:shadow-md transition-all cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white"></span>
              </span>
              {/* Static Text: Pakai t() */}
              {t("hero.status")}
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                {firstName} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 animate-gradient-x">
                  {lastName}.
                </span>
              </h1>

              <p className="text-sm md:text-lg text-slate-500 leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
                {/* Dynamic Data (Database): 
                   Gunakan getContent(), JANGAN dibungkus t() 
                */}
                {getContent(profile.aboutId, profile.aboutEn)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button className="rounded-full h-12 px-8 text-sm shadow-blue-200/50 shadow-lg hover:shadow-blue-300/60 hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 border-0">
                <Briefcase size={18} className="text-white/90 mr-2.5" />
                {t("hero.cta_primary")}
              </Button>
              <Button
                variant="outline"
                className="rounded-full h-12 px-8 text-sm border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all"
              >
                <Download size={18} className="text-slate-600 mr-2.5" />
                {t("hero.cta_secondary")}
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col lg:flex-row gap-6 items-center md:items-start justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="flex items-center gap-3 group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      {t("connect.email")}
                    </p>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>

                <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>

                <div className="flex items-center gap-3 p-2 rounded-xl">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      {t("connect.location")}
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {/* Dynamic Location */}
                      {getContent(profile.locationId, profile.locationEn)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {profile?.socialLinks?.map((social: SocialLink) => {
                  // 1. Ambil ikon berdasarkan nama string
                  const LucideIcon =
                    Icons[social.iconName as keyof typeof Icons];

                  // 2. Fallback ke Link jika ikon tidak ditemukan
                  // 3. PENTING: Cast 'as React.ElementType' agar dianggap valid JSX
                  const IconComponent = (LucideIcon ||
                    Icons.Link) as React.ElementType;

                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
                      aria-label={social.iconName}
                    >
                      {/* Sekarang aman digunakan sebagai JSX tag */}
                      <IconComponent size={18} />

                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:bg-white transition-opacity"></span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative shrink-0 group/image pt-8 md:pt-0">
          {/* ... (Background Effects & Image - Tidak ada perubahan logika di sini) ... */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
          <div className="absolute inset-[-15px] rounded-full border border-dashed border-slate-300/60 animate-spin-slow pointer-events-none"></div>
          <div className="absolute inset-[-8px] rounded-full border border-slate-100 bg-white/50 backdrop-blur-sm pointer-events-none shadow-sm"></div>

          <div className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-white p-2 shadow-2xl shadow-blue-900/10 relative z-10 ring-1 ring-slate-100">
            <div className="w-full h-full aspect-square rounded-full overflow-hidden relative isolate">
              <Image
                src={profile.imageUrl}
                alt={profile.fullName}
                fill
                // PERBAIKAN: Sesuaikan sizes dengan ukuran asli tampilannya
                // Mobile (w-56 = ~224px), Desktop (w-80 = ~320px)
                sizes="(max-width: 768px) 250px, 350px"
                className="object-cover transform transition-transform duration-700 group-hover/image:scale-110"
                priority
              />
              <div className="absolute inset-0 ring-inset ring-2 ring-black/5 rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
            </div>

            <div className="absolute bottom-4 -right-4 md:bottom-8 md:-right-8 bg-white/95 backdrop-blur-xl border border-white/40 px-4 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 animate-bounce-slow z-20 hover:scale-105 transition-transform cursor-help">
              <div className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-indigo-600 shadow-inner">
                <Shield
                  size={18}
                  fill="currentColor"
                  className="opacity-20 absolute"
                />
                <Shield size={18} className="relative z-10" />
              </div>
              <div className="text-left leading-none">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Level
                </p>
                <p className="text-sm font-extrabold text-slate-800 tracking-tight">
                  {/* Dynamic Role / Level */}
                  {getContent(profile.roleId, profile.roleEn)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TechCard>
  );
};
