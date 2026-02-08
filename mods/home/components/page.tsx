"use client";

import React, { useState, useTransition } from "react";
import {
  Terminal,
  LayoutGrid,
  Briefcase,
  Mail,
  Loader2,
  Languages,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { BackgroundAmbience } from "./shared/background-ambience";

import { MainProfile } from "./shared/main-profile";
import { Educations } from "./shared/educations";
import { Certifications } from "./shared/certifications";
import { Experiences } from "./shared/experience";
import { Projects } from "./shared/projects";
import { TechStack } from "./shared/techStack";
import { Certification } from "../data/certifications";
import Image from "next/image";

export default function Portfolio() {
  const t = useTranslations();
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleLanguage = () => {
    const nextLocale = locale === "id" ? "en" : "id";

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
    <div className="min-h-screen bg-[#fcfcfc] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24 relative overflow-x-hidden">
      {/* Background Ambience & Decorations */}
      <BackgroundAmbience />

      {/* Floating Island Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-full shadow-xl shadow-slate-200/20 pl-5 pr-2 py-2.5 flex items-center gap-6 max-w-3xl w-full justify-between transition-all relative overflow-hidden group hover:border-blue-200/50">
          {/* Subtle loading bar effect on top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 opacity-50"></div>

          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200 overflow-hidden">
              <Image
                fill
                src="https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1Se3GErAmOx3k26t5iKNzZofC0GcwEpHXTYJhL"
                alt="Logo Icon"
                className="object-cover"
                sizes="(max-width: 768px) 36px, 36px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 tracking-tight text-sm leading-none">
                Yudriqul<span className="text-blue-500">.io</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                System Architect
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-slate-50/80 p-1 rounded-full border border-slate-100">
            {[
              { key: "home", icon: LayoutGrid },
              { key: "experience", icon: Briefcase },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className="relative px-3 sm:px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all group/btn flex items-center gap-2"
              >
                <item.icon
                  size={14}
                  className="group-hover/btn:text-blue-600 transition-colors"
                />
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
              className="group relative flex items-center justify-center gap-1.5 h-9 px-3 rounded-full bg-white text-slate-600 font-bold text-[11px] border border-slate-200 shadow-sm transition-all hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Switch Language"
            >
              {isPending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Languages
                  size={14}
                  className="text-slate-400 group-hover:text-blue-500 transition-colors"
                />
              )}

              <span className="uppercase tracking-widest min-w-[1.5ch]">
                {locale}
              </span>

              {locale === "id" && (
                <span className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      <main className="max-w-6xl mx-auto px-6 pt-28 relative z-10">
        {/* HERO GRID */}
        <div
          id="home"
          className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-stretch"
        >
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
        <div className="border-t border-slate-200 py-12 mt-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-10 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
            <p className="text-slate-400 font-medium text-xs tracking-wider uppercase">
              {/* Gunakan t() untuk footer */}
              {t("footer.copyright")}
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
