import { notFound } from 'next/navigation';
import EditMeetingForm from './edit-meeting-form';
import { getMeetingById } from '@/lib/meetings-db';

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