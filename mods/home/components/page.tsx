'use client';

import { LayoutGrid, Briefcase, Languages } from 'lucide-react';

// Import Shadcn UI Components
import { Avatar, AvatarImage, AvatarFallback } from '@/common/components/public/ui/avatar';
import { Separator } from '@/common/components/public/ui/separator';

import { BackgroundAmbience } from './shared/background-ambience';
import { MainProfile } from './shared/main-profile';
import { Educations } from './shared/educations';
import { Certifications } from './shared/certifications';
import { Experiences } from './shared/experience';
import { Projects } from './shared/projects';
import { TechStack } from './shared/techStack';
import { Button } from '@/common/components/public/ui/button';

export default function Portfolio() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fcfcfc] pb-24 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      <BackgroundAmbience />

      <div className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4">
        <nav className="group relative flex w-full max-w-3xl items-center justify-between gap-6 overflow-hidden rounded-full border border-slate-200/60 bg-white/90 py-2.5 pr-2 pl-5 shadow-xl shadow-slate-200/20 backdrop-blur-xl transition-all hover:border-blue-200/50">
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 opacity-50"></div>

          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9 shadow-lg ring-1 shadow-slate-200 ring-slate-100">
              <AvatarImage
                src="https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1Se3GErAmOx3k26t5iKNzZofC0GcwEpHXTYJhL"
                alt="Logo Yudriqul"
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-slate-800 to-slate-900 text-xs font-bold text-white">
                YA
              </AvatarFallback>
            </Avatar>

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
              { key: 'home', label: 'Home', icon: LayoutGrid },
              { key: 'experience', label: 'Experience', icon: Briefcase },
            ].map((item) => (
              <Button
                key={item.key}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.key)}
                className="group/btn h-8 rounded-full px-4 text-xs font-semibold text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"
              >
                <item.icon
                  size={14}
                  className="mr-2 transition-colors group-hover/btn:text-blue-600"
                />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex items-center pr-1">
            <Button
              variant="outline"
              size="sm"
              className="group h-9 rounded-full border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600 hover:shadow-md"
              onClick={() => alert('Fitur multi-bahasa akan segera hadir!')}
            >
              <Languages
                size={14}
                className="mr-1.5 text-slate-400 transition-colors group-hover:text-blue-500"
              />
              <span className="tracking-widest uppercase">ID</span>
            </Button>
          </div>
        </nav>
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-28">
        <div id="home" className="mb-6 grid grid-cols-1 items-stretch gap-4 md:grid-cols-12">
          <MainProfile />

          <TechStack />

          <Educations />

          <Certifications />

          <Experiences />

          <Projects />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center space-y-6 py-8 text-center">
          <Separator className="w-full max-w-xs bg-slate-200" />

          <div className="flex flex-col items-center gap-4">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
              © {new Date().getFullYear()} Yudriqul Aulia. All Rights Reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
