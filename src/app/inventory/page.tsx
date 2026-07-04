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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  AlertTriangle, 
  RefreshCw, 
  Package, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Hash, 
  Plus, 
  Sparkles,
  Info,
  Sliders,
  Eye,
  Settings,
  Trash2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const initialInventory = [
  { id: '1', sku: 'AURA-DR-001-S', name: 'Silk Cocktail Dress - S', category: 'Dresses', stock: 4, minStock: 5, location: 'Shelf A3', description: 'Small size variant of the Silk Cocktail Dress. Silk fabric.' },
  { id: '2', sku: 'AURA-DR-001-M', name: 'Silk Cocktail Dress - M', category: 'Dresses', stock: 12, minStock: 5, location: 'Shelf A3', description: 'Medium size variant of the Silk Cocktail Dress. Silk fabric.' },
  { id: '3', sku: 'AURA-TS-042-L', name: 'Premium Cotton T-Shirt - L', category: 'Tops', stock: 2, minStock: 10, location: 'Shelf B1', description: 'Large size variant of the Premium Cotton Tee. 100% Cotton.' },
  { id: '4', sku: 'AURA-BL-109-M', name: 'Chiffon Ruffle Blouse - M', category: 'Tops', stock: 25, minStock: 8, location: 'Shelf B4', description: 'Medium size variant of the Chiffon Ruffle Blouse. Semi-sheer.' },
  { id: '5', sku: 'AURA-JN-883-32', name: 'High-Waist Slim Jeans - 32', category: 'Bottoms', stock: 0, minStock: 6, location: 'Shelf C2', description: 'Size 32 variant of the High-Waist Jeans. Stretch denim.' },
  { id: '6', sku: 'AURA-SK-054-S', name: 'A-Line Pleated Skirt - S', category: 'Bottoms', stock: 15, minStock: 5, location: 'Shelf C5', description: 'Small size variant of the A-Line Pleated Skirt.' },
];

export default function InventoryPage() {
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ sku: '', name: '', category: 'Dresses', stock: '10', minStock: '5', location: 'Shelf A1', description: '' });

  // Selected Item for Preview
  const [selectedItem, setSelectedItem] = useState<typeof initialInventory[0] | null>(null);

  // Adjust stock inputs in drawer
  const [qtyInput, setQtyInput] = useState('');

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: String(inventoryList.length + 1),
      sku: formData.sku.toUpperCase().replace(/\s+/g, ''),
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock) || 0,
      minStock: parseInt(formData.minStock) || 5,
      location: formData.location || 'Shelf A1',
      description: formData.description || `Inventory record for ${formData.name}`,
    };
    setInventoryList([...inventoryList, newItem]);
    setFormData({ sku: '', name: '', category: 'Dresses', stock: '10', minStock: '5', location: 'Shelf A1', description: '' });
    setIsAddOpen(false);
  };

  const handleAdjustStock = (itemId: string, quantity: number) => {
    setInventoryList(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const newStock = Math.max(0, item.stock + quantity);
          return { ...item, stock: newStock };
        }
        return item;
      })
    );
    setSelectedItem(prev => {
      if (prev && prev.id === itemId) {
        return { ...prev, stock: Math.max(0, prev.stock + quantity) };
      }
      return prev;
    });
  };

  const handleSaveThreshold = (itemId: string, newMin: number) => {
    setInventoryList(prev =>
      prev.map(item => item.id === itemId ? { ...item, minStock: Math.max(0, newMin) } : item)
    );
    setSelectedItem(prev => {
      if (prev && prev.id === itemId) {
        return { ...prev, minStock: Math.max(0, newMin) };
      }
      return prev;
    });
  };

  const handleDeleteItem = (itemId: string) => {
    setInventoryList(prev => prev.filter(i => i.id !== itemId));
    setSelectedItem(null);
  };

  const filteredInventory = useMemo(() => {
    return inventoryList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [inventoryList, searchQuery]);

  const stats = useMemo(() => {
    const totalCount = inventoryList.length;
    const lowStockCount = inventoryList.filter((i) => i.stock > 0 && i.stock <= i.minStock).length;
    const outOfStockCount = inventoryList.filter((i) => i.stock === 0).length;
    return {
      totalCount,
      lowStockCount,
      outOfStockCount
    };
  }, [inventoryList]);

  const getStockBadge = (stock: number, minStock: number) => {
    if (stock === 0) {
      return (
        <Badge className="bg-rose-500/10 text-rose-500 dark:bg-rose-500/5 dark:text-rose-400 border border-rose-500/20 rounded-md px-2.5 py-1 text-xs font-semibold">
          Out of Stock
        </Badge>
      );
    }
    if (stock <= minStock) {
      return (
        <Badge className="bg-amber-500/10 text-amber-500 dark:bg-amber-500/5 dark:text-amber-400 border border-amber-500/20 rounded-md px-2.5 py-1 text-xs font-semibold">
          Low Stock
        </Badge>
      );
    }
    return (
      <Badge className="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5 dark:text-emerald-400 border border-emerald-500/20 rounded-md px-2.5 py-1 text-xs font-semibold">
        In Stock
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Inventory"
          titlePart2="Control"
          badgeText="Inventory Command Center"
          subtitle="Monitor real-time warehouse stock counts, adjust inventory levels, and configure alert thresholds."
          actions={
            <Button onClick={() => setIsAddOpen(true)} className="rounded-lg bg-primary hover:bg-primary/95 text-white flex items-center gap-2 cursor-pointer h-10 shadow-sm">
              <Plus className="h-4 w-4" /> Add Item Record
            </Button>
          }
        />

        {/* Premium KPI Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-[#14b8a6]/5 to-[#0d9488]/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total SKUs Mapped</span>
                <h3 className="text-3xl font-black text-foreground tracking-tight mt-2">{stats.totalCount} Variants</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Package className="h-5.5 w-5.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Low Stock Alert</span>
                <h3 className="text-3xl font-black text-foreground tracking-tight mt-2 text-amber-500">{stats.lowStockCount} Warnings</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <AlertTriangle className="h-5.5 w-5.5 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-rose-500/5 to-pink-500/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Out of Stock Alert</span>
                <h3 className="text-3xl font-black text-foreground tracking-tight mt-2 text-rose-500">{stats.outOfStockCount} Depleted</h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                <AlertTriangle className="h-5.5 w-5.5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory List Panel */}
        <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-bold text-foreground">Warehouse Stock Ledger</span>
              <div className="relative max-w-sm flex-1 group">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search inventory by SKU, product name, or bin..."
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
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">SKU Code</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Product Variant</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Category</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Warehouse Bin</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Stock Level</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Status</TableHead>
                    <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 w-28">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow 
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="hover:bg-muted/20 border-b border-border/20 transition-colors cursor-pointer group/row"
                    >
                      {/* SKU */}
                      <TableCell className="py-4">
                        <span className="font-mono font-bold text-xs bg-muted/60 border border-border/40 text-foreground px-2.5 py-1 rounded-md select-all group-hover/row:border-[#14b8a6]/25 transition-all">
                          {item.sku}
                        </span>
                      </TableCell>

                      {/* Variant name */}
                      <TableCell className="py-4 font-semibold text-sm text-foreground">
                        {item.name}
                      </TableCell>

                      {/* Category */}
                      <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                        {item.category}
                      </TableCell>

                      {/* Bin Location */}
                      <TableCell className="py-4 text-sm text-muted-foreground font-light">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground/60" />
                          <span>{item.location}</span>
                        </div>
                      </TableCell>

                      {/* Stock Level count */}
                      <TableCell className="py-4 text-center font-bold text-sm text-foreground">
                        {item.stock} units
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-4 text-center">
                        {getStockBadge(item.stock, item.minStock)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                          className="rounded-lg h-8 px-3 cursor-pointer text-xs font-semibold text-primary hover:bg-primary/5"
                        >
                          Adjust Stock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredInventory.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <AlertTriangle className="h-8 w-8 text-muted-foreground/60" />
                          <p className="text-sm font-semibold text-muted-foreground">No matching inventory items found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Inventory Item Slide Drawer */}
        <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
          <SheetContent side="right" className="w-full sm:max-w-[480px] p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            <SheetHeader className="p-6 border-b border-border/20">
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Add Inventory Item
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Map a specific SKU variant to a warehouse shelf bin location and initial stock levels.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreateItem} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sku" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">SKU Code</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="sku" 
                        required
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="e.g. AURA-DR-01" 
                        className="pl-10 h-11 rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Bin Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location" 
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Shelf A5" 
                        className="pl-10 h-11 rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Variant Name</Label>
                  <Input 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Silk Cocktail Dress - S" 
                    className="h-11 rounded-lg border-border/50 focus:border-primary" 
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5 col-span-2">
                    <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category Department</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-11 rounded-lg border border-border/50 bg-background px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
                    >
                      <option value="Dresses">Dresses</option>
                      <option value="Tops">Tops</option>
                      <option value="Bottoms">Bottoms</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="stock" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Stock</Label>
                    <Input 
                      id="stock" 
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="h-11 rounded-lg border-border/50 focus:border-primary" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="minStock" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Low Alert Threshold</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                      placeholder="5"
                      className="h-11 rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Variant Details</Label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe variant parameters for warehouse logistics..."
                    className="w-full p-3 rounded-lg border border-border/50 bg-background text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-none"
                  />
                </div>
              </div>

              <SheetFooter className="p-6 bg-muted/15 border-t border-border/20 flex gap-3 justify-end">
                <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)} className="rounded-lg h-11 px-6">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-lg h-11 px-6 bg-primary text-white hover:bg-primary/95">
                  Publish Item
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>

        {/* Quick View Details Drawer */}
        <Sheet open={selectedItem !== null} onOpenChange={(open) => { if (!open) setSelectedItem(null); }}>
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            {selectedItem && (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-sm bg-muted/60 border border-border/40 px-3 py-1 rounded-lg select-all">
                        {selectedItem.sku}
                      </span>
                      {getStockBadge(selectedItem.stock, selectedItem.minStock)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-lg text-rose-500 hover:bg-rose-500/10" 
                      onClick={() => handleDeleteItem(selectedItem.id)}
                      title="Delete Record"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </Button>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedItem.name}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5 font-light">Bin Location: {selectedItem.location}</p>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-6 space-y-6 h-full overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Package className="h-3.5 w-3.5 text-primary" /> Stock Level
                        </span>
                        <h4 className={`text-2xl font-black mt-1.5 ${selectedItem.stock === 0 ? 'text-rose-500' : selectedItem.stock <= selectedItem.minStock ? 'text-amber-500' : 'text-foreground'}`}>
                          {selectedItem.stock} Units
                        </h4>
                      </CardContent>
                    </Card>

                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Sliders className="h-3.5 w-3.5 text-primary" /> Low Threshold Alert
                        </span>
                        <h4 className="text-2xl font-black text-foreground mt-1.5">{selectedItem.minStock} Units</h4>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Stock adjuster controls */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Adjust Quantity</h3>
                    <Card className="border-border/30 bg-muted/5 rounded-xl shadow-sm">
                      <CardContent className="p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            className="h-10 w-10 p-0 text-foreground text-lg rounded-lg border-border/40 font-bold"
                            onClick={() => handleAdjustStock(selectedItem.id, -1)}
                          >
                            -
                          </Button>
                          <Input 
                            type="number" 
                            placeholder="Qty"
                            className="w-16 h-10 text-center rounded-lg border-border/40 font-mono font-bold"
                            value={qtyInput}
                            onChange={(e) => setQtyInput(e.target.value)}
                          />
                          <Button 
                            variant="outline" 
                            className="h-10 w-10 p-0 text-foreground text-lg rounded-lg border-border/40 font-bold"
                            onClick={() => handleAdjustStock(selectedItem.id, 1)}
                          >
                            +
                          </Button>
                          <Button
                            className="h-10 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-3"
                            onClick={() => {
                              const qty = parseInt(qtyInput) || 0;
                              if (qty !== 0) {
                                handleAdjustStock(selectedItem.id, qty);
                                setQtyInput('');
                              }
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Threshold Adjuster */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Configure Alerts</h3>
                    <div className="p-4 rounded-xl border border-border/30 bg-muted/15 space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="threshold" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                          <Settings className="h-3.5 w-3.5" /> Warning Threshold Limit
                        </Label>
                        <Input
                          id="threshold"
                          type="number"
                          defaultValue={selectedItem.minStock}
                          onChange={(e) => handleSaveThreshold(selectedItem.id, parseInt(e.target.value) || 0)}
                          className="h-10 rounded-lg border-border/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Item Description</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {selectedItem.description}
                    </p>
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
