import { toast } from 'sonner';
import { Shield, AlertTriangle, Loader2, AlertCircle } from 'lucide-react';
import { ProfilePayload } from '../services/profile.service';
import { ProfileForm } from './shared/profileForm';
import { useProfile } from '../hooks/useProfile';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/common/types/api';
import { handleApiError } from '@/common/utils/error-handler';

const ProfilePageSkeleton = () => (
  <div className="mx-auto w-full max-w-4xl animate-pulse space-y-8 pb-10">
    <div className="flex items-center gap-3 border-b border-indigo-100 pb-4">
      <div className="h-12 w-12 rounded-xl bg-slate-200"></div>
      <div className="space-y-2">
        <div className="h-6 w-48 rounded bg-slate-200"></div>
        <div className="h-4 w-32 rounded bg-slate-200"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-4">
        <div className="h-64 rounded-2xl bg-slate-200"></div>
      </div>
      <div className="space-y-6 lg:col-span-8">
        <div className="h-40 rounded-2xl bg-slate-200"></div>
        <div className="h-40 rounded-2xl bg-slate-200"></div>
      </div>
    </div>
  </div>
);

export const ProfilePage = () => {
  const { item: profile, isItemLoading, actions, status } = useProfile(1);

  const onFormSubmit = async (formData: ProfilePayload) => {
    const cleanData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? null : value]),
    ) as ProfilePayload;

    if (profile && Object.keys(profile).length > 0) {
      await handleUpdate(cleanData);
    } else {
      await handleStore({ ...cleanData, id: 1 });
    }
  };

  const handleUpdate = async (data: ProfilePayload) => {
    try {
      await actions.updateAsync({
        id: 1,
        payload: data,
      });
      toast.success('Identity Protocol Updated', {
        description: 'Profile data has been successfully synchronized.',
      });
    } catch (error) {
      handleApiError(error, 'Update Failed');
    }
  };

  const handleStore = async (data: ProfilePayload) => {
    try {
      await actions.storeAsync(data);
      toast.success('Identity Initialized');
    } catch (error) {
      handleApiError(error, 'Initialization Failed');
    }
  };

  const handleDelete = async () => {
    try {
      if (!confirm('WARNING: Permanent data purge. Are you sure?')) return;

      await actions.destroy(1);
      toast.success('Identity Purged', {
        description: 'Operator data has been removed from system.',
      });
    } catch (error) {
      handleApiError(error, 'Purge Failed');
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  if (isItemLoading) {
    return <ProfilePageSkeleton />;
  }

  return (
    <ProfileForm
      initialData={profile || undefined}
      onSubmit={onFormSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
      isLoading={status.isUpdating || status.isStoring || status.isAnyActionLoading}
    />
  );
};
