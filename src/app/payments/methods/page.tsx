'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

const methods = [
  { id: 'upi', name: 'UPI', icon: '🔁', desc: 'PhonePe, Google Pay, Paytm UPI, BHIM', color: 'text-[#14b8a6] bg-[#14b8a6]/10', popular: true, active: true },
  { id: 'card', name: 'Credit / Debit Cards', icon: '💳', desc: 'Visa, Mastercard, RuPay, Amex', color: 'text-blue-500 bg-blue-500/10', popular: true, active: true },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', desc: 'All major Indian banks supported', color: 'text-violet-500 bg-violet-500/10', popular: false, active: true },
  { id: 'wallet', name: 'Wallets', icon: '👛', desc: 'Paytm, Mobikwik, Amazon Pay, Freecharge', color: 'text-amber-500 bg-amber-500/10', popular: false, active: true },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives', color: 'text-emerald-500 bg-emerald-500/10', popular: false, active: true },
  { id: 'razorpay', name: 'Razorpay', icon: '⚡', desc: 'All-in-one payment gateway', color: 'text-blue-600 bg-blue-600/10', popular: false, active: true },
  { id: 'stripe', name: 'Stripe', icon: '🔷', desc: 'Global card payments', color: 'text-indigo-500 bg-indigo-500/10', popular: false, active: false },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'International payments', color: 'text-sky-500 bg-sky-500/10', popular: false, active: false },
  { id: 'phonepe', name: 'PhonePe', icon: '📱', desc: 'PhonePe payment gateway', color: 'text-violet-600 bg-violet-600/10', popular: false, active: true },
  { id: 'gpay', name: 'Google Pay', icon: '🇬', desc: 'Google Pay for Business', color: 'text-rose-500 bg-rose-500/10', popular: false, active: false },
  { id: 'applepay', name: 'Apple Pay', icon: '🍎', desc: 'Apple Pay (iOS & Safari)', color: 'text-foreground bg-muted/40', popular: false, active: false },
];

export default function PaymentMethodsPage() {
  const [items, setItems] = useState(methods);
  const toggle = (id: string) => setItems(ms => ms.map(m => m.id === id ? { ...m, active: !m.active } : m));

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Methods"
          badgeText="Finance Command Center"
          subtitle="Enable or disable payment options for your customers."

        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((m) => (
            <Card key={m.id} className={`border-border/40 bg-card rounded-lg transition-all ${!m.active ? 'opacity-60' : 'hover:border-primary/30'}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-md flex items-center justify-center text-lg ${m.color}`}>
                      {m.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-sm text-foreground">{m.name}</p>
                        {m.popular && <Badge className="text-[9px] rounded-full px-1.5 border-transparent bg-[#14b8a6]/10 text-[#14b8a6] font-bold">Popular</Badge>}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                  <Switch checked={m.active} onCheckedChange={() => toggle(m.id)} />
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={`text-[10px] rounded-full px-2.5 border-transparent font-semibold ${m.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                    {m.active ? 'Enabled' : 'Disabled'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs rounded-md text-muted-foreground hover:text-foreground">
                    <Settings className="h-3 w-3" /> Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
