'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  MoreVertical, 
  Check, 
  X, 
  Star,
  Flag,
  Eye,
  Trash2,
  Calendar,
  AlertTriangle,
  User,
  MessageSquare,
  ThumbsUp,
  Award,
  Sparkles,
  CheckCircle2,
  Globe,
  EyeOff
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const initialReviews = [
  {
    id: '1',
    customer: 'Sarah Johnson',
    product: 'Summer Floral Dress',
    rating: 5,
    title: 'Absolutely stunning!',
    comment: 'The dress is beautiful and fits perfectly. The quality is amazing and the color is exactly as shown in the pictures.',
    status: 'approved',
    isVerified: true,
    helpfulCount: 12,
    date: '2026-07-02',
  },
  {
    id: '2',
    customer: 'Michael Brown',
    product: 'Classic White Blouse',
    rating: 4,
    title: 'Good quality fabric',
    comment: 'Nice blouse, good material. Would have given 5 stars but the sizing runs a bit small.',
    status: 'pending',
    isVerified: true,
    helpfulCount: 5,
    date: '2026-07-03',
  },
  {
    id: '3',
    customer: 'Emily Davis',
    product: 'High-Waist Jeans',
    rating: 5,
    title: 'Perfect fit & stretch',
    comment: 'Best jeans I have ever bought. The fit is perfect and they are very comfortable.',
    status: 'approved',
    isVerified: true,
    helpfulCount: 8,
    date: '2026-07-04',
  },
  {
    id: '4',
    customer: 'James Wilson',
    product: 'Silk Scarf',
    rating: 3,
    title: 'Decent but expensive',
    comment: 'The scarf is nice but I feel it is overpriced for what you get in terms of dimensions.',
    status: 'pending',
    isVerified: false,
    helpfulCount: 2,
    date: '2026-07-01',
  },
  {
    id: '5',
    customer: 'Lisa Anderson',
    product: 'Leather Handbag',
    rating: 1,
    title: 'Poor stitching quality',
    comment: 'The stitching came apart after just one week of use. Very disappointed with customer support.',
    status: 'rejected',
    isVerified: true,
    helpfulCount: 0,
    date: '2026-06-30',
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  approved: { label: 'Approved', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  rejected: { label: 'Rejected', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
};

const customerGradients = [
  'from-pink-400 to-rose-500 text-white',
  'from-purple-400 to-indigo-500 text-white',
  'from-blue-400 to-cyan-500 text-white',
  'from-emerald-400 to-teal-500 text-white',
  'from-amber-400 to-orange-500 text-white',
];

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Selected review for moderating drawer
  const [selectedReview, setSelectedReview] = useState<typeof initialReviews[0] | null>(null);

  const getAvatarFallback = (name: string) => {
    return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return customerGradients[Math.abs(hash) % customerGradients.length];
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setReviewsList(prev => 
      prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
    );
    setSelectedReview(prev => {
      if (prev && prev.id === id) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });
  };

  const handleDeleteReview = (id: string) => {
    setReviewsList(prev => prev.filter(r => r.id !== id));
    setSelectedReview(null);
  };

  const filteredReviews = useMemo(() => {
    return reviewsList.filter(review => {
      const matchesSearch = 
        review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [reviewsList, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const totalCount = reviewsList.length;
    const pendingCount = reviewsList.filter(r => r.status === 'pending').length;
    const approvedCount = reviewsList.filter(r => r.status === 'approved').length;
    const avgRating = totalCount ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalCount) : 0;
    return {
      totalCount,
      pendingCount,
      approvedCount,
      avgRating
    };
  }, [reviewsList]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
      />
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Customer"
          titlePart2="Reviews"
          badgeText="Reviews Command Center"
          subtitle="View and moderate store product feedback, approve ratings, and manage customer reviews."
        />

        {/* Premium KPI Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-[#14b8a6]/5 to-[#0d9488]/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Reviews</span>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-foreground tracking-tight">{stats.totalCount} Feedbacks</h3>
                <p className="text-xs text-muted-foreground mt-1.5 font-light">{stats.pendingCount} pending reviews today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Moderation Queue</span>
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Star className="h-5 w-5 animate-pulse" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-foreground tracking-tight text-amber-500">{stats.pendingCount} Pending</h3>
                <p className="text-xs text-muted-foreground mt-1.5 font-light">Awaiting approval status</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Approved Feedbacks</span>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-foreground tracking-tight text-emerald-500">{stats.approvedCount} Online</h3>
                <p className="text-xs text-muted-foreground mt-1.5 font-light">Visible on product details</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Average Score</span>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-foreground tracking-tight">{stats.avgRating.toFixed(1)} / 5.0</h3>
                <p className="text-xs text-muted-foreground mt-1.5 font-light">Aggregated customer satisfaction rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Table Panel */}
        <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-1.5 bg-muted/40 p-1 border border-border/20 rounded-xl w-fit">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-lg h-8 text-xs font-semibold px-3"
                  onClick={() => setStatusFilter('all')}
                >
                  All ({reviewsList.length})
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-lg h-8 text-xs font-semibold px-3"
                  onClick={() => setStatusFilter('pending')}
                >
                  Pending ({reviewsList.filter(r => r.status === 'pending').length})
                </Button>
                <Button
                  variant={statusFilter === 'approved' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-lg h-8 text-xs font-semibold px-3"
                  onClick={() => setStatusFilter('approved')}
                >
                  Approved ({reviewsList.filter(r => r.status === 'approved').length})
                </Button>
                <Button
                  variant={statusFilter === 'rejected' ? 'default' : 'ghost'}
                  size="sm"
                  className="rounded-lg h-8 text-xs font-semibold px-3"
                  onClick={() => setStatusFilter('rejected')}
                >
                  Rejected ({reviewsList.filter(r => r.status === 'rejected').length})
                </Button>
              </div>

              <div className="relative max-w-sm flex-1 group">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search reviews by comments or user..."
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
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Customer</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Product Variant</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Stars Score</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Review Summary</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Helpful Votes</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Published Date</TableHead>
                    <TableHead className="text-center font-bold text-xs uppercase tracking-wider text-muted-foreground py-4">Status</TableHead>
                    <TableHead className="w-16 py-4" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => {
                    const statusInfo = statusConfig[review.status as keyof typeof statusConfig] || statusConfig.pending;
                    const avatarColor = getAvatarColor(review.customer);
                    return (
                      <TableRow 
                        key={review.id}
                        onClick={() => setSelectedReview(review)}
                        className="hover:bg-muted/20 border-b border-border/20 transition-colors cursor-pointer group/row"
                      >
                        {/* Customer details */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 rounded-lg">
                              <AvatarFallback className={`rounded-lg text-xs font-bold bg-gradient-to-tr ${avatarColor}`}>
                                {getAvatarFallback(review.customer)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{review.customer}</p>
                              {review.isVerified && (
                                <Badge variant="outline" className="text-[9px] w-fit font-bold border-emerald-500/20 text-emerald-500 bg-emerald-500/5 select-none h-4 px-1 rounded-sm">
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        {/* Product */}
                        <TableCell className="py-4 font-semibold text-sm text-foreground">
                          {review.product}
                        </TableCell>

                        {/* Rating stars */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-0.5">
                            {renderStars(review.rating)}
                          </div>
                        </TableCell>

                        {/* Summary details */}
                        <TableCell className="py-4 max-w-xs">
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-foreground truncate">{review.title}</span>
                            <span className="text-xs text-muted-foreground truncate font-light mt-0.5">{review.comment}</span>
                          </div>
                        </TableCell>

                        {/* Helpful */}
                        <TableCell className="py-4 text-center font-bold text-sm text-foreground">
                          <div className="flex items-center justify-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground/60" />
                            <span>{review.helpfulCount}</span>
                          </div>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="py-4 text-sm text-muted-foreground font-normal">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                            <span>{review.date}</span>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="py-4 text-center">
                          <Badge className={`rounded-md px-2.5 py-1 text-xs font-semibold border ${statusInfo.color}`}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger render={
                              <div className="h-8 w-8 rounded-lg hover:bg-muted/80 flex items-center justify-center cursor-pointer transition-colors border-none bg-transparent">
                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                              </div>
                            } />
                            <DropdownMenuContent align="end" className="p-2 rounded-lg bg-card border border-border/40 w-36">
                              <DropdownMenuItem onClick={() => setSelectedReview(review)} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium">
                                <Eye className="mr-2 h-4 w-4 text-[#14b8a6]" /> Quick View
                              </DropdownMenuItem>
                              {review.status === 'pending' && (
                                <>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, 'approved')} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium">
                                    <Check className="mr-2 h-4 w-4 text-emerald-500" /> Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(review.id, 'rejected')} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm font-medium">
                                    <X className="mr-2 h-4 w-4 text-rose-500" /> Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <Separator className="my-1 border-border/10" />
                              <DropdownMenuItem onClick={() => handleDeleteReview(review.id)} className="p-2 rounded-md hover:bg-rose-500/10 text-rose-500 cursor-pointer text-sm font-medium">
                                <Trash2 className="mr-2 h-4 w-4 text-rose-500" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredReviews.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <AlertTriangle className="h-8 w-8 text-muted-foreground/60" />
                          <p className="text-sm font-semibold text-muted-foreground">No matching reviews found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick View Details Drawer */}
        <Sheet open={selectedReview !== null} onOpenChange={(open) => { if (!open) setSelectedReview(null); }}>
          <SheetContent side="right" className="w-full sm:max-w-xl p-0 overflow-hidden flex flex-col h-full bg-card border-l border-border/30 backdrop-blur-xl">
            {selectedReview && (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-xs bg-muted/60 border border-border/40 px-3 py-1 rounded-lg">
                        ID: {selectedReview.id}
                      </span>
                      <Badge className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                        statusConfig[selectedReview.status as keyof typeof statusConfig]?.color || 'bg-muted'
                      }`}>
                        {statusConfig[selectedReview.status as keyof typeof statusConfig]?.label || selectedReview.status}
                      </Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-lg text-rose-500 hover:bg-rose-500/10" 
                      onClick={() => handleDeleteReview(selectedReview.id)}
                      title="Delete Review"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 rounded-lg">
                      <AvatarFallback className={`rounded-lg text-sm font-bold bg-gradient-to-tr ${getAvatarColor(selectedReview.customer)}`}>
                        {getAvatarFallback(selectedReview.customer)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedReview.customer}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5 font-light">Published feedback on {selectedReview.date}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-6 space-y-6 h-full overflow-y-auto">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Score Rating
                        </span>
                        <div className="flex items-center gap-1 mt-1.5">
                          <h4 className="text-2xl font-black text-foreground">{selectedReview.rating}.0</h4>
                          <span className="text-xs text-muted-foreground">/ 5.0 stars</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/30 bg-muted/10 shadow-sm rounded-lg">
                      <CardContent className="p-4">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                          <Award className="h-3.5 w-3.5 text-primary" /> Buyer Status
                        </span>
                        <h4 className="text-sm font-bold text-foreground mt-2 truncate">
                          {selectedReview.isVerified ? 'Verified Purchase' : 'Guest Account'}
                        </h4>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Product Variant Mapped</h3>
                    <div className="p-3.5 bg-muted/15 border border-border/20 rounded-xl flex justify-between items-center text-sm font-semibold">
                      <span>{selectedReview.product}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Review comments</h3>
                    <Card className="border-border/30 bg-muted/5 rounded-xl">
                      <CardContent className="p-5 space-y-3">
                        <h4 className="text-sm font-bold text-foreground">"{selectedReview.title}"</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed font-light">
                          {selectedReview.comment}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedReview.helpfulCount > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-light">
                      <ThumbsUp className="h-4 w-4 text-[#14b8a6]" />
                      <span>{selectedReview.helpfulCount} customers found this review helpful.</span>
                    </div>
                  )}
                </ScrollArea>

                {/* Moderate controls footer */}
                {selectedReview.status === 'pending' && (
                  <div className="p-6 border-t border-border/20 bg-muted/15 flex gap-2 justify-end shrink-0 z-10">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleUpdateStatus(selectedReview.id, 'rejected')}
                      className="text-rose-500 hover:bg-rose-500/10 rounded-lg h-10 px-4 font-semibold text-xs flex items-center gap-1.5"
                    >
                      <X className="h-4 w-4" /> Reject Review
                    </Button>
                    <Button 
                      onClick={() => handleUpdateStatus(selectedReview.id, 'approved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-10 px-4 font-semibold text-xs flex items-center gap-1.5"
                    >
                      <Check className="h-4 w-4" /> Approve & Publish
                    </Button>
                  </div>
                )}
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}
