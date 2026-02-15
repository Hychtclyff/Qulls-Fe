'use client';

import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  User,
  MapPin,
  Mail,
  Briefcase,
  FileText,
  Image as ImageIcon,
  Shield,
  X,
  Link as LinkIcon,
  Globe,
  AlertCircle,
  Save,
  Trash,
} from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/public/ui/form';
import { Input } from '@/common/components/public/ui/input';
import { Textarea } from '@/common/components/public/ui/textarea';
import { Slider } from '@/common/components/public/ui/slider';
import { ActionButton } from '../ui/ActionButton';
import SocialFormCard from './socialForm';

const profileSchema = z.object({
  id: z.number().default(1).optional(),
  fullName: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter.' }),

  email: z.string().email({ message: 'Format email tidak valid.' }),

  location: z.string().min(2, { message: 'Lokasi wajib diisi.' }),

  roleEn: z.string().min(2, { message: 'Role (Inggris) wajib diisi.' }),

  roleId: z.string().min(2, { message: 'Role (Indonesia) wajib diisi.' }),

  aboutEn: z.string().optional(),

  aboutId: z.string().optional(),

  imageUrl: z.string().url({ message: 'Harus berupa URL gambar yang valid.' }).or(z.literal('')),

  cvUrl: z.string().url({ message: 'Harus berupa link URL yang valid.' }).or(z.literal('')),

  level: z.string().min(1, { message: 'Status / Level wajib diisi.' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData?: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
  onCancel: () => void;
  onDelete: (id?: number) => void;

  isLoading?: boolean;
}

export const ProfileForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  onDelete,
}: ProfileFormProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: initialData || {
      id: 1,
      fullName: '',
      email: '',
      location: '',
      roleEn: '',
      roleId: '',
      aboutEn: '',
      aboutId: '',
      imageUrl: '',
      cvUrl: '',
      level: '',
    },
  });

  const watchedImage = form.watch('imageUrl');
  const watchedLevel = form.watch('level');

  const onValid = (data: ProfileFormValues) => {
    onSubmit(data);
  };

  const onInvalid = (errors: FieldErrors<ProfileFormValues>) => {
    console.error('Form Errors:', errors);
    toast.error('Validasi Gagal', {
      description: 'Periksa kembali field yang berwarna merah.',
      icon: <AlertCircle className="text-red-500" />,
    });
  };

  return (
    <div className="animate-slide-in-up mx-auto w-full pb-12">
      <div className="mb-8 flex items-center gap-4 border-b border-indigo-100 pb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
          <Shield size={28} />
        </div>
        <div>
          <h2 className="font-mono text-2xl font-bold tracking-tight text-slate-800">
            OPERATOR IDENTITY
          </h2>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            System Status: READY TO UPDATE
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid, onInvalid)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
                  <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    Visual Identification
                  </span>
                </div>

                <div className="p-5 text-center">
                  <div className="relative mx-auto mb-5 h-44 w-44 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-50 shadow-inner">
                    {watchedImage ? (
                      <Image
                        fill
                        src={watchedImage}
                        alt="Preview"
                        className="object-cover"
                        unoptimized
                        onError={() =>
                          form.setError('imageUrl', { message: 'Gagal memuat gambar' })
                        }
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="https://imgur.com/..."
                            className="text-xs"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-[10px] font-bold text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-2 flex items-center justify-between">
                        <FormLabel className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                          Current Status / Level
                        </FormLabel>

                        <span className="max-w-[150px] truncate rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
                          {field.value || 'No Status'}
                        </span>
                      </div>

                      <FormControl>
                        <Input
                          placeholder="e.g. Level 99, Open to Work, Busy..."
                          className="text-xs font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[10px] text-slate-400">
                        Custom status label for your profile badge.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        <LinkIcon size={12} /> CV Document URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://drive.google.com/..."
                          className="text-xs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="col-span-full">
                  {/* Cukup panggil ini, dia yang urus list & form add/edit */}
                  <SocialFormCard profileId={Number(form.getValues('id'))} />
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold text-slate-800">
                  <User size={18} className="text-indigo-500" /> Personal Data
                </h3>

                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-600">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Yudriqul Aulia" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                            <Mail size={12} /> Email Address
                          </FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                            <MapPin size={12} /> Base Location
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold text-slate-800">
                  <Briefcase size={18} className="text-amber-500" /> Operational Role
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="roleEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                          <Globe size={12} /> Role (English)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Fullstack Developer"
                            className="border-indigo-100 bg-indigo-50/30 focus:border-indigo-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                          <span className="rounded border border-slate-300 px-1 font-mono text-[10px] font-bold">
                            ID
                          </span>{' '}
                          Peran (Bahasa)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Pengembang Web" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3 text-sm font-bold text-slate-800">
                  <FileText size={18} className="text-cyan-500" /> Mission Briefing
                </h3>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="aboutEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-600">
                          Bio / Quote (English)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description in English..."
                            className="min-h-[100px] resize-none border-indigo-100 bg-indigo-50/30 focus:border-indigo-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="aboutId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-600">
                          Bio / Deskripsi (Bahasa)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deskripsi singkat dalam Bahasa Indonesia..."
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-xl border border-slate-200 bg-white/90 p-4 shadow-2xl backdrop-blur-md lg:justify-end lg:gap-3">
            <div className="hidden pl-2 text-xs font-medium text-slate-500 lg:mr-auto lg:block">
              Unsaved changes will be lost.
            </div>

            <ActionButton
              type="button"
              variant="danger" // Varian red-600 yang kita buat di ActionButton
              onClick={() => {
                if (confirm('WARNING: Data purge is permanent. Proceed?')) {
                  onDelete();
                }
              }}
              disabled={isLoading}
              // Hapus className text-slate-500 agar warna "danger" bawaan ActionButton muncul
              className="px-6"
            >
              <Trash size={16} /> Delete Identity
            </ActionButton>
            <ActionButton
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
              className="text-slate-500 hover:bg-red-50 hover:text-red-500"
            >
              <X size={16} /> Cancel
            </ActionButton>

            <ActionButton type="submit" variant="primary" isLoading={isLoading} className="px-8">
              <Save size={16} /> Save Changes
            </ActionButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
