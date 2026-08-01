import { notFound } from 'next/navigation';
import EditMeetingForm from './edit-meeting-form';
import { getMeetingById } from '@/lib/meetings-db';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return {
      title: 'Meeting Not Found',
      description: 'The requested meeting could not be found.',
    };
  }

  return {
    title: `${meeting.meetingType} meeting` ,
    description: `Preside: ${meeting.presiding}`,
    openGraph: {
      title: `${meeting.meetingType} meeting` ,
      description: `Preside: ${meeting.presiding}`,
    },
  };
}

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));
  if (!meeting) {
    return notFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Meeting</h1>
      <EditMeetingForm meeting={meeting} />
    </main>
  );
}