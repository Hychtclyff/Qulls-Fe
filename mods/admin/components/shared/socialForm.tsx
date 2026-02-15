'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  Link as LinkIcon,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  ExternalLink,
  Loader2,
  LucideIcon,
} from 'lucide-react';

import { Social, SocialPayload, UpdateSocialPayload } from '../../services/social.service';
import { useSocial } from '../../hooks/useSocial';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/public/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/public/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/public/ui/card';
import { Separator } from '@/common/components/public/ui/separator';
import { Badge } from '@/common/components/public/ui/badge';
import { Input } from '@/common/components/public/ui/input';
import { Skeleton } from '@/common/components/public/ui/skeleton';
import { ActionButton } from '../ui/ActionButton';

// --- UTILS ---

// Helper untuk mengubah string menjadi PascalCase (misal: "github" -> "Github")
const formatIconName = (name: string): string => {
  if (!name) return 'Link';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// --- CONFIGURATION ---

// Mapping lowercase string ke Component Lucide
const ICON_COMPONENT_MAP: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  globe: Globe,
  default: LinkIcon,
};

const SOCIAL_PLATFORMS = {
  github: {
    label: 'GitHub',
    icon: 'Github',
    color: '#181717',
    placeholder: 'https://github.com/username',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0A66C2',
    placeholder: 'https://linkedin.com/in/username',
  },
  instagram: {
    label: 'Instagram',
    icon: 'Instagram',
    color: '#E4405F',
    placeholder: 'https://instagram.com/username',
  },
  twitter: {
    label: 'Twitter',
    icon: 'Twitter',
    color: '#1DA1F2',
    placeholder: 'https://twitter.com/username',
  },
  facebook: {
    label: 'Facebook',
    icon: 'Facebook',
    color: '#1877F2',
    placeholder: 'https://facebook.com/username',
  },
  youtube: {
    label: 'YouTube',
    icon: 'Youtube',
    color: '#FF0000',
    placeholder: 'https://youtube.com/@channel',
  },
  website: {
    label: 'Website',
    icon: 'Globe',
    color: '#4F46E5',
    placeholder: 'https://website.com',
  },
} as const;

type PlatformKey = keyof typeof SOCIAL_PLATFORMS;

const socialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  handle: z.string().optional(),
  url: z.string().url('Invalid URL format'),
  iconName: z.string().min(1, 'Icon is required'),
  bgColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid Hex Color'),
});

type SocialFormValues = z.infer<typeof socialSchema>;

interface SocialFormCardProps {
  profileId: number;
}

export default function SocialFormCard({ profileId }: SocialFormCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { list: socialList, actions, isLoading } = useSocial();

  const form = useForm<SocialFormValues>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      name: '',
      handle: '',
      url: '',
      iconName: 'Globe',
      bgColor: '#000000',
    },
  });

  const { iconName, bgColor, name } = form.watch();

  const PreviewIcon =
    ICON_COMPONENT_MAP[iconName] ||
    ICON_COMPONENT_MAP[iconName?.toLowerCase()] ||
    ICON_COMPONENT_MAP.default;

  const handlePlatformChange = (value: string) => {
    const key = value.toLowerCase() as PlatformKey;
    const platform = SOCIAL_PLATFORMS[key];

    if (platform) {
      form.setValue('name', platform.label, { shouldValidate: true });

      form.setValue('iconName', platform.icon, { shouldValidate: true });
      form.setValue('bgColor', platform.color, { shouldValidate: true });
      form.setValue('url', '');
    }
  };

  const onFormSubmit = async (formData: SocialFormValues) => {
    const payload = {
      name: formData.name,
      url: formData.url,

      iconName: formatIconName(formData.iconName),
      bgColor: formData.bgColor,

      handle: formData.handle || null,
      profileId,
    };

    if (editingId) {
      await handleUpdate(editingId, payload);
    } else {
      await handleStore(payload);
    }
  };

  const handleStore = async (data: SocialPayload) => {
    try {
      await actions.storeAsync(data);
      toast.success('Uplink Established', {
        description: 'New social frequency has been added to the network.',
      });
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Connection Failed', { description: 'Signal interference detected.' });
    }
  };

  const handleUpdate = async (id: number, data: UpdateSocialPayload) => {
    try {
      await actions.updateAsync({ id, payload: data });
      toast.success('Frequency Tuned', {
        description: 'Connection parameters updated successfully.',
      });
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Update Failed', { description: 'Unable to recalibrate connection.' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await actions.destroy(id);
      toast.success('Link Severed', {
        description: 'Connection removed from the grid.',
      });
    } catch (error) {
      console.error(error);
      toast.error('Termination Failed', { description: 'Protocol error during removal.' });
    }
  };

  const handleEdit = (item: Social) => {
    setEditingId(item.id);
    form.reset({
      name: item.name,
      handle: item.handle || '',
      url: item.url,

      iconName: formatIconName(item.iconName),
      bgColor: item.bgColor || '#000000',
    });
    setIsFormOpen(true);
  };

  const handleClose = () => {
    form.reset({
      name: '',
      handle: '',
      url: '',
      iconName: 'Globe',
      bgColor: '#000000',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const renderList = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border p-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="animate-in fade-in grid grid-cols-1 gap-4 duration-500 md:grid-cols-2 lg:grid-cols-2">
        {socialList?.map((social: Social) => {
          const ItemIcon =
            ICON_COMPONENT_MAP[social.iconName?.toLowerCase()] || ICON_COMPONENT_MAP.default;

          const brandColor = social.bgColor || '#000000';

          return (
            <div
              key={social.id}
              className="group border-border bg-card hover:border-primary/50 relative flex items-center gap-4 overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-md"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-5"
                style={{ backgroundColor: brandColor }}
              />

              <div
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 ring-inset group-hover:scale-105"
                style={{
                  backgroundColor: brandColor,
                  boxShadow: `0 4px 12px -2px ${brandColor}40`,
                }}
              >
                <ItemIcon size={22} strokeWidth={1.5} />
              </div>

              <div className="min-w-0 flex-1 space-y-0.5">
                <h4 className="text-foreground truncate font-semibold tracking-tight">
                  {social.name}
                </h4>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link text-muted-foreground hover:text-primary flex w-fit items-center gap-1.5 text-xs transition-colors"
                >
                  <span className="max-w-[150px] truncate">{social.handle || 'Visit Link'}</span>
                  <ExternalLink
                    size={10}
                    className="-translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100"
                  />
                </a>
              </div>

              <div className="from-card via-card absolute right-2 flex translate-x-4 gap-1 bg-gradient-to-l to-transparent pl-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ActionButton
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:bg-primary/10 hover:text-primary h-8 w-8 transition-colors"
                  onClick={() => handleEdit(social)}
                  title="Edit"
                >
                  <Pencil size={14} />
                </ActionButton>

                <ActionButton
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8 transition-colors"
                  onClick={() => handleDelete(social.id)}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </ActionButton>
              </div>
            </div>
          );
        })}

        <ActionButton
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="group border-muted-foreground/25 bg-muted/5 hover:border-primary hover:bg-background relative flex h-[82px] w-full flex-row items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed transition-all duration-300 hover:border-solid hover:shadow-md"
        >
          <div className="bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300">
            <Plus size={20} className="transition-transform duration-500 group-hover:rotate-90" />
          </div>
          <span className="text-muted-foreground group-hover:text-primary text-xs font-bold tracking-widest uppercase transition-colors">
            Add Connection
          </span>
        </ActionButton>
      </div>
    );
  };

  const renderForm = () => (
    <Card className="animate-in slide-in-from-top-2 fade-in border-primary/20 bg-muted/10 border-dashed duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-primary flex items-center gap-2 text-base font-bold tracking-wider uppercase">
          {editingId ? <Pencil size={16} /> : <Plus size={16} />}
          {editingId ? 'Edit Connection' : 'New Connection'}
        </CardTitle>
        <ActionButton
          variant="ghost"
          onClick={handleClose}
          className="text-muted-foreground hover:text-destructive h-8 w-8"
        >
          <X size={18} />
        </ActionButton>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <div
            className="space-y-6"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                form.handleSubmit(onFormSubmit)();
              }
            }}
          >
            {/* Top Section: Platform & Preview */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="iconName"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground text-[10px] font-bold uppercase">
                        Platform
                      </FormLabel>
                      <Select onValueChange={handlePlatformChange}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select platform..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(SOCIAL_PLATFORMS).map((key) => {
                            const pKey = key as PlatformKey;
                            return (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                  <span>{SOCIAL_PLATFORMS[pKey].label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Live Preview Badge */}
              <div className="flex flex-col gap-2 pt-1 sm:pt-6">
                <Badge
                  className="hover:bg-opacity-90 flex h-10 items-center gap-2 px-4 text-sm font-semibold text-white shadow transition-all"
                  style={{ backgroundColor: bgColor || '#000' }}
                >
                  <PreviewIcon size={16} />
                  <span>{name || 'Preview'}</span>
                </Badge>
              </div>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-[10px] font-bold uppercase">
                      Display Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. GitHub" className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-[10px] font-bold uppercase">
                      Handle (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="@username" className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-[10px] font-bold uppercase">
                    Profile URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." className="bg-background" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color Picker */}
            <FormField
              control={form.control}
              name="bgColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-[10px] font-bold uppercase">
                    Brand Color
                  </FormLabel>
                  <div className="flex items-center gap-3">
                    <div className="ring-offset-background focus-within:ring-ring relative h-10 w-10 shrink-0 overflow-hidden rounded-md border shadow-sm focus-within:ring-2 focus-within:ring-offset-2">
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{ backgroundColor: field.value }}
                      />
                      <input
                        type="color"
                        className="absolute -top-[50%] -left-[50%] h-[200%] w-[200%] cursor-pointer opacity-0"
                        {...field}
                      />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="#000000"
                        className="bg-background font-mono uppercase"
                        maxLength={7}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <ActionButton type="reset" variant="ghost" onClick={handleClose}>
                Cancel
              </ActionButton>
              <ActionButton
                type="button"
                onClick={form.handleSubmit(onFormSubmit)}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Connection
                  </>
                )}
              </ActionButton>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="text-muted-foreground relative flex justify-center text-[10px] font-bold tracking-widest uppercase">
          <span className="bg-background px-2">Social Connections</span>
        </div>
      </div>

      {isFormOpen ? renderForm() : renderList()}
    </div>
  );
}
