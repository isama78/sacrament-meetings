'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('An uncaught error occurred:', error);
  }, [error]);

  return (
    <div className="text-center p-6 mt-10">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()} className="bg-blue-600 text-white px-4 py-2 mt-4">
        Try Again
      </button>
      <Link href="/meetings" className="block mt-4">Go Back to Meetings</Link>
    </div>
  );
}