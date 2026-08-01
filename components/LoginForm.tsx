'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* ALERTA DE ERROR */}
      {errorMessage && (
        <div
          role="alert"
          className="p-3 text-xs rounded-md bg-red-50 border border-red-200 text-red-700 dark:bg-red-950/50 dark:border-red-900/50 dark:text-red-300 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4 shrink-0 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <fieldset className="border border-slate-200 dark:border-slate-800 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 dark:text-slate-300 px-1">
          Credentials
        </legend>

        {/* CAMPO EMAIL */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="admin@example.com"
            className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white dark:bg-slate-800/50 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* CAMPO CONTRASEÑA */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            minLength={6}
            required
            placeholder="••••••••"
            className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white dark:bg-slate-800/50 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </fieldset>

      {/* BOTÓN SUBMIT */}
      <button
        aria-disabled={isPending}
        disabled={isPending}
        type="submit"
        className="w-full flex justify-center items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}