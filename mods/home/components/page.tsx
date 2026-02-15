'use client';

import { useTransition } from 'react';
import { LayoutGrid, Briefcase, Loader2, Languages } from 'lucide-react';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { BackgroundAmbience } from './shared/background-ambience';

import { MainProfile } from './shared/main-profile';
import { Educations } from './shared/educations';
import { Certifications } from './shared/certifications';
import { Experiences } from './shared/experience';
import { Projects } from './shared/projects';
import { TechStack } from './shared/techStack';
import Image from 'next/image';

export default function Portfolio() {
  const t = useTranslations();
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id';

    let newPath = pathname;
    if (pathname.startsWith(`/${locale}`)) {
      newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    } else {
      newPath = `/${nextLocale}${pathname}`;
    }

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fcfcfc] pb-24 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {/* Background Ambience & Decorations */}
      <BackgroundAmbience />

      {/* Floating Island Navbar */}
      <div className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4">
        <nav className="group relative flex w-full max-w-3xl items-center justify-between gap-6 overflow-hidden rounded-full border border-slate-200/60 bg-white/90 py-2.5 pr-2 pl-5 shadow-xl shadow-slate-200/20 backdrop-blur-xl transition-all hover:border-blue-200/50">
          {/* Subtle loading bar effect on top */}
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 opacity-50"></div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg shadow-slate-200">
              <Image
                fill
                src="https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1Se3GErAmOx3k26t5iKNzZofC0GcwEpHXTYJhL"
                alt="Logo Icon"
                className="object-cover"
                sizes="(max-width: 768px) 36px, 36px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm leading-none font-bold tracking-tight text-slate-800">
                Yudriqul<span className="text-blue-500">.io</span>
              </span>
              <span className="mt-0.5 font-mono text-[9px] tracking-wider text-slate-400 uppercase">
                System Architect
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-1 rounded-full border border-slate-100 bg-slate-50/80 p-1 md:flex">
            {[
              { key: 'home', icon: LayoutGrid },
              { key: 'experience', icon: Briefcase },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className="group/btn relative flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm sm:px-4"
              >
                <item.icon size={14} className="transition-colors group-hover/btn:text-blue-600" />
                <span className="hidden sm:inline">
                  {/* Gunakan t() dari next-intl */}
                  {t(`nav.${item.key}`)}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center pr-1">
            <button
              onClick={toggleLanguage}
              disabled={isPending}
              className="group relative flex h-9 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Switch Language"
            >
              {isPending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Languages
                  size={14}
                  className="text-slate-400 transition-colors group-hover:text-blue-500"
                />
              )}

              <span className="min-w-[1.5ch] tracking-widest uppercase">{locale}</span>

              {locale === 'id' && (
                <span className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-28">
        {/* HERO GRID */}
        <div id="home" className="mb-6 grid grid-cols-1 items-stretch gap-4 md:grid-cols-12">
          {/* 1. MAIN PROFILE */}
          <MainProfile />

          {/* SECOND ROW */}

          {/* Tech Stack */}
          <TechStack />

          {/* Education */}
          <Educations />

          {/* Certifications - GRID LAYOUT */}
          <Certifications />

          {/* 6. Experience - FULL WIDTH */}
          <Experiences />

          {/* 7. Projects - FULL WIDTH & WIDE CARDS */}
          <Projects />
        </div>

        {/* FOOTER */}
        <div className="mt-12 border-t border-slate-200 py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
              {/* Gunakan t() untuk footer */}
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </main>

      {/* MODAL CERTIFICATES */}
      {/* <ModalCertification
        selectedCert={selectedCert}
        setSelectedCert={setSelectedCert}
      /> */}
    </div>
  );
}
