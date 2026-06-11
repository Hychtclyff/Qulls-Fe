'use client';

import { useMemo } from 'react';
import { Layers } from 'lucide-react';
import { TechCard } from '../ui/tech-card';

import { Badge } from '@/common/components/public/ui/badge';
import { portfolioData } from '@/common/data/project-id';

const CATEGORY_STYLES: Record<
  string,
  {
    label: string;
    dotColor: string;
    badgeVariant: 'default' | 'secondary' | 'outline' | 'destructive';
    badgeClassName: string;
  }
> = {
  core: {
    label: 'Core Stack (Backend & Frontend)',
    dotColor: 'bg-emerald-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300',
  },
  tools: {
    label: 'DevOps, Tools & Methodology',
    dotColor: 'bg-blue-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300',
  },
  other: {
    label: 'Other Competencies',
    dotColor: 'bg-purple-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-purple-200 bg-purple-50 text-purple-700 hover:border-purple-300',
  },

  default: {
    label: 'Other Skills',
    dotColor: 'bg-slate-400',
    badgeVariant: 'outline',
    badgeClassName: 'border-slate-200 bg-slate-50 text-slate-700',
  },
};

export const TechStack = () => {
  const { skills } = portfolioData;

  const groupedSkills = useMemo(() => {
    if (!skills) return [];

    return Object.entries(skills).map(([categoryKey, items]) => {
      const style = CATEGORY_STYLES[categoryKey] || {
        ...CATEGORY_STYLES.default,
        label: categoryKey.toUpperCase(),
      };

      return {
        ...style,
        items,
      };
    });
  }, [skills]);

  return (
    <TechCard title="Tech Stack & Skills" icon={Layers} className="md:col-span-6">
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
