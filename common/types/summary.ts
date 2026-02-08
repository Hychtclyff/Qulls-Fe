// src/types/summary.ts
export interface Profile {
  id: number;
  fullName: string;
  professionalTitle: string;
  bioShort: string;
  avatarUrl?: string | null;
  resumeUrl?: string | null;
  statusLabel?: string | null;
  statusColor?: string | null;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    iconKey: string;
    proficiency: number;
  }[];
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  thumbnailUrl?: string | null;
  tags: string[];
}

export interface Experience {
  id: number;
  companyName: string;
  roleTitle: string;
  employmentType: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
}

export interface SummaryData {
  profile: Profile;
  skills: SkillCategory[];
  featuredProjects: Project[];
  experiences: Experience[];
}
    