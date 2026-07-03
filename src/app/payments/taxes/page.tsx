'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Edit, Trash2, Receipt, Percent } from 'lucide-react';

const taxRules = [
  { id: '1', name: 'GST 5% — Apparel (≤₹999)', category: 'Apparel', rate: 5, type: 'inclusive', hsn: '6101', active: true },
  { id: '2', name: 'GST 12% — Apparel (>₹999)', category: 'Apparel', rate: 12, type: 'inclusive', hsn: '6101', active: true },
  { id: '3', name: 'GST 18% — Accessories', category: 'Accessories', rate: 18, type: 'exclusive', hsn: '6217', active: true },
  { id: '4', name: 'GST 0% — Export Orders', category: 'Export', rate: 0, type: 'exclusive', hsn: 'N/A', active: true },
];

const gstStats = [
  { label: 'CGST Collected', value: '₹1,24,820', color: 'text-[#14b8a6]' },
  { label: 'SGST Collected', value: '₹1,24,820', color: 'text-blue-500' },
  { label: 'IGST Collected', value: '₹48,200', color: 'text-violet-500' },
  { label: 'Total GST', value: '₹2,97,840', color: 'text-amber-500' },
];

export default function TaxesPage() {
  const [rules, setRules] = useState(taxRules);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', rate: '', type: 'inclusive', hsn: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setRules(rs => [...rs, { id: String(rs.length + 1), ...form, rate: Number(form.rate), active: true }]);
    setForm({ name: '', category: '', rate: '', type: 'inclusive', hsn: '' });
    setOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Taxes</h1>
            <p className="text-muted-foreground mt-1 font-light">Configure GST rates and tax rules for your products.</p>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={
              <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10">
                <Plus className="h-4 w-4" /> Add Tax Rule
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">Add Tax Rule</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">Create a new GST/tax configuration.</SheetDescription>
              </SheetHeader>
              <form onSubmit={handleAdd} className="space-y-5 py-4 px-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Rule Name *</Label>
                  <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. GST 5% — Apparel" className="h-10 rounded-md" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Category</Label>
                  <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Apparel" className="h-10 rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Tax Rate (%)</Label>
                    <Input type="number" value={form.rate} onChange={e => setForm({ ...form, rate: e.target.value })} placeholder="e.g. 12" className="h-10 rounded-md" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">HSN Code</Label>
                    <Input value={form.hsn} onChange={e => setForm({ ...form, hsn: e.target.value })} placeholder="e.g. 6101" className="h-10 rounded-md" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Tax Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['inclusive', 'exclusive'].map(t => (
                      <button type="button" key={t} onClick={() => setForm({ ...form, type: t })}
                        className={`p-2.5 rounded-md border text-xs capitalize font-semibold transition-all ${form.type === t ? 'border-primary bg-primary/5 text-primary' : 'border-border/60 text-muted-foreground'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <SheetFooter className="pt-4">
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-md">Cancel</Button>
                  <Button type="submit" className="rounded-md bg-primary text-white hover:bg-primary/95">Save Rule</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* GST Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {gstStats.map(s => (
            <Card key={s.label} className="border-border/40 bg-card rounded-lg">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</p>
                <p className={`text-xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tax Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map(r => (
            <Card key={r.id} className="border-border/40 bg-card rounded-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-[#14b8a6]/10 flex items-center justify-center">
                      <Percent className="h-4 w-4 text-[#14b8a6]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.category} · HSN: {r.hsn}</p>
                    </div>
                  </div>
                  <p className="text-xl font-black text-[#14b8a6]">{r.rate}%</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge className={`text-[10px] rounded-full px-2 border-transparent ${r.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                      {r.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge className="text-[10px] rounded-full px-2 border-transparent bg-muted text-muted-foreground capitalize">{r.type}</Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-rose-500/10 text-rose-500" onClick={() => setRules(rs => rs.filter(x => x.id !== r.id))}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
