
'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import OryonLogo from './icons/oryon-logo';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isUserLoading) {
      return; // Wait until the user state is loaded
    }

    const isAuthPage = pathname === '/' || pathname === '/signup' || pathname === '/forgot-password';

    if (user && isAuthPage) {
      // If user is logged in and on an auth page, redirect to dashboard
      router.push('/dashboard');
    } else if (!user && !isAuthPage) {
      // If user is not logged in and not on an auth page, redirect to login
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading) {
    return (
      <main className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950">
        <OryonLogo className="mx-auto mb-4" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          A verificar a sua sessão...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
