'use client';

import { ArrowUpRight, Server, Zap } from 'lucide-react';
import Image from 'next/image';
import { TechCard } from '../ui/tech-card';

import { Badge } from '@/common/components/public/ui/badge';
import { Button } from '@/common/components/public/ui/button';
import { portfolioData } from '@/common/data/project-id';

export const Projects = () => {
  const { projects } = portfolioData;

  return (
    <div className="col-span-1 flex flex-col gap-6 md:col-span-12">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-1.5 text-blue-600">
            <Server size={16} />
          </div>
          Proyek Utama
        </h2>
      </div>

      {/* Stacked Wide Project Cards */}
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <TechCard
            key={project.id}
            noPadding
            className="group cursor-pointer !overflow-hidden border-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-full flex-col md:flex-row">
              {/* Project Image - Large & Wide */}
              <div className="group relative h-56 w-full overflow-hidden bg-slate-100 md:h-auto md:w-5/12">
                <Image
                  fill
                  src={
                    project.img_url ||
                    'https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1Se3GErAmOx3k26t5iKNzZofC0GcwEpHXTYJhL'
                  }
                  alt={project.title}
                  // Tambahkan properti sizes ini:
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>

                {/* Image overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
              </div>
              {/* Project Details */}
              <div className="relative flex flex-1 flex-col justify-center bg-white p-6 md:p-10">
                {/* Top Right Corner Deco */}
                <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-slate-100"></div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                    <Zap size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600 md:text-2xl">
                    {project.title}
                  </h3>
                </div>

                <p className="mb-8 line-clamp-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-6 border-t border-slate-50 pt-6">
                  {/* Tech Stack Mapping */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="border border-slate-200 bg-slate-100 font-mono text-[10px] text-slate-600"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Tombol dengan asChild untuk membungkus anchor tag */}
                  <Button
                    variant="ghost"
                    asChild
                    className="ml-auto h-9 font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700 md:ml-0"
                  >
                    <a
                      href={project.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={!project.link ? 'pointer-events-none opacity-50' : ''}
                    >
                      Lihat Proyek <ArrowUpRight size={14} className="ml-2" />
                    </a>
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
