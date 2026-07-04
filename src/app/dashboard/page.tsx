'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  Clock, 
  XCircle, 
  CheckCircle, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const stats = [
  {
    title: 'Total Revenue',
    value: '$124,563',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-[#14b8a6]',
    bgColor: 'bg-[#14b8a6]/10',
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'text-[#14b8a6]',
    bgColor: 'bg-[#14b8a6]/10',
  },
  {
    title: 'Total Customers',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'text-[#14b8a6]',
    bgColor: 'bg-[#14b8a6]/10',
  },
  {
    title: 'Total Products',
    value: '892',
    change: '+2.1%',
    trend: 'up',
    icon: Package,
    color: 'text-[#14b8a6]',
    bgColor: 'bg-[#14b8a6]/10',
  },
];

const orderStats = [
  {
    title: 'Pending Orders',
    value: '45',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Delivered Orders',
    value: '1,089',
    icon: CheckCircle,
    color: 'text-[#14b8a6]',
    bgColor: 'bg-[#14b8a6]/10',
  },
  {
    title: 'Cancelled Orders',
    value: '23',
    icon: XCircle,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
  {
    title: 'Low Stock Items',
    value: '12',
    icon: AlertTriangle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

const salesData = [
  { month: 'Jan', revenue: 40000, orders: 300 },
  { month: 'Feb', revenue: 30000, orders: 200 },
  { month: 'Mar', revenue: 50000, orders: 400 },
  { month: 'Apr', revenue: 45000, orders: 350 },
  { month: 'May', revenue: 60000, orders: 500 },
  { month: 'Jun', revenue: 70000, orders: 600 },
];

const categoryData = [
  { name: 'Dresses', value: 400, color: '#14b8a6' },
  { name: 'Tops', value: 300, color: '#0d9488' },
  { name: 'Bottoms', value: 200, color: '#99f6e4' },
  { name: 'Accessories', value: 150, color: '#2dd4bf' },
  { name: 'Footwear', value: 100, color: '#0f766e' },
];

const topProducts = [
  {
    name: 'Summer Floral Dress',
    sales: 234,
    revenue: '$23,400',
  },
  {
    name: 'Classic White Blouse',
    sales: 189,
    revenue: '$18,900',
  },
  {
    name: 'High-Waist Jeans',
    sales: 156,
    revenue: '$15,600',
  },
  {
    name: 'Silk Scarf',
    sales: 134,
    revenue: '$13,400',
  },
  {
    name: 'Leather Handbag',
    sales: 98,
    revenue: '$19,600',
  },
];

const recentOrders = [
  {
    id: '#ORD-1234',
    customer: 'Sarah Johnson',
    amount: '$234.50',
    status: 'Delivered',
    date: '2 mins ago',
  },
  {
    id: '#ORD-1235',
    customer: 'Michael Brown',
    amount: '$189.00',
    status: 'Processing',
    date: '15 mins ago',
  },
  {
    id: '#ORD-1236',
    customer: 'Emily Davis',
    amount: '$456.75',
    status: 'Pending',
    date: '1 hour ago',
  },
  {
    id: '#ORD-1237',
    customer: 'James Wilson',
    amount: '$123.25',
    status: 'Delivered',
    date: '2 hours ago',
  },
  {
    id: '#ORD-1238',
    customer: 'Lisa Anderson',
    amount: '$345.00',
    status: 'Cancelled',
    date: '3 hours ago',
  },
];

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        {/* Welcome Header */}
        <PageHeader
          showClock={true}
          badgeText="Active Platform Command Center"
          titlePart1="Dashboard Overview"
          subtitle="Monitor real-time corporate workspace parameters, track check-ins, and broadcast ecosystem-wide updates."
          actions={
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/40 border border-border/20 px-3.5 py-1.5 rounded-full w-fit h-10 select-none">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-ping" />
              Live Store Status
            </div>
          }
        />

        {/* Primary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2 text-xs font-medium">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#14b8a6] mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5 text-rose-500 mr-1" />
                        )}
                        <span className={stat.trend === 'up' ? 'text-[#14b8a6]' : 'text-rose-500'}>
                          {stat.change}
                        </span>
                        <span className="text-muted-foreground ml-1.5 font-normal">from last month</span>
                      </div>
                    </div>
                    <div className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Secondary Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 + index * 0.08 }}
            >
              <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Revenue & Sales Area Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Sales Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-8"
          >
            <Card className="border-border/30 rounded-lg bg-card/60 backdrop-blur-md overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 pb-4">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">Sales Performance</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5 font-normal">Historical monthly store statistics</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
                    Revenue
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
                    Orders
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="w-full h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/20" vertical={false} />
                      <XAxis dataKey="month" className="text-xs text-muted-foreground" tickLine={false} />
                      <YAxis className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '1rem',
                          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15)',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#14b8a6" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        name="Revenue ($)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#0d9488" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorOrders)"
                        name="Orders"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sales by Category Pie */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68 }}
            className="lg:col-span-4"
          >
            <Card className="border-border/30 rounded-lg bg-card/60 backdrop-blur-md h-full flex flex-col justify-between">
              <CardHeader className="border-b border-border/20 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">Categories</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5 font-normal">Product category distribution</p>
              </CardHeader>
              <CardContent className="pt-6 flex-1 flex flex-col justify-center">
                <div className="w-full h-[200px] relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '1rem',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">1,150</span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#14b8a6] shimmer-text">Total Sales</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 mt-6 pt-4 border-t border-border/10">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-muted-foreground truncate font-normal">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Products & Recent Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.76 }}
          >
            <Card className="border-border/30 rounded-lg bg-card/60 backdrop-blur-md">
              <CardHeader className="border-b border-border/20 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">Top Performing Products</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5 font-normal">Best seller items by sales count</p>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="divide-y divide-border/20 space-y-1">
                  {topProducts.map((product) => (
                    <div key={product.name} className="flex items-center gap-4 py-3 first:pt-1 last:pb-1">
                      <div className="flex-shrink-0 w-11 h-11 rounded-md bg-[#14b8a6]/10 flex items-center justify-center text-[#14b8a6] border border-[#14b8a6]/15">
                        <Package className="h-5.5 w-5.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground font-normal">{product.sales} sales units</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-[#14b8a6]">{product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Store Orders */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.84 }}
          >
            <Card className="border-border/30 rounded-lg bg-card/60 backdrop-blur-md">
              <CardHeader className="border-b border-border/20 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">Recent Transactions</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5 font-normal">Newly placed order logs</p>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="divide-y divide-border/20 space-y-1">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-4 py-3 first:pt-1 last:pb-1">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{order.customer}</p>
                        <p className="text-xs text-muted-foreground font-normal">{order.id} • {order.date}</p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <div>
                          <p className="font-bold text-sm text-[#14b8a6]">{order.amount}</p>
                        </div>
                        <div className={cn(
                          "px-2.5 py-1 rounded-full text-xxs font-semibold uppercase tracking-wider",
                          order.status === 'Delivered' 
                            ? 'bg-[#14b8a6]/10 text-[#14b8a6] dark:text-[#14b8a6]'
                            : order.status === 'Processing'
                            ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                            : order.status === 'Pending'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        )}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
