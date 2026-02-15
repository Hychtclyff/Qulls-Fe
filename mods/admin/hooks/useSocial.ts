import { HookCallbacks, useGenericHook } from '@/hooks/useGenericMutation';
import { Social, socialApi, SocialPayload } from '../services/social.service';

export const useSocial = (id?: number, callbacks?: HookCallbacks<Social>) => {
  return useGenericHook<Social, SocialPayload>(
    'social',
    socialApi,
    id,
    {
      enableList: !id,
      enableItem: !!id,
      refetchOnWindowFocus: false,
    },
    callbacks,
  );
};
