'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, AlertTriangle, RefreshCw } from 'lucide-react';

const initialInventory = [
  { id: '1', sku: 'AURA-DR-001-S', name: 'Silk Cocktail Dress - S', category: 'Dresses', stock: 4, minStock: 5, location: 'Shelf A3' },
  { id: '2', sku: 'AURA-DR-001-M', name: 'Silk Cocktail Dress - M', category: 'Dresses', stock: 12, minStock: 5, location: 'Shelf A3' },
  { id: '3', sku: 'AURA-TS-042-L', name: 'Premium Cotton T-Shirt - L', category: 'Tops', stock: 2, minStock: 10, location: 'Shelf B1' },
  { id: '4', sku: 'AURA-BL-109-M', name: 'Chiffon Ruffle Blouse - M', category: 'Tops', stock: 25, minStock: 8, location: 'Shelf B4' },
  { id: '5', sku: 'AURA-JN-883-32', name: 'High-Waist Slim Jeans - 32', category: 'Bottoms', stock: 0, minStock: 6, location: 'Shelf C2' },
  { id: '6', sku: 'AURA-SK-054-S', name: 'A-Line Pleated Skirt - S', category: 'Bottoms', stock: 15, minStock: 5, location: 'Shelf C5' },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);

  const filtered = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (id: string, currentStock: number) => {
    setEditingId(id);
    setNewStockVal(currentStock);
  };

  const saveStock = (id: string) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, stock: newStockVal } : item
      )
    );
    setEditingId(null);
  };

  const getStockBadge = (stock: number, minStock: number) => {
    if (stock === 0) {
      return (
        <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 font-bold border-transparent rounded-full px-2.5 py-0.5">
          Out of Stock
        </Badge>
      );
    }
    if (stock <= minStock) {
      return (
        <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border-transparent rounded-full px-2.5 py-0.5">
          Low Stock
        </Badge>
      );
    }
    return (
      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border-transparent rounded-full px-2.5 py-0.5">
        In Stock
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Inventory</h1>
          <p className="text-muted-foreground mt-1 font-light">
            Monitor real-time warehouse stock levels, edit counts, and configure alerts.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/40 rounded-lg bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Items tracked</p>
                <h3 className="text-3xl font-bold mt-2 text-foreground">{inventory.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                <RefreshCw className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 rounded-lg bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Low Stock Warnings</p>
                <h3 className="text-3xl font-bold mt-2 text-amber-600 dark:text-amber-400">
                  {inventory.filter((i) => i.stock > 0 && i.stock <= i.minStock).length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 rounded-lg bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Out of Stock Alert</p>
                <h3 className="text-3xl font-bold mt-2 text-red-600 dark:text-red-400">
                  {inventory.filter((i) => i.stock === 0).length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-md bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory List Card */}
        <Card className="border-border/40 rounded-lg bg-card">
          <CardContent className="p-6 space-y-6">
            <div className="relative max-w-sm group">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search inventory by SKU or product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10 rounded-md"
              />
            </div>

            <div className="border border-border/40 rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Variant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Warehouse Bin</TableHead>
                    <TableHead className="text-center">Stock Level</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/10">
                      <TableCell className="font-mono text-sm font-semibold text-muted-foreground">{item.sku}</TableCell>
                      <TableCell className="text-sm font-semibold text-foreground">{item.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.category}</TableCell>
                      <TableCell className="text-sm font-light text-muted-foreground">{item.location}</TableCell>
                      <TableCell className="text-center text-sm font-semibold">
                        {editingId === item.id ? (
                          <Input
                            type="number"
                            value={newStockVal}
                            onChange={(e) => setNewStockVal(Number(e.target.value))}
                            className="w-16 h-8 mx-auto text-center rounded border-border/60"
                          />
                        ) : (
                          item.stock
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStockBadge(item.stock, item.minStock)}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingId === item.id ? (
                          <Button
                            size="sm"
                            onClick={() => saveStock(item.id)}
                            className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold h-8 px-3 cursor-pointer"
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(item.id, item.stock)}
                            className="rounded-lg h-8 px-3 cursor-pointer text-xs font-semibold text-primary hover:bg-primary/5"
                          >
                            Adjust Stock
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground text-sm font-light">
                        No inventory matches found.
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
