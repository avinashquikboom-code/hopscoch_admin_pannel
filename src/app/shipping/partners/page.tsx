'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger,
} from '@/components/ui/sheet';
import { Plus, Search, Star, Truck } from 'lucide-react';

const initialPartners = [
  { id: '1', name: 'Delhivery', logo: '📦', status: true, priority: 1, days: '2-4', zones: 27400, active: true },
  { id: '2', name: 'Blue Dart', logo: '🔵', status: true, priority: 2, days: '1-3', zones: 18500, active: true },
  { id: '3', name: 'DTDC', logo: '🟠', status: true, priority: 3, days: '3-5', zones: 21000, active: true },
  { id: '4', name: 'XpressBees', logo: '🐝', status: true, priority: 4, days: '2-4', zones: 15000, active: false },
  { id: '5', name: 'Shadowfax', logo: '⚡', status: true, priority: 5, days: '1-2', zones: 12000, active: true },
  { id: '6', name: 'India Post', logo: '🏛️', status: false, priority: 6, days: '5-10', zones: 155000, active: false },
  { id: '7', name: 'DHL', logo: '🔴', status: true, priority: 7, days: '2-5', zones: 8000, active: true },
  { id: '8', name: 'FedEx', logo: '🟣', status: true, priority: 8, days: '1-3', zones: 6500, active: false },
];

export default function ShippingPartnersPage() {
  const [partners, setPartners] = useState(initialPartners);
  const [search, setSearch] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [form, setForm] = useState({ name: '', days: '', priority: '' });

  const filtered = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = (id: string) => {
    setPartners(ps => ps.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setPartners(ps => [...ps, {
      id: String(ps.length + 1), name: form.name, logo: '🚚',
      status: true, priority: Number(form.priority) || ps.length + 1,
      days: form.days || '3-5', zones: 0, active: true,
    }]);
    setForm({ name: '', days: '', priority: '' });
    setSheetOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Shipping Partners</h1>
            <p className="text-muted-foreground mt-1 font-light">Manage courier integrations and delivery partners.</p>
          </div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={
              <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10">
                <Plus className="h-4 w-4" /> Add Partner
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">Add Shipping Partner</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">Configure a new courier integration.</SheetDescription>
              </SheetHeader>
              <form onSubmit={handleAdd} className="space-y-5 py-4 px-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Partner Name *</Label>
                  <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Delhivery" className="h-10 rounded-md" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Estimated Delivery Days</Label>
                  <Input value={form.days} onChange={e => setForm({ ...form, days: e.target.value })} placeholder="e.g. 2-4" className="h-10 rounded-md" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Priority (1 = highest)</Label>
                  <Input type="number" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} placeholder="e.g. 1" className="h-10 rounded-md" />
                </div>
                <SheetFooter className="pt-4">
                  <Button type="button" variant="ghost" onClick={() => setSheetOpen(false)} className="rounded-md">Cancel</Button>
                  <Button type="submit" className="rounded-md bg-primary text-white hover:bg-primary/95">Save Partner</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search */}
        <div className="relative max-w-sm group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input placeholder="Search partners..." value={search} onChange={e => setSearch(e.target.value)} className="pl-11 h-10 rounded-md border-border/60" />
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <Card key={p.id} className="border-border/40 bg-card rounded-lg hover:border-primary/30 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.logo}</span>
                    <div>
                      <p className="font-bold text-sm text-foreground">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.days} days delivery</p>
                    </div>
                  </div>
                  <Switch checked={p.active} onCheckedChange={() => toggleStatus(p.id)} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-muted/30 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <p className="text-sm font-bold text-foreground flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />{p.priority}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-md p-2">
                    <p className="text-xs text-muted-foreground">Pincodes</p>
                    <p className="text-sm font-bold text-foreground">{p.zones.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Badge className={`text-[10px] font-semibold rounded-full px-2.5 border-transparent ${p.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                    {p.active ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs h-7 rounded-md text-primary hover:text-primary/80">Configure</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
