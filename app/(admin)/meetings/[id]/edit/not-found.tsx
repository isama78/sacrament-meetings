import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center mt-10">
      <h2>Meeting Not Found</h2>
      <p>The sacrament meeting you are looking for does not exist.</p>
      <Link href="/meetings">Back to Meetings</Link>
    </div>
  );
}