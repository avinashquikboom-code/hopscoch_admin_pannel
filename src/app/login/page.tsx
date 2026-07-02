'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight, TrendingUp, Users, ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('token', 'demo-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          email: formData.email,
          name: 'Admin User',
          role: 'admin',
        }));
        router.push('/dashboard');
      } else {
        setError('Please enter valid administrator credentials.');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-zinc-950 text-zinc-100 overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      {/* Left side: Premium Brand Showcase (Hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:col-span-7 relative flex-col justify-between p-12 overflow-hidden border-r border-zinc-900 bg-zinc-950">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-teal-600/5 blur-[100px] pointer-events-none" />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        {/* Logo/Brand */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-widest bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            AURA COUTURE
          </span>
        </div>

        {/* Mid Hero Section */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-400 uppercase bg-teal-950/50 border border-teal-900/60 rounded-full mb-4">
              Enterprise Control Pannel
            </span>
            <h2 className="text-5xl font-extrabold tracking-tight leading-none text-zinc-100 mb-4">
              Experience fashion management, <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">reimagined.</span>
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              Seamlessly orchestrate your catalogs, monitor global orders, and engage custom visual searches powered by enterprise-grade insights.
            </p>
          </motion.div>

          {/* Core metrics badges */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 backdrop-blur"
            >
              <div className="p-2 w-fit rounded-lg bg-teal-500/10 text-teal-400 mb-2">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-500">Sales Growth</div>
              <div className="text-lg font-bold text-zinc-100">+28.4%</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 backdrop-blur"
            >
              <div className="p-2 w-fit rounded-lg bg-teal-500/10 text-teal-400 mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-500">Active Admins</div>
              <div className="text-lg font-bold text-zinc-100">1.2k</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 backdrop-blur"
            >
              <div className="p-2 w-fit rounded-lg bg-teal-500/10 text-teal-400 mb-2">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-xs text-zinc-500">Daily Orders</div>
              <div className="text-lg font-bold text-zinc-100">8.4k</div>
            </motion.div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-zinc-500 flex items-center justify-between">
          <span>© 2026 AURA COUTURE. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            V2.4.0 Secure Node
          </span>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="lg:col-span-5 flex items-center justify-center p-8 bg-zinc-950 relative">
        {/* Glow behind card for mobile/all */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none lg:hidden" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 relative z-10"
        >
          {/* Logo only visible on mobile */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-600 shadow-xl shadow-teal-500/10">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-widest bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              AURA COUTURE
            </h1>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-100">
              Welcome back
            </h2>
            <p className="text-zinc-400 font-light text-sm">
              Please enter your admin credentials to access the console.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/50 text-red-300 text-sm"
              >
                <AlertDescription>{error}</AlertDescription>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@aura.com"
                    className="pl-11 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 h-12 rounded-xl transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Security Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-11 pr-11 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 h-12 rounded-xl transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2.5">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, rememberMe: checked as boolean })
                }
                className="bg-zinc-900/50 border-zinc-800 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 rounded"
              />
              <Label htmlFor="remember" className="text-sm text-zinc-400 font-light select-none cursor-pointer">
                Keep me signed in on this device
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:opacity-95 text-white font-semibold transition-all shadow-lg shadow-teal-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Enterprise disclaimer only on mobile */}
          <div className="lg:hidden text-center text-xs text-zinc-600 pt-4">
            Protected by AURA Enterprise Secure Shield • v2.4.0
          </div>
        </motion.div>
      </div>
    </div>
  );
}

