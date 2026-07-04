'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Eye, DollarSign, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

type TxnStatus = 'Success' | 'Pending' | 'Failed' | 'Refunded';
const statusStyle: Record<TxnStatus, string> = {
  Success:  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending:  'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Failed:   'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  Refunded: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

const transactions = [
  { id: 'TXN-98821', order: '#ORD-4421', customer: 'Priya Sharma', amount: '₹4,820', method: 'UPI', gateway: 'Razorpay', status: 'Success' as TxnStatus, date: '03 Jul 2024' },
  { id: 'TXN-98820', order: '#ORD-4420', customer: 'Aditya Mehta', amount: '₹2,150', method: 'Card', gateway: 'Stripe', status: 'Success' as TxnStatus, date: '03 Jul 2024' },
  { id: 'TXN-98819', order: '#ORD-4419', customer: 'Neha Kapoor', amount: '₹7,640', method: 'Net Banking', gateway: 'Razorpay', status: 'Pending' as TxnStatus, date: '02 Jul 2024' },
  { id: 'TXN-98818', order: '#ORD-4418', customer: 'Rohan Gupta', amount: '₹1,290', method: 'COD', gateway: 'N/A', status: 'Failed' as TxnStatus, date: '02 Jul 2024' },
  { id: 'TXN-98817', order: '#ORD-4417', customer: 'Anjali Singh', amount: '₹3,480', method: 'UPI', gateway: 'PhonePe', status: 'Refunded' as TxnStatus, date: '01 Jul 2024' },
  { id: 'TXN-98816', order: '#ORD-4416', customer: 'Vivek Nair', amount: '₹9,200', method: 'Card', gateway: 'Stripe', status: 'Success' as TxnStatus, date: '01 Jul 2024' },
  { id: 'TXN-98815', order: '#ORD-4415', customer: 'Kavya Reddy', amount: '₹560', method: 'Wallet', gateway: 'Paytm', status: 'Success' as TxnStatus, date: '30 Jun 2024' },
  { id: 'TXN-98814', order: '#ORD-4414', customer: 'Arjun Verma', amount: '₹12,800', method: 'Card', gateway: 'Razorpay', status: 'Failed' as TxnStatus, date: '30 Jun 2024' },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TxnStatus>('All');

  const filtered = transactions.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()) || t.order.includes(search);
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Transactions"
          badgeText="Finance Command Center"
          subtitle="View and manage all payment transactions."
          actions={
            <Button variant="outline" className="rounded-lg gap-2 text-sm border-border/60 cursor-pointer h-9">
              <Download className="h-4 w-4" /> Export
            </Button>
          }
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Total Transactions</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{transactions.length}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#14b8a6]/10 text-[#14b8a6]">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Success Rate</p>
                  <p className="text-2xl font-bold text-[#14b8a6] mt-2">87.5%</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Total Volume</p>
                  <p className="text-2xl font-bold text-foreground mt-2">₹42.1K</p>
                </div>
                <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Pending</p>
                  <p className="text-2xl font-bold text-amber-500 mt-2">1</p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by ID, order, customer..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-9 rounded-lg border-border/60" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Success', 'Pending', 'Failed', 'Refunded'] as const).map(s => (
              <Button key={s} size="sm" variant={statusFilter === s ? 'default' : 'outline'}
                onClick={() => setStatusFilter(s)}
                className={`rounded-lg text-xs h-8 ${statusFilter === s ? 'bg-primary text-white' : 'border-border/60'}`}>
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <Card className="border-border/40 rounded-lg bg-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    {['Transaction ID', 'Order', 'Customer', 'Amount', 'Method', 'Gateway', 'Status', 'Date', ''].map(h => (
                      <TableHead key={h} className="text-xs font-bold uppercase tracking-wider py-3">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((t) => (
                    <TableRow key={t.id} className="hover:bg-muted/10">
                      <TableCell className="font-mono text-xs font-semibold text-[#14b8a6]">{t.id}</TableCell>
                      <TableCell className="text-xs font-semibold">{t.order}</TableCell>
                      <TableCell className="text-xs text-foreground">{t.customer}</TableCell>
                      <TableCell className="text-xs font-bold text-foreground">{t.amount}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.method}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.gateway}</TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] font-semibold rounded-full px-2.5 py-1 border-transparent ${statusStyle[t.status]}`}>{t.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60"><Eye className="h-3.5 w-3.5" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/30">
              <p className="text-xs text-muted-foreground">{filtered.length} transactions found</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs rounded-lg border-border/60 h-8">Previous</Button>
                <Button variant="outline" size="sm" className="text-xs rounded-lg border-border/60 h-8">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
