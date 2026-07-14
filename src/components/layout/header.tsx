'use client';

import { Search, Bell, User, Settings, LogOut, Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string; avatarUrl?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const getInitials = () => {
    if (!user) return 'AD';
    const f = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
    const l = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
    return `${f}${l}` || 'AD';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/20 bg-background/60 backdrop-blur-lg px-6 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-muted/60"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5 text-foreground" />
        </Button>

        {/* Global Search */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full group">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#14b8a6] transition-colors" />
            <Input
              type="search"
              placeholder="Search products, orders, customers..."
              className="pl-11 bg-muted/30 border-border/30 hover:border-border/55 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/30 h-10 rounded-md transition-all"
            />
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="relative rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <div className="relative rounded-md p-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer border-none bg-transparent">
              <Bell className="h-5 w-5" />
              {/* Badge rendered outside Button so it's always visible */}
              <span className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#14b8a6] text-black text-[10px] font-black leading-none px-1 border-2 border-background">
                3
              </span>
            </div>
          } />
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-lg bg-card/95 border border-border/30 backdrop-blur-lg">
            <DropdownMenuLabel className="font-bold text-sm text-foreground px-2 py-1.5">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 border-border/20" />
            <div className="max-h-80 overflow-y-auto space-y-1">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#14b8a6] flex-shrink-0" />
                  <span className="font-semibold text-sm text-foreground">New Order</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">2m ago</span>
                </div>
                <p className="text-xs text-muted-foreground pl-4">Order #12345 has been placed</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-sm text-foreground">Low Stock Alert</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground pl-4">5 products are running low on stock</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span className="inline-flex h-2 w-2 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="font-semibold text-sm text-foreground">New Review</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">3h ago</span>
                </div>
                <p className="text-xs text-muted-foreground pl-4">New review received on Summer Dress</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="my-1 border-border/20" />
            <DropdownMenuItem 
              onClick={() => router.push('/notifications')}
              className="text-center text-xs font-semibold text-[#14b8a6] hover:text-[#2dd4bf] cursor-pointer py-2 justify-center rounded-md"
            >
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Account Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <div className="relative h-10 w-10 rounded-full hover:bg-muted/65 p-0 border border-[#14b8a6]/30 cursor-pointer bg-transparent flex items-center justify-center">
              <Avatar className="h-9 w-9 rounded-full">
                {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="Admin" />}
                <AvatarFallback className="bg-gradient-to-tr from-[#14b8a6] via-[#2dd4bf] to-[#0f766e] text-black font-bold text-xs rounded-full">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>
          } />
          <DropdownMenuContent align="end" className="w-60 p-2 rounded-lg bg-card/95 border border-border/30 backdrop-blur-lg">
            {/* User mini-profile block */}
            <DropdownMenuLabel className="px-2 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-full border border-[#14b8a6]/20 flex-shrink-0">
                  {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="Admin" />}
                  <AvatarFallback className="rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0f766e] text-black text-xs font-black">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {user ? `${user.firstName} ${user.lastName}`.trim() || 'Admin User' : 'Admin User'}
                  </p>
                  <p className="text-xs text-muted-foreground font-light truncate">
                    {user?.email || 'admin@hopscotch.com'}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 border-border/20" />
            <DropdownMenuItem
              onClick={() => router.push('/profile')}
              className="p-2.5 rounded-md hover:bg-muted/50 cursor-pointer text-sm font-medium"
            >
              <User className="mr-2.5 h-4 w-4 text-[#14b8a6]" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push('/settings')}
              className="p-2.5 rounded-md hover:bg-muted/50 cursor-pointer text-sm font-medium"
            >
              <Settings className="mr-2.5 h-4 w-4 text-[#14b8a6]" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 border-border/20" />
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="p-2.5 rounded-md text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer text-sm font-medium"
            >
              <LogOut className="mr-2.5 h-4 w-4 text-rose-500" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
