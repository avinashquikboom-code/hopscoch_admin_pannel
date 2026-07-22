'use client';

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, X, Plus, Search, Check } from 'lucide-react';

interface MultiSelectDropdownProps {
  label?: string;
  placeholder?: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  allowCustom?: boolean;
  className?: string;
}

export function MultiSelectDropdown({
  label,
  placeholder = 'Select options...',
  options,
  selectedValues,
  onChange,
  allowCustom = true,
  className = '',
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.trim().toLowerCase())
  );

  const isCustomAvailable =
    allowCustom &&
    search.trim().length > 0 &&
    !options.some(opt => opt.toLowerCase() === search.trim().toLowerCase()) &&
    !selectedValues.some(val => val.toLowerCase() === search.trim().toLowerCase());

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(val => val !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const addCustomOption = () => {
    const trimmed = search.trim();
    if (trimmed && !selectedValues.includes(trimmed)) {
      onChange([...selectedValues, trimmed]);
      setSearch('');
    }
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter(val => val !== option));
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger nativeButton={false} render={
          <div
            onClick={() => setOpen(!open)}
            className="w-full min-h-[44px] p-2 rounded-lg border border-border/50 bg-background text-sm flex items-center justify-between gap-2 cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-wrap gap-1.5 items-center flex-1">
              {selectedValues.length === 0 ? (
                <span className="text-muted-foreground text-xs">{placeholder}</span>
              ) : (
                selectedValues.map(val => (
                  <Badge
                    key={val}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs px-2 py-0.5 flex items-center gap-1 cursor-default"
                  >
                    {val}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-rose-500"
                      onClick={(e) => removeOption(val, e)}
                    />
                  </Badge>
                ))
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </div>
        } />
        <PopoverContent className="w-64 p-2 bg-card border border-border/40 shadow-xl rounded-xl">
          <div className="space-y-2">
            <div className="relative flex items-center">
              <Search className="h-3.5 w-3.5 absolute left-2.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (isCustomAvailable) addCustomOption();
                  }
                }}
                placeholder="Search or add custom..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/20 border border-border/40 rounded-md focus:outline-none focus:border-primary"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-0.5">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(opt => {
                  const selected = selectedValues.includes(opt);
                  return (
                    <div
                      key={opt}
                      onClick={() => toggleOption(opt)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                        selected
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-muted/40 text-foreground'
                      }`}
                    >
                      <span>{opt}</span>
                      {selected && <Check className="h-3.5 w-3.5 text-primary" />}
                    </div>
                  );
                })
              ) : !isCustomAvailable ? (
                <p className="text-xs text-muted-foreground p-2 text-center">No options found</p>
              ) : null}

              {isCustomAvailable && (
                <button
                  type="button"
                  onClick={addCustomOption}
                  className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add "{search.trim()}"
                </button>
              )}
            </div>

            {selectedValues.length > 0 && (
              <div className="pt-1.5 border-t border-border/30 flex justify-between items-center text-[11px] text-muted-foreground">
                <span>{selectedValues.length} selected</span>
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-rose-500 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
