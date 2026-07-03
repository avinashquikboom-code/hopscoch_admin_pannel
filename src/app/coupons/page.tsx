'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy,
  Calendar,
  Percent,
  DollarSign
} from 'lucide-react';

const coupons = [
  {
    id: '1',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    minimumOrder: 100,
    maximumDiscount: 50,
    expiryDate: '2024-08-31',
    usageLimit: 1000,
    usedCount: 245,
    isActive: true,
  },
  {
    id: '2',
    code: 'WELCOME10',
    type: 'flat',
    value: 10,
    minimumOrder: 50,
    maximumDiscount: null,
    expiryDate: '2024-12-31',
    usageLimit: 500,
    usedCount: 89,
    isActive: true,
  },
  {
    id: '3',
    code: 'FESTIVAL25',
    type: 'percentage',
    value: 25,
    minimumOrder: 200,
    maximumDiscount: 100,
    expiryDate: '2024-11-30',
    usageLimit: 200,
    usedCount: 156,
    isActive: true,
  },
  {
    id: '4',
    code: 'FLASHSALE',
    type: 'percentage',
    value: 30,
    minimumOrder: 150,
    maximumDiscount: 75,
    expiryDate: '2024-01-31',
    usageLimit: 100,
    usedCount: 100,
    isActive: false,
  },
];

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Coupons</h1>
            <p className="text-muted-foreground mt-1">Manage discount coupons and promotions</p>
          </div>
          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger render={
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Create Coupon
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-[500px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl font-semibold">Create New Coupon</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground font-normal">
                  Create a new discount coupon for your customers
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm font-medium">Coupon Code *</Label>
                  <Input id="code" placeholder="e.g., SUMMER20" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">Discount Type *</Label>
                  <Select>
                    <SelectTrigger className="h-11 rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="flat">Flat Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value" className="text-sm font-medium">Discount Value *</Label>
                  <Input id="value" type="number" placeholder="Enter value" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minimumOrder" className="text-sm font-medium">Minimum Order</Label>
                    <Input id="minimumOrder" type="number" placeholder="0" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maximumDiscount" className="text-sm font-medium">Maximum Discount</Label>
                    <Input id="maximumDiscount" type="number" placeholder="No limit" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</Label>
                    <Input id="expiryDate" type="date" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usageLimit" className="text-sm font-medium">Usage Limit</Label>
                    <Input id="usageLimit" type="number" placeholder="Unlimited" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                  </div>
                </div>
                <div className="pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox id="active" defaultChecked className="rounded border-border/60 accent-primary h-5 w-5" />
                      <Label htmlFor="active" className="text-sm font-medium cursor-pointer">Active Coupon</Label>
                    </div>
                    <span className="text-xs text-muted-foreground">Available to use</span>
                  </div>
                </div>
              </div>
              <SheetFooter className="pt-6 mt-6 border-t border-border/60 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-md h-10 px-6">
                  Cancel
                </Button>
                <Button className="rounded-md h-10 px-6 bg-primary hover:bg-primary-dark">
                  Create Coupon
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Coupons</p>
                  <p className="text-2xl font-bold">{coupons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-success">
                    {coupons.filter(c => c.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Uses</p>
                  <p className="text-2xl font-bold text-primary">
                    {coupons.reduce((acc, c) => acc + c.usedCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold text-warning">
                    {coupons.reduce((acc, c) => acc + (c.usageLimit - c.usedCount), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coupons Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search coupons..."
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
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Min Order</TableHead>
                    <TableHead>Max Discount</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {coupon.code}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyCode(coupon.code)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {coupon.type === 'percentage' ? (
                            <Percent className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                          )}
                          {coupon.type}
                        </div>
                      </TableCell>
                      <TableCell>
                        {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                      </TableCell>
                      <TableCell>${coupon.minimumOrder}</TableCell>
                      <TableCell>
                        {coupon.maximumDiscount ? `$${coupon.maximumDiscount}` : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{coupon.usedCount}</span>
                          <span className="text-muted-foreground">/ {coupon.usageLimit}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {coupon.expiryDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={coupon.isActive ? 'default' : 'secondary'}
                          className={coupon.isActive ? 'bg-success' : ''}
                        >
                          {coupon.isActive ? 'Active' : 'Inactive'}
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
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Code
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
