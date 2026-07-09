export default function MeetingsLoading() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-900 dark:border-slate-800 dark:border-t-blue-400"></div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Loading meeting information...
      </p>
    </div>
  );
}