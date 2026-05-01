'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';
import { useAuth } from '@/components/auth/MockAuthProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      router.push('/forum');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="container-main py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md overflow-hidden rounded-[28px] bg-white p-8 shadow-md"
        >
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-sm text-secondary-600">
              Log in to access the member forum and share your travel stories.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field mt-1 w-full"
                placeholder="Enter your name"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-secondary-500">
            This is a demo login. No password required.
          </p>
        </motion.div>
      </section>
    </div>
  );
}