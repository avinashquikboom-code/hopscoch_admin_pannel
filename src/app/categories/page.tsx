'use client';

import React, { useState, Fragment } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  ChevronRight,
  ChevronDown,
  Layers,
  FolderOpen
} from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Beautiful dresses for all occasions',
    order: 1,
    isVisible: true,
    productCount: 45,
    children: [
      {
        id: '1-1',
        name: 'Casual Dresses',
        slug: 'casual-dresses',
        productCount: 20,
      },
      {
        id: '1-2',
        name: 'Formal Dresses',
        slug: 'formal-dresses',
        productCount: 15,
      },
      {
        id: '1-3',
        name: 'Party Dresses',
        slug: 'party-dresses',
        productCount: 10,
      },
    ],
  },
  {
    id: '2',
    name: 'Tops',
    slug: 'tops',
    description: 'Stylish tops and blouses',
    order: 2,
    isVisible: true,
    productCount: 38,
    children: [
      {
        id: '2-1',
        name: 'T-Shirts',
        slug: 't-shirts',
        productCount: 18,
      },
      {
        id: '2-2',
        name: 'Blouses',
        slug: 'blouses',
        productCount: 12,
      },
      {
        id: '2-3',
        name: 'Sweaters',
        slug: 'sweaters',
        productCount: 8,
      },
    ],
  },
  {
    id: '3',
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Pants, skirts, and shorts',
    order: 3,
    isVisible: true,
    productCount: 32,
    children: [
      {
        id: '3-1',
        name: 'Jeans',
        slug: 'jeans',
        productCount: 22,
      },
      {
        id: '3-2',
        name: 'Skirts',
        slug: 'skirts',
        productCount: 10,
      },
    ],
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bags, jewelry, and scarves',
    order: 4,
    isVisible: false,
    productCount: 7,
    children: [
      {
        id: '4-1',
        name: 'Bags',
        slug: 'bags',
        productCount: 7,
      },
    ],
  },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['1', '2', '3']);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id)
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Categories</h1>
            <p className="text-muted-foreground mt-1 text-sm font-light">
              Organize products into collections, root departments, and subcategories.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={
              <Button className="rounded-xl flex items-center gap-2 cursor-pointer">
                <Plus className="h-4 w-4" /> Add Category
              </Button>
            } />
            <DialogContent className="rounded-2xl max-w-md p-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">Add New Category</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Create a new product category
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold">Category Name *</Label>
                  <Input id="name" placeholder="Enter category name" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-xs font-semibold">Slug</Label>
                  <Input id="slug" placeholder="category-slug" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-semibold">Description</Label>
                  <Textarea id="description" placeholder="Enter description" rows={3} className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent" className="text-xs font-semibold">Parent Category</Label>
                  <select id="parent" className="w-full h-10 rounded-xl border border-border/60 bg-background px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none">
                    <option value="">None (Root Category)</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2.5 pt-2">
                  <Checkbox id="visible" defaultChecked className="rounded border-border/60 accent-primary h-4 w-4" />
                  <Label htmlFor="visible" className="text-sm text-muted-foreground select-none cursor-pointer">Visible</Label>
                </div>
              </div>
              <DialogFooter className="pt-4 flex gap-2 justify-end">
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button className="rounded-xl">
                  Save Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/40 rounded-2xl bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Categories</p>
                <h3 className="text-3xl font-bold mt-2 text-foreground">{categories.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Layers className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/40 rounded-2xl bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subcategories</p>
                <h3 className="text-3xl font-bold mt-2 text-foreground">
                  {categories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0)}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FolderOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/40 rounded-2xl bg-card">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Visible Status</p>
                <h3 className="text-3xl font-bold mt-2 text-teal-600 dark:text-teal-400">
                  {categories.filter(c => c.isVisible).length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                <FolderOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <Card className="border-border/40 rounded-2xl bg-card">
          <CardContent className="p-6 space-y-6">
            <div className="relative max-w-sm group">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search categories..."
                className="pl-11 border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="border border-border/40 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-center">Products</TableHead>
                    <TableHead className="text-center">Order</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <Fragment key={category.id}>
                      <TableRow className="hover:bg-muted/10">
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleCategory(category.id)}
                            className="h-8 w-8 rounded-lg"
                          >
                            {expandedCategories.includes(category.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="font-semibold text-sm text-foreground">{category.name}</TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">{category.slug}</TableCell>
                        <TableCell className="text-center text-sm font-semibold">{category.productCount}</TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">{category.order}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={category.isVisible ? 'default' : 'outline'}
                            className={category.isVisible ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2.5 py-0.5' : 'text-muted-foreground rounded-full px-2.5 py-0.5'}
                          >
                            {category.isVisible ? 'Visible' : 'Hidden'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/60">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36 p-1 rounded-xl bg-card border border-border/60 shadow-lg">
                              <DropdownMenuItem className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-xs font-semibold flex items-center gap-2">
                                <Eye className="h-3.5 w-3.5" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-xs font-semibold flex items-center gap-2">
                                <Edit className="h-3.5 w-3.5" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="p-2 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer text-xs font-semibold flex items-center gap-2">
                                <Trash2 className="h-3.5 w-3.5" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {expandedCategories.includes(category.id) && category.children && (
                        category.children.map((child) => (
                          <TableRow key={child.id} className="bg-muted/5 hover:bg-muted/10">
                            <TableCell></TableCell>
                            <TableCell className="pl-8 text-sm font-medium text-slate-500">
                              └ {child.name}
                            </TableCell>
                            <TableCell className="font-mono text-sm text-slate-400 pl-8">{child.slug}</TableCell>
                            <TableCell className="text-center text-sm text-slate-500">{child.productCount}</TableCell>
                            <TableCell className="text-center text-sm text-slate-400">-</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="default" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2.5 py-0.5">Visible</Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/60">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-36 p-1 rounded-xl bg-card border border-border/60 shadow-lg">
                                  <DropdownMenuItem className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-xs font-semibold flex items-center gap-2">
                                    <Edit className="h-3.5 w-3.5" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="p-2 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer text-xs font-semibold flex items-center gap-2">
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </Fragment>
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
