'use client';

import { useMemo } from 'react';
import { Layers } from 'lucide-react';
import { TechCard } from '../ui/tech-card';
import { Badge } from '@/common/components/public/ui/badge';
import { useTranslations } from 'next-intl';
import { Skill, useSummary } from '../../hooks/use-summary';
import { Skeleton } from '@/common/components/public/ui/skeleton';

// 1. Konfigurasi Style untuk setiap Kategori (Mapping)
const CATEGORY_STYLES: Record<
  string,
  {
    label: string;
    dotColor: string;
    badgeVariant: 'default' | 'secondary' | 'outline' | 'destructive'; // Sesuaikan dengan varian Badge Anda
    badgeClassName: string;
  }
> = {
  frontend: {
    label: 'Frontend & UI',
    dotColor: 'bg-blue-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300',
  },
  backend: {
    label: 'Backend & Database',
    dotColor: 'bg-emerald-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300',
  },
  automation: {
    label: 'AI & Automation',
    dotColor: 'bg-purple-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-purple-200 bg-purple-50 text-purple-700 hover:border-purple-300',
  },
  tools: {
    label: 'DevOps & Tools',
    dotColor: 'bg-amber-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300',
  },
  // Fallback style jika ada kategori baru di DB
  default: {
    label: 'Other Skills',
    dotColor: 'bg-slate-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-slate-200 bg-slate-50 text-slate-700',
  },
};

export const TechStack = () => {
  const t = useTranslations();
  const { skills, isLoading } = useSummary();

  // 2. Transformasi Data: Flat Array -> Grouped Object
  const groupedSkills = useMemo(() => {
    if (!skills) return [];

    // Kelompokkan skill berdasarkan category
    const groups: Record<string, string[]> = {};

    skills.forEach((skill: Skill) => {
      const cat = skill.category.toLowerCase();
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(skill.name);
    });

    // Ubah object ke array format UI
    return Object.entries(groups).map(([categoryKey, items]) => {
      // Ambil style berdasarkan key, atau pakai default
      const style = CATEGORY_STYLES[categoryKey] || {
        ...CATEGORY_STYLES.default,
        label: categoryKey.toUpperCase(), // Fallback label
      };

      return {
        ...style,
        items, // Array string nama skill (misal: ["Next.js", "React"])
      };
    });
  }, [skills]);

  // 3. Loading State
  if (isLoading) {
    return (
      <TechCard title={t('stack')} icon={Layers} className="md:col-span-6">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24 bg-slate-200" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-slate-100" />
                <Skeleton className="h-6 w-20 rounded-full bg-slate-100" />
                <Skeleton className="h-6 w-14 rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </TechCard>
    );
  }

  return (
    <TechCard title={t('stack')} icon={Layers} className="md:col-span-6">
      <div className="space-y-6">
        {groupedSkills.map((category, index) => (
          <div key={index}>
            {/* Header Kategori */}
            <div className="mb-3 flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full ${category.dotColor}`} />
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {category.label}
              </span>
            </div>

            {/* List Badge */}
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Badge
                  key={item}
                  variant={category.badgeVariant}
                  className={category.badgeClassName}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TechCard>
  );
};
