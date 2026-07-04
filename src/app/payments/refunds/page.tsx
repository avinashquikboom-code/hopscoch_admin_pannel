'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Eye, 
  Download,
  Filter,
  DollarSign,
  FileText,
  AlertCircle,
  Info
} from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';

type RefundStatus = 'pending' | 'approved' | 'rejected' | 'completed';
type RefundType = 'full' | 'partial';

const refundStatusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-warning/10 text-warning' },
  approved: { label: 'Approved', icon: CheckCircle, color: 'bg-success/10 text-success' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'bg-destructive/10 text-destructive' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'bg-success/10 text-success' },
};

const refunds = [
  {
    id: 'RFD-1234',
    orderId: 'ORD-1234',
    customer: 'Sarah Johnson',
    email: 'sarah@email.com',
    amount: 234.50,
    type: 'full' as RefundType,
    reason: 'Wrong size received',
    status: 'pending' as RefundStatus,
    paymentMethod: 'Credit Card',
    paymentGateway: 'Stripe',
    transactionId: 'TXN-123456789',
    gatewayTransactionId: 'pi_1234567890',
    date: '2024-01-15',
    time: '10:30 AM',
  },
  {
    id: 'RFD-1235',
    orderId: 'ORD-1235',
    customer: 'Michael Brown',
    email: 'michael@email.com',
    amount: 189.00,
    type: 'partial' as RefundType,
    reason: 'Product damaged',
    status: 'approved' as RefundStatus,
    paymentMethod: 'Credit Card',
    paymentGateway: 'Stripe',
    transactionId: 'TXN-123456790',
    gatewayTransactionId: 'pi_1234567891',
    date: '2024-01-14',
    time: '09:15 AM',
  },
  {
    id: 'RFD-1236',
    orderId: 'ORD-1236',
    customer: 'Emily Davis',
    email: 'emily@email.com',
    amount: 456.75,
    type: 'full' as RefundType,
    reason: 'Quality issues',
    status: 'completed' as RefundStatus,
    paymentMethod: 'PayPal',
    paymentGateway: 'PayPal',
    transactionId: 'TXN-123456791',
    gatewayTransactionId: 'PAY-1234567892',
    date: '2024-01-13',
    time: '11:45 AM',
  },
  {
    id: 'RFD-1237',
    orderId: 'ORD-1237',
    customer: 'James Wilson',
    email: 'james@email.com',
    amount: 123.25,
    type: 'partial' as RefundType,
    reason: 'Return window expired',
    status: 'rejected' as RefundStatus,
    paymentMethod: 'Credit Card',
    paymentGateway: 'Stripe',
    transactionId: 'TXN-123456792',
    gatewayTransactionId: 'pi_1234567893',
    date: '2024-01-12',
    time: '02:30 PM',
  },
];

const timeline = [
  {
    status: 'refund_requested',
    label: 'Refund Requested',
    date: '2024-01-15',
    time: '10:30 AM',
    updatedBy: 'Sarah Johnson',
    remarks: 'Customer requested refund',
  },
  {
    status: 'under_review',
    label: 'Under Review',
    date: '2024-01-15',
    time: '11:00 AM',
    updatedBy: 'Admin',
    remarks: 'Refund request under review',
  },
];

export default function RefundsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(refunds[0]);
  const [adminNotes, setAdminNotes] = useState('');

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch = 
      refund.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || refund.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return refunds.length;
    return refunds.filter(r => r.status === status).length;
  };

  const handleAction = (id: string, action: 'approved' | 'rejected' | 'completed') => {
    // Handle refund action
    console.log(`Refund ${id} ${action}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          titlePart1="Payment"
          titlePart2="Refunds"
          badgeText="Finance Command Center"
          subtitle="Approve, reject, and process customer refund requests."

        />

        {/* Refund Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(refundStatusConfig).map((status) => {
            const config = refundStatusConfig[status as keyof typeof refundStatusConfig];
            return (
              <Card key={status} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{config.label}</p>
                      <p className="text-2xl font-bold mt-1">{getStatusCount(status)}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <config.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Refunds Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Refund Requests</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search refunds by customer, order ID, or refund ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({getStatusCount('all')})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({getStatusCount('pending')})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({getStatusCount('approved')})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({getStatusCount('rejected')})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({getStatusCount('completed')})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Refund ID</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRefunds.map((refund) => {
                        const statusInfo = refundStatusConfig[refund.status as keyof typeof refundStatusConfig];
                        return (
                          <TableRow key={refund.id}>
                            <TableCell className="font-mono font-medium">{refund.id}</TableCell>
                            <TableCell className="font-mono">{refund.orderId}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{refund.customer}</p>
                                <p className="text-sm text-muted-foreground">{refund.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{refund.date}</TableCell>
                            <TableCell className="font-semibold">${refund.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {refund.type} Refund
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{refund.reason}</TableCell>
                            <TableCell>
                              <Badge className={statusInfo.color}>
                                <statusInfo.icon className="h-3 w-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{refund.paymentMethod}</p>
                                <p className="text-xs text-muted-foreground">{refund.paymentGateway}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelected(refund);
                                  setDetailOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Refund Details Sheet */}
        <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
          <SheetTrigger render={<span />} />
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            <SheetHeader className="p-6 border-b border-border/20">
              <SheetTitle>Refund Details — {selected?.id}</SheetTitle>
              <SheetDescription>Full details for this refund request</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Refund Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Refund Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Refund ID</p>
                      <p className="font-semibold font-mono">{selected?.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-semibold font-mono">{selected?.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Refund Type</p>
                      <p className="font-semibold capitalize">{selected?.type} Refund</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Refund Status</p>
                      {selected && (
                        <Badge className={refundStatusConfig[selected.status].color}>
                          {refundStatusConfig[selected.status].label}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Refund Reason</p>
                    <p className="font-semibold">{selected?.reason}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{selected?.customer}</p>
                      <p className="text-sm text-muted-foreground">{selected?.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Refund Amount</p>
                      <p className="text-2xl font-bold text-primary">${selected?.amount.toFixed(2)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-semibold">{selected?.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Gateway</p>
                      <p className="font-semibold">{selected?.paymentGateway}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-mono text-sm">{selected?.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gateway Transaction ID</p>
                      <p className="font-mono text-sm">{selected?.gatewayTransactionId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Refund Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Refund Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {index < timeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{item.label}</p>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">{item.date}</p>
                              <p className="text-sm text-muted-foreground">{item.time}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Updated by: {item.updatedBy}</p>
                          <p className="text-sm mt-2">{item.remarks}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selected?.status === 'pending' && (
                    <>
                      <Button className="w-full shadow-sm" variant="default">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Refund
                      </Button>
                      <Button className="w-full shadow-sm" variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Refund
                      </Button>
                      <Button className="w-full shadow-sm" variant="outline">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Request More Info
                      </Button>
                    </>
                  )}
                  {selected?.status === 'approved' && (
                    <>
                      <Button className="w-full shadow-sm" variant="default">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Process Full Refund
                      </Button>
                      <Button className="w-full shadow-sm" variant="outline">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Process Partial Refund
                      </Button>
                    </>
                  )}
                  <Button className="w-full shadow-sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Refund Receipt
                  </Button>
                </CardContent>
              </Card>

              {/* Admin Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add internal notes about this refund..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="min-h-24 rounded-lg"
                  />
                  <Button className="w-full mt-3 shadow-sm" variant="outline">
                    <Info className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}
