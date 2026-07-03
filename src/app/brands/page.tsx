'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
  Edit,
  Trash2,
  Eye,
  Upload,
  Star,
  Package,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Tag,
  Hash,
  AlignLeft,
  Crown,
  Info,
} from 'lucide-react';

const brands = [
  {
    id: '1',
    name: 'Aura Original',
    slug: 'aura-original',
    description: 'Our in-house premium collection',
    logo: null,
    status: 'active',
    isFeatured: true,
    order: 1,
    productCount: 45,
  },
  {
    id: '2',
    name: 'Aura Denim',
    slug: 'aura-denim',
    description: 'Premium denim collection',
    logo: null,
    status: 'active',
    isFeatured: true,
    order: 2,
    productCount: 32,
  },
  {
    id: '3',
    name: 'Aura Luxury',
    slug: 'aura-luxury',
    description: 'High-end luxury fashion',
    logo: null,
    status: 'active',
    isFeatured: true,
    order: 3,
    productCount: 28,
  },
  {
    id: '4',
    name: 'Aura Accessories',
    slug: 'aura-accessories',
    description: 'Fashion accessories collection',
    logo: null,
    status: 'inactive',
    isFeatured: false,
    order: 4,
    productCount: 56,
  },
];

// Palette for brand avatars
const brandColors = [
  'from-teal-500 to-cyan-400',
  'from-violet-500 to-purple-400',
  'from-rose-500 to-pink-400',
  'from-amber-500 to-orange-400',
];

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: 'Total Brands',
      value: brands.length,
      icon: Package,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Featured',
      value: brands.filter((b) => b.isFeatured).length,
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Active',
      value: brands.filter((b) => b.status === 'active').length,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Brands</h1>
            <p className="text-muted-foreground mt-1 text-sm font-light">
              Manage and organize your product brands and labels.
            </p>
          </div>
          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger render={
              <Button className="gap-2 rounded-md">
                <Plus className="h-4 w-4" />
                Add Brand
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-[540px] overflow-y-auto">
              <SheetHeader className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <SheetTitle className="text-2xl font-bold">Add New Brand</SheetTitle>
                </div>
                <SheetDescription className="text-sm text-muted-foreground font-normal pl-13">
                  Create a new product brand to organize your catalog
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                          Brand Name <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="e.g., Aura Original"
                            className="pl-10 h-11 rounded-lg border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="slug" className="text-sm font-medium flex items-center gap-2">
                          <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                          Slug
                        </Label>
                        <Input
                          id="slug"
                          placeholder="aura-original"
                          className="h-11 rounded-lg border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                        <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" />
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of this brand and its products..."
                        rows={4}
                        className="rounded-lg border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all"
                      />
                      <p className="text-xs text-muted-foreground">
                        A good description helps customers understand your brand identity
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/60" />

                {/* Brand Assets Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Brand Assets</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Upload className="h-3.5 w-3.5 text-muted-foreground" />
                        Brand Logo
                      </Label>
                      <div className="border-2 border-dashed border-border/60 rounded-lg p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-foreground">Click to upload or drag & drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/60" />

                {/* Display Settings Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Display Settings</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <Checkbox
                            id="featured"
                            className="rounded-md border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
                          />
                          <div className="space-y-0.5">
                            <Label htmlFor="featured" className="text-sm font-semibold cursor-pointer">
                              Featured Brand
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Display prominently on homepage and brand listings
                            </p>
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                          <Star className="h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SheetFooter className="pt-6 mt-8 border-t border-border/60 flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="rounded-lg h-10 px-6 font-medium"
                >
                  Cancel
                </Button>
                <Button className="rounded-lg h-10 px-6 bg-primary hover:bg-primary/90 font-medium shadow-sm shadow-primary/20">
                  Save Brand
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* Brands Table */}
        <Card className="border-border/40 rounded-lg">
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold">All Brands</CardTitle>
                <CardDescription className="text-xs mt-0.5">{brands.length} brands total</CardDescription>
              </div>
              <div className="relative max-w-xs w-full group">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search brands..."
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
                    <TableHead className="text-xs font-semibold text-muted-foreground py-3">Brand</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Slug</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Products</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Order</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Featured</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBrands.map((brand, idx) => (
                    <TableRow key={brand.id} className="hover:bg-muted/10 border-border/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-md bg-gradient-to-tr ${brandColors[idx % brandColors.length]} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}
                          >
                            {brand.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{brand.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{brand.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-muted-foreground">{brand.slug}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-semibold text-foreground">{brand.productCount}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm text-muted-foreground">{brand.order}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            brand.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-transparent rounded-full'
                              : 'bg-muted text-muted-foreground border-transparent rounded-full'
                          }
                        >
                          {brand.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {brand.isFeatured ? (
                          <div className="flex justify-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
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
                          <DropdownMenuContent align="end" className="w-36 p-1 rounded-md border-border/50">
                            <DropdownMenuItem className="text-xs font-medium rounded-lg cursor-pointer gap-2">
                              <Eye className="h-3.5 w-3.5" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-medium rounded-lg cursor-pointer gap-2">
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 border-border/30" />
                            <DropdownMenuItem className="text-xs font-medium rounded-lg cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10">
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredBrands.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                        No brands found.
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
