export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 text-sm">
      <p className="px-4 py-2">
        &copy; {new Date().getFullYear()} Meeting Scheduler. All rights reserved.
      </p>
    </footer>
  );
}