import { ReactNode } from "react";

export default function MeetingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        {children}
      </section>
    </div>
  );
}