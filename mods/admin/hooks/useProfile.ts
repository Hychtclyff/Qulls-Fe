import { profilesApi } from '../services/profile.service';
import type { Profile, ProfilePayload } from '../services/profile.service';
import { HookCallbacks, useGenericHook } from '@/hooks/useGenericMutation';

export const useProfile = (id?: number, callbacks?: HookCallbacks<Profile>) => {
  return useGenericHook<Profile, ProfilePayload>(
    'profile',
    profilesApi,
    id,
    {
      enableList: !id,
      enableItem: !!id,
      refetchOnWindowFocus: false,
    },
    callbacks,
  );
};
