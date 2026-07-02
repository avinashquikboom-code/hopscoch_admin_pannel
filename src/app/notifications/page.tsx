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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  CheckCircle,
  Upload
} from 'lucide-react';

const notifications = [
  {
    id: '1',
    title: 'Summer Sale is Live!',
    message: 'Get up to 50% off on all summer collection items. Limited time offer!',
    type: 'offer',
    sendToAll: true,
    targetUsers: [],
    imageUrl: '/notification-summer.jpg',
    link: '/summer-sale',
    isSent: true,
    sentAt: '2024-06-01 10:00',
    createdAt: '2024-05-31 15:00',
  },
  {
    id: '2',
    title: 'New Coupon: WELCOME20',
    message: 'Use code WELCOME20 to get 20% off your first order.',
    type: 'coupon',
    sendToAll: false,
    targetUsers: ['user1', 'user2', 'user3'],
    imageUrl: null,
    link: '/shop',
    isSent: true,
    sentAt: '2024-06-02 14:00',
    createdAt: '2024-06-02 13:00',
  },
  {
    id: '3',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped and will arrive in 2-3 business days.',
    type: 'order',
    sendToAll: false,
    targetUsers: ['user4'],
    imageUrl: null,
    link: '/orders/12345',
    isSent: true,
    sentAt: '2024-06-03 09:00',
    createdAt: '2024-06-03 08:00',
  },
  {
    id: '4',
    title: 'New Collection Alert',
    message: 'Check out our new winter collection now available in store.',
    type: 'general',
    sendToAll: true,
    targetUsers: [],
    imageUrl: '/notification-winter.jpg',
    link: '/winter-collection',
    isSent: false,
    sentAt: null,
    createdAt: '2024-06-04 10:00',
  },
];

const notificationTypes = [
  { value: 'offer', label: 'Offer', icon: Tag },
  { value: 'coupon', label: 'Coupon', icon: Tag },
  { value: 'order', label: 'Order Update', icon: ShoppingBag },
  { value: 'general', label: 'General', icon: Bell },
];

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sendToAll, setSendToAll] = useState(true);

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1">Manage push notifications</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Send New Notification</DialogTitle>
                <DialogDescription>
                  Send a push notification to users
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" placeholder="Enter notification title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Notification Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" placeholder="Enter notification message" rows={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Link URL (optional)</Label>
                  <Input id="link" placeholder="https://example.com/page" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image (optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sendToAll" 
                    checked={sendToAll}
                    onCheckedChange={(checked) => setSendToAll(checked as boolean)}
                  />
                  <Label htmlFor="sendToAll">Send to all users</Label>
                </div>
                {!sendToAll && (
                  <div className="space-y-2">
                    <Label htmlFor="targetUsers">Target Users</Label>
                    <Input id="targetUsers" placeholder="Enter user IDs (comma separated)" />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary-dark">
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sent</p>
                  <p className="text-2xl font-bold">
                    {notifications.filter(n => n.isSent).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">
                    {notifications.filter(n => !n.isSent).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Broadcast</p>
                  <p className="text-2xl font-bold text-primary">
                    {notifications.filter(n => n.sendToAll).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Targeted</p>
                  <p className="text-2xl font-bold text-info">
                    {notifications.filter(n => !n.sendToAll).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => {
                    const typeConfig = notificationTypes.find(t => t.value === notification.type);
                    return (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {typeConfig && <typeConfig.icon className="h-4 w-4 text-muted-foreground" />}
                            <Badge variant="outline">{typeConfig?.label || notification.type}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{notification.title}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">
                            {notification.message}
                          </div>
                        </TableCell>
                        <TableCell>
                          {notification.sendToAll ? (
                            <Badge className="bg-primary/10 text-primary">All Users</Badge>
                          ) : (
                            <Badge variant="outline">
                              {notification.targetUsers.length} users
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {notification.isSent ? (
                            <Badge className="bg-success/10 text-success flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Sent
                            </Badge>
                          ) : (
                            <Badge className="bg-warning/10 text-warning">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {notification.sentAt ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {notification.sentAt}
                            </div>
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
                              {!notification.isSent && (
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Now
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
