'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Search, CheckCircle2, XCircle, RefreshCcw, Eye } from 'lucide-react';

type RefundStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processed';
const refundStatusStyle: Record<RefundStatus, string> = {
  Pending:   'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Approved:  'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Rejected:  'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  Processed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

const refunds = [
  { id: 'RFD-1021', txn: 'TXN-98817', order: '#ORD-4417', customer: 'Anjali Singh', amount: '₹3,480', type: 'Full Refund', reason: 'Item not received', status: 'Pending' as RefundStatus, date: '02 Jul 2024' },
  { id: 'RFD-1020', txn: 'TXN-98810', order: '#ORD-4410', customer: 'Rahul Jain', amount: '₹850', type: 'Partial Refund', reason: 'Wrong size delivered', status: 'Approved' as RefundStatus, date: '01 Jul 2024' },
  { id: 'RFD-1019', txn: 'TXN-98805', order: '#ORD-4405', customer: 'Meera Pillai', amount: '₹6,200', type: 'Full Refund', reason: 'Duplicate order', status: 'Processed' as RefundStatus, date: '30 Jun 2024' },
  { id: 'RFD-1018', txn: 'TXN-98800', order: '#ORD-4400', customer: 'Dev Shah', amount: '₹400', type: 'Partial Refund', reason: 'Discount not applied', status: 'Rejected' as RefundStatus, date: '29 Jun 2024' },
];

export default function RefundsPage() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(refunds);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(refunds[0]);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setItems(rs => rs.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const filtered = items.filter(r =>
    r.id.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Refund Management</h1>
            <p className="text-muted-foreground mt-1 font-light">Approve, reject, or process customer refund requests.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Requests', value: items.length, color: 'text-[#14b8a6]' },
            { label: 'Pending', value: items.filter(r => r.status === 'Pending').length, color: 'text-amber-500' },
            { label: 'Approved', value: items.filter(r => r.status === 'Approved').length, color: 'text-blue-500' },
            { label: 'Processed', value: items.filter(r => r.status === 'Processed').length, color: 'text-emerald-500' },
          ].map(s => (
            <Card key={s.label} className="border-border/40 bg-card rounded-lg">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</p>
                <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative max-w-sm group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input placeholder="Search refunds..." value={search} onChange={e => setSearch(e.target.value)} className="pl-11 h-10 rounded-md border-border/60" />
        </div>

        <Card className="border-border/40 rounded-lg bg-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    {['Refund ID', 'Order', 'Customer', 'Amount', 'Type', 'Reason', 'Status', 'Date', 'Actions'].map(h => (
                      <TableHead key={h} className="text-xs font-bold uppercase tracking-wider">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id} className="hover:bg-muted/10">
                      <TableCell className="font-mono text-xs font-semibold text-[#14b8a6]">{r.id}</TableCell>
                      <TableCell className="text-xs font-semibold">{r.order}</TableCell>
                      <TableCell className="text-xs">{r.customer}</TableCell>
                      <TableCell className="text-xs font-bold text-foreground">{r.amount}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.type}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">{r.reason}</TableCell>
                      <TableCell><Badge className={`text-[10px] font-semibold rounded-full px-2.5 border-transparent ${refundStatusStyle[r.status]}`}>{r.status}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {r.status === 'Pending' && (
                            <>
                              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-md hover:bg-emerald-500/10 text-emerald-500" onClick={() => handleAction(r.id, 'Approved')}><CheckCircle2 className="h-3.5 w-3.5" /></Button>
                              <Button size="icon" variant="ghost" className="h-7 w-7 rounded-md hover:bg-rose-500/10 text-rose-500" onClick={() => handleAction(r.id, 'Rejected')}><XCircle className="h-3.5 w-3.5" /></Button>
                            </>
                          )}
                          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-md hover:bg-muted/60" onClick={() => { setSelected(r); setDetailOpen(true); }}><Eye className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
          <SheetTrigger render={<span />} />
          <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">Refund Details — {selected?.id}</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">Full details for this refund request.</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-4 px-4">
              {[
                ['Order', selected?.order], ['Customer', selected?.customer],
                ['Amount', selected?.amount], ['Type', selected?.type],
                ['Reason', selected?.reason], ['Status', selected?.status], ['Date', selected?.date],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between py-2 border-b border-border/30">
                  <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                  <span className="text-xs font-bold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}
