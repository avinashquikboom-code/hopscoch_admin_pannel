'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/page-header';
import { Banknote, MapPin, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function CODSettingsPage() {
  const [codEnabled, setCodEnabled] = useState(true);
  const [charge, setCharge] = useState('30');
  const [minOrder, setMinOrder] = useState('100');
  const [maxOrder, setMaxOrder] = useState('5000');
  const [blockedPins, setBlockedPins] = useState('800001, 735101, 737101');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Shipping"
          titlePart2="COD Settings"
          badgeText="Logistics Command Center"
          subtitle="Configure Cash on Delivery rules, charges, and restrictions."

        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Toggle */}
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-[#14b8a6]/10 flex items-center justify-center">
                    <Banknote className="h-5 w-5 text-[#14b8a6]" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Cash on Delivery</CardTitle>
                    <p className="text-xs text-muted-foreground font-light mt-0.5">Allow customers to pay on delivery.</p>
                  </div>
                </div>
                <Switch checked={codEnabled} onCheckedChange={setCodEnabled} />
              </div>
            </CardHeader>
            {codEnabled && (
              <>
                <Separator className="border-border/30" />
                <CardContent className="p-5 space-y-5">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold flex items-center gap-1.5">
                      <Banknote className="h-3.5 w-3.5 text-primary" /> COD Charge (₹)
                    </Label>
                    <Input type="number" value={charge} onChange={e => setCharge(e.target.value)} className="h-10 rounded-md" />
                    <p className="text-[11px] text-muted-foreground">This amount is added to the order total for COD orders.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold flex items-center gap-1.5">
                        <ShoppingCart className="h-3.5 w-3.5 text-primary" /> Min Order (₹)
                      </Label>
                      <Input type="number" value={minOrder} onChange={e => setMinOrder(e.target.value)} className="h-10 rounded-md" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Max Order (₹)</Label>
                      <Input type="number" value={maxOrder} onChange={e => setMaxOrder(e.target.value)} className="h-10 rounded-md" />
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>

          {/* Pincode Rules */}
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-rose-500/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold">Blocked Pincodes</CardTitle>
                  <p className="text-xs text-muted-foreground font-light mt-0.5">COD is not available for these pincodes.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={blockedPins}
                onChange={e => setBlockedPins(e.target.value)}
                rows={5}
                placeholder="Enter pincodes separated by commas..."
                className="w-full rounded-md border border-border/60 bg-background px-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none resize-none font-mono"
              />
              <div className="flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-md">
                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-600 dark:text-amber-400">COD will be automatically disabled for these pincodes during checkout.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardContent className="p-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">COD Status:</span>
                <Badge className={`text-[10px] font-bold rounded-full px-2.5 border-transparent ${codEnabled ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                  {codEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              {codEnabled && <>
                <div className="text-xs text-muted-foreground">COD Charge: <span className="font-bold text-foreground">₹{charge}</span></div>
                <div className="text-xs text-muted-foreground">Order Range: <span className="font-bold text-foreground">₹{minOrder} – ₹{maxOrder}</span></div>
              </>}
              <div className="ml-auto">
                <Button onClick={handleSave} className="rounded-md bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10">
                  {saved ? '✓ Saved!' : 'Save Settings'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
