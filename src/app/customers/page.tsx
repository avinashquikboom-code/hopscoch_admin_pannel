'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Plus,
  Sparkles,
  Info,
  Calendar,
  DollarSign,
  TrendingUp,
  User,
  Trash2,
  Globe,
  EyeOff,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const initialCustomers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 234 567 8900',
    totalOrders: 12,
    totalSpent: 2340.50,
    averageOrderValue: 195.04,
    status: 'active',
    lastOrderDate: '2026-07-02',
    joinedDate: '2025-06-15',
    address: '123 Fashion Ave, Suite 400, New York, NY 10001',
  },
  {
    id: '2',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 234 567 8901',
    totalOrders: 8,
    totalSpent: 1560.00,
    averageOrderValue: 195.00,
    status: 'active',
    lastOrderDate: '2026-07-03',
    joinedDate: '2025-08-20',
    address: '456 Denim Road, Los Angeles, CA 90012',
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 234 567 8902',
    totalOrders: 15,
    totalSpent: 3450.75,
    averageOrderValue: 230.05,
    status: 'active',
    lastOrderDate: '2026-07-04',
    joinedDate: '2025-05-10',
    address: '789 Silk Blvd, Chicago, IL 60611',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 234 567 8903',
    totalOrders: 5,
    totalSpent: 890.25,
    averageOrderValue: 178.05,
    status: 'active',
    lastOrderDate: '2026-07-01',
    joinedDate: '2025-10-05',
    address: '101 Leather Way, Austin, TX 78701',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 234 567 8904',
    totalOrders: 3,
    totalSpent: 567.00,
    averageOrderValue: 189.00,
    status: 'inactive',
    lastOrderDate: '2026-06-30',
    joinedDate: '2025-12-01',
    address: '202 Cotton Lane, Seattle, WA 98101',
  },
];

const customerGradients = [
  'from-pink-400 to-rose-500 text-white shadow-pink-500/10',
  'from-purple-400 to-indigo-500 text-white shadow-purple-500/10',
  'from-blue-400 to-cyan-500 text-white shadow-blue-500/10',
  'from-emerald-400 to-teal-500 text-white shadow-emerald-500/10',
  'from-amber-400 to-orange-500 text-white shadow-amber-500/10',
];

export default function CustomersPage() {
  const [customersList, setCustomersList] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Add Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  // Selected customer for preview drawer
  const [selectedCustomer, setSelectedCustomer] = useState<typeof initialCustomers[0] | null>(null);

  const getAvatarFallback = (name: string) => {
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return customerGradients[Math.abs(hash) % customerGradients.length];
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer = {
      id: String(customersList.length + 1),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+1 555 123 4567',
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0,
      status: 'active',
      lastOrderDate: '-',
      joinedDate: new Date().toISOString().split('T')[0],
      address: formData.address || 'Not specified',
    };
    setCustomersList([newCustomer, ...customersList]);
    setFormData({ name: '', email: '', phone: '', address: '' });
    setIsAddOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setCustomersList(prev => 
      prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c)
    );
    setSelectedCustomer(prev => {
      if (prev && prev.id === id) {
        return { ...prev, status: prev.status === 'active' ? 'inactive' : 'active' };
      }
      return prev;
    });
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomersList(prev => prev.filter(c => c.id !== id));
    setSelectedCustomer(null);
  };

  const filteredCustomers = useMemo(() => {
    return customersList.filter(customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customersList, searchQuery]);

  const stats = useMemo(() => {
    const totalCount = customersList.length;
    const activeCount = customersList.filter(c => c.status === 'active').length;
    const totalVolume = customersList.reduce((acc, c) => acc + c.totalSpent, 0);
    const avgAOV = totalVolume / (customersList.reduce((acc, c) => acc + c.totalOrders, 0) || 1);
    return {
      totalCount,
      activeCount,
      totalVolume,
      avgAOV
    };
  }, [customersList]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Customer"
          titlePart2="Profiles"
          badgeText="Customers Command Center"
          subtitle="Manage customer accounts, view transaction histories, and analyze user spending profiles."
          actions={
            <Button onClick={() => setIsAddOpen(true)} className="rounded-lg bg-primary hover:bg-primary/95 text-white flex items-center gap-2 cursor-pointer h-10 shadow-sm">
              <Plus className="h-4 w-4" /> Add Customer
            </Button>
          }
        />

        {/* Premium KPI Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Total Accounts</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stats.totalCount} Clients</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.activeCount} currently active buyers</p>
                </div>
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Active Buyers</p>
                  <p className="text-2xl font-bold text-emerald-500 mt-2">{stats.activeCount} Active</p>
                  <p className="text-xs text-muted-foreground mt-1">Verified profiles mapping order history</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Lifetime Volume</p>
                  <p className="text-2xl font-bold text-foreground mt-2">${stats.totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">Aggregated customer lifetime spend</p>
                </div>
                <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-500">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Average Order Value</p>
                  <p className="text-2xl font-bold text-foreground mt-2">${stats.avgAOV.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Average ticket spend per order</p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers Table Dashboard Panel */}
        <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-bold text-foreground">Registered User Ledger</span>
              <div className="relative max-w-sm flex-1 group">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search customers by name or email..."
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
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Customer</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Contact Channels</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Orders</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Total Spent</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Avg Order ticket</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Last Transaction</TableHead>
                    <TableHead className="w-16 py-4" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => {
                    const avatarColor = getAvatarColor(customer.name);
                    return (
                      <TableRow 
                        key={customer.id}
                        onClick={() => setSelectedCustomer(customer)}
                        className="hover:bg-muted/20 border-b border-border/20 transition-colors cursor-pointer group/row"
                      >
                        {/* Customer Avatar name */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 rounded-lg">
                              <AvatarFallback className={`rounded-lg text-xs font-bold bg-gradient-to-tr ${avatarColor}`}>
                                {getAvatarFallback(customer.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{customer.name}</p>
                              <p className="text-[10px] text-muted-foreground truncate font-light flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> Joined {customer.joinedDate}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Contact details */}
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-foreground">
                              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-light">
                              <Phone className="h-3.5 w-3.5 text-muted-foreground/60" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Orders count */}
                        <TableCell className="py-4 text-center font-semibold text-foreground">
                          <div className="flex items-center justify-center gap-1.5">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground/60" />
                            <span>{customer.totalOrders}</span>
                          </div>
                        </TableCell>

                        {/* Total Spent */}
                        <TableCell className="py-4 text-sm font-black text-foreground">
                          ${customer.totalSpent.toFixed(2)}
                        </TableCell>

                        {/* Avg order ticket */}
                        <TableCell className="py-4 text-sm text-foreground">
                          ${customer.averageOrderValue.toFixed(2)}
                        </TableCell>

                        {/* Status */}
                        <TableCell className="py-4 text-center">
                          <Badge
                            className={`rounded-md px-2.5 py-1 text-xs font-semibold border select-none ${
                              customer.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5 dark:text-emerald-400 border-emerald-500/20'
                                : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                            }`}
                          >
                            {customer.status}
                          </Badge>
                        </TableCell>

                        {/* Last order date */}
                        <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                          {customer.lastOrderDate}
                        </TableCell>

                        {/* Actions drop down */}
                        <TableCell className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger render={
                              <div className="h-8 w-8 rounded-lg hover:bg-muted/80 flex items-center justify-center cursor-pointer transition-colors border-none bg-transparent">
                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                              </div>
                            } />
                            <DropdownMenuContent align="end" className="p-2 rounded-lg bg-card border border-border/40 w-36">
                              <DropdownMenuItem onClick={() => setSelectedCustomer(customer)} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium">
                                <Eye className="mr-2 h-4 w-4 text-[#14b8a6]" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(customer.id)} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium">
                                {customer.status === 'active' ? (
                                  <>
                                    <EyeOff className="mr-2 h-4 w-4 text-amber-500" /> Freeze Profile
                                  </>
                                ) : (
                                  <>
                                    <Globe className="mr-2 h-4 w-4 text-emerald-500" /> Activate Profile
                                  </>
                                )}
                              </DropdownMenuItem>
                              <Separator className="my-1 border-border/10" />
                              <DropdownMenuItem onClick={() => handleDeleteCustomer(customer.id)} className="p-2 rounded-md hover:bg-rose-500/10 text-rose-500 cursor-pointer text-sm font-medium">
                                <Trash2 className="mr-2 h-4 w-4 text-rose-500" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <AlertTriangle className="h-8 w-8 text-muted-foreground/60" />
                          <p className="text-sm font-semibold text-muted-foreground">No matching customers found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Customer Slide Drawer */}
        <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
          <SheetContent side="right" className="w-full sm:max-w-[480px] p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            <SheetHeader className="p-6 border-b border-border/20">
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Add Customer Profile
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Define the customer name, contact details, and billing/shipping address.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreateCustomer} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Sarah Johnson" 
                      className="pl-10 h-11 rounded-lg border-border/50 focus:border-primary transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Handle</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@email.com" 
                        className="pl-10 h-11 rounded-lg border-border/50 focus:border-primary transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567" 
                        className="pl-10 h-11 rounded-lg border-border/50 focus:border-primary transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Delivery Destination Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="address"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Define the street address, suite, city, state, and zip code..."
                      className="w-full pl-10 p-3 rounded-lg border border-border/50 bg-background text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <SheetFooter className="p-6 bg-muted/15 border-t border-border/20 flex gap-3 justify-end">
                <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)} className="rounded-lg h-11 px-6">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-lg h-11 px-6 bg-primary text-white hover:bg-primary/95">
                  Save Customer
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>

        {/* Quick View Details Drawer */}
        <Sheet open={selectedCustomer !== null} onOpenChange={(open) => { if (!open) setSelectedCustomer(null); }}>
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            {selectedCustomer && (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-xs bg-muted/60 border border-border/40 px-3 py-1 rounded-lg select-all">
                        ID: {selectedCustomer.id}
                      </span>
                      <Badge className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                        selectedCustomer.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                      }`}>
                        {selectedCustomer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`h-9 w-9 rounded-lg`} 
                        onClick={() => handleToggleStatus(selectedCustomer.id)}
                        title="Toggle Status"
                      >
                        {selectedCustomer.status === 'active' ? <EyeOff className="h-4.5 w-4.5" /> : <Globe className="h-4.5 w-4.5" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-lg text-rose-500 hover:bg-rose-500/10" 
                        onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                        title="Delete Profile"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarFallback className={`rounded-lg text-sm font-bold bg-gradient-to-tr ${getAvatarColor(selectedCustomer.name)}`}>
                        {getAvatarFallback(selectedCustomer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedCustomer.name}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5 font-light">Joined on {selectedCustomer.joinedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-6 space-y-6 h-full overflow-y-auto">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4 text-center sm:text-left">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                          <ShoppingBag className="h-3.5 w-3.5 text-primary" /> Total Orders
                        </span>
                        <h4 className="text-2xl font-black text-foreground mt-1.5">{selectedCustomer.totalOrders}</h4>
                      </CardContent>
                    </Card>

                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4 text-center sm:text-left">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-primary" /> Total Spend
                        </span>
                        <h4 className="text-2xl font-black text-foreground mt-1.5">${selectedCustomer.totalSpent.toFixed(2)}</h4>
                      </CardContent>
                    </Card>

                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4 text-center sm:text-left">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                          <TrendingUp className="h-3.5 w-3.5 text-primary" /> Ticket AOV
                        </span>
                        <h4 className="text-xl font-black text-foreground mt-2">${selectedCustomer.averageOrderValue.toFixed(2)}</h4>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Contact Information</h3>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/15 space-y-2.5">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-[#14b8a6]" />
                        <span>{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-[#14b8a6]" />
                        <span>{selectedCustomer.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Shipping Destination</h3>
                    <Card className="border-border/30 bg-muted/5 rounded-xl">
                      <CardContent className="p-4 flex items-start gap-2.5">
                        <MapPin className="h-4.5 w-4.5 text-[#14b8a6] shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed font-light">
                          {selectedCustomer.address}
                        </p>
                      </CardContent>
                    </Card>
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
