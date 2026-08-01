'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { logout } from '@/lib/actions';

export default function NavLinks() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;
  
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Meetings', href: '/meetings' },
    { name: 'Current Meeting', href: '/meetings/current' },
  ];

  return (
    <nav className="flex items-center space-x-2 sm:space-x-4">
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== '/' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-blue-900 text-white dark:bg-blue-600'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {link.name}
          </Link>
        );
      })}

      <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 my-auto mx-1" />

      {status === 'loading' ? (
        <div className="h-8 w-16 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-md" />
      ) : isLoggedIn ? (
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 max-w-[120px] truncate">
            {session?.user?.email || 'User'}
          </span>

          <form action={logout}>
            <button
              type="submit"
              className="px-3 py-2 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <Link
          href="/login" 
          className={`px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
            pathname === '/login'
              ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          Sign In
        </Link>
      )}
    </nav>
  );
}