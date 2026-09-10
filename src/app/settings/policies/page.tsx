'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/toast';
import { API_BASE } from '@/lib/api';
import {
  Shield,
  FileText,
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  Save,
} from 'lucide-react';

interface PolicyCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
  sortOrder: number;
  policies?: PolicyItem[];
  _count?: { policies: number };
}

interface PolicyItem {
  id: number;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  title: string;
  slug: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

function authHeaders(): HeadersInit {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('auth_token') ||
        localStorage.getItem('admin_token') ||
        localStorage.getItem('token')
      : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export default function LegalPoliciesPage() {
  const [mainTab, setMainTab] = useState<'policies' | 'categories'>('policies');
  const [categories, setCategories] = useState<PolicyCategory[]>([]);
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<PolicyCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    sortOrder: 0,
    isActive: true,
  });

  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<PolicyItem | null>(null);
  const [policyForm, setPolicyForm] = useState({
    categoryId: 0,
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    isActive: true,
  });

  const [previewPolicy, setPreviewPolicy] = useState<PolicyItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Categories
      const catRes = await fetch(`${API_BASE}/api/v1/admin/policy-categories`, {
        headers: authHeaders(),
      }).catch(() => null);

      let loadedCategories: PolicyCategory[] = [];
      if (catRes && catRes.ok) {
        const json = await catRes.json();
        loadedCategories = json.data || [];
      } else {
        // Fallback to public endpoint
        const pubCatRes = await fetch(`${API_BASE}/api/v1/policy-categories`).catch(() => null);
        if (pubCatRes && pubCatRes.ok) {
          const json = await pubCatRes.json();
          loadedCategories = json.data || [];
        }
      }
      setCategories(loadedCategories);

      // 2. Fetch Policies
      const polRes = await fetch(`${API_BASE}/api/v1/admin/policies`, {
        headers: authHeaders(),
      }).catch(() => null);

      let loadedPolicies: PolicyItem[] = [];
      if (polRes && polRes.ok) {
        const json = await polRes.json();
        loadedPolicies = json.data || [];
      } else {
        // Fallback to public endpoint
        const pubPolRes = await fetch(`${API_BASE}/api/v1/policies`).catch(() => null);
        if (pubPolRes && pubPolRes.ok) {
          const json = await pubPolRes.json();
          loadedPolicies = json.data || [];
        }
      }
      setPolicies(loadedPolicies);
    } catch (err: any) {
      console.error('Failed to load policies data:', err);
      toast.error('Failed to connect to backend service');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -------------------------------------------------------------------------
  // Category Handlers
  // -------------------------------------------------------------------------
  const openCreateCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      sortOrder: categories.length + 1,
      isActive: true,
    });
    setCategoryModalOpen(true);
  };

  const openEditCategory = (cat: PolicyCategory) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      sortOrder: cat.sortOrder,
      isActive: cat.isActive,
    });
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (submitting) return;
    setSubmitting(true);

    try {
      const url = editingCategory
        ? `${API_BASE}/api/v1/admin/policy-categories/${editingCategory.id}`
        : `${API_BASE}/api/v1/admin/policy-categories`;
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(categoryForm),
      });

      if (res.ok) {
        toast.success(`Category ${editingCategory ? 'updated' : 'created'} successfully!`);
        setCategoryModalOpen(false);
        fetchData();
      } else {
        const json = await res.json().catch(() => ({}));
        toast.error(json.message || 'Failed to save category');
      }
    } catch (err: any) {
      toast.error(`Network error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleCategoryStatus = async (cat: PolicyCategory) => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/policy-categories/${cat.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ isActive: !cat.isActive }),
      });
      if (res.ok) {
        toast.success(`Category "${cat.name}" status updated!`);
        setCategories((prev) =>
          prev.map((c) => (c.id === cat.id ? { ...c, isActive: !c.isActive } : c))
        );
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"? This will also affect policies under it.`)) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/policy-categories/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.ok) {
        toast.success(`Category "${name}" deleted!`);
        fetchData();
      } else {
        const json = await res.json().catch(() => ({}));
        toast.error(json.message || 'Failed to delete category');
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };

  // -------------------------------------------------------------------------
  // Policy Handlers
  // -------------------------------------------------------------------------
  const openCreatePolicy = () => {
    setEditingPolicy(null);
    const defaultCatId = categories.length > 0 ? categories[0].id : 1;
    setPolicyForm({
      categoryId: defaultCatId,
      title: '',
      slug: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      isActive: true,
    });
    setPolicyModalOpen(true);
  };

  const openEditPolicy = (policy: PolicyItem) => {
    setEditingPolicy(policy);
    setPolicyForm({
      categoryId: policy.categoryId,
      title: policy.title,
      slug: policy.slug,
      content: policy.content,
      metaTitle: policy.metaTitle || '',
      metaDescription: policy.metaDescription || '',
      isActive: policy.isActive,
    });
    setPolicyModalOpen(true);
  };

  const handleSavePolicy = async () => {
    if (!policyForm.categoryId) {
      toast.error('Please select a Policy Category');
      return;
    }
    if (!policyForm.title.trim()) {
      toast.error('Policy Title is required');
      return;
    }
    if (!policyForm.content.trim()) {
      toast.error('Policy Content cannot be empty');
      return;
    }
    if (submitting) return;
    setSubmitting(true);

    try {
      const url = editingPolicy
        ? `${API_BASE}/api/v1/admin/policies/${editingPolicy.id}`
        : `${API_BASE}/api/v1/admin/policies`;
      const method = editingPolicy ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(policyForm),
      });

      if (res.ok) {
        toast.success(`Policy "${policyForm.title}" saved successfully!`);
        setPolicyModalOpen(false);
        fetchData();
      } else {
        const json = await res.json().catch(() => ({}));
        toast.error(json.message || 'Failed to save policy');
      }
    } catch (err: any) {
      toast.error(`Network error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePolicyStatus = async (policy: PolicyItem) => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/policies/${policy.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ isActive: !policy.isActive }),
      });
      if (res.ok) {
        toast.success(`Policy "${policy.title}" status updated!`);
        setPolicies((prev) =>
          prev.map((p) => (p.id === policy.id ? { ...p, isActive: !p.isActive } : p))
        );
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const handleDeletePolicy = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/v1/admin/policies/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.ok) {
        toast.success(`Policy "${title}" deleted!`);
        fetchData();
      } else {
        const json = await res.json().catch(() => ({}));
        toast.error(json.message || 'Failed to delete policy');
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };

  // Filtered Policies
  const filteredPolicies = policies.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'all' || String(p.categoryId) === selectedCategoryFilter;

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && p.isActive) ||
      (statusFilter === 'inactive' && !p.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Shield className="h-6 w-6 text-teal-600" />
              Policy & Category Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure, publish, and maintain official store policies with dynamic real-time synchronization.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            {mainTab === 'policies' ? (
              <Button
                size="sm"
                onClick={openCreatePolicy}
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Add Policy
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={openCreateCategory}
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs
          value={mainTab}
          onValueChange={(val) => setMainTab(val as 'policies' | 'categories')}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-2 max-w-md bg-muted/60 p-1">
            <TabsTrigger value="policies" className="text-sm font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Policies ({policies.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-sm font-semibold flex items-center gap-2">
              <FolderTree className="h-4 w-4" />
              Categories ({categories.length})
            </TabsTrigger>
          </TabsList>

          {/* =============================================================== */}
          {/* TAB 1: POLICIES */}
          {/* =============================================================== */}
          <TabsContent value="policies" className="space-y-4">
            {/* Filter Bar */}
            <Card className="border-border">
              <CardContent className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search policies by title or slug..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="w-48">
                    <Select
                      value={selectedCategoryFilter}
                      onValueChange={(val) => setSelectedCategoryFilter(val || 'all')}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-36">
                    <Select
                      value={statusFilter}
                      onValueChange={(val) => setStatusFilter(val || 'all')}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="inactive">Inactive Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Policies Table */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-xs">TITLE & SLUG</TableHead>
                      <TableHead className="font-bold text-xs">CATEGORY</TableHead>
                      <TableHead className="font-bold text-xs text-center">STATUS</TableHead>
                      <TableHead className="font-bold text-xs">LAST UPDATED</TableHead>
                      <TableHead className="font-bold text-xs text-right">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-teal-600" />
                          Loading policies...
                        </TableCell>
                      </TableRow>
                    ) : filteredPolicies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                          <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                          <p className="font-medium text-sm">No policies found matching your filter</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={openCreatePolicy}
                            className="mt-3 text-xs"
                          >
                            Create First Policy
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPolicies.map((p) => {
                        const cat = categories.find((c) => c.id === p.categoryId) || p.category;
                        return (
                          <TableRow key={p.id}>
                            <TableCell>
                              <div className="font-semibold text-sm text-foreground">{p.title}</div>
                              <div className="text-xs text-muted-foreground font-mono">/{p.slug}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs bg-muted/40 font-medium">
                                {cat?.name || 'General'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Switch
                                  checked={p.isActive}
                                  onCheckedChange={() => handleTogglePolicyStatus(p)}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {p.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('en-IN') : 'Default'}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setPreviewPolicy(p)}
                                  title="Preview Policy"
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditPolicy(p)}
                                  title="Edit Policy"
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit2 className="h-4 w-4 text-teal-600 hover:text-teal-700" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeletePolicy(p.id, p.title)}
                                  title="Delete Policy"
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* =============================================================== */}
          {/* TAB 2: POLICY CATEGORIES */}
          {/* =============================================================== */}
          <TabsContent value="categories" className="space-y-4">
            <Card className="border-border shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-xs">ORDER</TableHead>
                      <TableHead className="font-bold text-xs">CATEGORY NAME & SLUG</TableHead>
                      <TableHead className="font-bold text-xs">DESCRIPTION</TableHead>
                      <TableHead className="font-bold text-xs text-center">POLICIES</TableHead>
                      <TableHead className="font-bold text-xs text-center">STATUS</TableHead>
                      <TableHead className="font-bold text-xs text-right">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-teal-600" />
                          Loading categories...
                        </TableCell>
                      </TableRow>
                    ) : categories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          No policy categories created yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      categories.map((cat) => {
                        const count = policies.filter((p) => p.categoryId === cat.id).length;
                        return (
                          <TableRow key={cat.id}>
                            <TableCell className="text-xs font-mono text-muted-foreground">
                              {cat.sortOrder}
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold text-sm text-foreground">{cat.name}</div>
                              <div className="text-xs text-muted-foreground font-mono">/{cat.slug}</div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                              {cat.description || '—'}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="secondary" className="text-xs font-semibold">
                                {count} {count === 1 ? 'Policy' : 'Policies'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Switch
                                  checked={cat.isActive}
                                  onCheckedChange={() => handleToggleCategoryStatus(cat)}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {cat.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditCategory(cat)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit2 className="h-4 w-4 text-teal-600 hover:text-teal-700" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* =============================================================== */}
        {/* MODAL: CREATE / EDIT CATEGORY */}
        {/* =============================================================== */}
        <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                {editingCategory ? 'Edit Policy Category' : 'Add Policy Category'}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Categories group related compliance and legal policies together.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <Label className="text-xs font-bold uppercase text-muted-foreground">
                  Category Name *
                </Label>
                <Input
                  value={categoryForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setCategoryForm((prev) => ({
                      ...prev,
                      name,
                      slug: !editingCategory
                        ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                        : prev.slug,
                    }));
                  }}
                  placeholder="e.g. Terms & Conditions"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-muted-foreground">
                  Category Slug *
                </Label>
                <Input
                  value={categoryForm.slug}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="e.g. terms-and-conditions"
                  className="mt-1 font-mono text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-muted-foreground">
                  Description
                </Label>
                <Input
                  value={categoryForm.description}
                  onChange={(e) =>
                    setCategoryForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Brief description of this legal category"
                  className="mt-1 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    Sort Order
                  </Label>
                  <Input
                    type="number"
                    value={categoryForm.sortOrder}
                    onChange={(e) =>
                      setCategoryForm((prev) => ({
                        ...prev,
                        sortOrder: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <div className="flex items-center gap-2 pb-2">
                    <Switch
                      checked={categoryForm.isActive}
                      onCheckedChange={(checked) =>
                        setCategoryForm((prev) => ({ ...prev, isActive: checked }))
                      }
                    />
                    <Label className="text-xs font-semibold cursor-pointer">
                      {categoryForm.isActive ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCategoryModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveCategory}
                disabled={submitting}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5 mr-1" /> Save Category
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* =============================================================== */}
        {/* MODAL: CREATE / EDIT POLICY */}
        {/* =============================================================== */}
        <Dialog open={policyModalOpen} onOpenChange={setPolicyModalOpen}>
          <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                {editingPolicy ? 'Edit Policy' : 'Create New Policy'}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Write legal policies and disclosures published to Web and Customer Mobile App.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    Policy Category *
                  </Label>
                  <Select
                    value={String(policyForm.categoryId)}
                    onValueChange={(val) =>
                      setPolicyForm((prev) => ({ ...prev, categoryId: Number(val) }))
                    }
                  >
                    <SelectTrigger className="mt-1 text-xs">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    Policy Status
                  </Label>
                  <div className="flex items-center gap-2 mt-3">
                    <Switch
                      checked={policyForm.isActive}
                      onCheckedChange={(checked) =>
                        setPolicyForm((prev) => ({ ...prev, isActive: checked }))
                      }
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      {policyForm.isActive ? 'Published & Active' : 'Draft / Hidden'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    Policy Title *
                  </Label>
                  <Input
                    value={policyForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setPolicyForm((prev) => ({
                        ...prev,
                        title,
                        slug: !editingPolicy
                          ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                          : prev.slug,
                      }));
                    }}
                    placeholder="e.g. Privacy Policy"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    URL Slug *
                  </Label>
                  <Input
                    value={policyForm.slug}
                    onChange={(e) =>
                      setPolicyForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="e.g. privacy-policy"
                    className="mt-1 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold uppercase text-muted-foreground">
                  Policy Content (HTML / Clean text) *
                </Label>
                <Textarea
                  value={policyForm.content}
                  onChange={(e) =>
                    setPolicyForm((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="<p>Enter legal policy content here...</p>"
                  className="mt-1 min-h-[260px] font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    SEO Meta Title (Optional)
                  </Label>
                  <Input
                    value={policyForm.metaTitle}
                    onChange={(e) =>
                      setPolicyForm((prev) => ({ ...prev, metaTitle: e.target.value }))
                    }
                    placeholder="Privacy Policy | Fashion City India Ltd"
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    SEO Meta Description (Optional)
                  </Label>
                  <Input
                    value={policyForm.metaDescription}
                    onChange={(e) =>
                      setPolicyForm((prev) => ({ ...prev, metaDescription: e.target.value }))
                    }
                    placeholder="Read about how Fashion City India Ltd protects your personal information..."
                    className="mt-1 text-xs"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPolicyModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSavePolicy}
                disabled={submitting}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5 mr-1.5" /> Save & Publish Policy
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* =============================================================== */}
        {/* MODAL: PREVIEW POLICY */}
        {/* =============================================================== */}
        <Dialog open={!!previewPolicy} onOpenChange={() => setPreviewPolicy(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <DialogTitle className="text-xl font-bold">{previewPolicy?.title}</DialogTitle>
              </div>
              <DialogDescription className="text-xs font-mono">
                Slug: /{previewPolicy?.slug} • Category: {previewPolicy?.category?.name || 'General'}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 border rounded-lg p-5 bg-card text-card-foreground">
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed"
                dangerouslySetInnerHTML={{ __html: previewPolicy?.content || '' }}
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewPolicy(null)}
              >
                Close Preview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
