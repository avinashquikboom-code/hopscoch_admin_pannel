'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Image as ImageIcon, 
  Settings, 
  Languages, 
  DollarSign, 
  BarChart3, 
  User,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  CreditCard,
  Truck,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Menu item interface
interface SubItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MenuGroup {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SubItem[];
}

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Catalog: true,
    Sales: false,
    Marketing: false,
    Analytics: false,
    Settings: true,
  });

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const groups: MenuGroup[] = [
    {
      name: 'Catalog',
      icon: Package,
      items: [
        { name: 'Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'Sub Categories', href: '/sub-categories' },
        { name: 'Brands', href: '/brands' },
        { name: 'Collections', href: '/collections' },
        { name: 'Inventory', href: '/inventory' },
      ],
    },
    {
      name: 'Sales',
      icon: ShoppingBag,
      items: [
        { name: 'Orders', href: '/orders' },
        { name: 'Customers', href: '/customers' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Coupons', href: '/coupons' },
      ],
    },
    {
      name: 'Marketing',
      icon: ImageIcon,
      items: [
        { name: 'Banners', href: '/banners' },
        { name: 'Notifications', href: '/notifications' },
      ],
    },
    {
      name: 'Analytics',
      icon: BarChart3,
      items: [
        { name: 'Dashboard Analytics', href: '/dashboard' },
        { name: 'Reports', href: '/reports' },
      ],
    },
    {
      name: 'Settings',
      icon: Settings,
      items: [
        { name: 'General', href: '/settings/general' },
        { name: 'Languages & Currency', href: '/settings/languages', icon: Languages },
        { name: 'Payments', href: '/settings/payments', icon: CreditCard },
        { name: 'Shipping', href: '/settings/shipping', icon: Truck },
      ],
    },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border/40 backdrop-blur-md flex flex-col select-none"
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border/30 bg-sidebar/90">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#14b8a6] via-[#2dd4bf] to-[#0f766e] text-black">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-black tracking-[0.2em] text-foreground uppercase shimmer-text">
                AURA COUTURE
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mx-auto"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#14b8a6] to-[#0f766e] text-black">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!collapsed && (
          <button
            onClick={onToggle}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted/65 hover:text-foreground transition-all cursor-pointer border border-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <ScrollArea className="flex-1 px-3 py-5 space-y-3.5">
        {/* Direct Link - Dashboard */}
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-all group relative',
              pathname === '/dashboard'
                ? 'bg-[#14b8a6]/10 text-[#14b8a6] font-bold'
                : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
            )}
          >
            {pathname === '/dashboard' && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-[#14b8a6]" />
            )}
            <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </div>

        {/* Collapsible Groups */}
        <div className="space-y-1">
          {groups.map((group) => {
            const isOpen = openGroups[group.name];
            const isGroupActive = group.items.some((item) => pathname === item.href || pathname?.startsWith(item.href + '/'));
            const GroupIcon = group.icon;

            return (
              <div key={group.name} className="space-y-0.5">
                {/* Group Header Trigger */}
                <button
                  onClick={() => !collapsed && toggleGroup(group.name)}
                  className={cn(
                    'w-full flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium transition-all group relative text-left',
                    isGroupActive
                      ? 'text-[#14b8a6] font-bold'
                      : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground',
                    collapsed && 'cursor-default'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <GroupIcon className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && <span>{group.name}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform text-muted-foreground", isOpen && "rotate-180")} />
                  )}
                </button>

                {/* Sub Items Accordion */}
                <AnimatePresence initial={false}>
                  {((isOpen && !collapsed) || (collapsed && isGroupActive)) && (
                    <motion.div
                      initial={collapsed ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className={cn("space-y-0.5 pl-3 border-l border-sidebar-border/30 mt-0.5", !collapsed ? "ml-5" : "ml-4")}>
                        {group.items.map((item) => {
                          const isActive = pathname === item.href;
                          const ItemIcon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                'flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all group relative',
                                isActive
                                  ? 'text-[#14b8a6] bg-[#14b8a6]/5 font-semibold'
                                  : 'text-muted-foreground/80 hover:text-foreground hover:bg-muted/30'
                              )}
                            >
                              {isActive && (
                                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-[#14b8a6]" />
                              )}
                              {ItemIcon && <ItemIcon className="h-3.5 w-3.5" />}
                              {!collapsed && <span>{item.name}</span>}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Admin Profile & Logout direct sections */}
        <div className="space-y-1 pt-3.5 border-t border-sidebar-border/30">
          <Link
            href="/profile"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-all group relative',
              pathname === '/profile'
                ? 'bg-[#14b8a6]/10 text-[#14b8a6] font-bold'
                : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
            )}
          >
            {pathname === '/profile' && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-[#14b8a6]" />
            )}
            <User className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Admin Profile</span>}
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-all group text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </ScrollArea>

      {/* Collapse Trigger when Collapsed */}
      {collapsed && (
        <div className="flex justify-center p-3 border-t border-sidebar-border/30 bg-sidebar/90">
          <button
            onClick={onToggle}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted/65 hover:text-foreground transition-all cursor-pointer"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      )}

      {/* User Info Footer */}
      {!collapsed && (
        <div className="border-t border-sidebar-border/30 p-4 bg-sidebar/40">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#14b8a6] via-[#2dd4bf] to-[#0f766e] text-black font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">Admin User</p>
              <p className="text-[10px] text-muted-foreground truncate font-light">admin@aura.com</p>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
}

function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent', className)}>
      {children}
    </div>
  );
}
