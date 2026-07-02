'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  LogOut,
  Camera,
  Save,
  Lock,
  Key,
  Monitor,
  Smartphone
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

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-1 font-light">
            Manage your administrator profile details, security access, and active sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview Card */}
          <Card className="lg:col-span-1 border-border/40 rounded-2xl bg-card">
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border border-border/60">
                    <AvatarImage src="/avatar.png" alt="Profile" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary/95 text-white shadow-md shadow-primary/10 cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-foreground">Admin User</h3>
                  <p className="text-xs text-muted-foreground font-light">admin@auracouture.com</p>
                  <div className="pt-2">
                    <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2.5 py-0.5">
                      System Administrator
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border/30 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-light">Member since</span>
                  <span className="font-semibold text-foreground">January 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-light">Security Level</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5 text-teal-600" /> Layer 4 (Full Access)
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full rounded-xl border-border/60 hover:bg-muted/50 cursor-pointer flex items-center justify-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-muted/30 p-1 rounded-xl border border-border/40">
                <TabsTrigger value="profile" className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Profile Info</TabsTrigger>
                <TabsTrigger value="security" className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Security & Access</TabsTrigger>
                <TabsTrigger value="sessions" className="rounded-lg px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Login Sessions</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="border-border/40 rounded-2xl bg-card">
                  <CardHeader className="border-b border-border/30 pb-4">
                    <CardTitle className="text-base font-bold">Personal Information</CardTitle>
                    <CardDescription className="text-xs font-light">Configure details shown on your public profile</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-xs font-semibold">First Name</Label>
                        <Input id="firstName" defaultValue="Admin" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-xs font-semibold">Last Name</Label>
                        <Input id="lastName" defaultValue="User" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold">Administrator Email Address</Label>
                      <Input id="email" type="email" defaultValue="admin@auracouture.com" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-semibold">Contact Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 234 567 8900" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-xs font-semibold">Personal Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={4}
                        defaultValue="Fashion director and administrative supervisor at AURA COUTURE."
                        className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="rounded-xl bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10 h-11 px-6 cursor-pointer"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? 'Saving...' : isSaved ? 'Details Saved' : 'Save Profile details'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="border-border/40 rounded-2xl bg-card">
                  <CardHeader className="border-b border-border/30 pb-4">
                    <CardTitle className="text-base font-bold">Change Password</CardTitle>
                    <CardDescription className="text-xs font-light">Update your password regularly to keep your administrator account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-xs font-semibold">Current Password</Label>
                      <Input id="currentPassword" type="password" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-xs font-semibold">New Password</Label>
                      <Input id="newPassword" type="password" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-xs font-semibold">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="rounded-xl border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/40 h-10" />
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="rounded-xl bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10 h-11 px-6 cursor-pointer"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 border-border/40 rounded-2xl bg-card">
                  <CardHeader className="border-b border-border/30 pb-4">
                    <CardTitle className="text-base font-bold">Two-Factor Authentication</CardTitle>
                    <CardDescription className="text-xs font-light">Add an extra layer of access verification</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                          <Key className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground font-light">Not currently active</p>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-xl border-border/60 hover:bg-muted/50 cursor-pointer">
                        Enable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sessions">
                <Card className="border-border/40 rounded-2xl bg-card">
                  <CardHeader className="border-b border-border/30 pb-4">
                    <CardTitle className="text-base font-bold">Active Login Sessions</CardTitle>
                    <CardDescription className="text-xs font-light">Review other browsers logged into your account</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3.5">
                      {sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-muted/10">
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-muted/40 border border-border/30 rounded-lg text-slate-500">
                              {session.os.includes('macOS') || session.os.includes('iOS') ? (
                                <Smartphone className="h-4.5 w-4.5" />
                              ) : (
                                <Monitor className="h-4.5 w-4.5" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{session.device}</p>
                              <p className="text-xs text-muted-foreground font-light">
                                {session.browser} on {session.os} • {session.ip}
                              </p>
                              <p className="text-[10px] text-muted-foreground/80 mt-1">
                                {session.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-xs font-semibold text-foreground">{session.lastActive}</p>
                              {session.current && (
                                <Badge className="bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border-transparent rounded-full px-2 py-0.5 text-[9px] mt-1 ml-auto block w-fit">
                                  Current
                                </Badge>
                              )}
                            </div>
                            {!session.current && (
                              <Button variant="ghost" size="sm" className="rounded-lg h-7 px-2.5 cursor-pointer text-xs font-semibold text-destructive hover:bg-destructive/10">
                                Revoke
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/30">
                      <Button variant="outline" className="w-full rounded-xl border-red-200/50 hover:bg-red-50 text-red-600 cursor-pointer flex items-center justify-center gap-2">
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

