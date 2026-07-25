import { deleteMeeting } from '@/lib/actions';

export function DeleteMeetingButton({ id }: { id: number }) {
  const deleteMeetingWithId = deleteMeeting.bind(null, id);
  return (
    <form action={deleteMeetingWithId}>
      <button type="submit" className="text-red-600">Delete</button>
    </form>
  );
}