import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) {
    return new NextResponse('Invalid ID. It must be a number.', { status: 400 });
  }

  const meeting = getMeetingById(idNumber);

  if (!meeting) {
    return new NextResponse('Meeting not found.', { status: 404 });
  }

  return NextResponse.json(meeting);
}