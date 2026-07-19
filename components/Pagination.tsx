'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav className="flex justify-center items-center mt-4" aria-label="Pagination">
      {currentPage > 1 && (
        <Link className="px-2 bg-blue-900 text-white rounded-md mr-2" href={createPageURL(currentPage - 1)}>Previous</Link>
      )}
      <span className="text-slate-500 px-2">Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages && (
        <Link className="px-2 bg-blue-900 text-white rounded-md ml-2" href={createPageURL(currentPage + 1)}>Next</Link>
      )}
    </nav>
  );
}