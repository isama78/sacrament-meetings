import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12 text-center">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          <span className="text-blue-900 dark:text-blue-400">Sacramental Meeting Planner</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          A tool designed to help bishopricks and ward leaders to schedule agendas, 
          manage announcements, and print a clean program for unit members.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/meetings"
          className="rounded-md bg-blue-900 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-800 transition-colors"
        >
          View Meeting History
        </Link>
        <Link
          href="/meetings/current"
          className="rounded-md bg-white border border-slate-300 px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
        >
          This Meeting Plan
        </Link>
      </div>

      <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 shadow-lg dark:border-slate-800">
        <Image
          src="/images/church.jpg" 
          alt="Interior of a church or meeting center"
          width={1200}
          height={600}
          priority
          className="h-[300px] sm:h-[400px] w-full object-cover grayscale-[30%] contrast-[110%]"
        />
      </div>

      <div className="grid max-w-4xl gap-6 sm:grid-cols-3 text-left border-t border-slate-200 pt-12 dark:border-slate-800">
        <div className="space-y-2">
          <h3 className="text-md font-bold text-slate-900 dark:text-white">Meeting Agenda Management</h3>
          <p className="text-sm text-slate-500">Easily schedule discourses, prayers, hymns, and unit topics.</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-md font-bold text-slate-900 dark:text-white">Print Formats</h3>
          <p className="text-sm text-slate-500">Optimized physical printing formats or PDF format for digital distribution.</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-md font-bold text-slate-900 dark:text-white">Meeting Types</h3>
          <p className="text-sm text-slate-500">Support for regular meetings, testimonies, conference calls, and general meetings.</p>
        </div>
      </div>
    </div>
  );
}