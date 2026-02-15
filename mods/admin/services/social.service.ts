import { API_ENDPOINT } from '@/lib/api';
import { createApiService } from '@/lib/api-factory';

export interface Social {
  id: number;

  profileId?: number;
  name: string;
  handle: string | null;
  url: string;
  iconName: string;
  bgColor: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type SocialPayload = Omit<Social, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSocialPayload = Partial<SocialPayload>;

export const socialApi = createApiService<Social, SocialPayload>(API_ENDPOINT.SOCIALS);
