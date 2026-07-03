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
            <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Create New Coupon</SheetTitle>
                <SheetDescription>
                  Create a new discount coupon
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4 px-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Coupon Code *</Label>
                  <Input id="code" placeholder="Enter coupon code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="flat">Flat Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Discount Value *</Label>
                  <Input id="value" type="number" placeholder="Enter value" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minimumOrder">Minimum Order</Label>
                    <Input id="minimumOrder" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maximumDiscount">Maximum Discount</Label>
                    <Input id="maximumDiscount" type="number" placeholder="No limit" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usageLimit">Usage Limit</Label>
                    <Input id="usageLimit" type="number" placeholder="Unlimited" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary-dark">
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
                          <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
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
