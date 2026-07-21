'use client';

import { API_BASE } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/toast';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Camera, Save, Lock, Key, Monitor, Smartphone,
  CheckCircle2, User, Bell, Activity, Star, TrendingUp,
  ShoppingBag, Users, Eye, EyeOff, MapPin, Mail, Phone,
  LogOut, ChevronRight, Zap, Award,
} from 'lucide-react';

type ActiveTab = 'profile' | 'security' | 'sessions' | 'notifications';

const TABS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
  { key: 'profile', label: 'Personal Info', icon: User },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'sessions', label: 'Sessions', icon: Monitor },
  { key: 'notifications', label: 'Notifications', icon: Bell },
];

const STAT_COLORS = [
  { text: 'text-[#14b8a6]', bg: 'bg-[#14b8a6]/10', border: 'border-[#14b8a6]/20' },
  { text: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
];

const DEFAULT_STATS = [
  { label: 'Orders', value: '—', icon: ShoppingBag },
  { label: 'Customers', value: '—', icon: Users },
  { label: 'Revenue', value: '—', icon: TrendingUp },
  { label: 'Score', value: '—', icon: Star },
];

const DEFAULT_NOTIFS = [
  { key: 'orders', label: 'New Orders', desc: 'Alert when a new order is placed', enabled: true },
  { key: 'refunds', label: 'Refund Requests', desc: 'Alert when customer submits a refund', enabled: true },
  { key: 'stock', label: 'Low Stock Alerts', desc: 'When product inventory falls below 5', enabled: false },
  { key: 'payments', label: 'Failed Payments', desc: 'Alert when a transaction fails', enabled: true },
  { key: 'reports', label: 'System Reports', desc: 'Weekly performance digests via email', enabled: false },
];

// Teal toggle switch
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none cursor-pointer flex-shrink-0
        ${on ? 'bg-gradient-to-r from-[#14b8a6] to-[#0f766e] shadow-md shadow-[#14b8a6]/20' : 'bg-muted border border-border/40'}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

// Section divider
function Divider() {
  return <div className="h-px bg-gradient-to-r from-[#14b8a6]/20 via-border/30 to-transparent my-5" />;
}

// Input row with icon
function FieldRow({ id, label, icon: Icon, children }: { id: string; label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
        <Icon className="h-3 w-3" />
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [notifs, setNotifs] = useState(DEFAULT_NOTIFS);
  const [sessions, setSessions] = useState<any[]>([]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    location: 'Mumbai, India',
    bio: 'Fashion director and senior administrator at FCISeller.',
    avatarUrl: '', role: 'ADMIN', createdAt: '',
  });

  // Load cached user instantly, then fetch fresh
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const p = JSON.parse(stored);
        setProfileData(prev => ({
          ...prev,
          firstName: p.firstName || '',
          lastName: p.lastName || '',
          email: p.email || '',
          phone: p.phone || '',
          location: p.location || 'Mumbai, India',
          bio: p.bio || '',
          avatarUrl: p.avatarUrl || '',
          role: p.role || 'ADMIN',
          createdAt: p.createdAt || '',
        }));
      } catch { }
    }
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/admin/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();
        if (res.ok && json.data) {
          setProfileData(prev => ({
            ...prev,
            firstName: json.data.firstName || '',
            lastName: json.data.lastName || '',
            email: json.data.email || '',
            phone: json.data.phone || '',
            location: json.data.location || 'Mumbai, India',
            bio: json.data.bio || '',
            avatarUrl: json.data.avatarUrl || '',
            role: json.data.role || 'ADMIN',
            createdAt: json.data.createdAt || '',
          }));
          localStorage.setItem('user', JSON.stringify(json.data));
        }
      } catch (e) {
        // Error occurred
      }
    };
 
    const fetchSessions = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/admin/sessions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const json = await res.json();
        if (res.ok && json.data) {
          setSessions(json.data);
        }
      } catch (e) {
        // Error occurred
      }
    };

    fetchProfile();
    fetchSessions();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('auth_token');
    if (!token) { toast.error('Session expired. Please log in.'); setIsLoading(false); return; }
    try {
      const res = await fetch(
        `${API_BASE}/api/admin/profile`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            firstName: profileData.firstName, lastName: profileData.lastName,
            email: profileData.email, phone: profileData.phone, avatarUrl: profileData.avatarUrl,
          }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update profile');
      if (json.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
        localStorage.setItem('user', JSON.stringify(json.data));
        toast.success('Profile updated successfully!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Unable to save changes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      toast.error('Current password is required!');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long!');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and Confirm password do not match!');
      return;
    }

    setIsUpdatingPassword(true);
    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error('Session expired. Please log in.');
      setIsUpdatingPassword(false);
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/auth/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Failed to update password');
      }

      toast.success('Password updated successfully! Please re-login with your new credentials.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        router.push('/login');
      }, 2500);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const getInitials = () => {
    const f = profileData.firstName?.charAt(0)?.toUpperCase() ?? '';
    const l = profileData.lastName?.charAt(0)?.toUpperCase() ?? '';
    return `${f}${l}` || 'AD';
  };

  const getJoinDate = () => {
    if (!profileData.createdAt) return 'January 2026';
    try {
      return new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch { return 'January 2026'; }
  };

  const fullName = `${profileData.firstName} ${profileData.lastName}`.trim() || 'Admin User';
  const roleLabel = profileData.role === 'ADMIN' ? 'Super Admin' : profileData.role;

  return (
    <AdminLayout>
      <div className="space-y-8 pb-16">

        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#14b8a6]/30 bg-[#14b8a6]/5 text-[#14b8a6] text-[10px] font-bold uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14b8a6] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#14b8a6]" />
              </span>
              Admin Command Center
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              <span className="text-foreground">Admin </span>
              <span className="text-[#14b8a6]">Profile</span>
            </h1>
            <p className="text-sm text-muted-foreground">Manage your identity, security, and preferences.</p>
          </div>

          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-xl bg-gradient-to-r from-[#0f766e] to-[#0d9488] hover:from-[#0d9488] hover:to-[#2dd4bf] text-white shadow-lg shadow-[#14b8a6]/20 transition-all h-11 px-6 text-sm font-bold gap-2 self-start sm:self-auto"
          >
            {isLoading
              ? <><span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              : isSaved
                ? <><CheckCircle2 className="h-4 w-4" /> Saved!</>
                : <><Save className="h-4 w-4" /> Save Changes</>
            }
          </Button>
        </div>

        {/* ── HERO IDENTITY CARD ──────────────────────────────────────────── */}
        <Card className="border-border/30 rounded-2xl bg-card overflow-hidden shadow-sm">
          {/* Teal top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#14b8a6] via-[#2dd4bf] to-[#0f766e]" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

              {/* Avatar cluster */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0f766e] blur-2xl opacity-15" />
                <Avatar className="h-24 w-24 rounded-full border-4 border-card shadow-xl relative">
                  {profileData.avatarUrl && <AvatarImage src={profileData.avatarUrl} alt={fullName} />}
                  <AvatarFallback className="rounded-full bg-gradient-to-br from-[#14b8a6] via-[#2dd4bf] to-[#0f766e] text-black text-3xl font-black">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-emerald-500 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                {/* Camera button */}
                <button className="absolute -bottom-1 -right-6 h-8 w-8 rounded-full bg-[#14b8a6] hover:bg-[#0d9488] text-white shadow-md flex items-center justify-center transition-all cursor-pointer border-2 border-card hover:scale-110">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Name + meta */}
              <div className="flex-1 text-center md:text-left space-y-3 min-w-0">
                <div>
                  <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                    <h2 className="text-2xl font-black text-foreground">{fullName}</h2>
                    <Badge className="bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/25 rounded-lg px-2.5 py-0.5 text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Shield className="h-3 w-3" /> {roleLabel}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 justify-center md:justify-start">
                    {profileData.email && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {profileData.email}
                      </span>
                    )}
                    {profileData.phone && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {profileData.phone}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {profileData.location}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Award className="h-3 w-3" /> Joined {getJoinDate()}
                    </span>
                  </div>
                </div>

                {/* Stat chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {DEFAULT_STATS.map((s, i) => {
                    const c = STAT_COLORS[i];
                    return (
                      <div key={s.label} className={`rounded-xl border ${c.border} ${c.bg} px-3 py-2.5 text-center`}>
                        <s.icon className={`h-3.5 w-3.5 ${c.text} mx-auto mb-1`} />
                        <p className={`text-base font-black ${c.text}`}>{s.value}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex md:flex-col gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" className="rounded-xl h-9 px-3.5 text-xs font-semibold gap-1.5 border-border/40">
                  <Zap className="h-3.5 w-3.5 text-[#14b8a6]" /> Activity
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl h-9 px-3.5 text-xs font-semibold gap-1.5 border-rose-500/20 text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                    router.push('/login');
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── MAIN CONTENT GRID ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Tab panel */}
          <div className="lg:col-span-2 space-y-5">

            {/* Tab nav */}
            <div className="flex gap-1 p-1 bg-muted/20 border border-border/20 rounded-xl w-full overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-1 justify-center
                    ${activeTab === t.key
                      ? 'bg-background text-[#14b8a6] shadow-sm border border-border/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'}`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* ── PERSONAL INFO ── */}
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                  <Card className="border-border/30 rounded-2xl bg-card shadow-sm overflow-hidden">
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#14b8a6]/40 via-[#14b8a6]/20 to-transparent" />
                    <CardContent className="p-6 space-y-5">
                      <div>
                        <h3 className="text-base font-bold text-foreground">Personal Information</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Update your profile details, contact info and bio.</p>
                      </div>
                      <Divider />

                      {/* Avatar upload row */}
                      <div className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-muted/10">
                        <Avatar className="h-16 w-16 rounded-full border-2 border-[#14b8a6]/30 shadow-md flex-shrink-0">
                          {profileData.avatarUrl && <AvatarImage src={profileData.avatarUrl} />}
                          <AvatarFallback className="rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0f766e] text-black font-black text-xl">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground">{fullName}</p>
                          <p className="text-xs text-muted-foreground mb-2">{roleLabel} · Joined {getJoinDate()}</p>
                          <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs gap-1.5 border-border/40">
                            <Camera className="h-3.5 w-3.5" /> Change Photo
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldRow id="firstName" label="First Name" icon={User}>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={e => setProfileData(p => ({ ...p, firstName: e.target.value }))}
                            className="h-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                            placeholder="Enter first name"
                          />
                        </FieldRow>
                        <FieldRow id="lastName" label="Last Name" icon={User}>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={e => setProfileData(p => ({ ...p, lastName: e.target.value }))}
                            className="h-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                            placeholder="Enter last name"
                          />
                        </FieldRow>
                      </div>

                      <FieldRow id="email" label="Email Address" icon={Mail}>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={e => setProfileData(p => ({ ...p, email: e.target.value }))}
                          className="h-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                          placeholder="Enter your email"
                        />
                      </FieldRow>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldRow id="phone" label="Phone Number" icon={Phone}>
                          <Input
                            id="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={e => setProfileData(p => ({ ...p, phone: e.target.value }))}
                            className="h-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                            placeholder="+91 00000 00000"
                          />
                        </FieldRow>
                        <FieldRow id="location" label="Location" icon={MapPin}>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={e => setProfileData(p => ({ ...p, location: e.target.value }))}
                            className="h-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                            placeholder="City, Country"
                          />
                        </FieldRow>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <Activity className="h-3 w-3" /> Biography
                        </Label>
                        <Textarea
                          id="bio"
                          rows={3}
                          value={profileData.bio}
                          onChange={e => setProfileData(p => ({ ...p, bio: e.target.value }))}
                          className="rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all resize-none text-sm p-3"
                          placeholder="Write something about yourself..."
                        />
                      </div>

                      <div className="flex justify-end pt-1">
                        <Button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="rounded-xl bg-gradient-to-r from-[#14b8a6] to-[#0f766e] hover:from-[#2dd4bf] hover:to-[#0d9488] text-white shadow-md shadow-[#14b8a6]/15 transition-all h-10 px-6 text-xs font-bold gap-2"
                        >
                          {isLoading ? 'Saving…' : isSaved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Changes</>}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ── SECURITY ── */}
              {activeTab === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="space-y-4">
                  {/* Change password */}
                  <Card className="border-border/30 rounded-2xl bg-card shadow-sm overflow-hidden">
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#14b8a6]/40 via-[#14b8a6]/20 to-transparent" />
                    <CardContent className="p-6 space-y-5">
                      <div>
                        <h3 className="text-base font-bold text-foreground">Change Password</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Update your password regularly for better security.</p>
                      </div>
                      <Divider />

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Lock className="h-3 w-3" /> Current Password</Label>
                        <div className="relative">
                          <Input
                            type={showCurrentPwd ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="h-10 pr-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                            placeholder="Enter current password"
                          />
                          <button onClick={() => setShowCurrentPwd(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            {showCurrentPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Key className="h-3 w-3" /> New Password</Label>
                          <div className="relative">
                            <Input
                              type={showNewPwd ? 'text' : 'password'}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="h-10 pr-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                              placeholder="Min 8 characters"
                            />
                            <button onClick={() => setShowNewPwd(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                              {showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Key className="h-3 w-3" /> Confirm Password</Label>
                          <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-10 rounded-xl border-border/50 bg-muted/5 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/25 transition-all"
                            placeholder="Re-enter new password"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          disabled={isUpdatingPassword}
                          onClick={handleUpdatePassword}
                          className="rounded-xl bg-gradient-to-r from-[#14b8a6] to-[#0f766e] hover:from-[#2dd4bf] hover:to-[#0d9488] text-white shadow-md shadow-[#14b8a6]/15 h-10 px-6 text-xs font-bold gap-2 cursor-pointer"
                        >
                          <Lock className="h-4 w-4" />
                          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ── SESSIONS ── */}
              {activeTab === 'sessions' && (
                <motion.div key="sessions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                  <Card className="border-border/30 rounded-2xl bg-card shadow-sm overflow-hidden">
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#14b8a6]/40 via-[#14b8a6]/20 to-transparent" />
                    <CardContent className="p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-foreground">Active Sessions</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">Devices currently logged into your account.</p>
                        </div>
                        <Badge className="bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 rounded-lg px-2.5 text-xs font-bold">
                          {sessions.length} Active
                        </Badge>
                      </div>
                      <Divider />

                      <div className="space-y-3">
                        {sessions.map((s: any) => (
                          <div key={s.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                            ${s.current ? 'border-[#14b8a6]/30 bg-[#14b8a6]/5' : 'border-border/30 bg-muted/5 hover:bg-muted/10'}`}
                          >
                            <div className={`p-2.5 rounded-xl border flex-shrink-0
                              ${s.current ? 'bg-[#14b8a6]/10 border-[#14b8a6]/20 text-[#14b8a6]' : 'bg-muted/30 border-border/30 text-muted-foreground'}`}
                            >
                              {s.os.includes('iOS') ? <Smartphone className="h-4.5 w-4.5" /> : <Monitor className="h-4.5 w-4.5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                {s.device}
                                {s.current && (
                                  <Badge className="bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 rounded-md px-2 py-0 text-[9px] font-bold">This Device</Badge>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{s.browser} · {s.os} · {s.ip}</p>
                              <p className="text-[10px] text-muted-foreground/60 mt-0.5 flex items-center gap-1">
                                <MapPin className="h-2.5 w-2.5" /> {s.location} · {s.lastActive}
                              </p>
                            </div>
                            {!s.current && (
                              <Button variant="ghost" size="sm" className="rounded-lg h-8 px-3 text-xs font-bold text-rose-500 hover:bg-rose-500/10 flex-shrink-0">
                                Revoke
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full rounded-xl border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white h-10 text-xs font-bold gap-2 transition-all">
                        <Shield className="h-4 w-4" /> Revoke All Other Sessions
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ── NOTIFICATIONS ── */}
              {activeTab === 'notifications' && (
                <motion.div key="notifications" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="space-y-4">
                  <Card className="border-border/30 rounded-2xl bg-card shadow-sm overflow-hidden">
                    <div className="h-0.5 w-full bg-gradient-to-r from-[#14b8a6]/40 via-[#14b8a6]/20 to-transparent" />
                    <CardContent className="p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-foreground">Notification Preferences</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">Configure system-level alerts and email notification toggles.</p>
                        </div>
                        <Button 
                          onClick={() => router.push('/notifications')}
                          size="sm"
                          className="bg-[#14b8a6] hover:bg-[#0f766e] text-black font-bold text-xs rounded-xl h-8 px-3"
                        >
                          <Bell className="h-3.5 w-3.5 mr-1.5" /> Open Notifications Center
                        </Button>
                      </div>
                      <Divider />

                      <div className="divide-y divide-border/10">
                        {notifs.map((n) => (
                          <div key={n.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-foreground">{n.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                            </div>
                            <div className="flex items-center gap-2.5 flex-shrink-0">
                              <span className={`text-[10px] font-bold uppercase ${n.enabled ? 'text-[#14b8a6]' : 'text-muted-foreground'}`}>
                                {n.enabled ? 'On' : 'Off'}
                              </span>
                              <Toggle on={n.enabled} onToggle={() => setNotifs(prev => prev.map(x => x.key === n.key ? { ...x, enabled: !x.enabled } : x))} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="space-y-5">

            {/* Profile snapshot card */}
            <Card className="border-border/30 rounded-2xl bg-card shadow-sm overflow-hidden">
              <div className="h-0.5 w-full bg-gradient-to-r from-[#14b8a6]/40 via-[#14b8a6]/20 to-transparent" />
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 rounded-full border border-[#14b8a6]/25 shadow-sm flex-shrink-0">
                    {profileData.avatarUrl && <AvatarImage src={profileData.avatarUrl} />}
                    <AvatarFallback className="rounded-full bg-gradient-to-br from-[#14b8a6] to-[#0f766e] text-black text-xs font-black">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{profileData.email || roleLabel}</p>
                  </div>
                </div>

                {/* Quick info rows */}
                {[
                  { icon: Shield, label: 'Role', value: roleLabel },
                  { icon: MapPin, label: 'Location', value: profileData.location },
                  { icon: Award, label: 'Joined', value: getJoinDate() },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3 py-2 border-t border-border/10">
                    <div className="h-7 w-7 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                      <row.icon className="h-3.5 w-3.5 text-[#14b8a6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{row.label}</p>
                      <p className="text-xs font-semibold text-foreground truncate">{row.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/30 rounded-2xl bg-card shadow-sm">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-[#14b8a6]/10 flex items-center justify-center">
                    <Activity className="h-3.5 w-3.5 text-[#14b8a6]" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground">Recent Activity</h4>
                </div>
                <div className="h-px bg-gradient-to-r from-border/50 via-border/10 to-transparent" />

                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground text-center py-4">No recent activity to display</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
