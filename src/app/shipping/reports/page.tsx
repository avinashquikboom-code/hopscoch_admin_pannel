'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart2, Download, FileSpreadsheet, FileText } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, Legend,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', shipped: 1820, delivered: 1690, returned: 78 },
  { month: 'Feb', shipped: 2100, delivered: 1980, returned: 62 },
  { month: 'Mar', shipped: 1950, delivered: 1840, returned: 85 },
  { month: 'Apr', shipped: 2340, delivered: 2200, returned: 91 },
  { month: 'May', shipped: 2780, delivered: 2620, returned: 105 },
  { month: 'Jun', shipped: 3120, delivered: 2950, returned: 118 },
];

const courierPerf = [
  { name: 'Delhivery', delivered: 94, rto: 3.1, avgDays: 2.8 },
  { name: 'Blue Dart', delivered: 97, rto: 1.8, avgDays: 1.9 },
  { name: 'DTDC', delivered: 89, rto: 5.4, avgDays: 3.6 },
  { name: 'XpressBees', delivered: 91, rto: 4.2, avgDays: 2.9 },
  { name: 'Shadowfax', delivered: 88, rto: 6.1, avgDays: 3.1 },
];

export default function ShippingReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Shipping"
          titlePart2="Reports"
          badgeText="Logistics Command Center"
          subtitle="Analyze delivery performance, courier efficiency, and return rates."
          showClock={true}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-md gap-2 text-xs border-border/60 cursor-pointer"><FileText className="h-3.5 w-3.5" /> CSV</Button>
              <Button variant="outline" className="rounded-md gap-2 text-xs border-border/60 cursor-pointer"><FileSpreadsheet className="h-3.5 w-3.5" /> Excel</Button>
              <Button className="rounded-md gap-2 text-xs bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer"><Download className="h-3.5 w-3.5" /> PDF</Button>
            </div>
          }
        />

        {/* Monthly Chart */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader><CardTitle className="text-sm font-bold">Monthly Shipment Overview</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="shipped" name="Shipped" fill="#14b8a6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="delivered" name="Delivered" fill="#2dd4bf" radius={[3, 3, 0, 0]} />
                <Bar dataKey="returned" name="Returned" fill="#f43f5e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Time Line Chart */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader><CardTitle className="text-sm font-bold">Avg Delivery Days — Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData.map((m, i) => ({ ...m, avgDays: [2.9, 2.7, 3.1, 2.8, 2.5, 2.4][i] }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={[2, 4]} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, fontSize: 12 }} />
                <Line type="monotone" dataKey="avgDays" name="Avg Days" stroke="#14b8a6" strokeWidth={2.5} dot={{ fill: '#14b8a6', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Courier Performance Table */}
        <Card className="border-border/40 bg-card rounded-lg">
          <CardHeader><CardTitle className="text-sm font-bold">Courier Performance</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>{['Courier', 'Delivery Rate', 'RTO %', 'Avg Days'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {courierPerf.map((c) => (
                    <tr key={c.name} className="hover:bg-muted/10">
                      <td className="px-4 py-3 font-semibold text-sm">{c.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-muted/60">
                            <div className="h-1.5 rounded-full bg-[#14b8a6]" style={{ width: `${c.delivered}%` }} />
                          </div>
                          <span className="text-xs font-bold text-foreground">{c.delivered}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`text-[10px] font-semibold rounded-full px-2.5 border-transparent ${c.rto < 4 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                          {c.rto}%
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{c.avgDays} days</td>
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
