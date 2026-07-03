'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Plus, Edit, Trash2, Zap, Gift, Tag, Star } from 'lucide-react';

type RuleType = 'min_order' | 'max_order' | 'coupon' | 'festival' | 'member';
const ruleConfig: Record<RuleType, { label: string; icon: React.ComponentType<{className?: string}>; color: string }> = {
  min_order: { label: 'Min Order Value', icon: Zap, color: 'text-[#14b8a6] bg-[#14b8a6]/10' },
  max_order: { label: 'Max Order Value', icon: Zap, color: 'text-blue-500 bg-blue-500/10' },
  coupon:    { label: 'Coupon Based',   icon: Tag,  color: 'text-amber-500 bg-amber-500/10' },
  festival:  { label: 'Festival Offer', icon: Gift, color: 'text-violet-500 bg-violet-500/10' },
  member:    { label: 'Member Offer',   icon: Star, color: 'text-rose-500 bg-rose-500/10' },
};

const initialRules = [
  { id: '1', name: 'Free Shipping on ₹999+', type: 'min_order' as RuleType, value: 999, coupon: '', active: true },
  { id: '2', name: 'Free for Premium Members', type: 'member' as RuleType, value: 0, coupon: '', active: true },
  { id: '3', name: 'Festival Special — Diwali', type: 'festival' as RuleType, value: 499, coupon: '', active: false },
  { id: '4', name: 'Coupon: FREESHIP', type: 'coupon' as RuleType, value: 0, coupon: 'FREESHIP', active: true },
];

export default function FreeShippingPage() {
  const [rules, setRules] = useState(initialRules);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'min_order' as RuleType, value: '', coupon: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setRules(rs => [...rs, { id: String(rs.length + 1), ...form, value: Number(form.value), active: true }]);
    setForm({ name: '', type: 'min_order', value: '', coupon: '' });
    setOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Free Shipping Rules</h1>
            <p className="text-muted-foreground mt-1 font-light">Configure conditions for free shipping eligibility.</p>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={
              <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10">
                <Plus className="h-4 w-4" /> Add Rule
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">Add Free Shipping Rule</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">Define when free shipping is applied.</SheetDescription>
              </SheetHeader>
              <form onSubmit={handleAdd} className="space-y-5 py-4 px-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Rule Name *</Label>
                  <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Free on ₹999+" className="h-10 rounded-md" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Rule Type</Label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as RuleType })}
                    className="w-full h-10 rounded-md border border-border/60 bg-background px-3 text-sm focus:border-primary outline-none">
                    {Object.entries(ruleConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                {(form.type === 'min_order' || form.type === 'max_order' || form.type === 'festival') && (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Minimum Order Value (₹)</Label>
                    <Input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder="e.g. 999" className="h-10 rounded-md" />
                  </div>
                )}
                {form.type === 'coupon' && (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Coupon Code</Label>
                    <Input value={form.coupon} onChange={e => setForm({ ...form, coupon: e.target.value })} placeholder="e.g. FREESHIP" className="h-10 rounded-md uppercase" />
                  </div>
                )}
                <SheetFooter className="pt-4">
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-md">Cancel</Button>
                  <Button type="submit" className="rounded-md bg-primary text-white hover:bg-primary/95">Save Rule</Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((r) => {
            const cfg = ruleConfig[r.type];
            const Icon = cfg.icon;
            const [color, bg] = cfg.color.split(' ');
            return (
              <Card key={r.id} className={`border-border/40 bg-card rounded-lg transition-all ${!r.active ? 'opacity-60' : ''}`}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-md flex items-center justify-center ${bg} ${color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{r.name}</p>
                        <Badge className={`text-[10px] rounded-full px-2 border-transparent mt-0.5 ${bg} ${color}`}>{cfg.label}</Badge>
                      </div>
                    </div>
                    <Badge className={`text-[10px] rounded-full px-2.5 border-transparent font-semibold ${r.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                      {r.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  {r.value > 0 && <p className="text-xs text-muted-foreground mb-3">Min Order: <span className="font-semibold text-foreground">₹{r.value}</span></p>}
                  {r.coupon && <p className="text-xs text-muted-foreground mb-3">Coupon: <span className="font-mono font-bold text-[#14b8a6]">{r.coupon}</span></p>}
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-rose-500/10 text-rose-500" onClick={() => setRules(rs => rs.filter(x => x.id !== r.id))}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
