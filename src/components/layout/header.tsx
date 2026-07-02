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
import { motion } from 'framer-motion';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/40 bg-background/70 backdrop-blur-md px-6 transition-all duration-300">
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
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search products, orders, customers..."
              className="pl-11 bg-muted/40 border-border/60 hover:border-border focus:border-primary/80 focus:ring-1 focus:ring-primary/40 h-10 rounded-xl transition-all"
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
          className="relative rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <Badge className="absolute top-1.5 right-1.5 h-4.5 w-4.5 flex items-center justify-center p-0 bg-primary text-white text-[10px] font-bold border border-background animate-pulse">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl bg-card border border-border/60 shadow-xl backdrop-blur-md">
            <DropdownMenuLabel className="font-bold text-sm text-foreground px-2 py-1.5">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 border-border/40" />
            <div className="max-h-80 overflow-y-auto space-y-1">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 rounded-xl hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-semibold text-sm text-foreground">New Order</span>
                  <span className="text-xxs text-muted-foreground ml-auto">2m ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Order #12345 has been placed</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 rounded-xl hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-semibold text-sm text-foreground">Low Stock Alert</span>
                  <span className="text-xxs text-muted-foreground ml-auto">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">5 products are running low on stock</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 rounded-xl hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-semibold text-sm text-foreground">New Review</span>
                  <span className="text-xxs text-muted-foreground ml-auto">3h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">New review received on Summer Dress</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="my-1 border-border/40" />
            <DropdownMenuItem className="text-center text-xs font-semibold text-primary hover:text-primary-dark cursor-pointer py-2 justify-center rounded-xl">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Account Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="relative h-10 w-10 rounded-xl hover:bg-muted/65 p-0 border border-border/30">
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src="/avatar.png" alt="User" className="rounded-lg" />
                <AvatarFallback className="bg-gradient-to-tr from-primary to-secondary text-white font-bold text-xs rounded-lg">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl bg-card border border-border/60 shadow-xl backdrop-blur-md">
            <DropdownMenuLabel className="px-2 py-2">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-bold text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground font-light">admin@aura.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 border-border/40" />
            <DropdownMenuItem className="p-2.5 rounded-xl hover:bg-muted/50 cursor-pointer text-sm font-medium">
              <User className="mr-2.5 h-4 w-4 text-muted-foreground" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2.5 rounded-xl hover:bg-muted/50 cursor-pointer text-sm font-medium">
              <Settings className="mr-2.5 h-4 w-4 text-muted-foreground" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 border-border/40" />
            <DropdownMenuItem className="p-2.5 rounded-xl text-destructive hover:bg-destructive/10 cursor-pointer text-sm font-medium">
              <LogOut className="mr-2.5 h-4 w-4 text-destructive" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
