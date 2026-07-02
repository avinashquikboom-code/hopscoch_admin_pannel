'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface CommandItem {
  icon: any;
  label: string;
  value: string;
  href?: string;
  action?: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = React.useState('');

  const commands = [
    {
      group: 'Navigation',
      items: [
        { icon: Search, label: 'Go to Dashboard', value: 'dashboard', href: '/dashboard' },
        { icon: Search, label: 'Go to Products', value: 'products', href: '/products' },
        { icon: Search, label: 'Go to Orders', value: 'orders', href: '/orders' },
        { icon: Search, label: 'Go to Customers', value: 'customers', href: '/customers' },
      ] as CommandItem[],
    },
    {
      group: 'Actions',
      items: [
        { icon: Search, label: 'Add New Product', value: 'add-product', action: () => {} },
        { icon: Search, label: 'Create Coupon', value: 'create-coupon', action: () => {} },
        { icon: Search, label: 'Send Notification', value: 'send-notification', action: () => {} },
      ] as CommandItem[],
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={setSearch}
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {commands.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  if (item.href) {
                    window.location.href = item.href;
                  } else if (item.action) {
                    item.action();
                  }
                  onOpenChange(false);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
