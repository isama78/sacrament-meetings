import NavLinks from './NavLinks';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-EN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-blue-900 dark:text-blue-400">
              Meeting Scheduler
            </h1>
            <span className="text-xs text-slate-500 capitalize">{currentDate}</span>
          </div>
          <NavLinks />
        </div>
      </div>
    </header>
  );
}