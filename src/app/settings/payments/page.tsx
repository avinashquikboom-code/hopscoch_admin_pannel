'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPaymentsPage() {
  const [gateways, setGateways] = useState({
    stripe: { enabled: true, publishableKey: 'pk_live_51M3...', secretKey: 'sk_live_51M3...' },
    razorpay: { enabled: false, keyId: '', keySecret: '' },
    cod: { enabled: true, extraFee: 2.0 },
    applePay: { enabled: true, merchantId: 'merchant.com.aura' },
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12 max-w-4xl">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Payment Gateways</h1>
          <p className="text-muted-foreground mt-1 font-light">
            Manage checkout payment processing systems and API credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stripe Card */}
          <Card className="border-border/40 rounded-2xl bg-card">
            <CardHeader className="border-b border-border/30 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  Stripe Checkout
                  <Badge variant={gateways.stripe.enabled ? 'default' : 'outline'} className="rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent px-2.5 py-0.5 ml-2">
                    {gateways.stripe.enabled ? 'Active' : 'Disabled'}
                  </Badge>
                </CardTitle>
              </div>
              <input
                type="checkbox"
                checked={gateways.stripe.enabled}
                onChange={(e) => setGateways({ ...gateways, stripe: { ...gateways.stripe, enabled: e.target.checked } })}
                className="rounded accent-primary h-5.5 w-5.5 cursor-pointer"
              />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stripePub" className="text-xs font-semibold">Publishable Key</Label>
                <Input
                  id="stripePub"
                  value={gateways.stripe.publishableKey}
                  onChange={(e) => setGateways({ ...gateways, stripe: { ...gateways.stripe, publishableKey: e.target.value } })}
                  placeholder="pk_live_..."
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripeSec" className="text-xs font-semibold">Secret Key</Label>
                <Input
                  id="stripeSec"
                  type="password"
                  value={gateways.stripe.secretKey}
                  onChange={(e) => setGateways({ ...gateways, stripe: { ...gateways.stripe, secretKey: e.target.value } })}
                  placeholder="sk_live_..."
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10 font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Apple Pay Card */}
          <Card className="border-border/40 rounded-2xl bg-card">
            <CardHeader className="border-b border-border/30 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  Apple Pay
                  <Badge variant={gateways.applePay.enabled ? 'default' : 'outline'} className="rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent px-2.5 py-0.5 ml-2">
                    {gateways.applePay.enabled ? 'Active' : 'Disabled'}
                  </Badge>
                </CardTitle>
              </div>
              <input
                type="checkbox"
                checked={gateways.applePay.enabled}
                onChange={(e) => setGateways({ ...gateways, applePay: { ...gateways.applePay, enabled: e.target.checked } })}
                className="rounded accent-primary h-5.5 w-5.5 cursor-pointer"
              />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="merchantId" className="text-xs font-semibold">Merchant Identifier</Label>
                <Input
                  id="merchantId"
                  value={gateways.applePay.merchantId}
                  onChange={(e) => setGateways({ ...gateways, applePay: { ...gateways.applePay, merchantId: e.target.value } })}
                  placeholder="merchant.com.yourdomain"
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* COD Card */}
          <Card className="border-border/40 rounded-2xl bg-card">
            <CardHeader className="border-b border-border/30 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  Cash on Delivery (COD)
                  <Badge variant={gateways.cod.enabled ? 'default' : 'outline'} className="rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent px-2.5 py-0.5 ml-2">
                    {gateways.cod.enabled ? 'Active' : 'Disabled'}
                  </Badge>
                </CardTitle>
              </div>
              <input
                type="checkbox"
                checked={gateways.cod.enabled}
                onChange={(e) => setGateways({ ...gateways, cod: { ...gateways.cod, enabled: e.target.checked } })}
                className="rounded accent-primary h-5.5 w-5.5 cursor-pointer"
              />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="codFee" className="text-xs font-semibold">Additional COD Collection Charge ($)</Label>
                <Input
                  id="codFee"
                  type="number"
                  step="0.01"
                  value={gateways.cod.extraFee}
                  onChange={(e) => setGateways({ ...gateways, cod: { ...gateways.cod, extraFee: Number(e.target.value) } })}
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              className="rounded-xl bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10 h-11 px-6 cursor-pointer"
            >
              {isSaved ? 'Credentials Saved' : 'Save Payment Gateways'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
