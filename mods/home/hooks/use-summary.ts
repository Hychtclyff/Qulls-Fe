import { useQuery } from "@tanstack/react-query";
import { fetchSummary } from "../services/summary.service";

// 1. Definisi Tipe Data (Sesuaikan dengan Schema Backend)
// 1. Shared / Common Types
export interface BaseEntity {
  id: number;
  createdAt?: string; // Optional karena tidak selalu dipakai di UI
  updatedAt?: string;
}

// 2. Sub-Components
export interface SocialLink extends BaseEntity {
  profileId: number;
  name: string;
  handle: string;
  url: string;
  iconName: string;
  bgColor?: string;
  textColor?: string;
}

export interface Skill extends BaseEntity {
  name: string;
  category: string; // Bisa diperjelas jadi union type: 'frontend' | 'backend' | 'tools' | string;
  iconUrl?: string | null;
}

// 3. Main Components
export interface Profile extends BaseEntity {
  fullName: string;
  roleId: string;
  roleEn: string;
  level: string;
  email: string;
  imageUrl: string | null;
  resumeUrl?: string | null;
  locationId: string;
  locationEn: string | null;
  aboutId: string | null;
  aboutEn: string | null;
  isAvailable?: boolean;
  socialLinks: SocialLink[]; // Relasi Nested
}

export interface Service extends BaseEntity {
  profileId: number;
  serviceKey: string;
  iconName: string;
  colorClass?: string;
  bgClass?: string;
  descId: string;
  descEn: string;
}

export interface Project extends BaseEntity {
  profileId: number;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  imageUrl: string | null;
  projectUrl: string | null;
  repoUrl: string | null;
  statLabelId?: string | null;
  statLabelEn?: string | null;
  statValue?: string | null;
  sortOrder?: number;

  // Array yang sudah di-clean (flattened)
  techStack: Skill[];
}

export interface Experience extends BaseEntity {
  profileId: number;
  company: string;
  roleId: string;
  roleEn: string;
  period: string;
  jobType: string; // 'full_time' | 'contract' | 'freelance'
  descId: string | null;
  descEn: string | null;
  location?: string | null;
  certificationId?: number | null;
  projectId?: number | null;
}

export interface Education extends BaseEntity {
  profileId: number;
  school: string;
  degreeId: string;
  degreeEn: string;
  period: string;
  descId: string | null;
  descEn: string | null;
}

export interface Certification extends BaseEntity {
  profileId: number;
  name: string;
  issuer: string;
  year: string;
  imageUrl: string | null;
  credentialUrl?: string | null;
  descId: string | null;
  descEn: string | null;
  credentialId: number;
}

// 4. Response Type (Wrapper)
export interface SummaryData {
  profile: Profile;
  services: Service[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: SummaryData;
// }

export const useSummary = () => {
  const query = useQuery({
    queryKey: ["summary"],
    queryFn: fetchSummary,
    staleTime: 1000 * 60 * 5, // 5 Menit

    // 2. Fitur 'select': Mengambil hanya bagian 'data' dari response JSON
    // Ini mencegah kita menulis 'data?.data?.profile' di komponen
    select: (response) => response.data,
  });

  return {
    ...query,
    // 3. Fallback Data (Agar tidak error saat loading/undefined)
    // Karena sudah pakai 'select', kita bisa akses langsung query.data (yang isinya SummaryData)
    profile: query.data?.profile,
    socialLinks: query.data?.profile?.socialLinks ?? [], // Social link ada di dalam profile
    skills: query.data?.skills ?? [],
    projects: query.data?.projects ?? [], // Backend mengembalikan 'projects', bukan 'featuredProjects'
    experiences: query.data?.experiences ?? [],
    education: query.data?.education ?? [],
    certifications: query.data?.certifications ?? [],
    services: query.data?.services ?? [],

    // Helper boolean
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
