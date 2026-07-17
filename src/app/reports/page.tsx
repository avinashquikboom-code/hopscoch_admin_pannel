'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCurrency } from '@/context/currency-context';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  Truck,
  AlertTriangle,
  BarChart3,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from 'recharts';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.fciseller.com';
function authHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

const COLORS = ['#14b8a6', '#0d9488', '#2dd4bf', '#6366f1', '#f59e0b', '#f43f5e'];

const fmt = (n: number) => n?.toLocaleString() ?? '0';
const fmtPct = (n: number) => `${(n ?? 0).toFixed(1)}%`;

interface AnalyticsData {
  summary: { totalRevenue: number; totalOrders: number; avgOrderValue: number; conversionRate: number };
  monthlyTrend: { month: string; revenue: number; orders: number; returns: number }[];
  orders: { pending: number; confirmed: number; processing: number; shipped: number; delivered: number; cancelled: number; total: number };
  payments: { paid: number; failed: number; refunded: number; totalRevenue: number };
  returns: { total: number; pending: number; approved: number; rejected: number };
  inventory: { total: number; lowStock: number; outOfStock: number; lowStockProducts: string[] };
  users: { total: number; active: number; new: number; inactive: number };
  products: { total: number; topProducts: { name: string; sales: number }[] };
}

const CustomTooltip = ({ active, payload, label, fmtCurrency: fmt2 }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/40 rounded-xl p-3 shadow-xl text-sm">
        <p className="font-bold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {typeof p.value === 'number' && p.name?.includes('Revenue') ? fmt2(p.value) : fmt(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function MetricCard({ label, value, change, up, colorClass, note }: { label: string; value: string; change?: string; up?: boolean; colorClass?: string; note?: string }) {
  return (
    <div className="p-4 rounded-xl border border-border/30 bg-muted/10">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-black mt-2 ${colorClass ?? 'text-foreground'}`}>{value}</p>
      {(change || note) && (
        <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${up === undefined ? 'text-muted-foreground' : up ? 'text-emerald-500' : 'text-rose-500'}`}>
          {up === true && <ArrowUpRight className="h-3 w-3" />}
          {up === false && <ArrowDownRight className="h-3 w-3" />}
          {change ?? note}
        </p>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-muted/30" />)}
      </div>
      <div className="h-72 rounded-xl bg-muted/20" />
    </div>
  );
}

export default function ReportsPage() {
  const { fmt: fmtCurrency } = useCurrency();
  const [dateRange, setDateRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/analytics/full?date_range=${dateRange}`, { headers: authHeaders() });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to load analytics');
      setData(json.data ?? json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  const d = data;

  const customerPieData = d ? [
    { name: 'Active', value: d.users.active, color: '#14b8a6' },
    { name: 'Inactive', value: d.users.inactive, color: '#0d9488' },
    { name: 'New', value: d.users.new, color: '#2dd4bf' },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Business"
          titlePart2="Analytics"
          badgeText="Reports Command Center"
          subtitle="Track, analyze, and export your store's performance metrics across all channels."
          actions={
            <div className="flex items-center gap-2">
              <select
                className="flex h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#14b8a6]/30 cursor-pointer"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
              <Button onClick={fetchAnalytics} variant="outline" size="sm" className="rounded-lg h-10 px-4 flex items-center gap-2">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg h-10 px-4 flex items-center gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          }
        />

        {error && (
          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: d ? fmtCurrency(d.summary.totalRevenue) : '—', sub: 'Fulfilled orders', trend: true, icon: <DollarSign className="h-5 w-5" />, accent: 'bg-primary/10 text-primary', glow: 'from-[#14b8a6]/5 to-[#0d9488]/5' },
            { label: 'Total Orders', value: d ? fmt(d.summary.totalOrders) : '—', sub: `${d?.orders.pending ?? 0} pending`, trend: true, icon: <ShoppingCart className="h-5 w-5" />, accent: 'bg-blue-500/10 text-blue-500', glow: 'from-blue-500/5 to-indigo-500/5' },
            { label: 'Avg Order Value', value: d ? fmtCurrency(d.summary.avgOrderValue) : '—', sub: 'Per transaction', trend: true, icon: <BarChart3 className="h-5 w-5" />, accent: 'bg-amber-500/10 text-amber-500', glow: 'from-amber-500/5 to-orange-500/5' },
            { label: 'Conversion Rate', value: d ? fmtPct(d.summary.conversionRate) : '—', sub: 'Orders ÷ customers', trend: null, icon: <Percent className="h-5 w-5" />, accent: 'bg-rose-500/10 text-rose-500', glow: 'from-rose-500/5 to-pink-500/5' },
          ].map((kpi) => (
            <Card key={kpi.label} className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${kpi.glow} blur-xl opacity-50 group-hover:scale-150 transition-all`} />
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{kpi.label}</span>
                    <h3 className="text-2xl font-black text-foreground tracking-tight mt-2">{loading ? <span className="animate-pulse text-muted-foreground">...</span> : kpi.value}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 font-light">{kpi.sub}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${kpi.accent}`}>{kpi.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Panel */}
        <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6">
            <Tabs defaultValue="sales">
              <TabsList className="mb-6 bg-muted/40 p-1 border border-border/20 rounded-xl flex overflow-x-auto w-full lg:w-fit justify-start h-auto gap-0.5">
                {[
                  { value: 'sales', color: 'bg-[#14b8a6]', label: 'Sales' },
                  { value: 'customers', color: 'bg-blue-500', label: 'Customers' },
                  { value: 'products', color: 'bg-purple-500', label: 'Products' },
                  { value: 'inventory', color: 'bg-amber-500', label: 'Inventory' },
                  { value: 'orders', color: 'bg-indigo-500', label: 'Orders' },
                  { value: 'payments', color: 'bg-emerald-500', label: 'Payments' },
                  { value: 'returns', color: 'bg-rose-500', label: 'Returns' },
                ].map((t) => (
                  <TabsTrigger key={t.value} value={t.value} className="rounded-lg py-2 px-4 text-xs font-semibold flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${t.color}`} /> {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* SALES */}
              <TabsContent value="sales" className="mt-0 space-y-6">
                {loading ? <LoadingSkeleton /> : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard label="Total Revenue" value={fmtCurrency(d?.summary.totalRevenue ?? 0)} up />
                      <MetricCard label="Total Orders" value={fmt(d?.summary.totalOrders ?? 0)} up />
                      <MetricCard label="Avg Order Value" value={fmtCurrency(d?.summary.avgOrderValue ?? 0)} up />
                      <MetricCard label="Conversion Rate" value={fmtPct(d?.summary.conversionRate ?? 0)} />
                    </div>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                      <h3 className="text-sm font-bold text-foreground mb-4">Revenue & Orders — Last 6 Months</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={d?.monthlyTrend ?? []}>
                          <defs>
                            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip content={<CustomTooltip fmtCurrency={fmtCurrency} />} />
                          <Legend />
                          <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} fill="url(#revGrad)" name="Revenue (₹)" />
                          <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} dot={false} name="Orders" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* CUSTOMERS */}
              <TabsContent value="customers" className="mt-0 space-y-6">
                {loading ? <LoadingSkeleton /> : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard label="Total Customers" value={fmt(d?.users.total ?? 0)} up />
                      <MetricCard label="Active" value={fmt(d?.users.active ?? 0)} colorClass="text-emerald-500" up />
                      <MetricCard label="New (This Period)" value={fmt(d?.users.new ?? 0)} up />
                      <MetricCard label="Inactive" value={fmt(d?.users.inactive ?? 0)} colorClass="text-rose-500" up={false} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                        <h3 className="text-sm font-bold text-foreground mb-4">Customer Segmentation</h3>
                        <ResponsiveContainer width="100%" height={220}>
                          <PieChart>
                            <Pie data={customerPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={4} dataKey="value">
                              {customerPieData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip fmtCurrency={fmtCurrency} />} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-5 mt-2">
                          {customerPieData.map((d) => (
                            <div key={d.name} className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                              <span className="text-xs text-muted-foreground">{d.name} ({d.value})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                        <h3 className="text-sm font-bold text-foreground mb-4">Key Breakdown</h3>
                        <div className="space-y-2.5">
                          {[
                            { label: 'Total Customers', value: fmt(d?.users.total ?? 0), bar: 'bg-[#14b8a6]' },
                            { label: 'Active Customers', value: fmt(d?.users.active ?? 0), bar: 'bg-emerald-500' },
                            { label: 'New This Period', value: fmt(d?.users.new ?? 0), bar: 'bg-blue-500' },
                            { label: 'Inactive Customers', value: fmt(d?.users.inactive ?? 0), bar: 'bg-rose-500' },
                          ].map((m) => (
                            <div key={m.label} className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-muted/10">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-2 h-5 rounded-sm ${m.bar}`} />
                                <span className="text-sm font-medium text-foreground">{m.label}</span>
                              </div>
                              <span className="text-sm font-black text-foreground">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* PRODUCTS */}
              <TabsContent value="products" className="mt-0 space-y-6">
                {loading ? <LoadingSkeleton /> : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <MetricCard label="Total Published" value={fmt(d?.products.total ?? 0)} up />
                      <MetricCard label="Top Seller" value={d?.products.topProducts?.[0]?.name ?? '—'} note={`${d?.products.topProducts?.[0]?.sales ?? 0} units`} />
                      <MetricCard label="Low Stock SKUs" value={fmt(d?.inventory.lowStock ?? 0)} up={false} colorClass="text-amber-500" />
                    </div>
                    {(d?.products.topProducts?.length ?? 0) > 0 && (
                      <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                        <h3 className="text-sm font-bold text-foreground mb-4">Top Selling Products</h3>
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart data={d?.products.topProducts ?? []} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 11 }} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
                            <Tooltip content={<CustomTooltip fmtCurrency={fmtCurrency} />} />
                            <Bar dataKey="sales" fill="#14b8a6" radius={[0, 4, 4, 0]} name="Units Sold" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                    {(d?.products.topProducts?.length ?? 0) === 0 && (
                      <div className="p-8 rounded-xl border border-border/30 bg-muted/5 text-center text-muted-foreground text-sm">No order data yet for this period</div>
                    )}
                  </>
                )}
              </TabsContent>

              {/* INVENTORY */}
              <TabsContent value="inventory" className="mt-0 space-y-6">
                {loading ? <LoadingSkeleton /> : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { label: 'Total SKUs', value: fmt(d?.inventory.total ?? 0), note: 'All inventory items', Icon: Package, cls: 'bg-primary/10 text-primary' },
                        { label: 'Low Stock', value: fmt(d?.inventory.lowStock ?? 0), note: '≤ 5 units remaining', Icon: AlertTriangle, cls: 'bg-amber-500/10 text-amber-500' },
                        { label: 'Out of Stock', value: fmt(d?.inventory.outOfStock ?? 0), note: '0 units — needs restock', Icon: TrendingDown, cls: 'bg-rose-500/10 text-rose-500' },
                      ].map((m) => (
                        <div key={m.label} className="p-5 rounded-xl border border-border/30 bg-muted/10 flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${m.cls}`}><m.Icon className="h-5 w-5" /></div>
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{m.label}</p>
                            <p className="text-2xl font-black text-foreground mt-0.5">{m.value}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 font-medium">{m.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {(d?.inventory.lowStockProducts?.length ?? 0) > 0 && (
                      <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                        <h3 className="text-sm font-bold text-foreground mb-3">⚠ Low Stock Alerts</h3>
                        <div className="space-y-2">
                          {d?.inventory.lowStockProducts.map((product, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                              <span className="text-sm font-medium text-foreground">{product}</span>
                              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs">Low Stock</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              {/* ORDERS */}
              <TabsContent value="orders" className="mt-0 space-y-6">
                {loading ? <LoadingSkeleton /> : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <MetricCard label="Total Orders" value={fmt(d?.orders.total ?? 0)} up />
                      <MetricCard label="Pending" value={fmt(d?.orders.pending ?? 0)} up={false} colorClass="text-amber-500" note="Awaiting action" />
                      <MetricCard label="Confirmed" value={fmt(d?.orders.confirmed ?? 0)} up colorClass="text-blue-500" />
                      <MetricCard label="Processing" value={fmt(d?.orders.processing ?? 0)} up colorClass="text-indigo-500" />
                      <MetricCard label="Delivered" value={fmt(d?.orders.delivered ?? 0)} up colorClass="text-emerald-500" />
                      <MetricCard label="Cancelled" value={fmt(d?.orders.cancelled ?? 0)} up={false} colorClass="text-rose-500" />
                    </div>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                      <h3 className="text-sm font-bold text-foreground mb-4">Monthly Orders Trend</h3>
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={d?.monthlyTrend ?? []}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip content={<CustomTooltip fmtCurrency={fmtCurrency} />} />
                          <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} name="Orders" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* PAYMENTS */}
              <TabsContent value="payments" className="mt-0 space-y-6">
                {loading ? <LoadingSkeleton /> : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard label="Payment Revenue" value={fmtCurrency(d?.payments.totalRevenue ?? 0)} up />
                      <MetricCard label="Successful" value={fmt(d?.payments.paid ?? 0)} up colorClass="text-emerald-500" />
                      <MetricCard label="Failed" value={fmt(d?.payments.failed ?? 0)} up={false} colorClass="text-rose-500" />
                      <MetricCard label="Refunded" value={fmt(d?.payments.refunded ?? 0)} up={false} colorClass="text-amber-500" />
                    </div>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                      <h3 className="text-sm font-bold text-foreground mb-4">Revenue Trend</h3>
                      <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={d?.monthlyTrend ?? []}>
                          <defs>
                            <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip content={<CustomTooltip fmtCurrency={fmtCurrency} />} />
                          <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#payGrad)" name="Revenue (₹)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* RETURNS */}
              <TabsContent value="returns" className="mt-0 space-y-6">
                {loading ? <LoadingSkeleton /> : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <MetricCard label="Total Returns" value={fmt(d?.returns.total ?? 0)} />
                      <MetricCard label="Pending Review" value={fmt(d?.returns.pending ?? 0)} up={false} colorClass="text-amber-500" note="Needs action" />
                      <MetricCard label="Approved" value={fmt(d?.returns.approved ?? 0)} up colorClass="text-emerald-500" />
                      <MetricCard label="Rejected" value={fmt(d?.returns.rejected ?? 0)} up={false} colorClass="text-rose-500" />
                    </div>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/5">
                      <h3 className="text-sm font-bold text-foreground mb-4">Returns vs Orders — Last 6 Months</h3>
                      <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={d?.monthlyTrend ?? []}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip content={<CustomTooltip fmtCurrency={fmtCurrency} />} />
                          <Legend />
                          <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} dot={false} name="Orders" />
                          <Line type="monotone" dataKey="returns" stroke="#f43f5e" strokeWidth={2} dot={false} name="Returns" strokeDasharray="4 2" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
