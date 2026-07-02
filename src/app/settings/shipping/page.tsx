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
import { Plus, Trash2 } from 'lucide-react';

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
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12 max-w-4xl">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Shipping Zones & Rates</h1>
          <p className="text-muted-foreground mt-1 font-light">
            Set up geolocated shipping rates, custom courier types, and free thresholds.
          </p>
        </div>

        {/* Rates Table Card */}
        <Card className="border-border/40 rounded-2xl bg-card">
          <CardHeader className="border-b border-border/30 pb-4">
            <CardTitle className="text-base font-bold">Configured Zones</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="border border-border/40 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Delivery Zone</TableHead>
                    <TableHead>Courier Service</TableHead>
                    <TableHead className="text-right">Flat Rate</TableHead>
                    <TableHead className="text-right">Free Delivery Over</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rates.map((r) => (
                    <TableRow key={r.id} className="hover:bg-muted/10">
                      <TableCell className="font-semibold text-sm text-foreground">{r.zone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.type}</TableCell>
                      <TableCell className="text-right text-sm font-semibold">${r.rate.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">${r.freeThreshold.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={r.active ? 'default' : 'outline'}
                          className={r.active ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2.5 py-0.5' : 'text-muted-foreground rounded-full px-2.5 py-0.5'}
                        >
                          {r.active ? 'Active' : 'Disabled'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(r.id)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Zone Card */}
        <Card className="border-border/40 rounded-2xl bg-card">
          <CardHeader className="border-b border-border/30 pb-4">
            <CardTitle className="text-base font-bold">Add Delivery Zone Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zone" className="text-xs font-semibold">Zone / Country</Label>
                  <Input
                    id="zone"
                    value={newZone.zone}
                    onChange={(e) => setNewZone({ ...newZone, zone: e.target.value })}
                    placeholder="e.g. UK & Europe"
                    className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-xs font-semibold">Courier / Service Name</Label>
                  <Input
                    id="type"
                    value={newZone.type}
                    onChange={(e) => setNewZone({ ...newZone, type: e.target.value })}
                    placeholder="e.g. Royal Mail Tracker"
                    className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-xs font-semibold">Flat Shipping Fee ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    value={newZone.rate}
                    onChange={(e) => setNewZone({ ...newZone, rate: Number(e.target.value) })}
                    className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold" className="text-xs font-semibold">Free Shipping Threshold ($)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    step="0.01"
                    value={newZone.freeThreshold}
                    onChange={(e) => setNewZone({ ...newZone, freeThreshold: Number(e.target.value) })}
                    className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="outline"
                className="rounded-xl border-border/60 hover:bg-muted/50 flex items-center gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Zone Rate
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            onClick={handleSave}
            className="rounded-xl bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10 h-11 px-6 cursor-pointer"
          >
            {isSaved ? 'Rates Saved' : 'Save Shipping Settings'}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
