'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Truck, Zap, Clock, Sun, Store, Edit } from 'lucide-react';

const methods = [
  {
    id: '1', name: 'Standard Delivery', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10',
    desc: 'Regular delivery within 3–5 business days.', price: '₹49', eta: '3–5 days',
    tag: 'Most Popular', tagColor: 'bg-[#14b8a6]/10 text-[#14b8a6]', active: true,
  },
  {
    id: '2', name: 'Express Delivery', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10',
    desc: 'Priority processing and fast dispatch within 1–2 days.', price: '₹149', eta: '1–2 days',
    tag: 'Fast', tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', active: true,
  },
  {
    id: '3', name: 'Same Day Delivery', icon: Clock, color: 'text-rose-500', bg: 'bg-rose-500/10',
    desc: 'Order before 11 AM for same day delivery in metro cities.', price: '₹199', eta: 'Same day',
    tag: 'Metro Only', tagColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400', active: true,
  },
  {
    id: '4', name: 'Next Day Delivery', icon: Sun, color: 'text-violet-500', bg: 'bg-violet-500/10',
    desc: 'Guaranteed delivery by next business day.', price: '₹99', eta: 'Next day',
    tag: 'Guaranteed', tagColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', active: false,
  },
  {
    id: '5', name: 'Store Pickup', icon: Store, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10',
    desc: 'Pick up from nearest store. Free of charge. (Future Ready)', price: 'FREE', eta: 'Your choice',
    tag: 'Coming Soon', tagColor: 'bg-muted text-muted-foreground', active: false,
  },
];

export default function DeliveryMethodsPage() {
  const [items, setItems] = useState(methods);

  const toggle = (id: string) => setItems(ms => ms.map(m => m.id === id ? { ...m, active: !m.active } : m));

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Delivery Methods</h1>
          <p className="text-muted-foreground mt-1 font-light">Enable or disable delivery options for your store.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.id} className={`border-border/40 bg-card rounded-lg transition-all ${!m.active ? 'opacity-60' : 'hover:border-primary/30'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-md flex items-center justify-center ${m.bg} ${m.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold">{m.name}</CardTitle>
                        <Badge className={`text-[10px] rounded-full px-2 border-transparent mt-0.5 ${m.tagColor}`}>{m.tag}</Badge>
                      </div>
                    </div>
                    <Switch checked={m.active} onCheckedChange={() => toggle(m.id)} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <p className="text-xs text-muted-foreground font-light">{m.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 rounded-md p-2.5 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Charge</p>
                      <p className={`text-sm font-bold mt-0.5 ${m.color}`}>{m.price}</p>
                    </div>
                    <div className="bg-muted/30 rounded-md p-2.5 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ETA</p>
                      <p className="text-sm font-bold mt-0.5 text-foreground">{m.eta}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full rounded-md text-xs gap-1.5 border-border/60">
                    <Edit className="h-3.5 w-3.5" /> Configure
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
