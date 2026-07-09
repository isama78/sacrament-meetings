"use client";
import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="print-card max-w-3xl mx-auto bg-white p-8 border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <div className="text-center border-b pb-6 mb-6 border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          Sacrament Meeting
        </h2>
        <p className="text-slate-500 mt-1">{meeting.date}</p>
        <div className="flex justify-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
          <span><strong>Preside:</strong> {meeting.presiding}</span>
          <span><strong>Conduct:</strong> {meeting.conducting}</span>
        </div>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-6 no-print">
          <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-xs mb-2">
            Announcements
          </h3>
          <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600 dark:text-slate-400">
            {meeting.announcements.map((ann, index) => (
              <li key={index}>{ann}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-4">
        <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-xs border-b pb-1">
          Program
        </h3>
        
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Opening Song Hymn</span>
          <span className="font-medium">Nº {meeting.openingHymn.number} - {meeting.openingHymn.title}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Opening Prayer</span>
          <span className="font-medium">{meeting.openingPrayer}</span>
        </div>

        {meeting.wardBusiness && meeting.wardBusiness.length > 0 && (
          <div className="bg-slate-50 p-3 rounded-lg dark:bg-slate-800/50">
            <span className="text-xs font-bold text-slate-400 uppercase">Ward Business</span>
            {meeting.wardBusiness.map((bus, idx) => (
              <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 mt-1">{bus.description}</p>
            ))}
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Sacrament Song Hymn</span>
          <span className="font-medium">Nº {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</span>
        </div>

        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-slate-400 uppercase block">Participation</span>
          {meeting.speakers.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm pl-2 border-l-2 border-slate-200 dark:border-slate-700">
              <div>
                <p className="font-medium">{item.name}</p>
                {item.topic && <p className="text-xs text-slate-500">Tema: {item.topic}</p>}
              </div>
              <span className="text-xs text-slate-400 italic self-center capitalize">
                {item.type === 'speaker' ? 'Speaker' : 'Music Number'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm pt-2">
          <span className="text-slate-500">Closing Song Hymn</span>
          <span className="font-medium">Nº {meeting.closingHymn.number} - {meeting.closingHymn.title}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Closing Prayer</span>
          <span className="font-medium">{meeting.closingPrayer}</span>
        </div>
      </section>

      <div className="mt-8 text-center no-print">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
        >
          Print Program
        </button>
      </div>
    </article>
  );
}