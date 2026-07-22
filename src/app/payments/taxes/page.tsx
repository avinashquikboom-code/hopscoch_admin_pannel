'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Percent } from 'lucide-react';
import { AppDrawer } from '@/components/ui/app-drawer';
import { PageHeader } from '@/components/layout/page-header';
import { API_BASE, authHeaders } from '@/lib/api';

interface TaxRule {
  id: string;
  name: string;
  category?: string;
  rate: number;
  type: string;
  taxType?: string;
  hsnCode?: string;
  hsn?: string;
  active: boolean;
  isActive?: boolean;
}

const gstStats = [
  { label: 'CGST Collected', value: '₹1,24,820', color: 'text-[#14b8a6]' },
  { label: 'SGST Collected', value: '₹1,24,820', color: 'text-blue-500' },
  { label: 'IGST Collected', value: '₹48,200', color: 'text-violet-500' },
  { label: 'Total GST', value: '₹2,97,840', color: 'text-amber-500' },
];

export default function TaxesPage() {
  const [rules, setRules] = useState<TaxRule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<TaxRule | null>(null);
  const [form, setForm] = useState({ name: '', category: 'General', rate: '', type: 'inclusive', hsn: '', active: true });

  const fetchTaxes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/taxes`, { headers: authHeaders() });
      if (res.ok) {
        const json = await res.json();
        const taxList = json.data?.taxes || json.taxes || json.data || [];
        if (Array.isArray(taxList)) {
          setRules(
            taxList.map((t: any) => ({
              id: String(t.id),
              name: t.name,
              category: t.category || 'General',
              rate: Number(t.rate),
              type: (t.taxType || t.type || 'inclusive').toLowerCase(),
              hsn: t.hsnCode || t.hsn || 'N/A',
              active: t.isActive !== false,
            }))
          );
        }
      }
    } catch (err) {
      console.error('Failed to fetch tax rules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  const handleOpenAdd = () => {
    setEditingRule(null);
    setForm({ name: '', category: 'General', rate: '', type: 'inclusive', hsn: '', active: true });
    setOpen(true);
  };

  const handleOpenEdit = (rule: TaxRule) => {
    setEditingRule(rule);
    setForm({
      name: rule.name,
      category: rule.category || 'General',
      rate: String(rule.rate),
      type: rule.type.toLowerCase(),
      hsn: rule.hsn || '',
      active: rule.active,
    });
    setOpen(true);
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      rate: Number(form.rate) || 0,
      type: form.type.toUpperCase(),
      taxType: form.type.toUpperCase(),
      hsnCode: form.hsn,
      isActive: form.active,
    };

    try {
      if (editingRule) {
        await fetch(`${API_BASE}/api/admin/taxes/${editingRule.id}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${API_BASE}/api/admin/taxes`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      }
      fetchTaxes();
    } catch (err) {
      console.error('Failed to save tax rule:', err);
    }

    setForm({ name: '', category: 'General', rate: '', type: 'inclusive', hsn: '', active: true });
    setOpen(false);
    setEditingRule(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_BASE}/api/admin/taxes/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      fetchTaxes();
    } catch (err) {
      console.error('Failed to delete tax rule:', err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Tax Rules"
          badgeText="Finance Command Center"
          subtitle="Configure GST rates and tax rules for your products."
          actions={
            <Button onClick={handleOpenAdd} className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer">
              <Plus className="h-4 w-4" /> Add Tax Rule
            </Button>
          }
        />

        <AppDrawer
          title={editingRule ? 'Edit Tax Rule' : 'Add Tax Rule'}
          subtitle={editingRule ? 'Update the selected GST/tax configuration.' : 'Create a new GST/tax configuration.'}
          open={open}
          onClose={setOpen}
          onSubmit={handleAddOrUpdate}
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Rule Name *</Label>
              <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. GST 5% — Apparel" className="h-11 rounded-lg" />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Category</Label>
              <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Apparel" className="h-11 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Tax Rate (%)</Label>
                <Input type="number" required value={form.rate} onChange={e => setForm({ ...form, rate: e.target.value })} placeholder="e.g. 12" className="h-11 rounded-lg" />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-semibold">HSN Code</Label>
                <Input value={form.hsn} onChange={e => setForm({ ...form, hsn: e.target.value })} placeholder="e.g. 6101" className="h-11 rounded-lg" />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Tax Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {['inclusive', 'exclusive'].map(t => (
                  <button type="button" key={t} onClick={() => setForm({ ...form, type: t })}
                    className={`p-3 rounded-lg border text-sm capitalize font-semibold transition-all ${form.type === t ? 'border-primary bg-primary/5 text-primary' : 'border-border/60 text-muted-foreground'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border/30 pt-4">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Active Status</Label>
                <p className="text-xs text-muted-foreground">Enable or disable this tax rule</p>
              </div>
              <Switch checked={form.active} onCheckedChange={checked => setForm({ ...form, active: checked })} />
            </div>
          </div>
        </AppDrawer>

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
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60" onClick={() => handleOpenEdit(r)}>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-rose-500/10 text-rose-500" onClick={() => handleDelete(r.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
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
