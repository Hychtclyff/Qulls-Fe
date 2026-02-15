import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import React from 'react';

export interface ApiErrorResponse {
  status: 'fail' | 'error';
  type: string;
  message: string;
}

export const handleApiError = (error: unknown, title: string = 'Protocol Error') => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  const serverMessage = axiosError.response?.data?.message || 'Internal Server Error';

  console.error(`[${title}]:`, axiosError.response?.data || error);

  toast.error(title, {
    description: serverMessage,
    icon: React.createElement(AlertCircle, { className: 'h-4 w-4 text-red-500' }),
    duration: 5000,
  });
};
