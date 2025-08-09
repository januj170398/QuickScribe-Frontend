
"use client"

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from 'next/navigation';
import DashboardLayout from '@/components/ui/dashboard-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith('/notes') || pathname.startsWith('/tags') || pathname.startsWith('/account');

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <title>QuickScribe</title>
        <meta name="description" content="A modern, minimalist, and user-friendly note-taking application." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        {isAuthRoute ? (
          <DashboardLayout>{children}</DashboardLayout>
        ) : (
          children
        )}
        <Toaster />
      </body>
    </html>
  );
}
