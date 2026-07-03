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
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Search, MoreVertical, Edit, Trash2, Sparkles, Tag, Hash, FolderTree, Globe, Info } from 'lucide-react';

const initialSubCategories = [
  { id: '1', name: 'Casual Dresses', parentName: 'Dresses', slug: 'casual-dresses', count: 20, isVisible: true },
  { id: '2', name: 'Formal Dresses', parentName: 'Dresses', slug: 'formal-dresses', count: 15, isVisible: true },
  { id: '3', name: 'T-Shirts', parentName: 'Tops', slug: 't-shirts', count: 18, isVisible: true },
  { id: '4', name: 'Blouses', parentName: 'Tops', slug: 'blouses', count: 12, isVisible: true },
  { id: '5', name: 'Sweaters', parentName: 'Tops', slug: 'sweaters', count: 8, isVisible: false },
  { id: '6', name: 'Jeans', parentName: 'Bottoms', slug: 'jeans', count: 22, isVisible: true },
  { id: '7', name: 'Skirts', parentName: 'Bottoms', slug: 'skirts', count: 10, isVisible: true },
];

export default function SubCategoriesPage() {
  const [subCategories, setSubCategories] = useState(initialSubCategories);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', parentName: 'Dresses', slug: '', isVisible: true });

  const filtered = subCategories.filter(
    (sc) =>
      sc.name.toLowerCase().includes(search.toLowerCase()) ||
      sc.parentName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSc = {
      id: String(subCategories.length + 1),
      name: formData.name,
      parentName: formData.parentName,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      count: 0,
      isVisible: formData.isVisible,
    };
    setSubCategories([...subCategories, newSc]);
    setFormData({ name: '', parentName: 'Dresses', slug: '', isVisible: true });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setSubCategories(subCategories.filter((sc) => sc.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Sub Categories</h1>
            <p className="text-muted-foreground mt-1 font-light">
              Manage product sub-categories and their mappings to parent categories.
            </p>
          </div>
          <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
            <SheetTrigger render={
              <Button className="rounded-md flex items-center gap-2 cursor-pointer bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10">
                <Plus className="h-4 w-4" />
                Add Sub Category
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-[540px] overflow-y-auto">
              <SheetHeader className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <SheetTitle className="text-2xl font-bold">Add Sub Category</SheetTitle>
                </div>
                <SheetDescription className="text-sm text-muted-foreground font-normal pl-13">
                  Create a new sub-category linked to a parent category
                </SheetDescription>
              </SheetHeader>

              <form onSubmit={handleCreate} className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                        Sub Category Name <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Casual Jackets"
                          className="pl-10 h-11 rounded-lg border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="slug" className="text-sm font-medium flex items-center gap-2">
                        <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                        Slug (Optional)
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g., casual-jackets"
                        className="h-11 rounded-lg border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/60" />

                {/* Hierarchy Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FolderTree className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Hierarchy</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="parent" className="text-sm font-medium flex items-center gap-2">
                        <FolderTree className="h-3.5 w-3.5 text-muted-foreground" />
                        Parent Category
                      </Label>
                      <select
                        id="parent"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border/60 bg-background px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      >
                        <option value="Dresses">Dresses</option>
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Select the parent category this sub-category belongs to
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/60" />

                {/* Visibility Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Visibility</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            id="visible"
                            type="checkbox"
                            checked={formData.isVisible}
                            onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                            className="rounded-md border-border/60 accent-primary h-5 w-5"
                          />
                          <div className="space-y-0.5">
                            <Label htmlFor="visible" className="text-sm font-semibold cursor-pointer">
                              Visible
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Make this sub-category visible on the storefront
                            </p>
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SheetFooter className="pt-6 mt-8 border-t border-border/60 flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    className="rounded-lg h-10 px-6 font-medium"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-lg h-10 px-6 bg-primary hover:bg-primary/90 font-medium shadow-sm shadow-primary/20"
                  >
                    Add Sub Category
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        <Card className="border-border/40 rounded-lg bg-card">
          <CardContent className="p-6 space-y-6">
            <div className="relative max-w-sm group">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search sub categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10 rounded-md"
              />
            </div>

            <div className="border border-border/40 rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Sub Category Name</TableHead>
                    <TableHead>Parent Category</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-center">Products</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((sc) => (
                    <TableRow key={sc.id} className="hover:bg-muted/10">
                      <TableCell className="font-semibold text-sm text-foreground">{sc.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{sc.parentName}</TableCell>
                      <TableCell className="text-sm font-mono text-muted-foreground/80">{sc.slug}</TableCell>
                      <TableCell className="text-center text-sm font-semibold">{sc.count}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={sc.isVisible ? 'default' : 'outline'}
                          className={sc.isVisible ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2.5 py-0.5' : 'text-muted-foreground rounded-full px-2.5 py-0.5'}
                        >
                          {sc.isVisible ? 'Visible' : 'Hidden'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={
                            <div className="h-8 w-8 rounded-lg hover:bg-muted/60 flex items-center justify-center cursor-pointer">
                              <MoreVertical className="h-4 w-4" />
                            </div>
                          } />
                          <DropdownMenuContent align="end" className="w-36 p-1 rounded-md bg-card border border-border/60 shadow-lg">
                            <DropdownMenuItem className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-xs font-semibold flex items-center gap-2">
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(sc.id)}
                              className="p-2 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer text-xs font-semibold flex items-center gap-2"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground text-sm font-light">
                        No sub categories found.
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
