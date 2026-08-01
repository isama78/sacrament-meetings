// app/login/page.tsx
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-6 border border-slate-200 rounded-lg shadow-sm space-y-6 dark:bg-slate-900 dark:border-slate-800">
        <header className="border-b pb-4 border-slate-200 dark:border-slate-800 text-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Admin Sign In
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sacrament Meeting Planner
          </p>
        </header>

        <LoginForm />
      </div>
    </main>
  );
}