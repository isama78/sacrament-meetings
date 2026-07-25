import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";

export const revalidate = 0;

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <Link
        href="/meetings/new"
        className="inline-flex items-center justify-end mb-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all shadow-lg"
      >
        + New Meeting
      </Link>
      <MeetingSearch />
      {meetings.map((m) => (
        <MeetingCard key={m.id} meeting={m} />
      ))}
      <Pagination totalPages={totalPages} />
    </div>
  );
}
