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
  Upload,
  Image as ImageIcon,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const banners = [
  {
    id: '1',
    title: 'Summer Sale 2024',
    type: 'home',
    image: '/banner-summer.jpg',
    link: '/summer-sale',
    position: 1,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    isActive: true,
  },
  {
    id: '2',
    title: 'New Collection Launch',
    type: 'slider',
    image: '/banner-new-collection.jpg',
    link: '/new-collection',
    position: 2,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
  },
  {
    id: '3',
    title: 'Festival Special Offer',
    type: 'offer',
    image: '/banner-festival.jpg',
    link: '/festival',
    position: 3,
    startDate: '2024-10-01',
    endDate: '2024-11-30',
    isActive: false,
  },
  {
    id: '4',
    title: 'Welcome Popup',
    type: 'popup',
    image: '/banner-popup.jpg',
    link: '/welcome',
    position: 4,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
  },
];

const bannerTypes = [
  { value: 'home', label: 'Home Banner' },
  { value: 'offer', label: 'Offer Banner' },
  { value: 'slider', label: 'Slider Banner' },
  { value: 'popup', label: 'Popup Banner' },
];

export default function BannersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moveBanner = (id: string, direction: 'up' | 'down') => {
    // In a real app, this would update the order in the database
    console.log(`Moving banner ${id} ${direction}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Banners</h1>
            <p className="text-muted-foreground mt-1">Manage promotional banners</p>
          </div>
          <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <SheetTrigger render={
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Add Banner
              </Button>
            } />
            <SheetContent side="right" className="w-full sm:max-w-[500px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl font-semibold">Add New Banner</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground font-normal">
                  Create a new promotional banner for your store
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Banner Title *</Label>
                  <Input id="title" placeholder="e.g., Summer Sale 2024" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">Banner Type *</Label>
                  <Select>
                    <SelectTrigger className="h-11 rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bannerTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="rounded-md">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link" className="text-sm font-medium">Link URL</Label>
                  <Input id="link" placeholder="https://example.com/page" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
                    <Input id="startDate" type="date" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">End Date</Label>
                    <Input id="endDate" type="date" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-sm font-medium">Position</Label>
                  <Input id="position" type="number" placeholder="1" className="rounded-md border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium">Banner Image *</Label>
                  <div className="border-2 border-dashed border-border/60 rounded-md p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Recommended: 1920x600px</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileImage" className="text-sm font-medium">Mobile Image</Label>
                  <div className="border-2 border-dashed border-border/60 rounded-md p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload mobile image</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Recommended: 600x400px</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox id="active" defaultChecked className="rounded border-border/60 accent-primary h-5 w-5" />
                      <Label htmlFor="active" className="text-sm font-medium cursor-pointer">Active Banner</Label>
                    </div>
                    <span className="text-xs text-muted-foreground">Show on site</span>
                  </div>
                </div>
              </div>
              <SheetFooter className="pt-6 mt-6 border-t border-border/60 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-md h-10 px-6">
                  Cancel
                </Button>
                <Button className="rounded-md h-10 px-6 bg-primary hover:bg-primary-dark">
                  Save Banner
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Banners</p>
                  <p className="text-2xl font-bold">{banners.length}</p>
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
                    {banners.filter(b => b.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Home Banners</p>
                  <p className="text-2xl font-bold text-primary">
                    {banners.filter(b => b.type === 'home').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Slider Banners</p>
                  <p className="text-2xl font-bold text-warning">
                    {banners.filter(b => b.type === 'slider').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Banners Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search banners..."
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
                    <TableHead>Preview</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBanners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>
                        <div className="w-32 h-16 rounded-lg bg-muted flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{banner.title}</p>
                          <p className="text-sm text-muted-foreground">{banner.link}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {bannerTypes.find(t => t.value === banner.type)?.label || banner.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{banner.position}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {banner.startDate} - {banner.endDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={banner.isActive ? 'default' : 'secondary'}
                          className={banner.isActive ? 'bg-success' : ''}
                        >
                          {banner.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveBanner(banner.id, 'up')}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => moveBanner(banner.id, 'down')}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
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
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {banner.isActive ? 'Deactivate' : 'Activate'}
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
