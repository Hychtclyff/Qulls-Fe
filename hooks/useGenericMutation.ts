import { CrudApi } from '@/lib/api-factory';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface HookCallbacks<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface GenericOptions {
  enableList?: boolean;
  enableItem?: boolean;
  refetchOnWindowFocus?: boolean;
}

export const useGenericHook = <T, K>(
  key: string,
  api: Partial<CrudApi<T, K>>,
  id?: number,
  config: GenericOptions = { enableList: true, enableItem: false, refetchOnWindowFocus: false },
  callbacks?: HookCallbacks<T>,
) => {
  const queryClient = useQueryClient();

  const listQuery = useQuery<T[]>({
    queryKey: [key, 'list'],

    queryFn: () => {
      if (!api.getAll) throw new Error('Method getAll not implemented');
      return api.getAll();
    },
    enabled: config.enableList && !!api.getAll,
    refetchOnWindowFocus: config.refetchOnWindowFocus,
  });

  const singleQuery = useQuery<T>({
    queryKey: [key, 'detail', id],

    queryFn: () => {
      if (!api.getDetail) throw new Error('Method getDetail not implemented');
      return api.getDetail(id!);
    },
    enabled: config.enableItem && !!id && !!api.getDetail,
    refetchOnWindowFocus: config.refetchOnWindowFocus,
  });

  const storeMutation = useMutation({
    mutationFn: (payload: K) => {
      if (!api.store) throw new Error('Method store not implemented');
      return api.store(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [key] });
      callbacks?.onSuccess?.(data);
    },
    onError: (error: Error) => callbacks?.onError?.(error),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<K> }) => {
      if (!api.update) throw new Error('Method update not implemented');
      return api.update(id, payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [key] });
      callbacks?.onSuccess?.(data);
    },
    onError: (error: Error) => callbacks?.onError?.(error),
  });

  const destroyMutation = useMutation({
    mutationFn: (id: number) => {
      if (!api.destroy) throw new Error('Method destroy not implemented');
      return api.destroy(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });

      callbacks?.onSuccess?.({} as T);
    },
    onError: (error: Error) => callbacks?.onError?.(error),
  });

  return {
    list: listQuery.data ?? [],
    item: singleQuery.data,

    isLoading:
      (config.enableList && listQuery.isLoading) || (config.enableItem && singleQuery.isLoading),
    isListLoading: listQuery.isLoading,
    isItemLoading: singleQuery.isLoading,

    status: {
      isStoring: storeMutation.isPending,
      isUpdating: updateMutation.isPending,
      isDeleting: destroyMutation.isPending,
      isAnyActionLoading:
        storeMutation.isPending || updateMutation.isPending || destroyMutation.isPending,
    },

    actions: {
      store: storeMutation.mutate,
      update: updateMutation.mutate,
      destroy: destroyMutation.mutate,

      storeAsync: storeMutation.mutateAsync,
      updateAsync: updateMutation.mutateAsync,
      destroyAsync: destroyMutation.mutateAsync,
    },
  };
};
