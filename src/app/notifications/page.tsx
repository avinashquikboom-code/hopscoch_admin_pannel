'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Search,
  MoreVertical,
  Send,
  Trash2,
  Bell,
  Tag,
  ShoppingBag,
  Users,
  Calendar,
  CheckCircle2,
  Upload,
  Clock,
  Radio,
  Target,
} from 'lucide-react';

const notifications = [
  {
    id: '1',
    title: 'Summer Sale is Live!',
    message: 'Get up to 50% off on all summer collection items. Limited time offer!',
    type: 'offer',
    sendToAll: true,
    targetUsers: [],
    isSent: true,
    sentAt: 'Jun 1, 2024 10:00 AM',
  },
  {
    id: '2',
    title: 'New Coupon: WELCOME20',
    message: 'Use code WELCOME20 to get 20% off your first order.',
    type: 'coupon',
    sendToAll: false,
    targetUsers: ['user1', 'user2', 'user3'],
    isSent: true,
    sentAt: 'Jun 2, 2024 2:00 PM',
  },
  {
    id: '3',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped and will arrive in 2-3 business days.',
    type: 'order',
    sendToAll: false,
    targetUsers: ['user4'],
    isSent: true,
    sentAt: 'Jun 3, 2024 9:00 AM',
  },
  {
    id: '4',
    title: 'New Collection Alert',
    message: 'Check out our new winter collection now available in store.',
    type: 'general',
    sendToAll: true,
    targetUsers: [],
    isSent: false,
    sentAt: null,
  },
];

const notificationTypes = [
  { value: 'offer', label: 'Offer', icon: Tag, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { value: 'coupon', label: 'Coupon', icon: Tag, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { value: 'order', label: 'Order Update', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { value: 'general', label: 'General', icon: Bell, color: 'text-primary', bg: 'bg-primary/10' },
];

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sendToAll, setSendToAll] = useState(true);

  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: 'Total Sent',
      value: notifications.filter((n) => n.isSent).length,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Pending',
      value: notifications.filter((n) => !n.isSent).length,
      icon: Clock,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Broadcast',
      value: notifications.filter((n) => n.sendToAll).length,
      icon: Radio,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Targeted',
      value: notifications.filter((n) => !n.sendToAll).length,
      icon: Target,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1 text-sm font-light">
              Send and manage push notifications to your customers.
            </p>
          </div>
          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger render={
              <Button className="gap-2 rounded-md">
                <Plus className="h-4 w-4" />
                Send Notification
              </Button>
            } />
            <SheetContent side="right" className="w-[550px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl font-bold">Send New Notification</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  Compose and send a push notification to users.
                </SheetDescription>
              </SheetHeader>
              <Separator className="mb-6" />
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-sm font-semibold">Title *</Label>
                  <Input id="title" placeholder="Summer Sale is Live!" className="h-11 rounded-lg" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="type" className="text-sm font-semibold">Notification Type *</Label>
                  <Select>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue placeholder="Select a type..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      {notificationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="rounded-lg">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-sm font-semibold">Message *</Label>
                  <Textarea id="message" placeholder="Write your notification message..." rows={3} className="rounded-lg resize-none" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="link" className="text-sm font-semibold">Link URL <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input id="link" placeholder="https://example.com/page" className="h-11 rounded-lg" />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Image <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <div className="border-2 border-dashed border-border/60 rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload notification image</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border/40">
                    <Checkbox
                      id="sendToAll"
                      checked={sendToAll}
                      onCheckedChange={(checked) => setSendToAll(checked as boolean)}
                      className="h-5 w-5"
                    />
                    <div className="flex-1">
                      <Label htmlFor="sendToAll" className="text-sm font-semibold cursor-pointer">Send to All Users</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">Broadcast this notification to all registered users</p>
                    </div>
                  </div>
                </div>
                {!sendToAll && (
                  <div className="space-y-3">
                    <Label htmlFor="targetUsers" className="text-sm font-semibold">Target Users</Label>
                    <Input id="targetUsers" placeholder="Enter user IDs separated by comma..." className="h-11 rounded-lg" />
                  </div>
                )}
                <div className="pt-4 border-t border-border/40">
                  <SheetFooter className="gap-3 justify-end pt-4">
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-lg">
                      Cancel
                    </Button>
                    <Button className="rounded-lg gap-2 bg-primary text-white hover:bg-primary/95">
                      <Send className="h-4 w-4" />
                      Send Notification
                    </Button>
                  </SheetFooter>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-border/40 rounded-lg">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <h3 className={`text-3xl font-bold mt-1.5 ${stat.color}`}>{stat.value}</h3>
                  </div>
                  <div className={`h-11 w-11 rounded-md ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Notifications Table */}
        <Card className="border-border/40 rounded-lg">
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold">All Notifications</CardTitle>
                <CardDescription className="text-xs mt-0.5">{notifications.length} notifications total</CardDescription>
              </div>
              <div className="relative max-w-xs w-full group">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-10 h-9 rounded-md border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="border border-border/40 rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-border/40">
                    <TableHead className="text-xs font-semibold text-muted-foreground py-3">Type</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Title</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Message</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Target</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Sent At</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => {
                    const typeConfig = notificationTypes.find((t) => t.value === notification.type);
                    const Icon = typeConfig?.icon || Bell;
                    return (
                      <TableRow key={notification.id} className="hover:bg-muted/10 border-border/30">
                        <TableCell>
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig?.bg} ${typeConfig?.color}`}>
                            <Icon className="h-3 w-3" />
                            {typeConfig?.label || notification.type}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-sm text-foreground">
                          {notification.title}
                        </TableCell>
                        <TableCell>
                          <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                            {notification.message}
                          </p>
                        </TableCell>
                        <TableCell className="text-center">
                          {notification.sendToAll ? (
                            <Badge className="bg-primary/10 text-primary border-transparent rounded-full text-xs gap-1">
                              <Users className="h-3 w-3" /> All
                            </Badge>
                          ) : (
                            <Badge className="bg-muted text-muted-foreground border-transparent rounded-full text-xs">
                              {notification.targetUsers.length} users
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {notification.isSent ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-transparent rounded-full text-xs gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Sent
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-transparent rounded-full text-xs gap-1">
                              <Clock className="h-3 w-3" /> Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {notification.sentAt ? (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              {notification.sentAt}
                            </div>
                          ) : (
                            <span className="text-muted-foreground/40 text-xs">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger render={
                              <div className="h-8 w-8 rounded-lg hover:bg-muted/60 flex items-center justify-center cursor-pointer">
                                <MoreVertical className="h-4 w-4" />
                              </div>
                            } />
                            <DropdownMenuContent align="end" className="w-40 p-1 rounded-md border-border/50">
                              {!notification.isSent && (
                                <>
                                  <DropdownMenuItem className="text-xs font-medium rounded-lg cursor-pointer gap-2">
                                    <Send className="h-3.5 w-3.5" /> Send Now
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="my-1 border-border/30" />
                                </>
                              )}
                              <DropdownMenuItem className="text-xs font-medium rounded-lg cursor-pointer gap-2">
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="my-1 border-border/30" />
                              <DropdownMenuItem className="text-xs font-medium rounded-lg cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10">
                                <Trash2 className="h-3.5 w-3.5" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredNotifications.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                        No notifications found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
