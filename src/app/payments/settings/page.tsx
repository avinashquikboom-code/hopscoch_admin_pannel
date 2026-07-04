'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DollarSign, FileText, RefreshCcw, Clock, SlidersHorizontal, Shield } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

export default function PaymentSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    currency: 'INR',
    autoInvoice: true,
    autoCapture: true,
    retryFailed: true,
    retryCount: '3',
    paymentTimeout: '15',
    orderExpiry: '30',
    partialPayment: false,
    emiEnabled: true,
    saveCard: true,
  });

  const update = (key: string, val: string | boolean) => setSettings(s => ({ ...s, [key]: val }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Global Settings"
          badgeText="Finance Command Center"
          subtitle="Configure global payment preferences for your store."

          actions={
            <Button onClick={handleSave} className="rounded-md bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer">
              {saved ? '✓ Saved!' : 'Save Settings'}
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General */}
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-md bg-[#14b8a6]/10 flex items-center justify-center"><DollarSign className="h-4.5 w-4.5 text-[#14b8a6]" /></div>
                <CardTitle className="text-sm font-bold">General</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Default Currency</Label>
                <select value={settings.currency} onChange={e => update('currency', e.target.value)}
                  className="w-full h-10 rounded-md border border-border/60 bg-background px-3 text-sm focus:border-primary outline-none">
                  {[['INR', '₹ Indian Rupee'], ['USD', '$ US Dollar'], ['EUR', '€ Euro'], ['GBP', '£ British Pound']].map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'autoInvoice', label: 'Auto Generate Invoice', desc: 'Automatically generate invoice after payment success' },
                  { key: 'autoCapture', label: 'Auto Capture Payment', desc: 'Capture authorized payments automatically' },
                  { key: 'partialPayment', label: 'Allow Partial Payment', desc: 'Let customers pay partially for orders' },
                  { key: 'emiEnabled', label: 'EMI Options', desc: 'Enable EMI payment options at checkout' },
                  { key: 'saveCard', label: 'Save Card', desc: 'Allow customers to save cards for future' },
                ].map(t => (
                  <div key={t.key} className="flex items-start justify-between p-3 rounded-md bg-muted/20">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{t.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{t.desc}</p>
                    </div>
                    <Switch checked={settings[t.key as keyof typeof settings] as boolean} onCheckedChange={v => update(t.key, v)} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeouts & Retry */}
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-md bg-amber-500/10 flex items-center justify-center"><Clock className="h-4.5 w-4.5 text-amber-500" /></div>
                <CardTitle className="text-sm font-bold">Timeouts & Retry</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-start justify-between p-3 rounded-md bg-muted/20">
                <div>
                  <p className="text-xs font-semibold text-foreground">Retry Failed Payments</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Automatically retry failed transactions</p>
                </div>
                <Switch checked={settings.retryFailed} onCheckedChange={v => update('retryFailed', v)} />
              </div>
              {settings.retryFailed && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Max Retry Attempts</Label>
                  <Input type="number" value={settings.retryCount} onChange={e => update('retryCount', e.target.value)} className="h-10 rounded-md" min={1} max={5} />
                </div>
              )}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Payment Timeout (minutes)</Label>
                <Input type="number" value={settings.paymentTimeout} onChange={e => update('paymentTimeout', e.target.value)} className="h-10 rounded-md" />
                <p className="text-[11px] text-muted-foreground">Payment page will expire after this duration.</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Order Expiry (minutes)</Label>
                <Input type="number" value={settings.orderExpiry} onChange={e => update('orderExpiry', e.target.value)} className="h-10 rounded-md" />
                <p className="text-[11px] text-muted-foreground">Unpaid orders will be cancelled after this duration.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Badge */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-emerald-500/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">PCI DSS Compliant</p>
                <p className="text-xs text-muted-foreground mt-0.5">All payment data is encrypted and handled through PCI DSS Level 1 certified gateways. No card data is stored on our servers.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
