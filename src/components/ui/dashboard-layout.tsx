

"use client";

import Link from "next/link";
import {
  Feather,
  Home,
  Tag,
  User,
  LogOut,
  Moon,
  Sun,
  Menu,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const useTheme = () => {
    const [theme, setTheme] = React.useState('dark');

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        document.documentElement.classList.toggle('light', newTheme === 'light');
    };

    return { theme, toggleTheme };
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
        router.push('/');
        setIsLoggingOut(false);
    }, 750);
  }

  const navItems = [
    { href: "/notes", icon: Home, label: "All Notes" },
    { href: "/tags", icon: Tag, label: "Tags" },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                  <Link href="/account">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <LogOut className="h-4 w-4 mr-2"/>}
                     Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
             <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <div className="flex-1 py-2">
            <div className="px-4 lg:px-6 mb-4">
                 <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search notes..."
                        className="w-full rounded-lg bg-background pl-8 h-9"
                    />
                 </div>
            </div>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
               <Link href="/notes/new">
                <Button className="w-full justify-start mb-4" variant="default">
                    <Plus className="h-4 w-4 mr-2" />
                    New Note
                </Button>
               </Link>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.startsWith(item.href) && "bg-muted text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-background">
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 md:hidden">
           <Link href="/notes" className="flex items-center gap-2 font-semibold">
              <Feather className="h-6 w-6 text-primary" />
              <span className="">QuickScribe</span>
            </Link>
          <div className="w-full flex-1">
          </div>
           <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/notes"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Feather className="h-6 w-6 text-primary" />
                  <span>QuickScribe</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                      pathname.startsWith(item.href) && "bg-muted text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
               <div className="mt-auto">
                <Button variant="ghost" className="w-full justify-start gap-4 text-lg" onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? <Loader2 className="h-5 w-5 mr-2 animate-spin"/> : <LogOut className="h-5 w-5" />}
                    Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
