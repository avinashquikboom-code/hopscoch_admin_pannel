'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FileSpreadsheet, Download } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, AreaChart, Area,
} from 'recharts';

const monthlyRevenue = [
  { month: 'Jan', revenue: 840000, refunds: 24000, failed: 12000 },
  { month: 'Feb', revenue: 920000, refunds: 18000, failed: 8000 },
  { month: 'Mar', revenue: 1100000, refunds: 32000, failed: 15000 },
  { month: 'Apr', revenue: 980000, refunds: 22000, failed: 11000 },
  { month: 'May', revenue: 1240000, refunds: 28000, failed: 9000 },
  { month: 'Jun', revenue: 1380000, refunds: 35000, failed: 14000 },
];

const gatewayData = [
  { name: 'Razorpay', success: 5420, failed: 38, refunded: 42 },
  { name: 'Stripe', success: 1840, failed: 12, refunded: 18 },
  { name: 'PayPal', success: 620, failed: 8, refunded: 7 },
];

const methodTrend = [
  { month: 'Jan', upi: 42, card: 30, nb: 14, wallet: 8, cod: 6 },
  { month: 'Feb', upi: 44, card: 28, nb: 13, wallet: 9, cod: 6 },
  { month: 'Mar', upi: 48, card: 26, nb: 12, wallet: 8, cod: 6 },
  { month: 'Apr', upi: 46, card: 27, nb: 13, wallet: 9, cod: 5 },
  { month: 'May', upi: 50, card: 25, nb: 11, wallet: 9, cod: 5 },
  { month: 'Jun', upi: 52, card: 24, nb: 12, wallet: 7, cod: 5 },
];

export default function PaymentReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Reports"
          badgeText="Finance Command Center"
          subtitle="Revenue, refunds, failed payments, and gateway performance."

          actions={
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-md gap-2 text-xs border-border/60 cursor-pointer"><FileText className="h-3.5 w-3.5" /> CSV</Button>
              <Button variant="outline" className="rounded-md gap-2 text-xs border-border/60 cursor-pointer"><FileSpreadsheet className="h-3.5 w-3.5" /> Excel</Button>
              <Button className="rounded-md gap-2 text-xs bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer"><Download className="h-3.5 w-3.5" /> PDF</Button>
            </div>
          }
        />

        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader><CardTitle className="text-sm font-bold">Monthly Revenue vs Refunds vs Failed</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => `₹${(Number(v)/1000).toFixed(1)}k`} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="revenue" name="Revenue" fill="#14b8a6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="refunds" name="Refunds" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="failed" name="Failed" fill="#f43f5e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader><CardTitle className="text-sm font-bold">Payment Method Trend (%)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={methodTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="upi" name="UPI" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="card" name="Cards" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="nb" name="Net Banking" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card rounded-lg">
            <CardHeader><CardTitle className="text-sm font-bold">Gateway Performance</CardTitle></CardHeader>
            <CardContent className="p-0 pt-2">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr>{['Gateway', 'Success', 'Failed', 'Refunds', 'Rate'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {gatewayData.map(g => {
                      const total = g.success + g.failed + g.refunded;
                      const rate = ((g.success / total) * 100).toFixed(1);
                      return (
                        <tr key={g.name} className="hover:bg-muted/10">
                          <td className="px-4 py-3 font-semibold text-sm">{g.name}</td>
                          <td className="px-4 py-3 text-xs text-emerald-500 font-bold">{g.success.toLocaleString()}</td>
                          <td className="px-4 py-3 text-xs text-rose-500 font-bold">{g.failed}</td>
                          <td className="px-4 py-3 text-xs text-amber-500 font-bold">{g.refunded}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 rounded-full bg-muted/60">
                                <div className="h-1.5 rounded-full bg-[#14b8a6]" style={{ width: `${rate}%` }} />
                              </div>
                              <span className="text-xs font-bold">{rate}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
