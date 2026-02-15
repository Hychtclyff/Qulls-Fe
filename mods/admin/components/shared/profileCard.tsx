import Image from 'next/image';
import { Card } from '../ui/card';
import {
  MapPin,
  Mail,
  Copy,
  Download,
  ExternalLink,
  Hash,
  ShieldCheck,
  Activity,
  Globe,
} from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Badge } from '@/common/components/public/ui/badge';
import { LucideIcon } from 'lucide-react';
// --- COMPONENTS ---

// 1. Loading Skeleton (Tech Style)
const ProfileSkeleton = () => (
  <div className="w-full animate-pulse space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 rounded-full bg-slate-200"></div>
      <div className="space-y-2">
        <div className="h-6 w-48 rounded bg-slate-200"></div>
        <div className="h-4 w-32 rounded bg-slate-200"></div>
      </div>
    </div>
    <div className="h-24 rounded-lg bg-slate-100"></div>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-10 rounded bg-slate-100"></div>
      <div className="h-10 rounded bg-slate-100"></div>
    </div>
  </div>
);

// 2. Main Card
export const ProfileCard = () => {
  const { item: profile, isLoading } = useProfile(1); // Fetch ID 1
  const [copied, setCopied] = useState(false);

  // Helper: Copy Email
  const handleCopy = () => {
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSocialIcon = (name: string) => {
    // 1. Ambil icon berdasarkan nama, casting sebagai LucideIcon atau undefined
    const IconComponent = Icons[name as keyof typeof Icons] as LucideIcon | undefined;

    if (!IconComponent) {
      return <Icons.Globe size={16} />;
    }

    return <IconComponent size={16} />;
  };

  if (isLoading) return <ProfileSkeleton />;
  if (!profile || Object.keys(profile).length === 0) {
    return (
      <Card title="OPERATOR IDENTITY" decoration="gold">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50 shadow-inner">
            <ShieldCheck size={48} className="text-slate-300" />
          </div>
          <h3 className="font-mono text-xl font-bold text-slate-700">NO IDENTITY DETECTED</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            System cannot find any operator profile data. Please initialize your identity protocol.
          </p>

          {/* Tombol yang mengarahkan ke halaman Edit/Create */}
          {/* Asumsi: Parent component (Page) akan menangani logic tombol ini untuk membuka Form */}
          <button
            className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-105 active:scale-95"
            onClick={() => {
              // Logic untuk trigger mode edit di parent
              // Contoh: window.location.href = '/admin/profile/edit'
              // Atau panggil props onEmptyStateAction() jika ada
            }}
          >
            INITIALIZE PROFILE
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="OPERATOR IDENTITY" decoration="gold" className="overflow-hidden">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-1 flex flex-col items-center gap-4 rounded-2xl bg-slate-50/50 p-4 lg:col-span-4 lg:border-r lg:border-slate-100">
          <div className="group relative flex h-48 w-48 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20 duration-1000"></div>

            <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-10 delay-500 duration-[2000ms]"></div>

            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-40 blur-xl transition-opacity group-hover:opacity-60"></div>

            <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <Image
                src={profile.imageUrl || '/assets/avatar-placeholder.png'}
                alt={profile.fullName}
                fill
                className="object-cover"
                priority
              />
            </div>

            <Badge className="absolute -right-2 bottom-2 z-20 flex items-center justify-center rounded-full bg-indigo-600/90 px-4 py-1 text-xs font-bold text-white shadow-[0_4px_10px_rgba(79,70,229,0.5)] backdrop-blur-sm">
              {profile.level || '1'}
            </Badge>
          </div>

          <div className="flex w-full justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold tracking-wide text-emerald-600 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Online
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold tracking-wide text-slate-500 uppercase">
              ID: {profile.id.toString().padStart(3, '0')}
            </span>
          </div>

          {profile.cvUrl && (
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Download size={14} />
              ACCESS CV DATA
            </a>
          )}
        </div>

        <div className="col-span-1 flex flex-col justify-between lg:col-span-8">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black tracking-tight text-slate-800 md:text-3xl">
                {profile.fullName}
              </h3>
              <Hash className="text-slate-200" size={24} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600">
                <ShieldCheck size={12} />
                {profile.roleEn}
              </span>
              <span className="text-xs font-medium text-slate-400">/ {profile.roleId}</span>
            </div>
          </div>

          <div className="my-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <h5 className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <Activity size={12} /> Mission Objective
            </h5>
            <p className="text-sm leading-relaxed text-slate-600">
              {profile.aboutEn || profile.aboutId || 'No mission data available.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-colors hover:border-indigo-100">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <MapPin size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Base Location</p>
                <p className="truncate text-sm font-semibold text-slate-700">{profile.location}</p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:border-cyan-200 hover:bg-cyan-50/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                {copied ? <ShieldCheck size={18} /> : <Mail size={18} />}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Secure Comms</p>
                  {copied && <span className="text-[9px] font-bold text-green-600">COPIED</span>}
                </div>
                <p className="truncate text-sm font-semibold text-slate-700">{profile.email}</p>
              </div>
            </button>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <div className="flex flex-wrap gap-2">
              {profile.socialLinks?.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {getSocialIcon(social.iconName)}
                  <span>{social.name}</span>
                  <ExternalLink
                    size={10}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
