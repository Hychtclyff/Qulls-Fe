import { API_ENDPOINT, apiClient } from '@/lib/api';

export interface RepoData {
  githubRepoId: string;
  name: string;
  owner: string;
  description: string;
  url: string;
  homepage: string;
  stars: 0;
  primaryLanguage: string;
  allLanguages: [string];
  topics: [string];
  lastPushed: Date;
  forks: number;
}

interface Repository {
  target: string;
  type: string;
  count: number;
  repositories: RepoData[];
}

export interface ListOrg {
  id: string;
  login: string;
  description: string;
  avatarUrl: string;
  url: string;
}

export const repositoryApi = {
  getPersonaRepo: async (): Promise<Repository> => {
    const response = await apiClient.get(API_ENDPOINT.REPOSITORY + '/Hychtclyff?type=user');
    return response.data.data;
  },

  getOrgRepo: async (nameOrg: string): Promise<Repository> => {
    const response = await apiClient.get(API_ENDPOINT.REPOSITORY + `/${nameOrg}?type=org`);
    return response.data.data;
  },
  getListOrg: async (): Promise<ListOrg[]> => {
    const response = await apiClient.get(API_ENDPOINT.REPOSITORY + `/orgs`);
    return response.data.data;
  },
};
