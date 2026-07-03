'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Download,
  Filter,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  RefreshCw,
  FileText
} from 'lucide-react';

const returns = [
  {
    id: 'RET-1234',
    orderId: 'ORD-1234',
    customer: 'Sarah Johnson',
    email: 'sarah@email.com',
    amount: 234.50,
    status: 'pending_review',
    pickupStatus: 'not_scheduled',
    inspectionStatus: 'pending',
    refundStatus: 'pending',
    reason: 'Wrong size received',
    items: 2,
    date: '2024-01-15',
    images: 2,
  },
  {
    id: 'RET-1235',
    orderId: 'ORD-1235',
    customer: 'Michael Brown',
    email: 'michael@email.com',
    amount: 189.00,
    status: 'approved',
    pickupStatus: 'scheduled',
    inspectionStatus: 'pending',
    refundStatus: 'pending',
    reason: 'Product damaged',
    items: 1,
    date: '2024-01-14',
    images: 3,
  },
  {
    id: 'RET-1236',
    orderId: 'ORD-1236',
    customer: 'Emily Davis',
    email: 'emily@email.com',
    amount: 456.75,
    status: 'picked_up',
    pickupStatus: 'completed',
    inspectionStatus: 'in_progress',
    refundStatus: 'pending',
    reason: 'Quality issues',
    items: 3,
    date: '2024-01-13',
    images: 1,
  },
  {
    id: 'RET-1237',
    orderId: 'ORD-1237',
    customer: 'James Wilson',
    email: 'james@email.com',
    amount: 123.25,
    status: 'completed',
    pickupStatus: 'completed',
    inspectionStatus: 'passed',
    refundStatus: 'completed',
    reason: 'Changed mind',
    items: 1,
    date: '2024-01-12',
    images: 0,
  },
  {
    id: 'RET-1238',
    orderId: 'ORD-1238',
    customer: 'Lisa Anderson',
    email: 'lisa@email.com',
    amount: 345.00,
    status: 'rejected',
    pickupStatus: 'not_scheduled',
    inspectionStatus: 'not_required',
    refundStatus: 'rejected',
    reason: 'Return window expired',
    items: 4,
    date: '2024-01-11',
    images: 0,
  },
];

const statusConfig = {
  pending_review: { label: 'Pending Review', icon: Clock, color: 'bg-warning/10 text-warning' },
  approved: { label: 'Approved', icon: CheckCircle, color: 'bg-success/10 text-success' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'bg-destructive/10 text-destructive' },
  pickup_scheduled: { label: 'Pickup Scheduled', icon: Truck, color: 'bg-info/10 text-info' },
  picked_up: { label: 'Picked Up', icon: Package, color: 'bg-primary/10 text-primary' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'bg-success/10 text-success' },
  inspection_in_progress: { label: 'Inspection In Progress', icon: RefreshCw, color: 'bg-warning/10 text-warning' },
};

export default function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredReturns = returns.filter(returnItem => {
    const matchesSearch = 
      returnItem.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      returnItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      returnItem.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      returnItem.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || returnItem.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return returns.length;
    return returns.filter(r => r.status === status).length;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Returns</h1>
            <p className="text-muted-foreground mt-1">Manage return requests and refunds</p>
          </div>
        </div>

        {/* Return Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.keys(statusConfig).map((status) => {
            const config = statusConfig[status as keyof typeof statusConfig];
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

        {/* Returns Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Return Requests</CardTitle>
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
                  placeholder="Search returns by customer, order ID, or return ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({getStatusCount('all')})</TabsTrigger>
                <TabsTrigger value="pending_review">Pending Review ({getStatusCount('pending_review')})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({getStatusCount('approved')})</TabsTrigger>
                <TabsTrigger value="picked_up">Picked Up ({getStatusCount('picked_up')})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({getStatusCount('completed')})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({getStatusCount('rejected')})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Return ID</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pickup</TableHead>
                        <TableHead>Inspection</TableHead>
                        <TableHead>Refund</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReturns.map((returnItem) => {
                        const statusInfo = statusConfig[returnItem.status as keyof typeof statusConfig];
                        return (
                          <TableRow key={returnItem.id}>
                            <TableCell className="font-mono font-medium">{returnItem.id}</TableCell>
                            <TableCell className="font-mono">{returnItem.orderId}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{returnItem.customer}</p>
                                <p className="text-sm text-muted-foreground">{returnItem.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{returnItem.date}</TableCell>
                            <TableCell>{returnItem.items} items</TableCell>
                            <TableCell className="font-semibold">${returnItem.amount.toFixed(2)}</TableCell>
                            <TableCell className="max-w-xs truncate">{returnItem.reason}</TableCell>
                            <TableCell>
                              <Badge className={statusInfo.color}>
                                <statusInfo.icon className="h-3 w-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={returnItem.pickupStatus === 'completed' ? 'default' : 'secondary'}>
                                {returnItem.pickupStatus === 'completed' ? 'Completed' : returnItem.pickupStatus === 'scheduled' ? 'Scheduled' : 'Not Scheduled'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={returnItem.inspectionStatus === 'passed' ? 'default' : 'secondary'}>
                                {returnItem.inspectionStatus === 'passed' ? 'Passed' : returnItem.inspectionStatus === 'in_progress' ? 'In Progress' : 'Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={returnItem.refundStatus === 'completed' ? 'default' : 'secondary'}>
                                {returnItem.refundStatus === 'completed' ? 'Completed' : returnItem.refundStatus === 'rejected' ? 'Rejected' : 'Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger render={
                                  <div className="h-8 w-8 rounded-lg hover:bg-muted/60 flex items-center justify-center cursor-pointer">
                                    <MoreVertical className="h-4 w-4" />
                                  </div>
                                } />
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  {returnItem.images > 0 && (
                                    <DropdownMenuItem>
                                      <FileText className="mr-2 h-4 w-4" />
                                      View Images ({returnItem.images})
                                    </DropdownMenuItem>
                                  )}
                                  {returnItem.status === 'pending_review' && (
                                    <>
                                      <DropdownMenuItem>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Approve Return
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject Return
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {returnItem.status === 'approved' && (
                                    <DropdownMenuItem>
                                      <Truck className="mr-2 h-4 w-4" />
                                      Schedule Pickup
                                    </DropdownMenuItem>
                                  )}
                                  {returnItem.status === 'picked_up' && (
                                    <DropdownMenuItem>
                                      <RefreshCw className="mr-2 h-4 w-4" />
                                      Quality Inspection
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
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
      </div>
    </AdminLayout>
  );
}
