'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/layout/admin-layout';
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
  TrendingUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
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
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
  },
  {
    title: 'Total Customers',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Total Products',
    value: '892',
    change: '+2.1%',
    trend: 'up',
    icon: Package,
  },
];

const orderStats = [
  {
    title: 'Pending Orders',
    value: '45',
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    title: 'Delivered Orders',
    value: '1,089',
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    title: 'Cancelled Orders',
    value: '23',
    icon: XCircle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  {
    title: 'Low Stock Items',
    value: '12',
    icon: AlertTriangle,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
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
  { name: 'Dresses', value: 400, color: '#0d9488' },
  { name: 'Tops', value: 300, color: '#14b8a6' },
  { name: 'Bottoms', value: 200, color: '#2dd4bf' },
  { name: 'Accessories', value: 150, color: '#5eead4' },
  { name: 'Footwear', value: 100, color: '#99f6e4' },
];

const topProducts = [
  {
    name: 'Summer Floral Dress',
    sales: 234,
    revenue: '$23,400',
    image: '/placeholder-product-1.jpg',
  },
  {
    name: 'Classic White Blouse',
    sales: 189,
    revenue: '$18,900',
    image: '/placeholder-product-2.jpg',
  },
  {
    name: 'High-Waist Jeans',
    sales: 156,
    revenue: '$15,600',
    image: '/placeholder-product-3.jpg',
  },
  {
    name: 'Silk Scarf',
    sales: 134,
    revenue: '$13,400',
    image: '/placeholder-product-4.jpg',
  },
  {
    name: 'Leather Handbag',
    sales: 98,
    revenue: '$19,600',
    image: '/placeholder-product-5.jpg',
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="flex items-center mt-1 text-sm">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive mr-1" />
                    )}
                    <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Revenue & Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--primary)" 
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="var(--chart-2)" 
                      strokeWidth={2}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
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
                        borderRadius: '0.5rem',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Products & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{order.amount}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-success/10 text-success'
                          : order.status === 'Processing'
                          ? 'bg-info/10 text-info'
                          : order.status === 'Pending'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {order.status}
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
