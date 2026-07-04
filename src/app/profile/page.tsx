'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
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
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

const sessions = [
  {
    id: '1',
    device: 'MacBook Pro',
    browser: 'Chrome',
    os: 'macOS',
    location: 'New York, USA',
    ip: '192.168.1.1',
    current: true,
    lastActive: 'Now',
  },
  {
    id: '2',
    device: 'iPhone 14',
    browser: 'Safari',
    os: 'iOS',
    location: 'New York, USA',
    ip: '192.168.1.2',
    current: false,
    lastActive: '2 hours ago',
  },
  {
    id: '3',
    device: 'Windows PC',
    browser: 'Firefox',
    os: 'Windows 11',
    location: 'Los Angeles, USA',
    ip: '192.168.1.3',
    current: false,
    lastActive: '1 day ago',
  },
];

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        <PageHeader
          titlePart1="Profile"
          titlePart2="Settings"
          badgeText="Profile Command Center"
          subtitle="Configure administrative account details, modify passwords, and manage active session authentication credentials."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <Card className="lg:col-span-1 border-border/30 rounded-xl bg-card/60 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-[#14b8a6]/5 to-[#0d9488]/5 blur-xl opacity-50 group-hover:scale-150 transition-all" />
            <CardContent className="p-6 space-y-6 flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-28 w-28 rounded-2xl border border-border/60 shadow-lg">
                  <AvatarFallback className="rounded-2xl bg-gradient-to-tr from-[#14b8a6] via-[#2dd4bf] to-[#0f766e] text-black text-3xl font-black">
                    AD
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-lg bg-primary hover:bg-primary/95 text-white shadow-md cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground">Admin User</h3>
                <p className="text-xs text-muted-foreground font-light">admin@auracouture.com</p>
                <div className="pt-1.5">
                  <Badge className="bg-teal-500/10 text-teal-500 border border-teal-500/25 rounded-md px-2.5 py-0.5 text-xs font-semibold">
                    System Administrator
                  </Badge>
                </div>
              </div>

              <div className="w-full space-y-3 pt-6 border-t border-border/20 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-light">Member since</span>
                  <span className="font-semibold text-foreground">January 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-light">Access Layer</span>
                  <span className="font-semibold text-[#14b8a6] flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5" /> Layer 4 (Owner)
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-lg border-border/60 hover:bg-muted/50 cursor-pointer h-10 flex items-center justify-center gap-2">
                <LogOut className="h-4 w-4 text-muted-foreground" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-muted/40 p-1 border border-border/20 rounded-xl flex overflow-x-auto w-full md:w-fit justify-start h-auto">
                <TabsTrigger value="profile" className="rounded-lg py-2 px-4 text-xs font-semibold">
                  Personal Information
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-lg py-2 px-4 text-xs font-semibold">
                  Security & Access
                </TabsTrigger>
                <TabsTrigger value="sessions" className="rounded-lg py-2 px-4 text-xs font-semibold">
                  Active Sessions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-0">
                <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground">Personal Information</h3>
                      <p className="text-xs text-muted-foreground font-light">Configure details shown on your administrator profile.</p>
                    </div>
                    <Separator className="border-border/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">First Name</Label>
                        <Input id="firstName" defaultValue="Admin" className="h-10 rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                        <Input id="lastName" defaultValue="User" className="h-10 rounded-lg border-border/50" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                      <Input id="email" type="email" defaultValue="admin@auracouture.com" className="h-10 rounded-lg border-border/50" />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 234 567 8900" className="h-10 rounded-lg border-border/50" />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Biography Details</Label>
                      <Textarea 
                        id="bio" 
                        rows={4}
                        defaultValue="Fashion director and administrative supervisor at AURA COUTURE."
                        className="rounded-lg border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background resize-none text-sm p-3"
                      />
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
                            <CheckCircle2 className="h-4 w-4" /> Saved Successfully
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" /> Save Profile Details
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0 space-y-6">
                <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground">Change Password</h3>
                      <p className="text-xs text-muted-foreground font-light">Update your password regularly to keep your administrator account secure.</p>
                    </div>
                    <Separator className="border-border/10" />

                    <div className="space-y-1.5">
                      <Label htmlFor="currentPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Password</Label>
                      <Input id="currentPassword" type="password" className="h-10 rounded-lg border-border/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="newPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">New Password</Label>
                        <Input id="newPassword" type="password" className="h-10 rounded-lg border-border/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" className="h-10 rounded-lg border-border/50" />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="rounded-lg bg-primary text-white hover:bg-primary/95 shadow-sm h-11 px-6 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                      >
                        <Lock className="h-4 w-4" />
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0">
                        <Key className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-muted-foreground font-light mt-0.5">
                          {mfaEnabled ? 'Protected with verification app checks' : 'Add an extra security authentication verification layer.'}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={mfaEnabled ? "outline" : "default"} 
                      onClick={() => setMfaEnabled(!mfaEnabled)}
                      className="rounded-lg cursor-pointer h-10 px-4 text-xs font-bold"
                    >
                      {mfaEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sessions" className="mt-0">
                <Card className="border-border/30 rounded-xl bg-card/60 backdrop-blur-md">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground">Active Login Sessions</h3>
                      <p className="text-xs text-muted-foreground font-light">Review and manage authorized browsers currently logged in.</p>
                    </div>
                    <Separator className="border-border/10" />

                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-muted/15">
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-muted/40 border border-border/30 rounded-xl text-muted-foreground shrink-0">
                              {session.os.includes('macOS') || session.os.includes('iOS') ? (
                                <Smartphone className="h-4.5 w-4.5" />
                              ) : (
                                <Monitor className="h-4.5 w-4.5" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                                {session.device}
                                {session.current && (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/25 rounded-md px-1.5 py-0 text-[9px] font-bold">
                                    Current
                                  </Badge>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground font-light truncate mt-0.5">
                                {session.browser} on {session.os} • {session.ip}
                              </p>
                              <p className="text-[10px] text-muted-foreground/60 font-light mt-1">
                                {session.location} • Last active {session.lastActive}
                              </p>
                            </div>
                          </div>
                          {!session.current && (
                            <Button variant="ghost" size="sm" className="rounded-lg h-8 px-3 cursor-pointer text-xs font-semibold text-rose-500 hover:bg-rose-500/10 shrink-0">
                              Revoke
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-border/10">
                      <Button variant="outline" className="w-full rounded-lg border-rose-200/50 hover:bg-rose-500/5 text-rose-500 cursor-pointer h-11 flex items-center justify-center gap-2 text-xs font-semibold">
                        <Shield className="h-4 w-4" />
                        Revoke All Other Sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
