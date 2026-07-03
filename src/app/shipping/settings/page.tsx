'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, Truck, Clock, Zap } from 'lucide-react';

export default function ShippingSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    defaultCourier: 'Delhivery',
    defaultDays: '3',
    autoAssign: true,
    priorityMode: 'speed',
    cutoffTime: '14:00',
    enableTracking: true,
    smsTracking: true,
    emailTracking: true,
    whatsappTracking: false,
  });

  const update = (key: string, val: string | boolean) => setSettings(s => ({ ...s, [key]: val }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Shipping Settings</h1>
            <p className="text-muted-foreground mt-1 font-light">Configure default courier, tracking, and dispatch preferences.</p>
          </div>
          <Button onClick={handleSave} className="rounded-md bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10">
            {saved ? '✓ Saved!' : 'Save Settings'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Courier Settings */}
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-md bg-[#14b8a6]/10 flex items-center justify-center">
                  <Truck className="h-4.5 w-4.5 text-[#14b8a6]" />
                </div>
                <CardTitle className="text-sm font-bold">Default Courier Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Default Courier</Label>
                <select value={settings.defaultCourier} onChange={e => update('defaultCourier', e.target.value)}
                  className="w-full h-10 rounded-md border border-border/60 bg-background px-3 text-sm focus:border-primary outline-none">
                  {['Delhivery', 'Blue Dart', 'DTDC', 'XpressBees', 'Shadowfax'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Default Delivery Days</Label>
                <Input type="number" value={settings.defaultDays} onChange={e => update('defaultDays', e.target.value)} className="h-10 rounded-md" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Order Cutoff Time</Label>
                <Input type="time" value={settings.cutoffTime} onChange={e => update('cutoffTime', e.target.value)} className="h-10 rounded-md" />
                <p className="text-[11px] text-muted-foreground">Orders before this time are dispatched same day.</p>
              </div>
            </CardContent>
          </Card>

          {/* Priority Mode */}
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-md bg-amber-500/10 flex items-center justify-center">
                  <Zap className="h-4.5 w-4.5 text-amber-500" />
                </div>
                <CardTitle className="text-sm font-bold">Auto-Assign & Priority</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between p-3 rounded-md bg-muted/20">
                <div>
                  <p className="text-sm font-semibold text-foreground">Auto Assign Courier</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Automatically pick the best courier per zone.</p>
                </div>
                <Switch checked={settings.autoAssign} onCheckedChange={v => update('autoAssign', v)} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Shipping Priority Mode</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'speed', label: 'Speed', desc: 'Fastest' },
                    { key: 'cost', label: 'Cost', desc: 'Cheapest' },
                    { key: 'balanced', label: 'Balanced', desc: 'Best Mix' },
                  ].map(m => (
                    <button key={m.key} onClick={() => update('priorityMode', m.key)}
                      className={`p-3 rounded-md border text-center transition-all text-xs ${settings.priorityMode === m.key ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-border/60 text-muted-foreground hover:border-primary/40'}`}>
                      <p className="font-bold">{m.label}</p>
                      <p className="text-[10px] mt-0.5 opacity-70">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Notifications */}
          <Card className="border-border/40 bg-card lg:col-span-2 rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <Clock className="h-4.5 w-4.5 text-blue-500" />
                </div>
                <CardTitle className="text-sm font-bold">Tracking & Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'enableTracking', label: 'Enable Tracking', desc: 'Real-time tracking for all orders' },
                  { key: 'smsTracking', label: 'SMS Notifications', desc: 'Send SMS updates to customers' },
                  { key: 'emailTracking', label: 'Email Notifications', desc: 'Send email delivery updates' },
                  { key: 'whatsappTracking', label: 'WhatsApp Updates', desc: 'Send WhatsApp tracking links' },
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
        </div>
      </div>
    </AdminLayout>
  );
}
