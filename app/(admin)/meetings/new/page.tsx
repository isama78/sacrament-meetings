import CreateMeetingForm from './create-meeting-form';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create Sacrament Meeting</h1>
          <p className="text-sm text-slate-600 mt-1">
            Fill out the form below to plan a new sacramental program.
          </p>
        </div>
        
      </div>

      <CreateMeetingForm />
    </main>
  );
}