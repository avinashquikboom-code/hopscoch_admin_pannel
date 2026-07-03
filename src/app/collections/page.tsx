'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Calendar,
  Package,
  Layers,
  CheckCircle2,
} from 'lucide-react';

const collections = [
  {
    id: '1',
    name: 'Summer Collection 2024',
    slug: 'summer-collection-2024',
    type: 'summer',
    description: 'Fresh styles for the summer season',
    isActive: true,
    order: 1,
    productCount: 25,
    startDate: 'Jun 1, 2024',
    endDate: 'Aug 31, 2024',
  },
  {
    id: '2',
    name: 'Winter Collection 2024',
    slug: 'winter-collection-2024',
    type: 'winter',
    description: 'Cozy winter fashion essentials',
    isActive: false,
    order: 2,
    productCount: 30,
    startDate: 'Dec 1, 2024',
    endDate: 'Feb 28, 2025',
  },
  {
    id: '3',
    name: 'Festival Special',
    slug: 'festival-special',
    type: 'festival',
    description: 'Special edition festival wear',
    isActive: true,
    order: 3,
    productCount: 18,
    startDate: 'Oct 1, 2024',
    endDate: 'Nov 30, 2024',
  },
  {
    id: '4',
    name: 'Luxury Line',
    slug: 'luxury-line',
    type: 'luxury',
    description: 'Premium luxury fashion pieces',
    isActive: true,
    order: 4,
    productCount: 15,
    startDate: null,
    endDate: null,
  },
];

const collectionTypes = [
  { value: 'summer', label: 'Summer', color: 'text-amber-600', bg: 'bg-amber-500/10' },
  { value: 'winter', label: 'Winter', color: 'text-blue-600', bg: 'bg-blue-500/10' },
  { value: 'festival', label: 'Festival', color: 'text-violet-600', bg: 'bg-violet-500/10' },
  { value: 'luxury', label: 'Luxury', color: 'text-rose-600', bg: 'bg-rose-500/10' },
  { value: 'featured', label: 'Featured', color: 'text-primary', bg: 'bg-primary/10' },
  { value: 'custom', label: 'Custom', color: 'text-muted-foreground', bg: 'bg-muted' },
];

// Gradient map for collection image placeholders
const collectionGradients = [
  'from-amber-400 to-orange-500',
  'from-blue-400 to-cyan-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCollections = collections.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: 'Total Collections',
      value: collections.length,
      icon: Layers,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Active',
      value: collections.filter((c) => c.isActive).length,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total Products',
      value: collections.reduce((acc, c) => acc + c.productCount, 0),
      icon: Package,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Collections</h1>
            <p className="text-muted-foreground mt-1 text-sm font-light">
              Create and manage curated product collections for your storefront.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={
              <Button className="gap-2 rounded-xl">
                <Plus className="h-4 w-4" />
                Add Collection
              </Button>
            } />
            <DialogContent className="sm:max-w-[540px] rounded-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">Add New Collection</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Create a curated collection of products.
                </DialogDescription>
              </DialogHeader>
              <Separator className="my-2" />
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold">Collection Name *</Label>
                    <Input id="name" placeholder="Summer Collection" className="h-9 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="slug" className="text-xs font-semibold">Slug</Label>
                    <Input id="slug" placeholder="summer-collection" className="h-9 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="type" className="text-xs font-semibold">Collection Type *</Label>
                  <Select>
                    <SelectTrigger className="h-9 rounded-lg">
                      <SelectValue placeholder="Select a type..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {collectionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="rounded-lg">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-xs font-semibold">Description</Label>
                  <Textarea id="description" placeholder="Brief description..." rows={2} className="rounded-lg resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="startDate" className="text-xs font-semibold">Start Date</Label>
                    <Input id="startDate" type="date" className="h-9 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="endDate" className="text-xs font-semibold">End Date</Label>
                    <Input id="endDate" type="date" className="h-9 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Cover Image</Label>
                  <div className="border-2 border-dashed border-border/60 rounded-xl p-5 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-1.5" />
                    <p className="text-xs text-muted-foreground">Click to upload cover image</p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">PNG, JPG, WebP up to 5MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-muted/30 rounded-xl px-3 py-2.5">
                  <Checkbox id="active" defaultChecked className="rounded" />
                  <Label htmlFor="active" className="text-sm text-foreground cursor-pointer select-none">
                    Mark as Active
                  </Label>
                </div>
              </div>
              <DialogFooter className="gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-lg">
                  Cancel
                </Button>
                <Button className="rounded-lg">Save Collection</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-border/40 rounded-2xl">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <h3 className={`text-3xl font-bold mt-1.5 ${stat.color}`}>{stat.value}</h3>
                  </div>
                  <div className={`h-11 w-11 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Collections Table */}
        <Card className="border-border/40 rounded-2xl">
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold">All Collections</CardTitle>
                <CardDescription className="text-xs mt-0.5">{collections.length} collections total</CardDescription>
              </div>
              <div className="relative max-w-xs w-full group">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search collections..."
                  className="pl-10 h-9 rounded-xl border-border/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="border border-border/40 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-border/40">
                    <TableHead className="text-xs font-semibold text-muted-foreground py-3">Collection</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Type</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Products</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground">Date Range</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground text-center">Status</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollections.map((collection, idx) => {
                    const typeConfig = collectionTypes.find((t) => t.value === collection.type);
                    return (
                      <TableRow key={collection.id} className="hover:bg-muted/10 border-border/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-14 h-10 rounded-lg bg-gradient-to-br ${collectionGradients[idx % collectionGradients.length]} flex items-center justify-center flex-shrink-0`}
                            >
                              <Layers className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{collection.name}</p>
                              <p className="font-mono text-xs text-muted-foreground">{collection.slug}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig?.bg} ${typeConfig?.color}`}>
                            {typeConfig?.label || collection.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-semibold text-foreground">{collection.productCount}</span>
                        </TableCell>
                        <TableCell>
                          {collection.startDate && collection.endDate ? (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              {collection.startDate} – {collection.endDate}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground/60 italic">Always available</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              collection.isActive
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-transparent rounded-full'
                                : 'bg-muted text-muted-foreground border-transparent rounded-full'
                            }
                          >
                            {collection.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/60">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36 p-1 rounded-xl border-border/50">
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
                    );
                  })}
                  {filteredCollections.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                        No collections found.
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
