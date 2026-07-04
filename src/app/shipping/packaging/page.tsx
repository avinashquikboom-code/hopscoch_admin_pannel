'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Box, Package, Weight, Ruler, Edit } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

const packagingTypes = [
  { id: '1', name: 'Standard Poly Bag', size: '30×40 cm', weight: '≤0.5 kg', maxWeight: 1, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', isDefault: true },
  { id: '2', name: 'Small Box', size: '15×15×10 cm', weight: '≤1 kg', maxWeight: 2, icon: Box, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', isDefault: false },
  { id: '3', name: 'Medium Box', size: '25×25×20 cm', weight: '≤3 kg', maxWeight: 5, icon: Box, color: 'text-violet-500', bg: 'bg-violet-500/10', isDefault: false },
  { id: '4', name: 'Large Box', size: '40×40×30 cm', weight: '≤5 kg', maxWeight: 10, icon: Box, color: 'text-amber-500', bg: 'bg-amber-500/10', isDefault: false },
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
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Shipping"
          titlePart2="Packaging Sizes"
          badgeText="Logistics Command Center"
          subtitle="Define packaging types and auto-assignment rules."

          actions={
            <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer">
              <Box className="h-4 w-4" /> Add Package Type
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {packagingTypes.map((p) => {
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
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
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
