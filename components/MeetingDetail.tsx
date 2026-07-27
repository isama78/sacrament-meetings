"use client";

import { capitalize } from "@/app/helpers/helpers";
import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const announcements = meeting.announcements || [];
  const wardBusiness = meeting.wardBusiness || meeting.wardBusiness || [];
  const speakers = meeting.speakers || [];
  const openingHymn = meeting.openingHymn || meeting.openingHymn;
  const sacramentHymn = meeting.sacramentHymn || meeting.sacramentHymn;
  const closingHymn = meeting.closingHymn || meeting.closingHymn;
  const openingPrayer = meeting.openingPrayer || meeting.openingPrayer;
  const closingPrayer = meeting.closingPrayer || meeting.closingPrayer;
  const meetingType = meeting.meetingType || meeting.meetingType;
  const stakeBusiness = meeting.stakeBusiness ?? meeting.stakeBusiness;
  console.log("abre el detalle de agenda", meeting)
  return (
    <article className="print-card max-w-3xl mx-auto bg-white p-6 border border-slate-200 rounded-lg shadow-sm space-y-6 dark:bg-slate-900 dark:border-slate-800">
      <header className="border-b pb-4 border-slate-200 dark:border-slate-800 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sacrament Meeting{" "}
            <span className="text-slate-500 font-normal text-base dark:text-slate-400">
              ({capitalize(meetingType || "regular")})
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">{meeting.date}</p>
        </div>

        <div className="text-right text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Presiding:
            </span>{" "}
            {meeting.presiding}
          </p>
          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Conducting:
            </span>{" "}
            {meeting.conducting}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-md border border-slate-200 dark:border-slate-800">
          <span className="block font-semibold text-slate-500 dark:text-slate-400">
            Date
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            {meeting.date}
          </span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-md border border-slate-200 dark:border-slate-800">
          <span className="block font-semibold text-slate-500 dark:text-slate-400">
            Meeting Type
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            {capitalize(meetingType || "regular")}
          </span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-md border border-slate-200 dark:border-slate-800">
          <span className="block font-semibold text-slate-500 dark:text-slate-400">
            Presiding
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            {meeting.presiding}
          </span>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-md border border-slate-200 dark:border-slate-800">
          <span className="block font-semibold text-slate-500 dark:text-slate-400">
            Conducting
          </span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">
            {meeting.conducting}
          </span>
        </div>
      </div>

      {announcements.length > 0 && (
        <fieldset className="border border-slate-200 dark:border-slate-800 p-4 rounded-md space-y-2">
          <legend className="font-semibold text-sm text-slate-700 dark:text-slate-300 px-1">
            Announcements
          </legend>
          <ul className="space-y-1.5" aria-label="Announcements List">
            {announcements.map((item, index) => (
              <li
                key={index}
                className="text-xs bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                • {item}
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      <fieldset className="border border-slate-200 dark:border-slate-800 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 dark:text-slate-300 px-1">
          Hymns & Prayers
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Opening Hymn #
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {openingHymn?.number || "—"}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Opening Hymn Title
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {openingHymn?.title || "—"}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Opening Prayer
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {openingPrayer || "—"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Sacrament Hymn #
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {sacramentHymn?.number || "—"}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Sacrament Hymn Title
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {sacramentHymn?.title || "—"}
            </span>
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 dark:border-slate-800 p-4 rounded-md space-y-3">
        <legend className="font-semibold text-sm text-slate-700 dark:text-slate-300 px-1">
          Ward & Stake Business
        </legend>

        {wardBusiness.length > 0 ? (
          <ul className="space-y-1.5">
            {wardBusiness.map((item, index) => (
              <li
                key={index}
                className="text-xs bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                • {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400 italic">
            No ward business items listed.
          </p>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Stake Business Conducted:
          </span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${stakeBusiness ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}
          >
            {stakeBusiness ? "Yes" : "No"}
          </span>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 dark:border-slate-800 p-4 rounded-md space-y-3">
        <legend className="font-semibold text-sm text-slate-700 dark:text-slate-300 px-1">
          Speakers & Musical Numbers
        </legend>

        {speakers.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No speakers assigned.</p>
        ) : (
          speakers.map((speaker, index) => (
            <div
              key={index}
              className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-md border border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Item #{index + 1}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium dark:bg-blue-950 dark:text-blue-300 capitalize">
                  {speaker.type === "speaker" ? "Speaker" : "Musical Number"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="block font-medium text-slate-500 dark:text-slate-400">
                    Name
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">
                    {speaker.name || "—"}
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-slate-500 dark:text-slate-400">
                    Topic / Title
                  </span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {speaker.topic || "—"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </fieldset>

      <fieldset className="border border-slate-200 dark:border-slate-800 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 dark:text-slate-300 px-1">
          Closing
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Closing Hymn #
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {closingHymn?.number || "—"}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Closing Hymn Title
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {closingHymn?.title || "—"}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-800">
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Closing Prayer
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {closingPrayer || "—"}
            </span>
          </div>
        </div>
      </fieldset>

      <div className="pt-4 flex justify-end no-print">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Program
        </button>
      </div>
    </article>
  );
}
