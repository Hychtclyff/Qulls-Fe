import { apiClient } from '@/lib/api';
import { ApiEndpointValue } from './api/endpoint';

export interface CrudApi<T, K> {
  getAll: () => Promise<T[]>;
  getDetail: (id: number) => Promise<T>;
  store: (payload: K) => Promise<T>;
  update: (id: number, payload: Partial<K>) => Promise<T>;
  destroy: (id: number) => Promise<{ id: number }>;
}

export const createApiService = <T, K>(endpoint: ApiEndpointValue): CrudApi<T, K> => {
  return {
    getAll: async (): Promise<T[]> => {
      const response = await apiClient.get(endpoint);
      return response.data.data;
    },
    getDetail: async (): Promise<T> => {
      const response = await apiClient.get(endpoint);
      return response.data.data;
    },

    store: async (payload: K): Promise<T> => {
      const response = await apiClient.post(endpoint, payload);
      return response.data.data;
    },

    update: async (id: number, payload: Partial<K>): Promise<T> => {
      const response = await apiClient.patch(`${endpoint}/${id}`, payload);
      return response.data.data;
    },

    destroy: async (id: number): Promise<{ id: number }> => {
      const response = await apiClient.delete(`${endpoint}/${id}`);
      return response.data.data;
    },
  };
};
