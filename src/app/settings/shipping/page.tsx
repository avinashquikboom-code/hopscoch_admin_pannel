'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Globe, Save, Check } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { motion, AnimatePresence } from 'framer-motion';

const initialRates = [
  { id: '1', zone: 'North America', type: 'Standard Ground', rate: 5.99, freeThreshold: 75.0, active: true },
  { id: '2', zone: 'North America', type: 'Express Saver', rate: 14.99, freeThreshold: 150.0, active: true },
  { id: '3', zone: 'European Union', type: 'Standard Air', rate: 12.0, freeThreshold: 100.0, active: true },
  { id: '4', zone: 'Rest of World', type: 'DHL Express', rate: 29.99, freeThreshold: 250.0, active: false },
];

export default function SettingsShippingPage() {
  const [rates, setRates] = useState(initialRates);
  const [isSaved, setIsSaved] = useState(false);
  const [newZone, setNewZone] = useState({ zone: '', type: '', rate: 0, freeThreshold: 0 });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZone.zone || !newZone.type) return;
    const newRate = {
      id: String(rates.length + 1),
      zone: newZone.zone,
      type: newZone.type,
      rate: Number(newZone.rate),
      freeThreshold: Number(newZone.freeThreshold),
      active: true,
    };
    setRates([...rates, newRate]);
    setNewZone({ zone: '', type: '', rate: 0, freeThreshold: 0 });
  };

  const handleDelete = (id: string) => {
    setRates(rates.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12 max-w-4xl">
        <PageHeader
          titlePart1="Settings"
          titlePart2="Shipping Zones"
          badgeText="Store Configuration"
          subtitle="Set up geolocated shipping rates, custom courier types, and free thresholds."

          actions={
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-[#14b8a6] bg-teal-500/10 border border-teal-500/15 px-3.5 py-1.5 rounded-full">
              <Globe className="w-3.5 h-3.5" />
              Global Delivery Network
            </div>
          }
        />

        <AnimatePresence>
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="p-4 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-[#14b8a6] text-sm flex items-center gap-2 font-medium"
            >
              <Check className="h-4.5 w-4.5" />
              Shipping zones configurations and flat rates successfully saved.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rates Table Card */}
        <Card className="border-border/20 rounded-lg bg-card/40 backdrop-blur-md hover:border-[#14b8a6]/20 transition-all duration-300 luxury-glow">
          <CardHeader className="border-b border-border/25 pb-4">
            <CardTitle className="text-base font-bold">Configured Zones</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="border border-border/20 rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow className="border-b border-border/20">
                    <TableHead className="font-semibold text-xs text-muted-foreground uppercase tracking-wider h-11">Delivery Zone</TableHead>
                    <TableHead className="font-semibold text-xs text-muted-foreground uppercase tracking-wider h-11">Courier Service</TableHead>
                    <TableHead className="font-semibold text-xs text-muted-foreground uppercase tracking-wider h-11 text-right">Flat Rate</TableHead>
                    <TableHead className="font-semibold text-xs text-muted-foreground uppercase tracking-wider h-11 text-right">Free Delivery Over</TableHead>
                    <TableHead className="font-semibold text-xs text-muted-foreground uppercase tracking-wider h-11 text-center">Status</TableHead>
                    <TableHead className="w-16 h-11"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence initial={false}>
                    {rates.map((r) => (
                      <TableRow key={r.id} className="hover:bg-muted/20 border-b border-border/20 transition-colors">
                        <TableCell className="font-semibold text-sm text-foreground py-3.5">{r.zone}</TableCell>
                        <TableCell className="text-sm text-muted-foreground py-3.5">{r.type}</TableCell>
                        <TableCell className="text-right text-sm font-semibold text-foreground py-3.5">${r.rate.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground py-3.5">${r.freeThreshold.toFixed(2)}</TableCell>
                        <TableCell className="text-center py-3.5">
                          <Badge
                            className={`rounded-full font-bold border-transparent px-2.5 py-0.5 text-xxs ${
                              r.active 
                                ? 'bg-teal-500/10 text-teal-600 dark:text-[#14b8a6]' 
                                : 'bg-zinc-500/10 text-zinc-500'
                            }`}
                          >
                            {r.active ? 'Active' : 'Disabled'}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(r.id)}
                            className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg cursor-pointer transition-all active:scale-[0.96]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Zone Card */}
        <Card className="border-border/20 rounded-lg bg-card/40 backdrop-blur-md hover:border-[#14b8a6]/20 transition-all duration-300 luxury-glow">
          <CardHeader className="border-b border-border/25 pb-4">
            <CardTitle className="text-base font-bold">Add Delivery Zone Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zone" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Zone / Country</Label>
                  <Input
                    id="zone"
                    value={newZone.zone}
                    onChange={(e) => setNewZone({ ...newZone, zone: e.target.value })}
                    placeholder="e.g. UK & Europe"
                    className="rounded-md border-border/40 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/40 h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Courier / Service Name</Label>
                  <Input
                    id="type"
                    value={newZone.type}
                    onChange={(e) => setNewZone({ ...newZone, type: e.target.value })}
                    placeholder="e.g. Royal Mail Tracker"
                    className="rounded-md border-border/40 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/40 h-11"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Flat Shipping Fee ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    value={newZone.rate}
                    onChange={(e) => setNewZone({ ...newZone, rate: Number(e.target.value) })}
                    className="rounded-md border-border/40 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/40 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Free Shipping Threshold ($)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    step="0.01"
                    value={newZone.freeThreshold}
                    onChange={(e) => setNewZone({ ...newZone, freeThreshold: Number(e.target.value) })}
                    className="rounded-md border-border/40 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/40 h-11"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="outline"
                className="rounded-md border-border/40 hover:bg-muted/50 flex items-center gap-2 cursor-pointer transition-all hover:text-[#14b8a6] hover:border-[#14b8a6]/45 active:scale-[0.98] h-10 px-4 text-xs font-semibold"
              >
                <Plus className="h-4 w-4 text-[#14b8a6]" /> Add Zone Rate
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            onClick={handleSave}
            className="rounded-md teal-gradient-bg text-black font-bold hover:opacity-95 shadow-md shadow-[#14b8a6]/15 h-11 px-6 cursor-pointer flex items-center gap-2 border border-[#14b8a6]/20 transition-all active:scale-[0.99]"
          >
            <Save className="h-4.5 w-4.5" />
            Save Shipping Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
