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
  User, 
  Shield, 
  Clock,
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

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatar.png" alt="Profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary-dark"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Admin User</h3>
                  <p className="text-sm text-muted-foreground">admin@aura.com</p>
                  <Badge className="mt-2">Admin</Badge>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium">January 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last login</span>
                  <span className="font-medium">Today, 9:15 AM</span>
                </div>
              </div>

              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="User" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="admin@aura.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={4}
                        defaultValue="Fashion enthusiast and admin at AURA COUTURE."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary-dark"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary-dark"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Key className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Not enabled</p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Enable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sessions">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Manage your active sessions across devices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-muted rounded-lg">
                              {session.os.includes('macOS') || session.os.includes('iOS') ? (
                                <Smartphone className="h-6 w-6 text-muted-foreground" />
                              ) : (
                                <Monitor className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{session.device}</p>
                              <p className="text-sm text-muted-foreground">
                                {session.browser} on {session.os}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {session.location} • {session.ip}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm font-medium">{session.lastActive}</p>
                              {session.current && (
                                <Badge className="bg-success/10 text-success">Current</Badge>
                              )}
                            </div>
                            {!session.current && (
                              <Button variant="ghost" size="sm">
                                Revoke
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <Button variant="destructive" className="w-full">
                        <Shield className="mr-2 h-4 w-4" />
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
