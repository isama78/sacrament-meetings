'use client';

import { useState, useActionState } from 'react';
import { updateMeeting, type State } from '@/lib/actions';
import { SacramentMeeting } from '@/lib/types';

export interface SpeakerItem {
  name: string;
  type: 'speaker' | 'musical-number';
  topic: string;
}

export interface WardBusinessItem {
  description: string;
}

interface EditMeetingFormProps {
  meeting: SacramentMeeting;
}

export default function EditMeetingForm({ meeting }: EditMeetingFormProps) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const initialState: State = { message: null, errors: {} };
  
  const [state, formAction, isPending] = useActionState(updateMeetingWithId, initialState);

  const [announcements, setAnnouncements] = useState<string[]>(
    meeting.announcements || []
  );
  const [wardBusiness, setWardBusiness] = useState<WardBusinessItem[]>(
    meeting.wardBusiness || []
  );
  const [speakers, setSpeakers] = useState<SpeakerItem[]>(
    meeting.speakers || []
  );

  const addAnnouncement = (text: string) => {
    if (text.trim()) setAnnouncements([...announcements, text.trim()]);
  };
  const removeAnnouncement = (index: number) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  const addWardBusinessItem = (description: string) => {
    if (description.trim()) {
      setWardBusiness([...wardBusiness, { description: description.trim() }]);
    }
  };
  const removeWardBusinessItem = (index: number) => {
    setWardBusiness(wardBusiness.filter((_, i) => i !== index));
  };

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: '', type: 'speaker', topic: '' }]);
  };
  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index));
  };
  const handleSpeakerChange = (
    index: number,
    field: keyof SpeakerItem,
    value: string
  ) => {
    const updated = [...speakers];
    updated[index] = { ...updated[index], [field]: value };
    setSpeakers(updated);
  };

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-3xl bg-white p-6 rounded-lg border border-slate-200 shadow-sm"
      noValidate
    >
      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md"
        >
          {state.message}
        </div>
      )}

      <input type="hidden" name="announcements" value={JSON.stringify(announcements)} />
      <input type="hidden" name="wardBusiness" value={JSON.stringify(wardBusiness)} />
      <input type="hidden" name="speakers" value={JSON.stringify(speakers)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-xs font-semibold text-slate-700">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={meeting.date}
            aria-describedby="date-error"
            aria-invalid={!!state.errors?.date}
            className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date?.map((error) => (
              <p key={error} className="text-xs text-red-600 mt-1">{error}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-xs font-semibold text-slate-700">
            Meeting Type <span className="text-red-500">*</span>
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            aria-describedby="meetingType-error"
            aria-invalid={!!state.errors?.meetingType}
            className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Fast and Testimony</option>
            <option value="general">General</option>
            <option value="stake">Stake Conference</option>
          </select>
          <div id="meetingType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.meetingType?.map((error) => (
              <p key={error} className="text-xs text-red-600 mt-1">{error}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="presiding" className="block text-xs font-semibold text-slate-700">
            Presiding <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="presiding"
            name="presiding"
            defaultValue={meeting.presiding}
            aria-describedby="presiding-error"
            aria-invalid={!!state.errors?.presiding}
            className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {state.errors?.presiding?.map((error) => (
              <p key={error} className="text-xs text-red-600 mt-1">{error}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="conducting" className="block text-xs font-semibold text-slate-700">
            Conducting <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="conducting"
            name="conducting"
            defaultValue={meeting.conducting}
            aria-describedby="conducting-error"
            aria-invalid={!!state.errors?.conducting}
            className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state.errors?.conducting?.map((error) => (
              <p key={error} className="text-xs text-red-600 mt-1">{error}</p>
            ))}
          </div>
        </div>
      </div>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-3">
        <legend className="font-semibold text-sm text-slate-700 px-1">Announcements</legend>
        
        <div className="flex gap-2">
          <input
            type="text"
            id="new-announcement-input"
            placeholder="Add an announcement..."
            className="flex-1 rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            aria-label="New announcement text"
            aria-describedby="new-announcement-input-error"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addAnnouncement(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById('new-announcement-input') as HTMLInputElement;
              if (input) {
                addAnnouncement(input.value);
                input.value = '';
              }
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs px-3 py-2 rounded font-medium transition-colors"
          >
            Add
          </button>
        </div>

        <ul className="space-y-1.5" aria-label="Announcements List">
          {announcements.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded border border-slate-200">
              <span className="text-slate-700">• {item}</span>
              <button
                type="button"
                onClick={() => removeAnnouncement(index)}
                aria-label={`Remove announcement: ${item}`}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 px-1">Hymns & Prayers</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-xs font-medium text-slate-600">Opening Hymn #</label>
            <input
              type="number"
              id="openingHymnNumber"
              name="openingHymnNumber"
              aria-describedby="openingHymnNumber-error"
              defaultValue={meeting.openingHymn?.number}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-xs font-medium text-slate-600">Opening Hymn Title</label>
            <input
              type="text"
              id="openingHymnTitle"
              name="openingHymnTitle"
              aria-describedby="openingHymnTitle-error"
              defaultValue={meeting.openingHymn?.title}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="openingPrayer" className="block text-xs font-medium text-slate-600">Opening Prayer</label>
            <input
              type="text"
              id="openingPrayer"
              name="openingPrayer"
              aria-describedby="openingPrayer-error"
              defaultValue={meeting.openingPrayer}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-xs font-medium text-slate-600">Sacrament Hymn #</label>
            <input
              type="number"
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              aria-describedby="sacramentHymnNumber-error"
              defaultValue={meeting.sacramentHymn?.number}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-xs font-medium text-slate-600">Sacrament Hymn Title</label>
            <input
              type="text"
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              aria-describedby="sacramentHymnTitle-error"
              defaultValue={meeting.sacramentHymn?.title}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 px-1">Ward & Stake Business</legend>
        
        <div className="space-y-2">
          <label htmlFor="new-ward-business-input" className="block text-xs font-medium text-slate-600">
            Ward Business Items
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="new-ward-business-input"
              placeholder="e.g. Callings / Sustains..."
              className="flex-1 rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
              aria-describedby="new-ward-business-input-error"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addWardBusinessItem(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('new-ward-business-input') as HTMLInputElement;
                if (input) {
                  addWardBusinessItem(input.value);
                  input.value = '';
                }
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs px-3 py-2 rounded font-medium transition-colors"
            >
              Add
            </button>
          </div>

          <ul className="space-y-1.5" aria-label="Ward Business Items List">
            {wardBusiness.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded border border-slate-200">
                <span className="text-slate-700">• {item.description}</span>
                <button
                  type="button"
                  onClick={() => removeWardBusinessItem(index)}
                  aria-label={`Remove ward business: ${item.description}`}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <input
            type="checkbox"
            id="stakeBusiness"
            name="stakeBusiness"
            value="true"
            defaultChecked={meeting.stakeBusiness}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="stakeBusiness" className="text-xs font-medium text-slate-700">
            Stake Business Conducted
          </label>
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 flex items-center justify-between w-full px-1">
          <span>Speakers & Musical Numbers</span>
          <button
            type="button"
            onClick={addSpeaker}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium px-2.5 py-1 rounded transition-colors"
          >
            + Add Item
          </button>
        </legend>

        {speakers.length === 0 && (
          <p className="text-xs text-slate-500 italic">No speakers added yet.</p>
        )}

        {speakers.map((speaker, index) => (
          <div key={index} className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600">Item #{index + 1}</span>
              <button
                type="button"
                onClick={() => removeSpeaker(index)}
                aria-label={`Remove speaker ${index + 1}`}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor={`speaker-type-${index}`} className="block text-xs font-medium text-slate-600">Type</label>
                <select
                  id={`speaker-type-${index}`}
                  value={speaker.type}
                  onChange={(e) => handleSpeakerChange(index, 'type', e.target.value)}
                  className="mt-1 block w-full rounded border border-slate-300 p-1.5 text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
              </div>

              <div>
                <label htmlFor={`speaker-name-${index}`} className="block text-xs font-medium text-slate-600">Name</label>
                <input
                  type="text"
                  id={`speaker-name-${index}`}
                  placeholder="e.g. Sister Emma Watson"
                  value={speaker.name}
                  aria-describedby={`speaker-name-${index}-error`}
                  onChange={(e) => handleSpeakerChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded border border-slate-300 p-1.5 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor={`speaker-topic-${index}`} className="block text-xs font-medium text-slate-600">Topic / Title</label>
                <input
                  type="text"
                  id={`speaker-topic-${index}`}
                  placeholder="e.g. Faith in Christ"
                  value={speaker.topic}
                  aria-describedby={`speaker-topic-${index}-error`}
                  onChange={(e) => handleSpeakerChange(index, 'topic', e.target.value)}
                  className="mt-1 block w-full rounded border border-slate-300 p-1.5 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </fieldset>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 px-1">Closing</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-xs font-medium text-slate-600">Closing Hymn #</label>
            <input
              type="number"
              id="closingHymnNumber"
              name="closingHymnNumber"
              aria-describedby="closingHymnNumber-error"
              defaultValue={meeting.closingHymn?.number}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-xs font-medium text-slate-600">Closing Hymn Title</label>
            <input
              type="text"
              id="closingHymnTitle"
              name="closingHymnTitle"
              aria-describedby="closingHymnTitle-error"
              defaultValue={meeting.closingHymn?.title}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="closingPrayer" className="block text-xs font-medium text-slate-600">Closing Prayer</label>
            <input
              type="text"
              id="closingPrayer"
              name="closingPrayer"
              aria-describedby="closingPrayer-error"
              defaultValue={meeting.closingPrayer}
              className="mt-1 block w-full rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 transition-colors"
        >
          {isPending ? 'Updating...' : 'Update Meeting'}
        </button>
      </div>
    </form>
  );
}