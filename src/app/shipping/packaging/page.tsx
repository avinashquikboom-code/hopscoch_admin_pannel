'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Box, Package, Weight, Ruler, Edit, Trash2, Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { AppDrawer } from '@/components/ui/app-drawer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface PackageType {
  id: string;
  name: string;
  size: string;
  weight: string;
  maxWeight: number;
  icon: any;
  color: string;
  bg: string;
  isDefault: boolean;
}

const initialPackagingTypes: PackageType[] = [
  { id: '1', name: 'Standard Poly Bag', size: '30×40 cm', weight: '≤0.5 kg', maxWeight: 0.5, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', isDefault: true },
  { id: '2', name: 'Small Box', size: '15×15×10 cm', weight: '≤1 kg', maxWeight: 1, icon: Box, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', isDefault: false },
  { id: '3', name: 'Medium Box', size: '25×25×20 cm', weight: '≤3 kg', maxWeight: 3, icon: Box, color: 'text-violet-500', bg: 'bg-violet-500/10', isDefault: false },
  { id: '4', name: 'Large Box', size: '40×40×30 cm', weight: '≤5 kg', maxWeight: 5, icon: Box, color: 'text-amber-500', bg: 'bg-amber-500/10', isDefault: false },
  { id: '5', name: 'Fragile Pack', size: 'Custom', weight: 'Any', maxWeight: 3, icon: Package, color: 'text-rose-500', bg: 'bg-rose-500/10', isDefault: false },
];

const packagingRules = [
  { rule: 'Items ≤ 500g', pack: 'Standard Poly Bag', courier: 'Auto' },
  { rule: '500g – 1kg', pack: 'Small Box', courier: 'Auto' },
  { rule: '1kg – 3kg', pack: 'Medium Box', courier: 'Auto' },
  { rule: '3kg – 5kg', pack: 'Large Box', courier: 'Auto' },
  { rule: 'Fragile Tag', pack: 'Fragile Pack', courier: 'Blue Dart' },
];

export default function PackagingPage() {
  const [types, setTypes] = useState<PackageType[]>(initialPackagingTypes);
  const [open, setOpen] = useState(false);
  const [editingType, setEditingType] = useState<PackageType | null>(null);
  const [form, setForm] = useState({ name: '', size: '', weight: '', maxWeight: '', isDefault: false });

  const handleOpenAdd = () => {
    setEditingType(null);
    setForm({ name: '', size: '', weight: '', maxWeight: '', isDefault: false });
    setOpen(true);
  };

  const handleOpenEdit = (t: PackageType) => {
    setEditingType(t);
    setForm({
      name: t.name,
      size: t.size,
      weight: t.weight,
      maxWeight: String(t.maxWeight),
      isDefault: t.isDefault,
    });
    setOpen(true);
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedTypes = [...types];
    
    const newOrUpdated: PackageType = {
      id: editingType ? editingType.id : String(Date.now()),
      name: form.name,
      size: form.size,
      weight: form.weight,
      maxWeight: Number(form.maxWeight) || 0,
      icon: form.name.toLowerCase().includes('bag') ? Package : Box,
      color: form.isDefault ? 'text-[#14b8a6]' : 'text-blue-500',
      bg: form.isDefault ? 'bg-[#14b8a6]/10' : 'bg-blue-500/10',
      isDefault: form.isDefault,
    };

    if (form.isDefault) {
      updatedTypes = updatedTypes.map(t => ({ ...t, isDefault: false }));
    }

    if (editingType) {
      updatedTypes = updatedTypes.map(t => (t.id === editingType.id ? newOrUpdated : t));
    } else {
      updatedTypes.push(newOrUpdated);
    }

    setTypes(updatedTypes);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setTypes(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Shipping"
          titlePart2="Packaging Sizes"
          badgeText="Logistics Command Center"
          subtitle="Define packaging types and auto-assignment rules."
          actions={
            <Button onClick={handleOpenAdd} className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer">
              <Plus className="h-4 w-4" /> Add Package Type
            </Button>
          }
        />

        <AppDrawer
          title={editingType ? 'Edit Package Type' : 'Add Package Type'}
          subtitle={editingType ? 'Modify the selected packaging profile.' : 'Create a new packaging dimension profile.'}
          open={open}
          onClose={setOpen}
          onSubmit={handleAddOrUpdate}
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Package Name *</Label>
              <Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Standard Box" className="h-11 rounded-lg" />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Dimensions (Size) *</Label>
              <Input required value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="e.g. 20×20×15 cm" className="h-11 rounded-lg" />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Max Weight Label *</Label>
              <Input required value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} placeholder="e.g. ≤2 kg" className="h-11 rounded-lg" />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Max Weight (Numeric kg) *</Label>
              <Input type="number" required step="0.1" value={form.maxWeight} onChange={e => setForm({ ...form, maxWeight: e.target.value })} placeholder="e.g. 2" className="h-11 rounded-lg" />
            </div>
            <div className="flex items-center justify-between border-t border-border/30 pt-4">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Default Package</Label>
                <p className="text-xs text-muted-foreground">Make this the default auto-selected packaging</p>
              </div>
              <Switch checked={form.isDefault} onCheckedChange={checked => setForm({ ...form, isDefault: checked })} />
            </div>
          </div>
        </AppDrawer>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {types.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.id} className="border-border/40 bg-card rounded-lg hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-md flex items-center justify-center ${p.bg} ${p.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{p.name}</p>
                        {p.isDefault && (
                          <Badge className="text-[10px] rounded-full px-2 border-transparent bg-[#14b8a6]/10 text-[#14b8a6] mt-0.5">Default</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60" onClick={() => handleOpenEdit(p)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      {!p.isDefault && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-rose-500 hover:bg-rose-500/10" onClick={() => handleDelete(p.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-md p-2.5">
                      <div className="flex items-center gap-1 mb-0.5">
                        <Ruler className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Size</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{p.size}</p>
                    </div>
                    <div className="bg-muted/30 rounded-md p-2.5">
                      <div className="flex items-center gap-1 mb-0.5">
                        <Weight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Wt</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{p.weight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Auto Rules */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Auto-Assignment Rules</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    {['Weight Rule', 'Package Type', 'Preferred Courier'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {packagingRules.map((r, i) => (
                    <tr key={i} className="hover:bg-muted/10">
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{r.rule}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{r.pack}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{r.courier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
