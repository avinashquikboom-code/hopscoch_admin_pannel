'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  LogOut,
  Camera,
  Save,
  Lock,
  Key,
  Monitor,
  Smartphone,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Activity,
  Star,
  TrendingUp,
  ShoppingBag,
  Users,
  Eye,
  EyeOff,
} from 'lucide-react';

const sessions = [
  { id: '1', device: 'MacBook Pro', browser: 'Chrome', os: 'macOS', location: 'Mumbai, India', ip: '192.168.1.1', current: true, lastActive: 'Now' },
  { id: '2', device: 'iPhone 14 Pro', browser: 'Safari', os: 'iOS', location: 'Mumbai, India', ip: '192.168.1.2', current: false, lastActive: '2 hours ago' },
  { id: '3', device: 'Windows PC', browser: 'Firefox', os: 'Windows 11', location: 'Delhi, India', ip: '192.168.1.3', current: false, lastActive: '1 day ago' },
];

const recentActivity = [
  { action: 'Updated product pricing', time: '5 min ago', icon: TrendingUp, color: 'text-[#14b8a6]' },
  { action: 'Approved 3 refund requests', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-500' },
  { action: 'Added new shipping zone', time: '3 hours ago', icon: MapPin, color: 'text-blue-500' },
  { action: 'Published flash sale banner', time: '6 hours ago', icon: Star, color: 'text-amber-500' },
  { action: 'Reviewed 12 new orders', time: '1 day ago', icon: ShoppingBag, color: 'text-violet-500' },
];

const stats = [
  { label: 'Orders Managed', value: '2,841', icon: ShoppingBag, color: 'text-[#14b8a6]', bgColor: 'bg-[#14b8a6]/10' },
  { label: 'Customers Served', value: '1,204', icon: Users, color: 'text-violet-500', bgColor: 'bg-violet-500/10' },
  { label: 'Revenue Tracked', value: '₹48.2L', icon: TrendingUp, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  { label: 'Admin Score', value: '98.4%', icon: Star, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
];

type ActiveTab = 'profile' | 'security' | 'sessions' | 'notifications';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }, 1000);
  };

  const tabs: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
    { key: 'profile', label: 'Personal Info', icon: User },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'sessions', label: 'Sessions', icon: Monitor },
    { key: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">

        {/* Profile Header Card */}
        <Card className="border-border/30 rounded-xl bg-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#14b8a6] to-[#0f766e] blur-xl opacity-20" />
                <Avatar className="h-20 w-20 rounded-2xl border-2 border-[#14b8a6]/30 shadow-lg relative">
                  <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#14b8a6] via-[#2dd4bf] to-[#0f766e] text-black text-2xl font-black">
                    JS
                  </AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center justify-center transition-all cursor-pointer">
                  <Camera className="h-3 w-3" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-xl font-bold text-foreground">John Smith</h1>
                  <Badge className="bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/25 rounded-md px-2 py-0.5 text-xs font-semibold">
                    <Shield className="h-3 w-3 mr-1" />
                    Super Admin
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">admin@hopscotch.com · Joined January 2026</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Activity className="h-3.5 w-3.5 text-[#14b8a6]" />
                    <span>Online Now</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg border-border/50">
                    <LogOut className="h-3.5 w-3.5 mr-1.5" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* Stats Mini */}
              <div className="grid grid-cols-2 gap-3 md:w-48">
                {stats.slice(0, 2).map((s) => (
                  <div key={s.label} className="bg-muted/30 rounded-lg p-3">
                    <p className="text-lg font-bold text-foreground">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Tab Nav */}
            <div className="flex gap-1 p-1 bg-muted/20 border border-border/20 rounded-lg w-fit">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === t.key
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            {/* Personal Info */}
            {activeTab === 'profile' && (
              <Card className="border-border/30 rounded-xl bg-card">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Update your name, contact details, and bio.</p>
                  </div>
                  <div className="h-px bg-border/20" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs font-semibold text-muted-foreground">First Name</Label>
                      <Input id="firstName" defaultValue="John" className="h-9 rounded-lg border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs font-semibold text-muted-foreground">Last Name</Label>
                      <Input id="lastName" defaultValue="Magar" className="h-9 rounded-lg border-border/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@hopscotch.com" className="h-9 rounded-lg border-border/50" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-semibold text-muted-foreground">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="h-9 rounded-lg border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-xs font-semibold text-muted-foreground">Location</Label>
                      <Input id="location" defaultValue="Mumbai, India" className="h-9 rounded-lg border-border/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-xs font-semibold text-muted-foreground">Biography</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      defaultValue="Fashion director and senior administrator at Hopscotch. Overseeing product, operations, and platform experience."
                      className="rounded-lg border-border/50 bg-background resize-none text-sm p-3"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="rounded-lg bg-primary text-white hover:bg-primary/95 h-9 px-5 cursor-pointer text-xs font-semibold"
                    >
                      {isLoading ? 'Saving...' : isSaved ? <><CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Saved!</> : <><Save className="h-3.5 w-3.5 mr-1.5" /> Save Changes</>}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <Card className="border-border/30 rounded-xl bg-card">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Change Password</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Update your password regularly for better account security.</p>
                    </div>
                    <div className="h-px bg-border/20" />

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-muted-foreground">Current Password</Label>
                      <div className="relative">
                        <Input type={showCurrentPwd ? 'text' : 'password'} className="h-9 pr-10 rounded-lg border-border/50" />
                        <button onClick={() => setShowCurrentPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                          {showCurrentPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground">New Password</Label>
                        <div className="relative">
                          <Input type={showNewPwd ? 'text' : 'password'} className="h-9 pr-10 rounded-lg border-border/50" />
                          <button onClick={() => setShowNewPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            {showNewPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground">Confirm Password</Label>
                        <Input type="password" className="h-9 rounded-lg border-border/50" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave} className="rounded-lg bg-primary text-white hover:bg-primary/95 h-9 px-5 cursor-pointer text-xs font-semibold">
                        <Lock className="h-3.5 w-3.5 mr-1.5" />
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/30 rounded-xl bg-card">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${mfaEnabled ? 'bg-[#14b8a6]/10' : 'bg-muted/50'}`}>
                          <Key className={`h-4 w-4 ${mfaEnabled ? 'text-[#14b8a6]' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Two-Factor Authentication (2FA)</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {mfaEnabled ? '✓ Protected with authenticator app' : 'Add an extra layer of security to your account.'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setMfaEnabled(m => !m)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all focus:outline-none cursor-pointer ${mfaEnabled ? 'bg-[#14b8a6]' : 'bg-muted'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${mfaEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Sessions */}
            {activeTab === 'sessions' && (
              <Card className="border-border/30 rounded-xl bg-card">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Active Sessions</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Devices currently logged into your account.</p>
                  </div>
                  <div className="h-px bg-border/20" />

                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div key={session.id} className={`flex items-center justify-between p-4 border rounded-lg transition-all ${session.current ? 'border-[#14b8a6]/30 bg-[#14b8a6]/5' : 'border-border/30 bg-muted/10'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg border ${session.current ? 'bg-[#14b8a6]/10 border-[#14b8a6]/20 text-[#14b8a6]' : 'bg-muted/40 border-border/30 text-muted-foreground'}`}>
                            {session.os.includes('iOS') ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                              {session.device}
                              {session.current && (
                                <Badge className="bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 rounded-md px-1.5 py-0 text-[9px] font-semibold">Current</Badge>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{session.browser} on {session.os} · {session.ip}</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{session.location} · {session.lastActive}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button variant="ghost" size="sm" className="rounded-lg h-8 px-3 cursor-pointer text-xs font-semibold text-rose-500 hover:bg-rose-500/10">
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full rounded-lg border-rose-200/40 hover:bg-rose-500/5 text-rose-500 cursor-pointer h-9 text-xs font-semibold gap-2 mt-2">
                    <Shield className="h-3.5 w-3.5" />
                    Revoke All Other Sessions
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <Card className="border-border/30 rounded-xl bg-card">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Notification Preferences</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Choose what you get notified about.</p>
                  </div>
                  <div className="h-px bg-border/20" />

                  {[
                    { label: 'New Orders', desc: 'Alert when a new order is placed', enabled: true },
                    { label: 'Refund Requests', desc: 'Alert when customer submits a refund', enabled: true },
                    { label: 'Low Stock Alerts', desc: 'When product inventory falls below 5', enabled: false },
                    { label: 'Failed Payments', desc: 'Alert when a transaction fails', enabled: true },
                    { label: 'System Reports', desc: 'Weekly performance digests', enabled: false },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between py-3 border-b border-border/10 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{n.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                      </div>
                      <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all cursor-pointer ${n.enabled ? 'bg-[#14b8a6]' : 'bg-muted'}`}>
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${n.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <div className="space-y-4">
            {/* Quick Profile Card */}
            <Card className="border-border/30 rounded-lg bg-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#14b8a6] to-[#0f766e] text-black text-sm font-bold">JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-foreground">John Smith</p>
                    <p className="text-xs text-muted-foreground">admin@hopscotch.com</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-lg font-bold text-[#14b8a6]">412</p>
                    <p className="text-[10px] text-muted-foreground uppercase">This Month</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-lg font-bold text-foreground">98.4%</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/30 rounded-lg bg-card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#14b8a6]" />
                  <h4 className="text-sm font-bold text-foreground">Recent Activity</h4>
                </div>
                <div className="h-px bg-border/20" />
                <div className="space-y-3">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-lg bg-muted/40 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-foreground leading-tight">{item.action}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-rose-200/20 rounded-lg bg-card">
              <CardContent className="p-5 space-y-3">
                <p className="text-xs font-bold text-rose-500 uppercase tracking-wider">Danger Zone</p>
                <div className="h-px bg-rose-200/20" />
                <p className="text-xs text-muted-foreground">Permanently delete your admin account and all associated data.</p>
                <Button variant="outline" className="w-full rounded-lg border-rose-200/40 hover:bg-rose-500/5 text-rose-500 cursor-pointer h-9 text-xs font-semibold">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
