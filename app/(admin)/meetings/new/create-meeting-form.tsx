"use client";

import { useActionState, useState } from "react";
import { createMeeting, type State } from "@/lib/actions";
import { SpeakerItem, WardBusinessItem } from "@/lib/types";

const initialState: State = { message: null, errors: {} };

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState,
  );

  const [speakers, setSpeakers] = useState<SpeakerItem[]>([]);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [wardBusiness, setWardBusiness] = useState<WardBusinessItem[]>([]);

  const addAnnouncement = (text: string) => {
    if (text.trim()) setAnnouncements([...announcements, text.trim()]);
  };
  const removeAnnouncement = (index: number) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", type: "speaker", topic: "" }]);
  };

  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index));
  };

  const addWardBusinessItem = (description: string) => {
  if (description.trim()) {
    setWardBusiness([...wardBusiness, { description: description.trim() }]);
  }
};

const removeWardBusinessItem = (index: number) => {
  setWardBusiness(wardBusiness.filter((_, i) => i !== index));
};

  const handleSpeakerChange = (
    index: number,
    field: keyof SpeakerItem,
    value: string,
  ) => {
    const updated = [...speakers];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setSpeakers(updated);
  };

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-2xl bg-white p-6 rounded-lg border border-slate-200 shadow-sm"
    >
      {state.message && (
        <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
          {state.message}
        </div>
      )}

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-slate-700"
        >
          Meeting Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          aria-describedby="date-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div id="date-error" aria-live="polite" aria-atomic="true">
          {state.errors?.date?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="meetingType"
          className="block text-sm font-medium text-slate-700"
        >
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          required
          defaultValue="regular"
          aria-describedby="meetingType-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Fast & Testimony</option>
          <option value="stake">Stake Conference</option>
          <option value="general">General Conference</option>
        </select>
        <div id="meetingType-error" aria-live="polite" aria-atomic="true">
          {state.errors?.meetingType?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="presiding"
          className="block text-sm font-medium text-slate-700"
        >
          Presiding
        </label>
        <input
          id="presiding"
          name="presiding"
          type="text"
          required
          aria-describedby="presiding-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div id="presiding-error" aria-live="polite" aria-atomic="true">
          {state.errors?.presiding?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="conducting"
          className="block text-sm font-medium text-slate-700"
        >
          Conducting
        </label>
        <input
          id="conducting"
          name="conducting"
          type="text"
          required
          aria-describedby="conducting-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div id="conducting-error" aria-live="polite" aria-atomic="true">
          {state.errors?.conducting?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <input
        type="hidden"
        name="announcements"
        value={JSON.stringify(announcements)}
      />
      <input
        type="hidden"
        name="wardBusiness"
        value={JSON.stringify(wardBusiness)}
      />
      <input type="hidden" name="speakers" value={JSON.stringify(speakers)} />

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-3">
        <legend className="font-semibold text-sm text-slate-700">
          Announcements
        </legend>

        <div className="flex gap-2">
          <input
            type="text"
            id="new-announcement-input"
            placeholder="Add an announcement..."
            className="flex-1 rounded border border-slate-300 p-2 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAnnouncement(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(
                "new-announcement-input",
              ) as HTMLInputElement;
              if (el) {
                addAnnouncement(el.value);
                el.value = "";
              }
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs px-3 py-2 rounded font-medium"
          >
            Add
          </button>
        </div>

        <ul className="space-y-1">
          {announcements.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded border border-slate-200"
            >
              <span>• {item}</span>
              <button
                type="button"
                onClick={() => removeAnnouncement(i)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-3">
        <legend className="font-semibold text-sm text-slate-700">
          Opening Hymn
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block text-xs font-medium text-slate-600"
            >
              Hymn #
            </label>
            <input
              type="number"
              id="openingHymnNumber"
              name="openingHymnNumber" // 👈 Nombre para el número
              min="1"
              required
              aria-describedby="openingHymn-error"
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="openingHymnTitle"
              className="block text-xs font-medium text-slate-600"
            >
              Title
            </label>
            <input
              type="text"
              id="openingHymnTitle"
              name="openingHymnTitle" // 👈 Nombre para el título
              required
              aria-describedby="openingHymn-error"
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-sm"
            />
          </div>
        </div>
        <div id="openingHymn-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingHymn?.map((error) => (
            <p key={error} className="text-xs text-red-600 mt-1">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="openingPrayer"
          className="block text-sm font-medium text-slate-700"
        >
          Opening Prayer
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          required
          aria-describedby="openingPrayer-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-3">
  <legend className="font-semibold text-sm text-slate-700">Ward Business</legend>
  
  <div className="flex gap-2">
    <input
      type="text"
      id="new-ward-business-input"
      placeholder="e.g. Release / Sustain callings, Ordinations..."
      className="flex-1 rounded border border-slate-300 p-2 text-sm focus:outline-none focus:border-blue-500"
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

  <ul className="space-y-1">
    {wardBusiness.map((item, index) => (
      <li key={index} className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded border border-slate-200">
        <span className="text-slate-700">• {item.description}</span>
        <button
          type="button"
          onClick={() => removeWardBusinessItem(index)}
          className="text-red-600 hover:text-red-800 text-xs font-medium"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
</fieldset>

      <div>
        <label
          htmlFor="stakeBusiness"
          className="block text-sm font-medium text-slate-700"
        >
          Stake Business
        </label>
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="text"
          required
          aria-describedby="stakeBusiness-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div id="stakeBusiness-error" aria-live="polite" aria-atomic="true">
          {state.errors?.stakeBusiness?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-3">
        <legend className="font-semibold text-sm text-slate-700">
          Sacrament Hymn
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block text-xs font-medium text-slate-600"
            >
              Hymn #
            </label>
            <input
              type="number"
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              min="1"
              required
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="sacramentHymnTitle"
              className="block text-xs font-medium text-slate-600"
            >
              Title
            </label>
            <input
              type="text"
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              required
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-sm"
            />
          </div>
        </div>
        <div id="sacramentHymn-error" aria-live="polite" aria-atomic="true">
          {state.errors?.sacramentHymn?.map((error) => (
            <p key={error} className="text-xs text-red-600 mt-1">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-4">
        <legend className="font-semibold text-sm text-slate-700 flex items-center justify-between w-full">
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
          <p className="text-xs text-slate-500 italic">
            No speakers or musical numbers added yet. Click &quot;+ Add
            Item&quot; above.
          </p>
        )}

        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-600">
                Item #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeSpeaker(index)}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Type
                </label>
                <select
                  value={speaker.type}
                  onChange={(e) =>
                    handleSpeakerChange(index, "type", e.target.value)
                  }
                  className="mt-1 block w-full rounded border border-slate-300 p-1.5 text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sister Emma Watson"
                  value={speaker.name}
                  onChange={(e) =>
                    handleSpeakerChange(index, "name", e.target.value)
                  }
                  className="mt-1 block w-full rounded border border-slate-300 p-1.5 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600">
                  Topic / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Faith in Christ"
                  value={speaker.topic}
                  onChange={(e) =>
                    handleSpeakerChange(index, "topic", e.target.value)
                  }
                  className="mt-1 block w-full rounded border border-slate-300 p-1.5 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <div id="speakers-error" aria-live="polite" aria-atomic="true">
          {state.errors?.speakers?.map((error) => (
            <p key={error} className="text-xs text-red-600 mt-1">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <fieldset className="border border-slate-200 p-4 rounded-md space-y-3">
        <legend className="font-semibold text-sm text-slate-700">
          Closing Hymn
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block text-xs font-medium text-slate-600"
            >
              Hymn #
            </label>
            <input
              type="number"
              id="closingHymnNumber"
              name="closingHymnNumber"
              min="1"
              required
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="closingHymnTitle"
              className="block text-xs font-medium text-slate-600"
            >
              Title
            </label>
            <input
              type="text"
              id="closingHymnTitle"
              name="closingHymnTitle"
              required
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 text-sm"
            />
          </div>
        </div>
        <div id="closingHymn-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closingHymn?.map((error) => (
            <p key={error} className="text-xs text-red-600 mt-1">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="closingPrayer"
          className="block text-sm font-medium text-slate-700"
        >
          Closing Prayer
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          required
          aria-describedby="closingPrayer-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving Meeting..." : "Save Meeting"}
        </button>
      </div>
    </form>
  );
}
