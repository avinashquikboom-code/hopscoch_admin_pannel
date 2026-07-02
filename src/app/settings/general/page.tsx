'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsGeneralPage() {
  const [formData, setFormData] = useState({
    storeName: 'Aura Couture Store',
    supportEmail: 'support@auracouture.com',
    supportPhone: '+1 (555) 019-2834',
    address: '100 Luxury Avenue, Fashion District, New York, NY 10001',
    metaTitle: 'Aura Couture | Premium Designer Clothing & Couture',
    metaDescription: 'Discover clean premium designer styles and seasonal couture lines online.',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12 max-w-4xl">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">General Settings</h1>
          <p className="text-muted-foreground mt-1 font-light">
            Configure global storefront metadata, contact links, and addresses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-border/40 rounded-2xl bg-card">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="text-base font-bold">Store Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="text-xs font-semibold">Store Public Name</Label>
                  <Input
                    id="storeName"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail" className="text-xs font-semibold">Support Contact Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                    className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-semibold">Support Contact Phone</Label>
                <Input
                  id="phone"
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-semibold">Business Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 rounded-2xl bg-card">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="text-base font-bold">SEO & Metadata</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle" className="text-xs font-semibold">Home Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription" className="text-xs font-semibold">Home Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              className="rounded-xl bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10 h-11 px-6 cursor-pointer"
            >
              {isSaved ? 'Settings Saved' : 'Save General Config'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
