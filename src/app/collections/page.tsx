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
  Upload,
  Calendar
} from 'lucide-react';

const collections = [
  {
    id: '1',
    name: 'Summer Collection 2024',
    slug: 'summer-collection-2024',
    type: 'summer',
    description: 'Fresh styles for the summer season',
    image: '/collection-summer.jpg',
    isActive: true,
    order: 1,
    productCount: 25,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
  },
  {
    id: '2',
    name: 'Winter Collection 2024',
    slug: 'winter-collection-2024',
    type: 'winter',
    description: 'Cozy winter fashion essentials',
    image: '/collection-winter.jpg',
    isActive: false,
    order: 2,
    productCount: 30,
    startDate: '2024-12-01',
    endDate: '2025-02-28',
  },
  {
    id: '3',
    name: 'Festival Special',
    slug: 'festival-special',
    type: 'festival',
    description: 'Special edition festival wear',
    image: '/collection-festival.jpg',
    isActive: true,
    order: 3,
    productCount: 18,
    startDate: '2024-10-01',
    endDate: '2024-11-30',
  },
  {
    id: '4',
    name: 'Luxury Line',
    slug: 'luxury-line',
    type: 'luxury',
    description: 'Premium luxury fashion pieces',
    image: '/collection-luxury.jpg',
    isActive: true,
    order: 4,
    productCount: 15,
    startDate: null,
    endDate: null,
  },
];

const collectionTypes = [
  { value: 'summer', label: 'Summer Collection' },
  { value: 'winter', label: 'Winter Collection' },
  { value: 'festival', label: 'Festival Collection' },
  { value: 'luxury', label: 'Luxury Collection' },
  { value: 'featured', label: 'Featured Collection' },
  { value: 'custom', label: 'Custom' },
];

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Collections</h1>
            <p className="text-muted-foreground mt-1">Manage product collections</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger render={
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Collection
              </Button>
            } />
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Collection</DialogTitle>
                <DialogDescription>
                  Create a new product collection
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Collection Name *</Label>
                  <Input id="name" placeholder="Enter collection name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Collection Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {collectionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="collection-slug" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter description" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Cover Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary-dark">
                  Save Collection
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
                  <p className="text-sm font-medium text-muted-foreground">Total Collections</p>
                  <p className="text-2xl font-bold">{collections.length}</p>
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
                    {collections.filter(c => c.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-primary">
                    {collections.reduce((acc, c) => acc + c.productCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collections Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search collections..."
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
                    <TableHead>Collection</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-xs font-medium text-muted-foreground">IMG</span>
                          </div>
                          <div>
                            <p className="font-medium">{collection.name}</p>
                            <p className="text-sm text-muted-foreground">{collection.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {collectionTypes.find(t => t.value === collection.type)?.label || collection.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{collection.productCount}</TableCell>
                      <TableCell>
                        {collection.startDate && collection.endDate ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {collection.startDate} - {collection.endDate}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Always available</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={collection.isActive ? 'default' : 'secondary'}
                          className={collection.isActive ? 'bg-success' : ''}
                        >
                          {collection.isActive ? 'Active' : 'Inactive'}
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
                              <Eye className="mr-2 h-4 w-4" />
                              View
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
