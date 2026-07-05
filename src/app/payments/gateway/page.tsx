'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff, Plus, Settings, CheckCircle2 } from 'lucide-react';
import { AppDrawer } from '@/components/ui/app-drawer';
import { PageHeader } from '@/components/layout/page-header';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
function authHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export default function PaymentGatewayPage() {
  const [gatewaysList, setGatewaysList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [sheetOpen, setSheetOpen] = useState(false);
  const [form, setForm] = useState({ name: '', apiKey: '', secret: '', webhook: '' });

  const fetchGateways = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/settings/payments/gateways`, { headers: authHeaders() });
      const json = await res.json();
      if (res.ok && json.data) {
        setGatewaysList(json.data);
        const activeMap: Record<string, boolean> = {};
        json.data.forEach((g: any) => {
          activeMap[g.id] = g.active;
        });
        setActive(activeMap);
      } else {
        setGatewaysList([
          { id: 'razorpay', name: 'Razorpay', icon: '⚡', color: 'text-blue-500 bg-blue-500/10', apiKey: 'rzp_live_xxxxxxxxxx', secret: '••••••••••••••••', webhook: 'https://yourdomain.com/api/razorpay', sandbox: false, active: true, features: ['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI'] },
          { id: 'stripe', name: 'Stripe', icon: '🔷', color: 'text-indigo-500 bg-indigo-500/10', apiKey: 'pk_live_xxxxxxxxxx', secret: '••••••••••••••••', webhook: 'https://yourdomain.com/api/stripe', sandbox: true, active: false, features: ['Cards', 'Apple Pay', 'Google Pay', 'SEPA'] },
        ]);
        setActive({ razorpay: true, stripe: false });
      }
    } catch {
      setGatewaysList([
        { id: 'razorpay', name: 'Razorpay', icon: '⚡', color: 'text-blue-500 bg-blue-500/10', apiKey: 'rzp_live_xxxxxxxxxx', secret: '••••••••••••••••', webhook: 'https://yourdomain.com/api/razorpay', sandbox: false, active: true, features: ['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI'] },
        { id: 'stripe', name: 'Stripe', icon: '🔷', color: 'text-indigo-500 bg-indigo-500/10', apiKey: 'pk_live_xxxxxxxxxx', secret: '••••••••••••••••', webhook: 'https://yourdomain.com/api/stripe', sandbox: true, active: false, features: ['Cards', 'Apple Pay', 'Google Pay', 'SEPA'] },
      ]);
      setActive({ razorpay: true, stripe: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGateways(); }, [fetchGateways]);

  const toggle = async (id: string) => {
    const nextVal = !active[id];
    setActive(a => ({ ...a, [id]: nextVal }));
    try {
      await fetch(`${API_BASE}/api/settings/payments/gateways/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ active: nextVal }),
      });
    } catch {}
  };

  const toggleSecret = (id: string) => setShowSecrets(s => ({ ...s, [id]: !s[id] }));

  const handleAddGateway = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      id: form.name.toLowerCase().replace(/\s+/g, '-'),
      name: form.name,
      apiKey: form.apiKey,
      secret: form.secret,
      webhook: form.webhook,
      active: true,
      icon: '⚡',
      color: 'text-blue-500 bg-blue-500/10',
      features: ['UPI', 'Cards'],
    };
    try {
      await fetch(`${API_BASE}/api/settings/payments/gateways`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      await fetchGateways();
    } catch {
      setGatewaysList(prev => [...prev, body]);
      setActive(a => ({ ...a, [body.id]: true }));
    }
    setSheetOpen(false);
    setForm({ name: '', apiKey: '', secret: '', webhook: '' });
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Gateway"
          badgeText="Finance Command Center"
          subtitle="Configure and manage payment gateway integrations."

          actions={
            <Button onClick={() => setSheetOpen(true)} className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer">
              <Plus className="h-4 w-4" /> Add Gateway
            </Button>
          }
        />

        <AppDrawer
          title="Add Payment Gateway"
          subtitle="Configure a new payment gateway integration."
          open={sheetOpen}
          onClose={setSheetOpen}
          onSubmit={handleAddGateway}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold">Gateway Name</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Razorpay" className="rounded-md border-border/60 h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-xs font-semibold">API Key</Label>
              <Input id="apiKey" required value={form.apiKey} onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                placeholder="e.g. rzp_live_xxxxxxxxxx" className="rounded-md border-border/60 h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret" className="text-xs font-semibold">Secret Key</Label>
              <Input id="secret" required type="password" value={form.secret} onChange={(e) => setForm({ ...form, secret: e.target.value })}
                placeholder="e.g. sk_live_xxxxxxxxxx" className="rounded-md border-border/60 h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook" className="text-xs font-semibold">Webhook URL</Label>
              <Input id="webhook" value={form.webhook} onChange={(e) => setForm({ ...form, webhook: e.target.value })}
                placeholder="https://yourdomain.com/api/webhook" className="rounded-md border-border/60 h-11" />
            </div>
          </div>
        </AppDrawer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {gatewaysList.map((g) => (
            <Card key={g.id} className={`border-border/40 bg-card rounded-lg ${!active[g.id] ? 'opacity-70' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-md flex items-center justify-center text-lg ${g.color}`}>{g.icon}</div>
                    <div>
                      <CardTitle className="text-sm font-bold">{g.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-[10px] rounded-full px-2 border-transparent font-semibold ${active[g.id] ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                          {active[g.id] ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge className={`text-[10px] rounded-full px-2 border-transparent font-semibold ${g.sandbox ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-[#14b8a6]/10 text-[#14b8a6]'}`}>
                          {g.sandbox ? 'Sandbox' : 'Production'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Switch checked={active[g.id]} onCheckedChange={() => toggle(g.id)} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">API Key</Label>
                  <Input value={g.apiKey} readOnly className="h-9 rounded-md font-mono text-xs bg-muted/20" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Secret Key</Label>
                  <div className="relative">
                    <Input value={showSecrets[g.id] ? 'sk_live_••••real_secret••••' : g.secret} readOnly className="h-9 rounded-md font-mono text-xs bg-muted/20 pr-10" />
                    <button onClick={() => toggleSecret(g.id)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showSecrets[g.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Webhook URL</Label>
                  <Input value={g.webhook} readOnly className="h-9 rounded-md font-mono text-xs bg-muted/20" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Supported Methods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.features.map((f: any) => (
                      <Badge key={f} className="text-[10px] rounded-full px-2.5 border-transparent bg-muted text-muted-foreground flex items-center gap-1">
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" /> {f}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-md border-border/60 text-xs gap-1.5">
                  <Settings className="h-3.5 w-3.5" /> Configure
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
