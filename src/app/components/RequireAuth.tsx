'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/auth/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // hide content while redirecting
  return <>{children}</>;
}