import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import { SacramentMeeting } from '@/lib/types';

export const revalidate = 0;

function findClosestMeeting(meetings: SacramentMeeting[]): SacramentMeeting | null {
  if (!meetings || meetings.length === 0) return null;

  const today = new Date();
  
  today.setHours(0, 0, 0, 0); 

  return meetings.reduce((closest, current) => {
    const currentDate = new Date(current.date);
    const closestDate = new Date(closest.date);

    const currentDiff = Math.abs(currentDate.getTime() - today.getTime());
    const closestDiff = Math.abs(closestDate.getTime() - today.getTime());

    return currentDiff < closestDiff ? current : closest;
  });
}

export default async function CurrentMeetingPage() {
  const meetings = getMeetings();
  
  const currentMeeting = findClosestMeeting(meetings);

  if (!currentMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${currentMeeting.id}`);
}