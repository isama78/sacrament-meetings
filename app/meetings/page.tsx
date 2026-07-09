import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';

export const revalidate = 0;

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  // Simulate a delay to show loading loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/meetings`);
  if (!res.ok) throw new Error('Error fetching meetings');
  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Meeting History Planner
        </h2>
        <p className="text-sm text-slate-500">
          Select a date to view the complete program or print it.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}