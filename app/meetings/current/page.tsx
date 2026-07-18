import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import { SacramentMeeting } from '@/lib/types';

export const revalidate = 0;

function findCurrentSundayMeeting(meetings: SacramentMeeting[]): SacramentMeeting | null {
  if (!meetings || meetings.length === 0) return null;

  const today = new Date();
  const dayOfWeek = today.getDay();
  const dateOfMonth = today.getDate();
  const currentSunday = new Date(today);
  
  currentSunday.setDate(dateOfMonth - dayOfWeek);
  const currentSundayStr = currentSunday.toISOString().split('T')[0];

  return meetings.find(meeting => meeting.date === currentSundayStr) || null;
}

export default async function CurrentMeetingPage() {
  const meetings = getMeetings();
  
  const currentMeeting = findCurrentSundayMeeting(meetings); 

  if (!currentMeeting) {
    redirect('/meetings'); 
  }

  redirect(`/meetings/${currentMeeting.id}`);
}