'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setSuccess(true);
      } else {
        setError('Please enter your email address');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden p-4 selection:bg-[#14b8a6] selection:text-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full bg-[#14b8a6]/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-zinc-400 hover:text-[#14b8a6] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>

        <Card className="border-zinc-900 bg-zinc-950/40 glass-panel shadow-[0_0_50px_rgba(20,184,166,0.05)] rounded-2xl overflow-hidden">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-black text-white">Forgot Password?</CardTitle>
            <CardDescription className="text-zinc-400 font-light text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          {success ? (
            <CardContent className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#14b8a6]/10 flex items-center justify-center mb-4 border border-[#14b8a6]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#14b8a6]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Check your email</h3>
                <p className="text-sm text-zinc-400 font-light">
                  We've sent a password reset link to <strong className="text-white font-medium">{email}</strong>
                </p>
              </motion.div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pb-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/50 text-red-300 text-sm"
                  >
                    <AlertDescription>{error}</AlertDescription>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-[#14b8a6] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@aura.com"
                      className="pl-11 bg-zinc-950 border-zinc-900 text-zinc-100 placeholder-zinc-700 focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6]/40 h-12 rounded-xl transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-2 pb-6">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#14b8a6] via-[#2dd4bf] to-[#14b8a6] hover:opacity-95 text-black font-bold tracking-wider transition-all shadow-lg shadow-[#14b8a6]/10 active:scale-[0.99] border border-[#14b8a6]/20 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </CardFooter>
            </form>
          )}

          {success && (
            <CardFooter className="pt-2 pb-6 border-t border-zinc-900/40">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full border-zinc-800 hover:bg-zinc-900/50 hover:text-white rounded-xl text-zinc-400 h-11 transition-all">
                  Back to Login
                </Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
