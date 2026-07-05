'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
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
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Package,
  CheckCircle2,
  AlertTriangle,
  Star,
  DollarSign,
  Layers,
  Sparkles,
  Grid3X3,
  List,
  TrendingUp,
  X,
  RefreshCw
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
function authHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

function normalizeProduct(raw: any) {
  return {
    id: raw.id || raw._id || String(Math.random()),
    name: raw.name || raw.title || 'Unnamed Product',
    sku: raw.sku || raw.code || `SKU-${raw.id?.slice(0, 6) || '000'}`,
    price: Number(raw.price || raw.sellingPrice || raw.mrp || 0),
    stock: Number(raw.stock ?? raw.stockQuantity ?? raw.inventory?.quantity ?? 0),
    category: raw.category?.name || raw.categoryName || raw.category || 'General',
    brand: raw.brand?.name || raw.brandName || raw.brand || 'Unbranded',
    status: (raw.status || (raw.isActive ? 'active' : 'inactive')).toLowerCase(),
    isFeatured: raw.isFeatured ?? false,
    isTrending: raw.isTrending ?? false,
    isBestSeller: raw.isBestSeller ?? false,
    description: raw.description || raw.shortDescription || '',
    images: raw.images || [],
  };
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', stock: '', category: 'Dresses', brand: 'Aura Original', description: '' });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stockLevelFilter, setStockLevelFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [adjustQtyInput, setAdjustQtyInput] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/catalog/products`, { headers: authHeaders() });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to load products');
      const raw = json.data ?? json.products ?? json ?? [];
      setProductsList(Array.isArray(raw) ? raw.map(normalizeProduct) : []);
    } catch (e: any) { setError(e.message); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      name: formData.name, sku: formData.sku,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      category: formData.category, brand: formData.brand,
      description: formData.description,
      status: 'active', isFeatured: false, isTrending: false, isBestSeller: false,
    };
    try {
      const res = await fetch(`${API_BASE}/api/catalog/products`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
      const json = await res.json();
      if (res.ok) { await fetchProducts(); }
      else { setProductsList(prev => [normalizeProduct({ ...body, id: String(Date.now()) }), ...prev]); }
    } catch { setProductsList(prev => [normalizeProduct({ ...body, id: String(Date.now()) }), ...prev]); }
    setAddSheetOpen(false);
    setFormData({ name: '', sku: '', price: '', stock: '', category: 'Dresses', brand: 'Aura Original', description: '' });
  };

  const handleUpdateStock = (productId: string, quantity: number) => {
    setProductsList(prev => 
      prev.map(p => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock + quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
    setSelectedProduct((prev: any) => {
      if (prev && prev.id === productId) {
        return { ...prev, stock: Math.max(0, prev.stock + quantity) };
      }
      return prev;
    });
  };

  const handleToggleFeatured = (productId: string) => {
    setProductsList(prev => 
      prev.map(p => {
        if (p.id === productId) {
          return { ...p, isFeatured: !p.isFeatured };
        }
        return p;
      })
    );
    setSelectedProduct((prev: any) => {
      if (prev && prev.id === productId) {
        return { ...prev, isFeatured: !prev.isFeatured };
      }
      return prev;
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
    setSelectedProduct(null);
    try { await fetch(`${API_BASE}/api/catalog/products/${productId}`, { method: 'DELETE', headers: authHeaders() }); } catch { }
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      
      let matchesStock = true;
      if (stockLevelFilter !== 'all') {
        if (stockLevelFilter === 'out') matchesStock = product.stock === 0;
        else if (stockLevelFilter === 'low') matchesStock = product.stock > 0 && product.stock < 20;
        else if (stockLevelFilter === 'in') matchesStock = product.stock >= 20;
      }

      return matchesSearch && matchesCategory && matchesBrand && matchesStatus && matchesStock;
    });
  }, [productsList, searchQuery, categoryFilter, brandFilter, statusFilter, stockLevelFilter]);

  const stats = useMemo(() => {
    const totalCount = productsList.length;
    const activeCount = productsList.filter(p => p.status === 'active').length;
    const lowStockCount = productsList.filter(p => p.stock < 20).length;
    const featuredCount = productsList.filter(p => p.isFeatured).length;

    return {
      totalCount,
      activeCount,
      lowStockCount,
      featuredCount
    };
  }, [productsList]);

  const getProductGradient = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const gradients = [
      'from-pink-400/20 to-rose-500/20 text-rose-500',
      'from-purple-400/20 to-indigo-500/20 text-indigo-500',
      'from-blue-400/20 to-cyan-500/20 text-cyan-500',
      'from-emerald-400/20 to-teal-500/20 text-teal-500',
      'from-amber-400/20 to-orange-500/20 text-orange-500',
    ];
    return gradients[Math.abs(hash) % gradients.length];
  };

  const isFiltersApplied = categoryFilter !== 'all' || brandFilter !== 'all' || statusFilter !== 'all' || stockLevelFilter !== 'all';

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setBrandFilter('all');
    setStatusFilter('all');
    setStockLevelFilter('all');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Product"
          titlePart2="Inventory"
          badgeText="Products Command Center"
          subtitle="Manage your product inventory, monitor stock levels, and publish items to the store."
          actions={
            <Button onClick={() => setAddSheetOpen(true)} className="bg-primary hover:bg-primary-dark h-10 rounded-lg flex items-center gap-2 cursor-pointer shadow-sm">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          }
        />

        {/* Premium KPI Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Total Products</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stats.totalCount} SKUs</p>
                  <p className="text-xs text-muted-foreground mt-1">Active items in catalog</p>
                </div>
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Active & Published</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stats.activeCount} Live</p>
                  <p className="text-xs text-muted-foreground mt-1">Visible to customers online</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Low Stock Items</p>
                  <p className="text-2xl font-bold text-amber-500 mt-2">{stats.lowStockCount} Alert</p>
                  <p className="text-xs text-muted-foreground mt-1">With less than 20 units remaining</p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-lg bg-card hover:border-border/50 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Featured Products</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stats.featuredCount} Showcased</p>
                  <p className="text-xs text-muted-foreground mt-1">Highlighted on storefront banners</p>
                </div>
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-500">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Primary Product Dashboard Panel */}
        <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6">
            
            {/* Toolbar Actions */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search query input */}
                <div className="relative flex-1 max-w-md group">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-[#14b8a6] transition-colors" />
                  <Input
                    placeholder="Search products by name, SKU, or brand..."
                    className="pl-11 bg-muted/20 border-border/40 hover:border-border/60 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/20 h-10 rounded-lg transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filter and Export buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant={showFilters ? 'default' : 'outline'} 
                    size="sm"
                    className="rounded-lg h-10 px-4 flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {isFiltersApplied && (
                      <span className="ml-1 w-2 h-2 rounded-full bg-[#14b8a6]" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg h-10 px-4 flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Advanced Expandable Filter Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-muted/30 border border-border/40 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {/* Filter by Category */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Layers className="h-3 w-3" /> Category
                        </span>
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="w-full h-10 rounded-lg border border-border/40 bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#14b8a6]/30 cursor-pointer"
                        >
                          <option value="all">All Categories</option>
                          <option value="Dresses">Dresses</option>
                          <option value="Tops">Tops</option>
                          <option value="Bottoms">Bottoms</option>
                          <option value="Accessories">Accessories</option>
                        </select>
                      </div>

                      {/* Filter by Brand */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          Brand
                        </span>
                        <select
                          value={brandFilter}
                          onChange={(e) => setBrandFilter(e.target.value)}
                          className="w-full h-10 rounded-lg border border-border/40 bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#14b8a6]/30 cursor-pointer"
                        >
                          <option value="all">All Brands</option>
                          <option value="Aura Original">Aura Original</option>
                          <option value="Aura Denim">Aura Denim</option>
                          <option value="Aura Accessories">Aura Accessories</option>
                          <option value="Aura Luxury">Aura Luxury</option>
                        </select>
                      </div>

                      {/* Filter by Status */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          Status
                        </span>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full h-10 rounded-lg border border-border/40 bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#14b8a6]/30 cursor-pointer"
                        >
                          <option value="all">All Statuses</option>
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>

                      {/* Filter by Stock Level */}
                      <div className="space-y-1.5 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                            Stock Level
                          </span>
                          <select
                            value={stockLevelFilter}
                            onChange={(e) => setStockLevelFilter(e.target.value)}
                            className="w-full h-10 rounded-lg border border-border/40 bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#14b8a6]/30 cursor-pointer mt-1"
                          >
                            <option value="all">All Levels</option>
                            <option value="in">Healthy Stock (20+)</option>
                            <option value="low">Low Stock (&lt;20)</option>
                            <option value="out">Out of Stock (0)</option>
                          </select>
                        </div>
                        {isFiltersApplied && (
                          <Button 
                            onClick={handleResetFilters} 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs font-semibold text-[#14b8a6] hover:text-[#0d9488] self-end p-0 h-6 mt-1.5"
                          >
                            Reset Active Filters
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="my-6 border-b border-border/20" />

            {/* Products Table */}
            <div className="rounded-xl border border-border/30 overflow-hidden bg-card/40">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-b border-border/20">
                    <TableHead className="w-12 font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts(filteredProducts.map(p => p.id));
                          } else {
                            setSelectedProducts([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Product</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">SKU</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Price</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Stock</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Category</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Status</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Featured</TableHead>
                    <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <AlertTriangle className="h-8 w-8 text-muted-foreground/60" />
                          <p className="text-sm font-semibold text-muted-foreground">No matching products found</p>
                          <p className="text-xs text-muted-foreground font-light">Try adjusting your filters or search keywords</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => {
                      const gradientColor = getProductGradient(product.name);
                      
                      return (
                        <TableRow 
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="border-b border-border/20 hover:bg-muted/20 transition-colors cursor-pointer group/row"
                        >
                          <TableCell className="py-4" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              className="rounded cursor-pointer"
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
                          
                          {/* Image and product info */}
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-11 h-11 rounded-lg bg-gradient-to-tr ${gradientColor} flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0`}>
                                {product.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                                <p className="text-xs text-muted-foreground truncate font-normal">{product.brand}</p>
                              </div>
                            </div>
                          </TableCell>

                          {/* SKU */}
                          <TableCell className="py-4">
                            <span className="font-mono font-bold text-xs bg-muted/60 border border-border/40 text-foreground px-2.5 py-1 rounded-md select-all group-hover/row:border-[#14b8a6]/25 transition-all">
                              {product.sku}
                            </span>
                          </TableCell>

                          {/* Price */}
                          <TableCell className="py-4 text-sm font-black text-foreground">
                            ${product.price.toFixed(2)}
                          </TableCell>

                          {/* Stock Level */}
                          <TableCell className="py-4">
                            <div className="flex flex-col gap-1.5">
                              <span className={`text-sm font-bold ${
                                product.stock === 0
                                  ? 'text-rose-500'
                                  : product.stock < 20
                                  ? 'text-amber-500'
                                  : 'text-foreground'
                              }`}>
                                {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                              </span>
                              <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    product.stock === 0
                                      ? 'bg-rose-500'
                                      : product.stock < 20
                                      ? 'bg-amber-500'
                                      : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>

                          {/* Category */}
                          <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                            {product.category}
                          </TableCell>

                          {/* Status Badge */}
                          <TableCell className="py-4">
                            <Badge 
                              className={`rounded-md px-2 py-0.5 text-xs font-semibold border ${
                                product.status === 'active'
                                  ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5 dark:text-emerald-400 border-emerald-500/20'
                                  : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                              }`}
                            >
                              {product.status}
                            </Badge>
                          </TableCell>

                          {/* Tags / Featured */}
                          <TableCell className="py-4">
                            <div className="flex gap-1">
                              {product.isFeatured && (
                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider text-purple-500 border-purple-500/20 bg-purple-500/5">Featured</Badge>
                              )}
                              {product.isTrending && (
                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider text-cyan-500 border-cyan-500/20 bg-cyan-500/5">Trending</Badge>
                              )}
                              {product.isBestSeller && (
                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider text-emerald-500 border-emerald-500/20 bg-emerald-500/5">Best Seller</Badge>
                              )}
                              {!product.isFeatured && !product.isTrending && !product.isBestSeller && (
                                <span className="text-muted-foreground text-xs font-normal italic">-</span>
                              )}
                            </div>
                          </TableCell>

                          {/* Action drop down menu */}
                          <TableCell className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger render={
                                <div className="h-8 w-8 rounded-lg hover:bg-muted/80 flex items-center justify-center cursor-pointer transition-colors border-none bg-transparent">
                                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                </div>
                              } />
                              <DropdownMenuContent align="end" className="p-2 rounded-lg bg-card border border-border/40 w-44">
                                <DropdownMenuItem onClick={() => setSelectedProduct(product)} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium">
                                  <Eye className="mr-2 h-4 w-4 text-[#14b8a6]" />
                                  Quick Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleFeatured(product.id)} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium">
                                  <Star className="mr-2 h-4 w-4 text-amber-500" />
                                  {product.isFeatured ? 'Unfeature' : 'Feature Product'}
                                </DropdownMenuItem>
                                <div className="my-1 border-t border-border/10 mx-2" />
                                <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="p-2 rounded-md hover:bg-rose-500/10 text-rose-500 cursor-pointer text-sm font-medium">
                                  <Trash2 className="mr-2 h-4 w-4 text-rose-500" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {selectedProducts.length > 0 && (
              <div className="mt-4 flex items-center justify-between p-4 bg-muted/40 border border-border/20 rounded-xl">
                <p className="text-sm text-muted-foreground font-normal">
                  {selectedProducts.length} products selected
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg h-9">Export Selected</Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="rounded-lg h-9"
                    onClick={() => {
                      setProductsList(prev => prev.filter(p => !selectedProducts.includes(p.id)));
                      setSelectedProducts([]);
                    }}
                  >
                    Delete Selected
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Product Modal (Slide drawer) */}
        <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
          <SheetContent side="right" className="w-full sm:max-w-[500px] p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            <SheetHeader className="p-6 border-b border-border/20">
              <SheetTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Add New Product
              </SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Define the catalog details, pricing, and starting warehouse stock counts.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleAddProduct} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Summer Floral Dress"
                    className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 h-11"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="sku" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">SKU Code</Label>
                    <Input
                      id="sku"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="e.g. SKU-100"
                      className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="brand" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Brand Label</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Aura Denim"
                      className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g. 89.99"
                      className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="stock" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Starting Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="e.g. 50"
                      className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
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
                  <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Description</Label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe this product for your storefront catalog..."
                    className="w-full p-3 rounded-lg border border-border/50 bg-background text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="p-6 bg-muted/15 border-t border-border/20 flex gap-3 justify-end">
                <Button type="button" variant="ghost" onClick={() => setAddSheetOpen(false)} className="rounded-lg h-11 px-6">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-lg h-11 px-6 bg-primary text-white hover:bg-primary/95">
                  Publish SKU
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>

        {/* Quick View Product Details Drawer */}
        <Sheet open={selectedProduct !== null} onOpenChange={(open) => { if (!open) setSelectedProduct(null); }}>
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            {selectedProduct && (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-sm bg-muted/60 border border-border/40 px-3 py-1 rounded-lg select-all">
                        {selectedProduct.sku}
                      </span>
                      <Badge className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                        selectedProduct.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                      }`}>
                        {selectedProduct.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`h-9 w-9 rounded-lg transition-colors ${selectedProduct.isFeatured ? 'text-amber-500 hover:text-amber-600 bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20' : ''}`} 
                        onClick={() => handleToggleFeatured(selectedProduct.id)}
                        title="Toggle Featured Status"
                      >
                        <Star className="h-4.5 w-4.5 fill-current" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-lg text-rose-500 hover:bg-rose-500/10" 
                        onClick={() => handleDeleteProduct(selectedProduct.id)}
                        title="Delete Product"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedProduct.name}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5 font-light">Brand: {selectedProduct.brand}</p>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-6 space-y-6 h-full overflow-y-auto">
                  {/* Visual Product card placeholder with soft gradients */}
                  <div className={`w-full h-44 rounded-xl bg-gradient-to-tr ${getProductGradient(selectedProduct.name)} flex items-center justify-center shadow-inner relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Package className="h-16 w-16 opacity-30 group-hover:scale-110 transition-transform duration-300" />
                    <span className="absolute bottom-3 right-3 text-xs font-bold bg-background/80 px-2 py-0.5 rounded-md backdrop-blur border border-border/20">
                      Catalog Preview Placeholder
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-primary" /> Listing Price
                        </span>
                        <h4 className="text-2xl font-black text-foreground mt-1.5">${selectedProduct.price.toFixed(2)}</h4>
                      </CardContent>
                    </Card>

                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Layers className="h-3.5 w-3.5 text-primary" /> Department Category
                        </span>
                        <h4 className="text-lg font-bold text-foreground mt-2">{selectedProduct.category}</h4>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Inventory Control Panel</h3>
                    <Card className="border-border/30 bg-muted/5 rounded-xl shadow-sm">
                      <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Current Warehouse Stock</span>
                            <span className={`text-2xl font-black mt-1 ${selectedProduct.stock < 20 ? 'text-amber-500' : 'text-foreground'}`}>
                              {selectedProduct.stock} Units
                            </span>
                          </div>
                        </div>
                        {/* Adjust quantities interface */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Button 
                            variant="outline" 
                            className="h-10 w-10 p-0 text-foreground text-lg rounded-lg border-border/40 font-bold"
                            onClick={() => handleUpdateStock(selectedProduct.id, -1)}
                          >
                            -
                          </Button>
                          <Input 
                            type="number" 
                            placeholder="Qty"
                            className="w-16 h-10 text-center rounded-lg border-border/40 font-mono font-bold"
                            value={adjustQtyInput}
                            onChange={(e) => setAdjustQtyInput(e.target.value)}
                          />
                          <Button 
                            variant="outline" 
                            className="h-10 w-10 p-0 text-foreground text-lg rounded-lg border-border/40 font-bold"
                            onClick={() => handleUpdateStock(selectedProduct.id, 1)}
                          >
                            +
                          </Button>
                          <Button
                            className="h-10 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-3"
                            onClick={() => {
                              const qty = parseInt(adjustQtyInput) || 0;
                              if (qty !== 0) {
                                handleUpdateStock(selectedProduct.id, qty);
                                setAdjustQtyInput('');
                              }
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Catalog Description</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      {selectedProduct.description}
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
