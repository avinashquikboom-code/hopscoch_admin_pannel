'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign, TrendingUp, CheckCircle2, Clock, XCircle, RefreshCcw,
  ArrowUpRight, CreditCard, BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell, Legend,
} from 'recharts';

const stats = [
  { label: 'Total Revenue', value: '₹48.2L', icon: DollarSign, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', change: '+18%' },
  { label: "Today's Revenue", value: '₹1.8L', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', change: '+9%' },
  { label: 'Monthly Revenue', value: '₹12.4L', icon: BarChart2, color: 'text-blue-500', bg: 'bg-blue-500/10', change: '+14%' },
  { label: 'Successful', value: '8,241', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', change: '+12%' },
  { label: 'Pending', value: '142', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', change: '-5%' },
  { label: 'Failed', value: '48', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10', change: '-8%' },
  { label: 'Refunded', value: '67', icon: RefreshCcw, color: 'text-orange-500', bg: 'bg-orange-500/10', change: '+2%' },
  { label: 'Avg Order Value', value: '₹3,842', icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-500/10', change: '+6%' },
];

const revenueData = [
  { day: 'Mon', revenue: 182000 }, { day: 'Tue', revenue: 215000 }, { day: 'Wed', revenue: 194000 },
  { day: 'Thu', revenue: 268000 }, { day: 'Fri', revenue: 312000 }, { day: 'Sat', revenue: 284000 }, { day: 'Sun', revenue: 195000 },
];

const paymentMethodData = [
  { name: 'UPI', value: 42, color: '#14b8a6' },
  { name: 'Cards', value: 28, color: '#06b6d4' },
  { name: 'Net Banking', value: 12, color: '#8b5cf6' },
  { name: 'Wallets', value: 10, color: '#f59e0b' },
  { name: 'COD', value: 8, color: '#f43f5e' },
];

const recentTxn = [
  { id: 'TXN-98821', order: '#ORD-4421', customer: 'Priya Sharma', amount: '₹4,820', method: 'UPI', status: 'Success', date: 'Today' },
  { id: 'TXN-98820', order: '#ORD-4420', customer: 'Aditya Mehta', amount: '₹2,150', method: 'Card', status: 'Success', date: 'Today' },
  { id: 'TXN-98819', order: '#ORD-4419', customer: 'Neha Kapoor', amount: '₹7,640', method: 'Net Banking', status: 'Pending', date: 'Yesterday' },
  { id: 'TXN-98818', order: '#ORD-4418', customer: 'Rohan Gupta', amount: '₹1,290', method: 'COD', status: 'Failed', date: 'Yesterday' },
];

const txnStatusStyle: Record<string, string> = {
  Success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Failed:  'bg-rose-500/10 text-rose-600 dark:text-rose-400',
};

export default function PaymentsDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Payments Dashboard</h1>
            <p className="text-muted-foreground mt-1 font-light">Monitor revenue, transactions, and payment health.</p>
          </div>
          <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10">
            <BarChart2 className="h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* Stats */}
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/40 bg-card rounded-lg">
            <CardHeader><CardTitle className="text-sm font-bold">Weekly Revenue</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: any) => [`₹${(Number(v)/1000).toFixed(1)}k`, 'Revenue']} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#14b8a6" fill="url(#revGrad)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader><CardTitle className="text-sm font-bold">Payment Methods</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={paymentMethodData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {paymentMethodData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-bold">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#14b8a6] hover:text-[#2dd4bf] text-xs font-semibold gap-1">
              View All <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>{['Transaction ID', 'Order', 'Customer', 'Amount', 'Method', 'Status', 'Date'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {recentTxn.map((t) => (
                    <tr key={t.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#14b8a6]">{t.id}</td>
                      <td className="px-4 py-3 text-xs font-semibold">{t.order}</td>
                      <td className="px-4 py-3 text-xs">{t.customer}</td>
                      <td className="px-4 py-3 text-xs font-bold text-foreground">{t.amount}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{t.method}</td>
                      <td className="px-4 py-3"><Badge className={`text-[10px] font-semibold rounded-full px-2.5 border-transparent ${txnStatusStyle[t.status]}`}>{t.status}</Badge></td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{t.date}</td>
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
