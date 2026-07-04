'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Printer, Mail, Eye } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

const invoices = [
  { id: 'INV-2024-0421', order: '#ORD-4421', customer: 'Priya Sharma', gst: 'GST-29XXXX8C1Z1', amount: '₹4,820', tax: '₹724', date: '03 Jul 2024', status: 'Paid' },
  { id: 'INV-2024-0420', order: '#ORD-4420', customer: 'Aditya Mehta', gst: 'GST-27XXXX4B1Z5', amount: '₹2,150', tax: '₹323', date: '03 Jul 2024', status: 'Paid' },
  { id: 'INV-2024-0419', order: '#ORD-4419', customer: 'Neha Kapoor', gst: 'N/A', amount: '₹7,640', tax: '₹1,146', date: '02 Jul 2024', status: 'Pending' },
  { id: 'INV-2024-0418', order: '#ORD-4418', customer: 'Rohan Gupta', gst: 'N/A', amount: '₹1,290', tax: '₹194', date: '02 Jul 2024', status: 'Cancelled' },
  { id: 'INV-2024-0417', order: '#ORD-4417', customer: 'Anjali Singh', gst: 'GST-36XXXX7A1Z8', amount: '₹3,480', tax: '₹522', date: '01 Jul 2024', status: 'Refunded' },
];

const statusStyles: Record<string, string> = {
  Paid:      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending:   'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Cancelled: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  Refunded:  'bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

export default function InvoicesPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Invoices"
          badgeText="Finance Command Center"
          subtitle="Generate, download, and manage GST invoices."

          actions={
            <Button className="rounded-md gap-2 bg-primary text-white hover:bg-primary/95 shadow-sm shadow-[#14b8a6]/10 cursor-pointer">
              <FileText className="h-4 w-4" /> Generate Invoice
            </Button>
          }
        />

        <Card className="border-border/40 rounded-lg bg-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    {['Invoice #', 'Order', 'Customer', 'GST Number', 'Amount', 'Tax', 'Date', 'Status', 'Actions'].map(h => (
                      <TableHead key={h} className="text-xs font-bold uppercase tracking-wider">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id} className="hover:bg-muted/10">
                      <TableCell className="font-mono text-xs font-bold text-[#14b8a6]">{inv.id}</TableCell>
                      <TableCell className="text-xs font-semibold">{inv.order}</TableCell>
                      <TableCell className="text-xs">{inv.customer}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{inv.gst}</TableCell>
                      <TableCell className="text-xs font-bold text-foreground">{inv.amount}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{inv.tax}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{inv.date}</TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] font-semibold rounded-full px-2.5 border-transparent ${statusStyles[inv.status]}`}>{inv.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60" title="View"><Eye className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60" title="Download"><Download className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60" title="Print"><Printer className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted/60" title="Email"><Mail className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
