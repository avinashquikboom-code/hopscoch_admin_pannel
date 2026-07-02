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
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

const orders = [
  {
    id: 'ORD-1234',
    customer: 'Sarah Johnson',
    email: 'sarah@email.com',
    amount: 234.50,
    status: 'delivered',
    paymentStatus: 'paid',
    items: 3,
    date: '2024-01-15',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-1235',
    customer: 'Michael Brown',
    email: 'michael@email.com',
    amount: 189.00,
    status: 'processing',
    paymentStatus: 'paid',
    items: 2,
    date: '2024-01-15',
    trackingNumber: '',
  },
  {
    id: 'ORD-1236',
    customer: 'Emily Davis',
    email: 'emily@email.com',
    amount: 456.75,
    status: 'pending',
    paymentStatus: 'pending',
    items: 5,
    date: '2024-01-14',
    trackingNumber: '',
  },
  {
    id: 'ORD-1237',
    customer: 'James Wilson',
    email: 'james@email.com',
    amount: 123.25,
    status: 'shipped',
    paymentStatus: 'paid',
    items: 1,
    date: '2024-01-14',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-1238',
    customer: 'Lisa Anderson',
    email: 'lisa@email.com',
    amount: 345.00,
    status: 'cancelled',
    paymentStatus: 'refunded',
    items: 4,
    date: '2024-01-13',
    trackingNumber: '',
  },
];

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-warning/10 text-warning' },
  processing: { label: 'Processing', icon: Package, color: 'bg-info/10 text-info' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-primary/10 text-primary' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-success/10 text-success' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-destructive/10 text-destructive' },
  returned: { label: 'Returned', icon: RefreshCw, color: 'bg-warning/10 text-warning' },
  refunded: { label: 'Refunded', icon: RefreshCw, color: 'bg-destructive/10 text-destructive' },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return orders.length;
    return orders.filter(o => o.status === status).length;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage customer orders and shipments</p>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
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

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Orders</CardTitle>
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
                  placeholder="Search orders by customer, email, or order ID..."
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
                <TabsTrigger value="processing">Processing ({getStatusCount('processing')})</TabsTrigger>
                <TabsTrigger value="shipped">Shipped ({getStatusCount('shipped')})</TabsTrigger>
                <TabsTrigger value="delivered">Delivered ({getStatusCount('delivered')})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({getStatusCount('cancelled')})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tracking</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => {
                        const statusInfo = statusConfig[order.status as keyof typeof statusConfig];
                        return (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-sm text-muted-foreground">{order.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items} items</TableCell>
                            <TableCell className="font-semibold">${order.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}
                                className={order.paymentStatus === 'paid' ? 'bg-success' : ''}
                              >
                                {order.paymentStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={statusInfo.color}>
                                <statusInfo.icon className="h-3 w-3 mr-1" />
                                {statusInfo.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {order.trackingNumber ? (
                                <span className="font-mono text-sm">{order.trackingNumber}</span>
                              ) : (
                                <span className="text-muted-foreground text-sm">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Invoice
                                  </DropdownMenuItem>
                                  {order.status === 'pending' && (
                                    <DropdownMenuItem>
                                      <Package className="mr-2 h-4 w-4" />
                                      Mark as Processing
                                    </DropdownMenuItem>
                                  )}
                                  {order.status === 'processing' && (
                                    <DropdownMenuItem>
                                      <Truck className="mr-2 h-4 w-4" />
                                      Mark as Shipped
                                    </DropdownMenuItem>
                                  )}
                                  {order.status === 'shipped' && (
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Mark as Delivered
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
