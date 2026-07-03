'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Truck, Package, CheckCircle2, XCircle, RefreshCcw,
  Clock, TrendingUp, ArrowUpRight, DollarSign, Calendar,
  MapPin, BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar, Legend
} from 'recharts';

const stats = [
  { label: 'Total Shipments', value: '4,821', icon: Truck, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', change: '+12%' },
  { label: 'Pending', value: '142', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', change: '-3%' },
  { label: 'Packed', value: '89', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', change: '+5%' },
  { label: 'Shipped', value: '1,203', icon: Truck, color: 'text-violet-500', bg: 'bg-violet-500/10', change: '+8%' },
  { label: 'Delivered', value: '3,241', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', change: '+15%' },
  { label: 'Returned', value: '98', icon: RefreshCcw, color: 'text-orange-500', bg: 'bg-orange-500/10', change: '+2%' },
  { label: 'Cancelled', value: '48', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10', change: '-1%' },
  { label: "Today's Shipments", value: '67', icon: Calendar, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', change: '+7%' },
];

const areaData = [
  { day: 'Mon', shipped: 82, delivered: 65 },
  { day: 'Tue', shipped: 91, delivered: 78 },
  { day: 'Wed', shipped: 74, delivered: 69 },
  { day: 'Thu', shipped: 103, delivered: 88 },
  { day: 'Fri', shipped: 118, delivered: 95 },
  { day: 'Sat', shipped: 96, delivered: 84 },
  { day: 'Sun', shipped: 67, delivered: 55 },
];

const courierData = [
  { name: 'Delhivery', shipments: 1820, delivered: 1680 },
  { name: 'Blue Dart', shipments: 980, delivered: 920 },
  { name: 'DTDC', shipments: 640, delivered: 590 },
  { name: 'XpressBees', shipments: 540, delivered: 510 },
  { name: 'Shadowfax', shipments: 420, delivered: 380 },
];

const recentShipments = [
  { id: 'SHP-8821', order: '#ORD-4421', customer: 'Priya Sharma', courier: 'Delhivery', status: 'Delivered', date: 'Today', city: 'Mumbai' },
  { id: 'SHP-8820', order: '#ORD-4420', customer: 'Aditya Mehta', courier: 'Blue Dart', status: 'Shipped', date: 'Today', city: 'Delhi' },
  { id: 'SHP-8819', order: '#ORD-4419', customer: 'Neha Kapoor', courier: 'XpressBees', status: 'Packed', date: 'Yesterday', city: 'Bangalore' },
  { id: 'SHP-8818', order: '#ORD-4418', customer: 'Rohan Gupta', courier: 'DTDC', status: 'Pending', date: 'Yesterday', city: 'Chennai' },
  { id: 'SHP-8817', order: '#ORD-4417', customer: 'Anjali Singh', courier: 'Shadowfax', status: 'Returned', date: '2 days ago', city: 'Hyderabad' },
];

const statusStyles: Record<string, string> = {
  Delivered: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Shipped: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Packed: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Returned: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  Cancelled: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
};

export default function ShippingDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Shipping Dashboard</h1>
            <p className="text-muted-foreground mt-1 font-light">Monitor all shipments, couriers, and delivery performance.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-md gap-2 text-sm">
              <BarChart2 className="h-4 w-4" /> Export Report
            </Button>
            <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10">
              <Truck className="h-4 w-4" /> New Shipment
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            const isPos = s.change.startsWith('+');
            return (
              <Card key={s.label} className="border-border/40 bg-card rounded-lg">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</p>
                      <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-md ${s.bg} flex items-center justify-center ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <ArrowUpRight className={`h-3.5 w-3.5 ${isPos ? 'text-emerald-500' : 'text-rose-500 rotate-180'}`} />
                    <span className={`text-xs font-semibold ${isPos ? 'text-emerald-500' : 'text-rose-500'}`}>{s.change}</span>
                    <span className="text-xs text-muted-foreground ml-1">vs last week</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/40 bg-card rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-foreground">Weekly Shipments vs Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="cShip" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cDel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="shipped" name="Shipped" stroke="#14b8a6" fill="url(#cShip)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="delivered" name="Delivered" stroke="#06b6d4" fill="url(#cDel)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-foreground">Courier Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={courierData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={65} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 11 }} />
                  <Bar dataKey="shipments" name="Shipments" fill="#14b8a6" radius={[0, 3, 3, 0]} />
                  <Bar dataKey="delivered" name="Delivered" fill="#2dd4bf" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Shipments */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold text-foreground">Recent Shipments</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#14b8a6] hover:text-[#2dd4bf] text-xs font-semibold gap-1">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    {['Shipment ID', 'Order', 'Customer', 'City', 'Courier', 'Status', 'Date'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentShipments.map((s) => (
                    <tr key={s.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#14b8a6]">{s.id}</td>
                      <td className="px-4 py-3 text-xs font-semibold">{s.order}</td>
                      <td className="px-4 py-3 text-xs text-foreground">{s.customer}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{s.city}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{s.courier}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[10px] font-semibold rounded-full px-2.5 border-transparent ${statusStyles[s.status]}`}>{s.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{s.date}</td>
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
