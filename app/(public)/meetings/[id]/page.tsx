import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { SacramentMeeting } from '@/lib/types';
import { notFound } from 'next/navigation';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

// async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
//   // Simulate a delay to show loading loading state
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/meetings/${id}`);
//   if (res.status === 404 || res.status === 400) {
//     return null;
//   }
//   if (!res.ok) throw new Error('Error fetching meeting details');
//   return res.json();
// }

export default async function MeetingDetailPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }
  console.log("meeting", meeting)
  return <MeetingDetail meeting={meeting} />;
}