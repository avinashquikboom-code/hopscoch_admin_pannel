'use client';
import { API_BASE } from '@/lib/api';

import { useState, useEffect, useCallback } from 'react';
import { useCurrency } from '@/context/currency-context';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Save,
  Upload,
  Store,
  CreditCard,
  Truck,
  Bell,
  Palette,
  Globe,
  Settings,
  CheckCircle2,
  Volume2,
  Sliders,
  Sparkles
} from 'lucide-react';


function authHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export default function SettingsPage() {
  const { setCurrencyCode } = useCurrency();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [config, setConfig] = useState({
    storeName: 'AURA COUTURE',
    storeEmail: 'admin@auracouture.com',
    storePhone: '+1 234 567 8900',
    storeAddress: '123 Fashion Street, New York, NY 10001',
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    metaTitle: 'AURA COUTURE - Luxury Premium Fashion Store',
    metaDescription: 'Discover premium couture fashion and high-end accessories at AURA COUTURE. Exquisite quality for the modern wardrobe.',
    newOrderAlerts: true,
    lowStockWarnings: true,
    weeklyDigests: false,
  });

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings`, { headers: authHeaders() });
      const json = await res.json();
      if (res.ok && json.data) {
        setConfig(prev => ({ ...prev, ...json.data }));
      }
    } catch {}
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setIsSaved(true);
        setCurrencyCode(config.currency); // update global context instantly
        setTimeout(() => setIsSaved(false), 2500);
      }
    } catch {} finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="System"
          titlePart2="Settings"
          badgeText="System Configuration"
          subtitle="Configure core store metadata, language preferences, and notification alerts."
        />

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/40 p-1 border border-border/20 rounded-xl flex overflow-x-auto w-full md:w-fit justify-start h-auto">
            <TabsTrigger value="general" className="rounded-lg py-2 px-4 text-xs font-semibold">General Settings</TabsTrigger>
            <TabsTrigger value="store" className="rounded-lg py-2 px-4 text-xs font-semibold">Store Branding</TabsTrigger>
            <TabsTrigger value="notification" className="rounded-lg py-2 px-4 text-xs font-semibold">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-0">
            <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">General Configuration</h3>
                  <p className="text-xs text-muted-foreground font-light">Set key contact details and system localized coordinates.</p>
                </div>
                <Separator className="border-border/10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="storeName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Store Name</Label>
                    <Input id="storeName" value={config.storeName} onChange={e => setConfig(prev => ({ ...prev, storeName: e.target.value }))} className="h-10 rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="storeEmail" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Store Email</Label>
                    <Input id="storeEmail" type="email" value={config.storeEmail} onChange={e => setConfig(prev => ({ ...prev, storeEmail: e.target.value }))} className="h-10 rounded-lg border-border/50" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="storePhone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Store Hotline Phone</Label>
                  <Input id="storePhone" type="tel" value={config.storePhone} onChange={e => setConfig(prev => ({ ...prev, storePhone: e.target.value }))} className="h-10 rounded-lg border-border/50" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="storeAddress" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">HQ Store Address</Label>
                  <Textarea 
                    id="storeAddress" 
                    rows={3} 
                    value={config.storeAddress}
                    onChange={e => setConfig(prev => ({ ...prev, storeAddress: e.target.value }))}
                    className="rounded-lg border-border/50 bg-background resize-none text-sm p-3 focus:border-primary focus:ring-1 focus:ring-primary/20" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="currency" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Default Currency</Label>
                    <select
                      id="currency"
                      value={config.currency}
                      onChange={e => setConfig(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full h-10 rounded-lg border border-border/50 bg-background px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="language" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">System Language</Label>
                    <select
                      id="language"
                      value={config.language}
                      onChange={e => setConfig(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full h-10 rounded-lg border border-border/50 bg-background px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="timezone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Timezone Coordinates</Label>
                    <select
                      id="timezone"
                      value={config.timezone}
                      onChange={e => setConfig(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full h-10 rounded-lg border border-border/50 bg-background px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none cursor-pointer"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="rounded-lg bg-primary text-white hover:bg-primary/95 shadow-sm h-11 px-6 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  >
                    {isLoading ? (
                      'Saving Changes...'
                    ) : isSaved ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Config Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" /> Save Configuration
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="store" className="mt-0">
            <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">Branding & SEO Settings</h3>
                  <p className="text-xs text-muted-foreground font-light">Customize client-facing storefront meta assets.</p>
                </div>
                <Separator className="border-border/10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Store Logo Asset</Label>
                    <div className="border-2 border-dashed border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all rounded-xl p-6 text-center cursor-pointer">
                      <Upload className="h-7 w-7 mx-auto text-muted-foreground/80 mb-2" />
                      <p className="text-xs font-semibold text-foreground">Click to upload logo PNG</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">Recommended 200x200px</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Favicon Icon Asset</Label>
                    <div className="border-2 border-dashed border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all rounded-xl p-6 text-center cursor-pointer">
                      <Upload className="h-7 w-7 mx-auto text-muted-foreground/80 mb-2" />
                      <p className="text-xs font-semibold text-foreground">Click to upload favicon ICO</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">Recommended 32x32px</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="metaTitle" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Default SEO Meta Title</Label>
                  <Input id="metaTitle" defaultValue="AURA COUTURE - Luxury Premium Fashion Store" className="h-10 rounded-lg border-border/50" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="metaDescription" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Default SEO Meta Description</Label>
                  <Textarea 
                    id="metaDescription" 
                    rows={3}
                    defaultValue="Discover premium couture fashion and high-end accessories at AURA COUTURE. Exquisite quality for the modern wardrobe."
                    className="rounded-lg border-border/50 bg-background resize-none text-sm p-3 focus:border-primary"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="rounded-lg bg-primary text-white hover:bg-primary/95 h-11 px-6 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  >
                    {isLoading ? 'Saving Changes...' : isSaved ? <><CheckCircle2 className="h-4 w-4" /> Brand Asset Saved</> : <><Save className="h-4 w-4" /> Save Brand Details</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notification" className="mt-0">
            <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">Notification Preferences</h3>
                  <p className="text-xs text-muted-foreground font-light">Configure triggers for automated system communication broadcasts.</p>
                </div>
                <Separator className="border-border/10" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-muted/15">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#14b8a6]/10 text-[#14b8a6] rounded-lg shrink-0">
                        <Store className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">New Order Alerts</p>
                        <p className="text-xs text-muted-foreground font-light mt-0.5">Receive immediate dashboard triggers on new sales.</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-muted/15">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg shrink-0">
                        <Sliders className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Low Stock Threshold Warnings</p>
                        <p className="text-xs text-muted-foreground font-light mt-0.5">Get email briefs when mapped items fall below target counts.</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-muted/15">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                        <Volume2 className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Buyer Review Submissions</p>
                        <p className="text-xs text-muted-foreground font-light mt-0.5">Notify moderator queues on new star reviews.</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="rounded-lg bg-primary text-white hover:bg-primary/95 h-11 px-6 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  >
                    {isLoading ? 'Saving Changes...' : isSaved ? <><CheckCircle2 className="h-4 w-4" /> Preferences Saved</> : <><Save className="h-4 w-4" /> Save Preferences</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
