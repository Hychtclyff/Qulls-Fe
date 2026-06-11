'use client';

import { useState } from 'react';
import { Shield, Calendar, Hash, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

import { TechCard } from '../ui/tech-card';
import { Badge } from '@/common/components/public/ui/badge';
import { Button } from '@/common/components/public/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/common/components/public/ui/collapsible';

const staticCertifications = [
  {
    id: 'cert-1',
    name: 'Junior Cyber Security',
    issuer: 'BNSP / LSP Teknologi Digital',
    year: '2025',
    credentialId: 'VSGA-2025',
    imageUrl: 'https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1SnwV3POjDlcTLmS4JtbBihrjZuOp6e5vKVMNf',
    description: 'Sertifikasi kompetensi di bidang keamanan siber tingkat junior.',
  },
  {
    id: 'cert-2',
    name: 'Google Analytics Certified',
    issuer: 'Google',
    year: '2025',
    credentialId: 'GOOG-2025',
    imageUrl: 'https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1SMUv3yIKAXbUhDimPgWCJLOV09YFkx4cBvwlR',
    description: 'Sertifikasi resmi dari Google untuk analisis data dan performa platform digital.',
  },
  {
    id: 'cert-3',
    name: 'Fullstack Web Developer',
    issuer: 'Binar Academy',
    year: '2024',
    credentialId: 'BINAR-2024',
    imageUrl: 'https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1SWSkFXU521WyLhwIr8GAPKQ3E0fpbBN9CjDHM',
    description:
      'Sertifikasi kelulusan program intensif Full Stack Web Development (MSIB Kampus Merdeka).',
  },
  {
    id: 'cert-4',
    name: 'JavaScript Specialist',
    issuer: 'Pearson VUE',
    year: '2024',
    credentialId: 'JS-2024',
    imageUrl: 'https://4hb5g34gc9.ufs.sh/f/CacFL4EqKm1S6rVqudcRzUQvurXHZsc32b4i8nqNyC79DE0l',
    description:
      'Sertifikasi spesialisasi untuk fundamental dan implementasi bahasa pemrograman JavaScript.',
  },
];

export const Certifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const certifications = staticCertifications;

  if (!certifications || certifications.length === 0) return null;

  const INITIAL_COUNT = 3;
  const initialItems = certifications.slice(0, INITIAL_COUNT);
  const collapsibleItems = certifications.slice(INITIAL_COUNT);
  const hasMore = collapsibleItems.length > 0;

  const renderCertItem = (cert: (typeof staticCertifications)[0]) => (
    <div
      key={cert.id}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      {/* --- 1. IMAGE SECTION --- */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-100 bg-slate-50">
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
            <Shield
              size={32}
              className="opacity-50 transition-transform group-hover:scale-110 group-hover:text-blue-400"
            />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* --- 2. CONTENT SECTION --- */}
      <div className="flex flex-1 flex-col p-5">
        {/* Header: Issuer & Year */}
        <div className="mb-3 flex items-center justify-between">
          <Badge
            variant="secondary"
            className="h-auto border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase hover:bg-blue-100"
          >
            {cert.issuer}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <Calendar size={12} />
            <span>{cert.year}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="mb-2 text-base leading-snug font-bold text-slate-800 transition-colors group-hover:text-blue-600">
          {cert.name}
        </h4>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {cert.description}
        </p>

        {/* Footer: Credential ID */}
        <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-3">
          <div className="rounded bg-slate-100 p-1 text-slate-400">
            <Hash size={12} />
          </div>
          <span className="font-mono text-[10px] tracking-wide text-slate-400">
            ID: <span className="font-semibold text-slate-600 select-all">{cert.credentialId}</span>
          </span>
        </div>
      </div>

      {/* Decorative Corner Glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-20 w-20 rounded-full bg-blue-400/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"></div>
    </div>
  );

  return (
    <TechCard title="Sertifikasi" icon={Shield} className="col-span-1 md:col-span-12">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-6">
        <div className="flex flex-col">
          {/* Grid Utama (Initial Items) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {initialItems.map(renderCertItem)}
          </div>

          {/* Collapsible Content (Sisa Items) */}
          {hasMore && (
            <CollapsibleContent>
              <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3">
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
                className="gap-2 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                {isOpen ? (
                  <>
                    Tampilkan Lebih Sedikit <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Lihat Semua ({collapsibleItems.length}) <ChevronDown size={16} />
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
