'use client'; // Pastikan ada ini karena pakai hooks

import { Briefcase, Download, Mail, MapPin, Shield } from 'lucide-react';
import { TechCard } from '../ui/tech-card';
import Image from 'next/image';
import { Button } from '@/common/components/public/ui/button';
import { SocialLink, useSummary } from '../../hooks/use-summary';
import { CONTACT_DATA } from '../../data/contact';
import * as Icons from 'lucide-react';
import { Skeleton } from '@/common/components/public/ui/skeleton';
// 1. Import useLocale
import { useTranslations, useLocale } from 'next-intl';

export const MainProfile = () => {
  const t = useTranslations();
  const locale = useLocale(); // 2. Ambil locale ('id' atau 'en')

  const { profile, isLoading } = useSummary();

  // 3. Helper Function: Pilih konten berdasarkan bahasa
  // Jika bahasa Inggris kosong, fallback ke bahasa Indonesia
  const getContent = (idVal: string | null, enVal: string | null) => {
    return locale === 'en' ? enVal || idVal : idVal;
  };

  if (isLoading || !profile) {
    return (
      <TechCard
        className="col-span-1 border border-white/20 bg-white/80 !p-0 shadow-sm md:col-span-12"
        noPadding
      >
        <div className="flex h-full flex-col-reverse items-center justify-between gap-10 p-6 md:flex-row md:gap-16 md:p-10">
          {/* Skeleton Loading... (Sama seperti sebelumnya) */}
          <div className="w-full flex-1 space-y-8">
            <div className="space-y-5">
              <Skeleton className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-3/4 rounded-lg bg-slate-200 md:h-14" />
                <Skeleton className="h-10 w-1/2 rounded-lg bg-slate-200 md:h-14" />
              </div>
              <div className="max-w-xl space-y-2">
                <Skeleton className="h-4 w-full bg-slate-100" />
                <Skeleton className="h-4 w-5/6 bg-slate-100" />
                <Skeleton className="h-4 w-4/6 bg-slate-100" />
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32 rounded-full bg-slate-200" />
              <Skeleton className="h-12 w-32 rounded-full bg-slate-100" />
            </div>
            <div className="mt-2 flex flex-col gap-6 border-t border-slate-100 pt-6 md:flex-row">
              <div className="flex items-center gap-4">
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
            <Skeleton className="h-56 w-56 rounded-full bg-slate-200 md:h-80 md:w-80" />
          </div>
        </div>
      </TechCard>
    );
  }

  const nameParts = profile.fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <TechCard
      className="col-span-1 overflow-visible border border-white/20 bg-white/80 !p-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-sm md:col-span-12"
      noPadding
    >
      <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30"></div>
      <div className="absolute top-0 right-0 h-3/4 w-3/4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent blur-3xl"></div>
      <div className="mask-image-gradient absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03]"></div>

      <div className="relative z-10 flex h-full flex-col-reverse items-center justify-between gap-10 p-6 md:flex-row md:gap-16 md:p-10">
        <div className="w-full flex-1 space-y-8 text-center md:text-left">
          <div className="space-y-5">
            {/* Status Badge */}
            <div className="inline-flex cursor-default items-center gap-2.5 rounded-full border border-emerald-100/50 bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-widest text-emerald-700 uppercase shadow-sm backdrop-blur-md transition-all hover:shadow-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </span>
              {/* Static Text: Pakai t() */}
              {t('hero.status')}
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                {firstName} <br className="hidden md:block" />
                <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {lastName}.
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-sm leading-relaxed font-medium text-slate-500 md:mx-0 md:text-lg">
                {/* Dynamic Data (Database): 
                   Gunakan getContent(), JANGAN dibungkus t() 
                */}
                {getContent(profile.aboutId, profile.aboutEn)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button className="h-12 rounded-full border-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 text-sm shadow-lg shadow-blue-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-300/60">
                <Briefcase size={18} className="mr-2.5 text-white/90" />
                {t('hero.cta_primary')}
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-slate-200 px-8 text-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Download size={18} className="mr-2.5 text-slate-600" />
                {t('hero.cta_secondary')}
              </Button>
            </div>

            <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-6 md:items-start lg:flex-row">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="group -ml-2 flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50"
                >
                  <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600 shadow-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="mb-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      {t('connect.email')}
                    </p>
                    <p className="text-sm font-bold text-slate-700 transition-colors group-hover:text-blue-600">
                      {profile.email}
                    </p>
                  </div>
                </a>

                <div className="hidden h-10 w-px bg-slate-200 sm:block"></div>

                <div className="flex items-center gap-3 rounded-xl p-2">
                  <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div className="text-left">
                    <p className="mb-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      {t('connect.location')}
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
                  const LucideIcon = Icons[social.iconName as keyof typeof Icons];

                  // 2. Fallback ke Link jika ikon tidak ditemukan
                  // 3. PENTING: Cast 'as React.ElementType' agar dianggap valid JSX
                  const IconComponent = (LucideIcon || Icons.Link) as React.ElementType;

                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                      aria-label={social.iconName}
                    >
                      {/* Sekarang aman digunakan sebagai JSX tag */}
                      <IconComponent size={18} />

                      <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:bg-white group-hover:opacity-100"></span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="group/image relative shrink-0 pt-8 md:pt-0">
          {/* ... (Background Effects & Image - Tidak ada perubahan logika di sini) ... */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="animate-spin-slow pointer-events-none absolute inset-[-15px] rounded-full border border-dashed border-slate-300/60"></div>
          <div className="pointer-events-none absolute inset-[-8px] rounded-full border border-slate-100 bg-white/50 shadow-sm backdrop-blur-sm"></div>

          <div className="relative z-10 h-56 w-56 rounded-full bg-white p-2 shadow-2xl ring-1 shadow-blue-900/10 ring-slate-100 md:h-80 md:w-80">
            <div className="relative isolate aspect-square h-full w-full overflow-hidden rounded-full">
              <Image
                src={profile.imageUrl}
                alt={profile.fullName}
                fill
                // PERBAIKAN: Sesuaikan sizes dengan ukuran asli tampilannya
                // Mobile (w-56 = ~224px), Desktop (w-80 = ~320px)
                sizes="(max-width: 768px) 250px, 350px"
                className="transform object-cover transition-transform duration-700 group-hover/image:scale-110"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-black/5 ring-inset"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
            </div>

            <div className="animate-bounce-slow absolute -right-4 bottom-4 z-20 flex cursor-help items-center gap-3 rounded-2xl border border-white/40 bg-white/95 px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl transition-transform hover:scale-105 md:-right-8 md:bottom-8">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-2 text-indigo-600 shadow-inner">
                <Shield size={18} fill="currentColor" className="absolute opacity-20" />
                <Shield size={18} className="relative z-10" />
              </div>
              <div className="text-left leading-none">
                <p className="mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Level
                </p>
                <p className="text-sm font-extrabold tracking-tight text-slate-800">
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
