// app/[locale]/layout.tsx

import './../globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { QueryProvider } from '@/common/providers/QueryProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/common/components/public/ui/sidebar';
import { Sidebar } from '@/mods/admin/components/ui/sidebar';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Qulls Portfolio',
  description: 'Professional Portfolio of Yudriqul',
};

// 1. Update tipe Props (params adalah Promise)
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params, // 2. Jangan destructure di sini
}: Props) {
  // 3. Await params di dalam fungsi
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <SidebarProvider
              style={
                {
                  '--sidebar-width': 'calc(var(--spacing) * 72)',
                  '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
              }
            >
              <Toaster
                position="top-right" // Sesuaikan posisi asli Anda (top-8 right-8)
                toastOptions={{
                  // Kita reset default style agar tidak bentrok dengan custom div kita
                  className: 'bg-transparent border-none shadow-none p-0',
                }}
              />
              <main>{children}</main>
            </SidebarProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
