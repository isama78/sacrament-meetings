// auth.config.ts  (project root)
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // use your own login page instead of the Auth.js default
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isCreating = nextUrl.pathname === '/meetings/new';
      const isEditing = nextUrl.pathname.endsWith('/edit');
      const isDeleting = nextUrl.pathname.endsWith('/delete');

      const isProtected = isCreating || isEditing || isDeleting;

      if (isProtected) {
        if (isLoggedIn) return true;
        return false;
      }

      // Redirect already-logged-in users away from the login page
      if (isLoggedIn && nextUrl.pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }

      return true;
    },
  },
  providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;