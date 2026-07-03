'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

type Period = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

const data: Record<Period, { label: string; revenue: number; orders: number; refunds: number }[]> = {
  Daily:   Array.from({ length: 7 }, (_, i) => ({ label: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], revenue: 120000+i*18000, orders: 42+i*5, refunds: 2+i })),
  Weekly:  Array.from({ length: 4 }, (_, i) => ({ label: `Wk ${i+1}`, revenue: 680000+i*85000, orders: 240+i*28, refunds: 8+i*2 })),
  Monthly: Array.from({ length: 6 }, (_, i) => ({ label: ['Jan','Feb','Mar','Apr','May','Jun'][i], revenue: 840000+i*90000, orders: 980+i*90, refunds: 24+i*4 })),
  Yearly:  Array.from({ length: 3 }, (_, i) => ({ label: `202${2+i}`, revenue: 8400000+i*2100000, orders: 9800+i*2400, refunds: 240+i*80 })),
};

const gatewayPie = [
  { name: 'Razorpay', value: 68, color: '#14b8a6' },
  { name: 'Stripe', value: 19, color: '#06b6d4' },
  { name: 'PayPal', value: 8, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#f59e0b' },
];

const summaryStats: Record<Period, { revenue: string; orders: string; avgOrder: string; refundRate: string }> = {
  Daily:   { revenue: '₹1.82L', orders: '42', avgOrder: '₹4,333', refundRate: '2.1%' },
  Weekly:  { revenue: '₹9.8L', orders: '240', avgOrder: '₹4,083', refundRate: '1.9%' },
  Monthly: { revenue: '₹48.2L', orders: '1,180', avgOrder: '₹4,085', refundRate: '2.0%' },
  Yearly:  { revenue: '₹5.8Cr', orders: '14,200', avgOrder: '₹4,085', refundRate: '1.8%' },
};

export default function PaymentAnalyticsPage() {
  const [period, setPeriod] = useState<Period>('Monthly');
  const currentData = data[period];
  const stats = summaryStats[period];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Payment Analytics</h1>
            <p className="text-muted-foreground mt-1 font-light">Deep-dive into revenue trends and payment patterns.</p>
          </div>
          <div className="flex gap-2 p-1 bg-muted/40 rounded-md">
            {(['Daily', 'Weekly', 'Monthly', 'Yearly'] as Period[]).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${period === p ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Revenue', value: stats.revenue, color: 'text-[#14b8a6]' },
            { label: 'Orders', value: stats.orders, color: 'text-blue-500' },
            { label: 'Avg Order Value', value: stats.avgOrder, color: 'text-violet-500' },
            { label: 'Refund Rate', value: stats.refundRate, color: 'text-amber-500' },
          ].map(s => (
            <Card key={s.label} className="border-border/40 bg-card rounded-lg">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</p>
                <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-semibold">+12%</span>
                  <span className="text-xs text-muted-foreground ml-1">vs prev {period.toLowerCase()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Chart */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader><CardTitle className="text-sm font-bold">Revenue Trend — {period}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="anGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => `₹${(Number(v)/1000).toFixed(1)}k`} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#14b8a6" fill="url(#anGrad)" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders Bar */}
          <Card className="lg:col-span-2 border-border/40 bg-card rounded-lg">
            <CardHeader><CardTitle className="text-sm font-bold">Orders vs Refunds</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="orders" name="Orders" fill="#14b8a6" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="refunds" name="Refunds" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gateway Pie */}
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader><CardTitle className="text-sm font-bold">Gateway Distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={gatewayPie} cx="50%" cy="50%" outerRadius={72} paddingAngle={3} dataKey="value">
                    {gatewayPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
