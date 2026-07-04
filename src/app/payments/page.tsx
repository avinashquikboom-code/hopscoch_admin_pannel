'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DollarSign, TrendingUp, CheckCircle2, Clock, XCircle, RefreshCcw,
  ArrowUpRight, CreditCard, BarChart2, Search, ArrowUp, ArrowDown, Sparkles,
  Info, Eye, Trash2, Calendar, User, Shield
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialStats = [
  { label: 'Total Revenue', value: '₹48.2L', icon: DollarSign, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', change: '+18%' },
  { label: "Today's Revenue", value: '₹1.8L', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', change: '+9%' },
  { label: 'Successful txns', value: '8,241', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', change: '+12%' },
  { label: 'Average order ticket', value: '₹3,842', icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-500/10', change: '+6%' },
];

const revenueData = [
  { day: 'Mon', revenue: 182000 }, { day: 'Tue', revenue: 215000 }, { day: 'Wed', revenue: 194000 },
  { day: 'Thu', revenue: 268000 }, { day: 'Fri', revenue: 312000 }, { day: 'Sat', revenue: 284000 }, { day: 'Sun', revenue: 195000 },
];

const paymentMethodData = [
  { name: 'UPI', value: 42, color: '#14b8a6' },
  { name: 'Cards', value: 28, color: '#3b82f6' },
  { name: 'Net Banking', value: 12, color: '#8b5cf6' },
  { name: 'Wallets', value: 10, color: '#f59e0b' },
  { name: 'COD', value: 8, color: '#f43f5e' },
];

const initialTransactions = [
  { id: 'TXN-98821', order: 'ORD-4421', customer: 'Priya Sharma', amount: '₹4,820', method: 'UPI', status: 'Success', date: '2026-07-04', gateway: 'Razorpay', email: 'priya@email.com' },
  { id: 'TXN-98820', order: 'ORD-4420', customer: 'Aditya Mehta', amount: '₹2,150', method: 'Card', status: 'Success', date: '2026-07-04', gateway: 'Stripe', email: 'aditya@email.com' },
  { id: 'TXN-98819', order: 'ORD-4419', customer: 'Neha Kapoor', amount: '₹7,640', method: 'Net Banking', status: 'Pending', date: '2026-07-03', gateway: 'Razorpay', email: 'neha@email.com' },
  { id: 'TXN-98818', order: 'ORD-4418', customer: 'Rohan Gupta', amount: '₹1,290', method: 'COD', status: 'Failed', date: '2026-07-03', gateway: 'None', email: 'rohan@email.com' },
];

const txnStatusStyle: Record<string, string> = {
  Success: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5 dark:text-emerald-400 border-emerald-500/20',
  Pending: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/5 dark:text-amber-400 border-amber-500/20',
  Failed:  'bg-rose-500/10 text-rose-500 dark:bg-rose-500/5 dark:text-rose-400 border-rose-500/20',
};

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const gradients = [
    'from-pink-400 to-rose-500 text-white shadow-pink-500/10',
    'from-purple-400 to-indigo-500 text-white shadow-purple-500/10',
    'from-blue-400 to-cyan-500 text-white shadow-blue-500/10',
    'from-emerald-400 to-teal-500 text-white shadow-emerald-500/10',
    'from-amber-400 to-orange-500 text-white shadow-amber-500/10',
  ];
  return gradients[Math.abs(hash) % gradients.length];
};

export default function PaymentsDashboardPage() {
  const [txnList, setTxnList] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Txn for drawer preview
  const [selectedTxn, setSelectedTxn] = useState<typeof initialTransactions[0] | null>(null);

  const filteredTxns = useMemo(() => {
    return txnList.filter(t =>
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.order.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.method.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [txnList, searchQuery]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Payments"
          titlePart2="Dashboard"
          badgeText="Transaction Command Center"
          subtitle="Monitor store sales volume, analyze transaction processing health, and view gateways performance."
        />

        {/* Premium KPI Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialStats.map((s) => {
            const Icon = s.icon;
            const isPos = s.change.startsWith('+');
            return (
              <Card key={s.label} className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-[#14b8a6]/5 to-[#0d9488]/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{s.label}</span>
                    <div className={`p-2 rounded-lg ${s.bg} ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-black text-foreground tracking-tight">{s.value}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className={`h-3 w-3 ${isPos ? 'text-emerald-500' : 'text-rose-500 rotate-180'}`} />
                      <span className={`text-[10px] font-bold ${isPos ? 'text-emerald-500' : 'text-rose-500'}`}>{s.change}</span>
                      <span className="text-[10px] text-muted-foreground font-light ml-1">vs last week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
            <div className="p-6 pb-2">
              <h3 className="font-bold text-sm text-foreground">Weekly Revenue Streams</h3>
            </div>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData} margin={{ left: -5, right: 10, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/20" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground/60" />
                  <YAxis tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground/60" tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: any) => [`₹${(Number(v)/1000).toFixed(1)}k`, 'Revenue']} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.2)', borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#14b8a6" fill="url(#revGrad)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
            <div className="p-6 pb-2">
              <h3 className="font-bold text-sm text-foreground">Payment Methods Breakdown</h3>
            </div>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={paymentMethodData} cx="50%" cy="50%" innerRadius={55} outerRadius={78} paddingAngle={4} dataKey="value">
                    {paymentMethodData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`]} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.2)', borderRadius: 8, fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions Panel */}
        <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-bold text-foreground">Transactions Log Ledger</span>
              <div className="relative max-w-sm flex-1 group">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-11 bg-muted/20 border-border/40 hover:border-border/60 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/20 h-10 rounded-lg transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="border border-border/30 rounded-xl overflow-hidden bg-card/40">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-b border-border/20">
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Transaction ID</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Order Reference</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Customer Name</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Settle Amount</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Payment Method</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Settle Date</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTxns.map((t) => (
                    <TableRow 
                      key={t.id}
                      onClick={() => setSelectedTxn(t)}
                      className="hover:bg-muted/20 border-b border-border/20 transition-colors cursor-pointer group/row"
                    >
                      {/* ID */}
                      <TableCell className="py-4">
                        <span className="font-mono font-bold text-xs bg-muted/60 border border-border/40 text-foreground px-2.5 py-1 rounded-md select-all group-hover/row:border-[#14b8a6]/25 transition-all">
                          {t.id}
                        </span>
                      </TableCell>

                      {/* Order reference */}
                      <TableCell className="py-4">
                        <span className="font-mono font-bold text-xs text-muted-foreground">
                          {t.order}
                        </span>
                      </TableCell>

                      {/* Customer Name */}
                      <TableCell className="py-4 font-semibold text-sm text-foreground">
                        {t.customer}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="py-4 text-sm font-black text-foreground">
                        {t.amount}
                      </TableCell>

                      {/* Method */}
                      <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                        {t.method}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                          <span>{t.date}</span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4 text-center">
                        <Badge className={`text-xs font-semibold rounded-md px-2.5 py-1 border border-transparent select-none ${txnStatusStyle[t.status] || ''}`}>
                          {t.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredTxns.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <Info className="h-8 w-8 text-muted-foreground/60" />
                          <p className="text-sm font-semibold text-muted-foreground">No matching transactions found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick View Details Drawer */}
        <Sheet open={selectedTxn !== null} onOpenChange={(open) => { if (!open) setSelectedTxn(null); }}>
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            {selectedTxn && (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-sm bg-muted/60 border border-border/40 px-3 py-1 rounded-lg select-all">
                        {selectedTxn.id}
                      </span>
                      <Badge className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${txnStatusStyle[selectedTxn.status]}`}>
                        {selectedTxn.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Transaction Receipt</h2>
                    <p className="text-xs text-muted-foreground mt-0.5 font-light">Order reference ID: {selectedTxn.order}</p>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-6 space-y-6 h-full overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-primary" /> Settle Amount
                        </span>
                        <h4 className="text-xl font-black mt-1.5">{selectedTxn.amount}</h4>
                      </CardContent>
                    </Card>

                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <CreditCard className="h-3.5 w-3.5 text-primary" /> Payment Method
                        </span>
                        <h4 className="text-lg font-black text-foreground mt-1.5">{selectedTxn.method}</h4>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Customer Details</h3>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/15 space-y-2.5 text-sm font-semibold">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#14b8a6]" />
                        <span>{selectedTxn.customer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
                        <span>{selectedTxn.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Gateway Auditing</h3>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/15 space-y-2 text-sm font-semibold">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-normal">Payment Gateway</span>
                        <span>{selectedTxn.gateway}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-normal">Security Check</span>
                        <span className="text-emerald-500 flex items-center gap-1">
                          <Shield className="h-3.5 w-3.5" /> SECURE
                        </span>
                      </div>
                    </div>
                  </div>

                </ScrollArea>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}
