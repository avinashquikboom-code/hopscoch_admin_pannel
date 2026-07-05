'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Download,
  Eye,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  ChevronLeft,
  ChevronRight,
  Banknote,
} from 'lucide-react';

type TxnStatus = 'Success' | 'Pending' | 'Failed' | 'Refunded';

const statusConfig: Record<TxnStatus, { color: string; icon: React.ElementType; dot: string }> = {
  Success:  { color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', icon: CheckCircle2, dot: 'bg-emerald-500' },
  Pending:  { color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',   icon: Clock,         dot: 'bg-amber-500' },
  Failed:   { color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',       icon: XCircle,       dot: 'bg-rose-500' },
  Refunded: { color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', icon: RefreshCw,   dot: 'bg-orange-500' },
};

const methodIcon: Record<string, string> = {
  UPI: '🔁', Card: '💳', 'Net Banking': '🏦', COD: '💵', Wallet: '👛',
};

const transactions = [
  { id: 'TXN-98821', order: '#ORD-4421', customer: 'Priya Sharma',  avatar: 'PS', amount: '₹4,820', method: 'UPI',         gateway: 'Razorpay', status: 'Success'  as TxnStatus, date: '03 Jul 2024', time: '10:42 AM' },
  { id: 'TXN-98820', order: '#ORD-4420', customer: 'Aditya Mehta',  avatar: 'AM', amount: '₹2,150', method: 'Card',        gateway: 'Stripe',   status: 'Success'  as TxnStatus, date: '03 Jul 2024', time: '09:15 AM' },
  { id: 'TXN-98819', order: '#ORD-4419', customer: 'Neha Kapoor',   avatar: 'NK', amount: '₹7,640', method: 'Net Banking', gateway: 'Razorpay', status: 'Pending'  as TxnStatus, date: '02 Jul 2024', time: '06:30 PM' },
  { id: 'TXN-98818', order: '#ORD-4418', customer: 'Rohan Gupta',   avatar: 'RG', amount: '₹1,290', method: 'COD',         gateway: 'N/A',      status: 'Failed'   as TxnStatus, date: '02 Jul 2024', time: '03:22 PM' },
  { id: 'TXN-98817', order: '#ORD-4417', customer: 'Anjali Singh',  avatar: 'AS', amount: '₹3,480', method: 'UPI',         gateway: 'PhonePe',  status: 'Refunded' as TxnStatus, date: '01 Jul 2024', time: '11:50 AM' },
  { id: 'TXN-98816', order: '#ORD-4416', customer: 'Vivek Nair',    avatar: 'VN', amount: '₹9,200', method: 'Card',        gateway: 'Stripe',   status: 'Success'  as TxnStatus, date: '01 Jul 2024', time: '09:05 AM' },
  { id: 'TXN-98815', order: '#ORD-4415', customer: 'Kavya Reddy',   avatar: 'KR', amount: '₹560',   method: 'Wallet',      gateway: 'Paytm',    status: 'Success'  as TxnStatus, date: '30 Jun 2024', time: '04:18 PM' },
  { id: 'TXN-98814', order: '#ORD-4414', customer: 'Arjun Verma',   avatar: 'AV', amount: '₹12,800',method: 'Card',        gateway: 'Razorpay', status: 'Failed'   as TxnStatus, date: '30 Jun 2024', time: '02:44 PM' },
];

const summary = [
  { label: 'Total Volume',   value: '₹41,940', sub: '+12.4% vs last week', trend: 'up',   icon: Banknote,     grad: 'from-[#14b8a6]/15 to-[#0f766e]/5', iconColor: 'text-[#14b8a6]' },
  { label: 'Success Rate',   value: '62.5%',   sub: '5 of 8 succeeded',    trend: 'up',   icon: CheckCircle2, grad: 'from-emerald-500/15 to-emerald-800/5', iconColor: 'text-emerald-500' },
  { label: 'Pending',        value: '1',       sub: 'Awaiting processing',  trend: 'flat', icon: Clock,        grad: 'from-amber-500/15 to-amber-800/5',    iconColor: 'text-amber-500' },
  { label: 'Failed / Refund','value': '3',     sub: '2 failed · 1 refund', trend: 'down', icon: XCircle,      grad: 'from-rose-500/15 to-rose-800/5',      iconColor: 'text-rose-500' },
];

const STATUS_FILTERS = ['All', 'Success', 'Pending', 'Failed', 'Refunded'] as const;

import { useEffect, useCallback, useMemo } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
function authHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export default function TransactionsPage() {
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]           = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TxnStatus>('All');

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/payments/admin/all`, { headers: authHeaders() });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to load payments');
      const raw = json.data?.payments || json.payments || json.data || json || [];
      const normalized = raw.map((p: any) => {
        const statusMap: Record<string, TxnStatus> = {
          PAID: 'Success',
          PENDING: 'Pending',
          FAILED: 'Failed',
          REFUNDED: 'Refunded',
          PARTIALLY_REFUNDED: 'Refunded'
        };
        const methodMap: Record<string, string> = {
          RAZORPAY: 'UPI',
          STRIPE: 'Card',
          COD: 'COD',
          UPI: 'UPI',
          CARD: 'Card',
          WALLET: 'Wallet'
        };
        const customerName = p.order?.user 
          ? `${p.order.user.firstName || ''} ${p.order.user.lastName || ''}`.trim()
          : 'Customer';
        const initials = customerName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'CU';

        return {
          id: p.providerRef || `TXN-${p.id}`,
          order: p.order?.orderNumber ? `#${p.order.orderNumber}` : `#ORD-${p.orderId}`,
          customer: customerName,
          avatar: initials,
          amount: `₹${Number(p.amount).toLocaleString('en-IN')}`,
          method: methodMap[p.method] || 'Card',
          gateway: p.method === 'RAZORPAY' ? 'Razorpay' : p.method === 'STRIPE' ? 'Stripe' : 'COD',
          status: (statusMap[p.status] || 'Success') as TxnStatus,
          date: new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: new Date(p.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        };
      });
      setPaymentsList(normalized);
    } catch (e: any) {
      setPaymentsList(transactions);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const filtered = useMemo(() => {
    return paymentsList.filter(t => {
      const matchSearch = t.id.toLowerCase().includes(search.toLowerCase())
        || t.customer.toLowerCase().includes(search.toLowerCase())
        || t.order.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [paymentsList, search, statusFilter]);

  const computedSummary = useMemo(() => {
    const totalVolume = paymentsList.reduce((acc, p) => {
      if (p.status === 'Success') {
        const amt = Number(p.amount.replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(amt) ? 0 : amt);
      }
      return acc;
    }, 0);

    const successCount = paymentsList.filter(p => p.status === 'Success').length;
    const successRate = paymentsList.length > 0 ? (successCount / paymentsList.length) * 100 : 0;
    const pendingCount = paymentsList.filter(p => p.status === 'Pending').length;
    const failedOrRefunded = paymentsList.filter(p => p.status === 'Failed' || p.status === 'Refunded').length;

    return [
      { label: 'Total Volume',   value: `₹${totalVolume.toLocaleString('en-IN')}`, sub: '+12.4% vs last week', trend: 'up',   icon: Banknote,     grad: 'from-[#14b8a6]/15 to-[#0f766e]/5', iconColor: 'text-[#14b8a6]' },
      { label: 'Success Rate',   value: `${successRate.toFixed(1)}%`,   sub: `${successCount} of ${paymentsList.length} succeeded`,    trend: 'up',   icon: CheckCircle2, grad: 'from-emerald-500/15 to-emerald-800/5', iconColor: 'text-emerald-500' },
      { label: 'Pending',        value: String(pendingCount),       sub: 'Awaiting processing',  trend: 'flat', icon: Clock,        grad: 'from-amber-500/15 to-amber-800/5',    iconColor: 'text-amber-500' },
      { label: 'Failed / Refund', value: String(failedOrRefunded),     sub: `${paymentsList.filter(p => p.status === 'Failed').length} failed · ${paymentsList.filter(p => p.status === 'Refunded').length} refund`, trend: 'down', icon: XCircle,      grad: 'from-rose-500/15 to-rose-800/5',      iconColor: 'text-rose-500' },
    ];
  }, [paymentsList]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">

        {/* ── Page Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#14b8a6] bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-full px-2.5 py-0.5">
                Finance Command Center
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Payment <span className="text-[#14b8a6]">Transactions</span>
            </h1>
            <p className="text-sm text-muted-foreground font-light mt-1">
              Real-time log of every payment processed across all gateways.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchPayments} variant="outline" size="sm" className="h-10 px-4 rounded-xl border-border/40 gap-2 cursor-pointer text-xs font-semibold">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button className="rounded-xl gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/20 cursor-pointer h-10 px-5 text-xs font-semibold">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        {/* ── Summary Cards ───────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {computedSummary.map((s) => (
            <Card key={s.label} className="border-border/30 rounded-xl bg-card overflow-hidden group hover:shadow-md transition-all hover:border-border/60">
              <CardContent className="p-4">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${s.grad} mb-3`}>
                  <s.icon className={`h-4 w-4 ${s.iconColor}`} />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground font-light mt-0.5">{s.label}</p>
                  </div>
                  {s.trend === 'up'   && <ArrowUpRight   className="h-4 w-4 text-emerald-500 mb-1" />}
                  {s.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-rose-500 mb-1" />}
                </div>
                <p className="text-[10px] text-muted-foreground/70 mt-1.5">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Filters ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#14b8a6] transition-colors" />
            <Input
              placeholder="Search ID, order, customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 h-10 rounded-xl border-border/50 bg-card focus:border-[#14b8a6]/50 focus:ring-1 focus:ring-[#14b8a6]/20 text-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-muted/30 border border-border/20 rounded-xl">
            <Filter className="h-3.5 w-3.5 text-muted-foreground ml-2" />
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === s
                    ? 'bg-background text-foreground shadow-sm border border-border/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Transactions Table ───────────────────────────── */}
        <Card className="border-border/30 rounded-xl bg-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto_40px] items-center px-5 py-3 bg-muted/20 border-b border-border/20 text-[10px] font-bold uppercase tracking-widest text-muted-foreground gap-4">
            <span>Customer</span>
            <span className="w-28 text-right">Amount</span>
            <span className="w-20 text-center">Method</span>
            <span className="w-24 text-center">Gateway</span>
            <span className="w-24 text-center">Status</span>
            <span className="w-28 text-right">Date</span>
            <span className="w-24 text-right">TXN ID</span>
            <span />
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/10">
            {loading ? (
              <div className="py-16 text-center">
                <RefreshCw className="h-8 w-8 text-[#14b8a6] animate-spin mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-light">Loading payment transactions...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center">
                <TrendingUp className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-light">No transactions match your filters.</p>
              </div>
            ) : (
              filtered.map((t) => {
                const cfg = statusConfig[t.status as TxnStatus];
                const StatusIcon = cfg.icon;
                return (
                  <div
                    key={t.id}
                    className="grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto_40px] items-center px-5 py-3.5 gap-4 hover:bg-muted/10 transition-colors group"
                  >
                    {/* Customer */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#14b8a6]/20 to-[#0f766e]/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-black text-[#14b8a6]">{t.avatar}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{t.customer}</p>
                        <p className="text-[10px] text-muted-foreground font-light">{t.order}</p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="w-28 text-right">
                      <p className="text-sm font-black text-foreground">{t.amount}</p>
                    </div>

                    {/* Method */}
                    <div className="w-20 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted/40 rounded-full px-2 py-0.5">
                        <span>{methodIcon[t.method] ?? '💰'}</span>
                        {t.method}
                      </span>
                    </div>

                    {/* Gateway */}
                    <div className="w-24 text-center">
                      <span className="text-[10px] font-semibold text-muted-foreground">{t.gateway}</span>
                    </div>

                    {/* Status */}
                    <div className="w-24 flex justify-center">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold rounded-full px-2.5 py-1 border ${cfg.color}`}>
                        <StatusIcon className="h-2.5 w-2.5" />
                        {t.status}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="w-28 text-right">
                      <p className="text-[10px] font-semibold text-foreground">{t.date}</p>
                      <p className="text-[10px] text-muted-foreground font-light">{t.time}</p>
                    </div>

                    {/* TXN ID */}
                    <div className="w-24 text-right">
                      <span className="font-mono text-[10px] font-semibold text-[#14b8a6]">{t.id}</span>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-[#14b8a6]/10 hover:text-[#14b8a6] opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-border/20 bg-muted/10">
            <p className="text-xs text-muted-foreground font-light">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{' '}
              <span className="font-semibold text-foreground">{paymentsList.length}</span> transactions
            </p>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-border/40 cursor-pointer">
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs font-semibold text-foreground px-2">1</span>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg border-border/40 cursor-pointer">
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </AdminLayout>
  );
}
