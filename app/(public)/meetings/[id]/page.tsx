import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
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

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingDetailPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}