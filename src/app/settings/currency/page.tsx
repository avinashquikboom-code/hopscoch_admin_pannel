'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
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
  MoreVertical, 
  Edit, 
  Trash2,
  DollarSign,
  Check,
  X
} from 'lucide-react';

const currencies = [
  {
    id: '1',
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    exchangeRate: 1.00,
    isDefault: true,
    isEnabled: true,
  },
  {
    id: '2',
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    exchangeRate: 0.92,
    isDefault: false,
    isEnabled: true,
  },
  {
    id: '3',
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    exchangeRate: 0.79,
    isDefault: false,
    isEnabled: true,
  },
  {
    id: '4',
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    exchangeRate: 149.50,
    isDefault: false,
    isEnabled: false,
  },
  {
    id: '5',
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    exchangeRate: 83.12,
    isDefault: false,
    isEnabled: false,
  },
];

export default function CurrencyPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Currency</h1>
            <p className="text-muted-foreground mt-1">Manage supported currencies</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Currency
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Currency</DialogTitle>
                <DialogDescription>
                  Add a new currency to your store
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Currency Name *</Label>
                  <Input id="name" placeholder="e.g., Canadian Dollar" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Currency Code *</Label>
                  <Input id="code" placeholder="e.g., CAD" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Currency Symbol *</Label>
                  <Input id="symbol" placeholder="e.g., $" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exchangeRate">Exchange Rate *</Label>
                  <Input id="exchangeRate" type="number" step="0.01" placeholder="1.00" />
                  <p className="text-sm text-muted-foreground">Rate relative to default currency</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="enabled" defaultChecked />
                  <Label htmlFor="enabled">Enable immediately</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary-dark">
                  Add Currency
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Currencies</p>
                  <p className="text-2xl font-bold">{currencies.length}</p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enabled</p>
                  <p className="text-2xl font-bold text-success">
                    {currencies.filter(c => c.isEnabled).length}
                  </p>
                </div>
                <Check className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Default</p>
                  <p className="text-2xl font-bold text-primary">
                    {currencies.find(c => c.isDefault)?.code || 'None'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Currencies Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Currencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Currency</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Exchange Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currencies.map((currency) => (
                    <TableRow key={currency.id}>
                      <TableCell className="font-medium">{currency.name}</TableCell>
                      <TableCell className="font-mono text-sm">{currency.code}</TableCell>
                      <TableCell className="text-2xl">{currency.symbol}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          step="0.01" 
                          defaultValue={currency.exchangeRate}
                          className="w-32"
                        />
                      </TableCell>
                      <TableCell>
                        {currency.isEnabled ? (
                          <Badge className="bg-success/10 text-success">Enabled</Badge>
                        ) : (
                          <Badge variant="secondary">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {currency.isDefault ? (
                          <Badge className="bg-primary/10 text-primary">Default</Badge>
                        ) : (
                          <Button variant="ghost" size="sm">
                            Set Default
                          </Button>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Rate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {currency.isEnabled ? (
                                <X className="mr-2 h-4 w-4" />
                              ) : (
                                <Check className="mr-2 h-4 w-4" />
                              )}
                              {currency.isEnabled ? 'Disable' : 'Enable'}
                            </DropdownMenuItem>
                            {!currency.isDefault && (
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            )}
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
