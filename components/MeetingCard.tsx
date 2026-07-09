import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-hover hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-500">{meeting.date}</span>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 capitalize dark:bg-blue-950 dark:text-blue-300">
          {meeting.meetingType}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        Preside: {meeting.presiding}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Conduct: {meeting.conducting}
      </p>
      <Link
        href={`/meetings/${meeting.id}`}
        className="text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        View complete agenda &rarr;
      </Link>
    </div>
  );
}