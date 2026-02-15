import { API_ENDPOINT } from '@/lib/api';
import { createApiService } from '@/lib/api-factory';

export interface ProfilePayload {
  id?: number;
  fullName: string;
  email: string;
  roleId: string;
  roleEn: string;
  // Field nullable sesuai spec BE
  level?: string | null;
  location?: string | null;
  aboutId?: string | null;
  aboutEn?: string | null;
  imageUrl?: string | null;
  cvUrl?: string | null;
}
export interface SocialLink {
  id: number;
  profileId: number;
  name: string;
  handle: string;
  url: string;
  iconName: string;
  bgColor: string;
}

export interface Profile {
  id: number;
  fullName: string;
  roleId: string;
  roleEn: string;
  level: string;
  aboutId: string;
  aboutEn: string;
  imageUrl: string;
  email: string;
  location: string;
  cvUrl: string;
  createdAt: string;
  socialLinks: SocialLink[];
}

export type UpdateProfilePayload = Partial<ProfilePayload>;

export const profilesApi = createApiService<Profile, ProfilePayload>(API_ENDPOINT.PROFILE);
