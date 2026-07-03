'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
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
  Eye,
  Copy,
  Filter,
  Download,
} from 'lucide-react';
import { motion } from 'framer-motion';

const products = [
  {
    id: '1',
    name: 'Summer Floral Dress',
    sku: 'SKU-001',
    price: 99.99,
    stock: 45,
    category: 'Dresses',
    brand: 'Aura Original',
    status: 'active',
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    image: '/placeholder-product-1.jpg',
  },
  {
    id: '2',
    name: 'Classic White Blouse',
    sku: 'SKU-002',
    price: 79.99,
    stock: 32,
    category: 'Tops',
    brand: 'Aura Original',
    status: 'active',
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    image: '/placeholder-product-2.jpg',
  },
  {
    id: '3',
    name: 'High-Waist Jeans',
    sku: 'SKU-003',
    price: 89.99,
    stock: 28,
    category: 'Bottoms',
    brand: 'Aura Denim',
    status: 'active',
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    image: '/placeholder-product-3.jpg',
  },
  {
    id: '4',
    name: 'Silk Scarf',
    sku: 'SKU-004',
    price: 49.99,
    stock: 15,
    category: 'Accessories',
    brand: 'Aura Accessories',
    status: 'active',
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    image: '/placeholder-product-4.jpg',
  },
  {
    id: '5',
    name: 'Leather Handbag',
    sku: 'SKU-005',
    price: 199.99,
    stock: 8,
    category: 'Accessories',
    brand: 'Aura Luxury',
    status: 'active',
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    image: '/placeholder-product-5.jpg',
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', stock: '', category: 'Dresses' });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setSheetOpen(false);
    setFormData({ name: '', sku: '', price: '', stock: '', category: 'Dresses' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Products</h1>
            <p className="text-muted-foreground mt-1 font-normal">Manage your product inventory</p>
          </div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">Add Product</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Add a new product to your inventory.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleAddProduct} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold">Product Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Summer Floral Dress"
                    className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku" className="text-xs font-semibold">SKU</Label>
                  <Input
                    id="sku"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. SKU-001"
                    className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-xs font-semibold">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g. 99.99"
                      className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock" className="text-xs font-semibold">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="e.g. 50"
                      className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-xs font-semibold">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 rounded-md border border-border/60 bg-background px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none"
                  >
                    <option value="Dresses">Dresses</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <SheetFooter className="pt-4 gap-2">
                  <Button type="button" variant="ghost" onClick={() => setSheetOpen(false)} className="rounded-md">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-md bg-primary text-white hover:bg-primary/95">
                    Add Product
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
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
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-warning">
                    {products.filter(p => p.stock < 20).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Featured</p>
                  <p className="text-2xl font-bold text-primary">
                    {products.filter(p => p.isFeatured).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name or SKU..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 font-semibold">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead className="font-semibold">Product</TableHead>
                    <TableHead className="font-semibold">SKU</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Stock</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Tags</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <input 
                          type="checkbox" 
                          className="rounded"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts([...selectedProducts, product.id]);
                            } else {
                              setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-xs font-medium text-muted-foreground">IMG</span>
                          </div>
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground font-normal">{product.brand}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell className="font-bold">${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={product.stock < 20 ? 'text-warning font-medium' : 'font-medium'}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={product.status === 'active' ? 'default' : 'secondary'}
                          className={product.status === 'active' ? 'bg-success' : ''}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {product.isFeatured && (
                            <Badge variant="outline" className="text-xs">Featured</Badge>
                          )}
                          {product.isTrending && (
                            <Badge variant="outline" className="text-xs">Trending</Badge>
                          )}
                          {product.isBestSeller && (
                            <Badge variant="outline" className="text-xs">Best Seller</Badge>
                          )}
                        </div>
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
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
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

            {selectedProducts.length > 0 && (
              <div className="mt-4 flex items-center justify-between p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground font-normal">
                  {selectedProducts.length} products selected
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Export</Button>
                  <Button variant="destructive" size="sm">Delete Selected</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
