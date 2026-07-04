'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Truck, Package, CheckCircle2, XCircle, RefreshCcw,
  Clock, TrendingUp, ArrowUpRight, DollarSign, Calendar,
  MapPin, BarChart2, Search, ArrowUp, ArrowDown, Plus, Sparkles,
  Info, Eye, Trash2
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar, Legend
} from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialStats = [
  { label: 'Total Shipments', value: '4,821', icon: Truck, color: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', change: '+12%' },
  { label: 'Pending Dispatch', value: '142', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', change: '-3%' },
  { label: 'Packed & Ready', value: '89', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', change: '+5%' },
  { label: 'Shipped (In Transit)', value: '1,203', icon: Truck, color: 'text-violet-500', bg: 'bg-violet-500/10', change: '+8%' },
];

const areaData = [
  { day: 'Mon', shipped: 82, delivered: 65 },
  { day: 'Tue', shipped: 91, delivered: 78 },
  { day: 'Wed', shipped: 74, delivered: 69 },
  { day: 'Thu', shipped: 103, delivered: 88 },
  { day: 'Fri', shipped: 118, delivered: 95 },
  { day: 'Sat', shipped: 96, delivered: 84 },
  { day: 'Sun', shipped: 67, delivered: 55 },
];

const courierData = [
  { name: 'Delhivery', shipments: 1820, delivered: 1680 },
  { name: 'Blue Dart', shipments: 980, delivered: 920 },
  { name: 'DTDC', shipments: 640, delivered: 590 },
  { name: 'XpressBees', shipments: 540, delivered: 510 },
  { name: 'Shadowfax', shipments: 420, delivered: 380 },
];

const initialShipments = [
  { id: 'SHP-8821', order: 'ORD-4421', customer: 'Priya Sharma', courier: 'Delhivery', status: 'Delivered', date: '2026-07-04', city: 'Mumbai', trackingUrl: 'https://track.delhivery.com/ORD-4421' },
  { id: 'SHP-8820', order: 'ORD-4420', customer: 'Aditya Mehta', courier: 'Blue Dart', status: 'Shipped', date: '2026-07-04', city: 'Delhi', trackingUrl: 'https://track.bluedart.com/ORD-4420' },
  { id: 'SHP-8819', order: 'ORD-4419', customer: 'Neha Kapoor', courier: 'XpressBees', status: 'Packed', date: '2026-07-03', city: 'Bangalore', trackingUrl: 'https://track.xpressbees.com/ORD-4419' },
  { id: 'SHP-8818', order: 'ORD-4418', customer: 'Rohan Gupta', courier: 'DTDC', status: 'Pending', date: '2026-07-03', city: 'Chennai', trackingUrl: 'https://track.dtdc.com/ORD-4418' },
  { id: 'SHP-8817', order: 'ORD-4417', customer: 'Anjali Singh', courier: 'Shadowfax', status: 'Returned', date: '2026-07-02', city: 'Hyderabad', trackingUrl: 'https://track.shadowfax.in/ORD-4417' },
];

const statusStyles: Record<string, string> = {
  Delivered: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5 dark:text-emerald-400 border-emerald-500/20',
  Shipped: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/5 dark:text-blue-400 border-blue-500/20',
  Packed: 'bg-violet-500/10 text-violet-500 dark:bg-violet-500/5 dark:text-violet-400 border-violet-500/20',
  Pending: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/5 dark:text-amber-400 border-amber-500/20',
  Returned: 'bg-orange-500/10 text-orange-500 dark:bg-orange-500/5 dark:text-orange-400 border-orange-500/20',
  Cancelled: 'bg-rose-500/10 text-rose-500 dark:bg-rose-500/5 dark:text-rose-400 border-rose-500/20',
};

export default function ShippingDashboardPage() {
  const [shipmentsList, setShipmentsList] = useState(initialShipments);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected shipment for drawer preview
  const [selectedShipment, setSelectedShipment] = useState<typeof initialShipments[0] | null>(null);

  const filteredShipments = useMemo(() => {
    return shipmentsList.filter(s =>
      s.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.order.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.courier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [shipmentsList, searchQuery]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Shipping"
          titlePart2="Dashboard"
          badgeText="Logistics Command Center"
          subtitle="Monitor all outgoing shipments, evaluate carrier performances, and audit courier deliveries."
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
            <div className="p-6 pb-2">
              <h3 className="font-bold text-sm text-foreground">Weekly Shipments vs Deliveries</h3>
            </div>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={areaData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cShip" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cDel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/20" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground/60" />
                  <YAxis tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground/60" />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.2)', borderRadius: 8, fontSize: 11 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Area type="monotone" dataKey="shipped" name="Shipped" stroke="#14b8a6" fill="url(#cShip)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="delivered" name="Delivered" stroke="#3b82f6" fill="url(#cDel)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
            <div className="p-6 pb-2">
              <h3 className="font-bold text-sm text-foreground">Courier Performance</h3>
            </div>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={courierData} layout="vertical" margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/20" />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground/60" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={75} stroke="currentColor" className="text-muted-foreground/60" />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border)/0.2)', borderRadius: 8, fontSize: 11 }} />
                  <Bar dataKey="shipments" name="Shipments" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="delivered" name="Delivered" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Ledger Registry Panel */}
        <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-bold text-foreground">Active Shipping Ledger</span>
              <div className="relative max-w-sm flex-1 group">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search shipments..."
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
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Shipment ID</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Order Reference</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Customer Name</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Destination City</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Carrier courier</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Created Date</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shp) => (
                    <TableRow 
                      key={shp.id}
                      onClick={() => setSelectedShipment(shp)}
                      className="hover:bg-muted/20 border-b border-border/20 transition-colors cursor-pointer group/row"
                    >
                      {/* ID */}
                      <TableCell className="py-4">
                        <span className="font-mono font-bold text-xs bg-muted/60 border border-border/40 text-foreground px-2.5 py-1 rounded-md select-all group-hover/row:border-[#14b8a6]/25 transition-all">
                          {shp.id}
                        </span>
                      </TableCell>

                      {/* Order reference */}
                      <TableCell className="py-4">
                        <span className="font-mono font-bold text-xs text-muted-foreground">
                          {shp.order}
                        </span>
                      </TableCell>

                      {/* Customer Name */}
                      <TableCell className="py-4 font-semibold text-sm text-foreground">
                        {shp.customer}
                      </TableCell>

                      {/* Destination City */}
                      <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground/60" />
                          <span>{shp.city}</span>
                        </div>
                      </TableCell>

                      {/* Courier */}
                      <TableCell className="py-4 text-sm text-foreground font-normal">
                        {shp.courier}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                          <span>{shp.date}</span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4 text-center">
                        <Badge className={`text-xs font-semibold rounded-md px-2.5 py-1 border border-transparent select-none ${statusStyles[shp.status] || ''}`}>
                          {shp.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredShipments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <Info className="h-8 w-8 text-muted-foreground/60" />
                          <p className="text-sm font-semibold text-muted-foreground">No matching shipments found</p>
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
        <Sheet open={selectedShipment !== null} onOpenChange={(open) => { if (!open) setSelectedShipment(null); }}>
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            {selectedShipment && (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-sm bg-muted/60 border border-border/40 px-3 py-1 rounded-lg select-all">
                        {selectedShipment.id}
                      </span>
                      <Badge className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[selectedShipment.status]}`}>
                        {selectedShipment.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Shipment Details</h2>
                    <p className="text-xs text-muted-foreground mt-0.5 font-light">Order reference ID: {selectedShipment.order}</p>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-6 space-y-6 h-full overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5 text-primary" /> Delivery Carrier
                        </span>
                        <h4 className="text-lg font-black mt-1.5">{selectedShipment.courier}</h4>
                      </CardContent>
                    </Card>

                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary" /> Destination City
                        </span>
                        <h4 className="text-lg font-black text-foreground mt-1.5">{selectedShipment.city}</h4>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Recipient Details</h3>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/15 space-y-2 text-sm font-semibold">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-normal">Customer Name</span>
                        <span>{selectedShipment.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-normal">Dispatch Date</span>
                        <span>{selectedShipment.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Carrier Tracking URL</h3>
                    <div className="p-3 bg-muted/20 border border-border/30 rounded-xl flex items-center justify-between text-xs font-mono font-bold">
                      <span className="truncate mr-3">{selectedShipment.trackingUrl}</span>
                      <a href={selectedShipment.trackingUrl} target="_blank" rel="noreferrer" className="text-[#14b8a6] hover:underline font-semibold shrink-0">
                        Track online ↗
                      </a>
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
