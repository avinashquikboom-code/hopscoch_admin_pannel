'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Truck, CheckCircle2, Clock, ArrowRight, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

const timelines: Record<string, { status: string; time: string; desc: string; done: boolean }[]> = {
  'SHP-8821': [
    { status: 'Order Placed', time: '02 Jul 2024, 10:30 AM', desc: 'Order confirmed and payment received.', done: true },
    { status: 'Packed', time: '02 Jul 2024, 2:15 PM', desc: 'Order packed and ready for pickup.', done: true },
    { status: 'Picked Up', time: '02 Jul 2024, 6:45 PM', desc: 'Package picked up by Delhivery.', done: true },
    { status: 'In Transit', time: '03 Jul 2024, 8:00 AM', desc: 'Package in transit — Mumbai hub.', done: true },
    { status: 'Out for Delivery', time: '03 Jul 2024, 9:30 AM', desc: 'Out for delivery in Andheri West.', done: true },
    { status: 'Delivered', time: '03 Jul 2024, 12:15 PM', desc: 'Package delivered. Signed by Priya Sharma.', done: true },
  ],
  'SHP-8820': [
    { status: 'Order Placed', time: '02 Jul 2024, 11:00 AM', desc: 'Order confirmed.', done: true },
    { status: 'Packed', time: '02 Jul 2024, 3:00 PM', desc: 'Order packed.', done: true },
    { status: 'Picked Up', time: '03 Jul 2024, 9:00 AM', desc: 'Package picked up by Blue Dart.', done: true },
    { status: 'In Transit', time: '03 Jul 2024, 11:00 AM', desc: 'In transit to Delhi.', done: true },
    { status: 'Out for Delivery', time: '—', desc: 'Pending', done: false },
    { status: 'Delivered', time: '—', desc: 'Pending', done: false },
  ],
};

const shipments = [
  { id: 'SHP-8821', awb: '1234567890', courier: 'Delhivery', order: '#ORD-4421', status: 'Delivered', customer: 'Priya Sharma', city: 'Mumbai' },
  { id: 'SHP-8820', awb: '0987654321', courier: 'Blue Dart', order: '#ORD-4420', status: 'Shipped', customer: 'Aditya Mehta', city: 'Delhi' },
];

const statusStyles: Record<string, string> = {
  Delivered: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Shipped:   'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'In Transit': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
};

export default function TrackingPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>('SHP-8821');

  const timeline = selected ? timelines[selected] ?? [] : [];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Shipping"
          titlePart2="Tracking"
          badgeText="Logistics Command Center"
          subtitle="Track shipments and view live delivery timelines."
          showClock={true}
        />

        {/* Search Bar */}
        <div className="relative max-w-md group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input placeholder="Search tracking number or AWB..." value={search} onChange={e => setSearch(e.target.value)} className="pl-11 h-11 rounded-md border-border/60" />
          <Button className="absolute right-1.5 top-1.5 h-8 px-4 rounded-md text-xs bg-primary text-white hover:bg-primary/95">Track</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipment List */}
          <div className="space-y-3">
            {shipments.map((s) => (
              <Card key={s.id}
                onClick={() => setSelected(s.id)}
                className={`border-border/40 bg-card rounded-lg cursor-pointer transition-all hover:border-primary/40 ${selected === s.id ? 'border-primary/60 shadow-sm shadow-primary/10' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-mono font-bold text-sm text-[#14b8a6]">{s.id}</p>
                    <Badge className={`text-[10px] rounded-full px-2.5 border-transparent font-semibold ${statusStyles[s.status] ?? 'bg-muted text-muted-foreground'}`}>{s.status}</Badge>
                  </div>
                  <p className="text-xs text-foreground font-semibold">{s.customer}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" />{s.city}</p>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
                    <Truck className="h-3 w-3" />{s.courier}
                    <span className="ml-auto font-mono">{s.awb}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline */}
          <Card className="lg:col-span-2 border-border/40 bg-card rounded-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                {selected ? `Tracking Timeline — ${selected}` : 'Select a shipment'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              {timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-10">No tracking data available.</p>
              ) : (
                <ol className="relative border-l border-border/40 space-y-6 ml-3">
                  {timeline.map((t, i) => (
                    <li key={i} className="ml-5">
                      <span className={`absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 ${t.done ? 'bg-[#14b8a6] border-[#14b8a6]' : 'bg-background border-border/50'}`}>
                        {t.done && <CheckCircle2 className="h-2.5 w-2.5 text-black" />}
                      </span>
                      <div>
                        <p className={`text-sm font-bold ${t.done ? 'text-foreground' : 'text-muted-foreground/50'}`}>{t.status}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{t.time}</p>
                        <p className={`text-xs mt-1 ${t.done ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>{t.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
