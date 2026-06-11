import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { BottomBar } from "@/components/BottomBar";
import { Plus, Repeat, MapPin } from "lucide-react";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Your Routes — CARRY by OTZARI" },
      { name: "description", content: "Publish recurring commutes and earn on the way." },
      { property: "og:title", content: "Your Routes — CARRY" },
      { property: "og:description", content: "Earn on the way." },
    ],
  }),
  component: RoutesPage,
});

const myRoutes = [
  { from: "Abu Dhabi, Al Zahiyah", to: "Dubai Internet City", schedule: "Weekdays · 17:30", matches: 4 },
  { from: "Dubai Marina", to: "DIFC", schedule: "Daily · 08:15", matches: 2 },
];

function RoutesPage() {
  return (
    <div className="min-h-dvh bg-white font-sans text-slate-900">
      <TopNav />
      <main className="px-6 pt-8 pb-28 max-w-md mx-auto">
        <header className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
              Carrier
            </p>
            <h1 className="font-serif text-4xl leading-[1.05]">Your routes</h1>
          </div>
          <button
            aria-label="New route"
            className="size-10 rounded-full bg-slate-900 text-white grid place-items-center active:scale-95 transition-transform"
          >
            <Plus className="size-5" />
          </button>
        </header>

        <section className="space-y-4 mb-10">
          {myRoutes.map((r) => (
            <article
              key={r.from + r.to}
              className="p-5 rounded-3xl bg-[#F9FAFB] border border-slate-900/5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="size-3.5 text-[#2563EB]" /> {r.from}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="size-3.5 text-slate-900" /> {r.to}
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-1">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-900/5">
                <span className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                  <Repeat className="size-3.5" /> {r.schedule}
                </span>
                <span className="text-xs font-semibold text-[#2563EB]">
                  {r.matches} matches
                </span>
              </div>
            </article>
          ))}
        </section>

        <section>
          <h2 className="font-semibold text-sm uppercase tracking-wider mb-4">
            Suggested for you
          </h2>
          <div className="p-5 rounded-3xl bg-slate-900 text-white">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
              High demand
            </p>
            <p className="font-serif text-2xl leading-tight mb-4">
              Ajman → Business Bay
            </p>
            <p className="text-sm opacity-70 mb-6">
              12 unmatched deliveries this week. Add this corridor to your routes.
            </p>
            <button className="bg-white text-slate-900 font-medium text-sm px-4 py-2 rounded-full">
              Publish route
            </button>
          </div>
        </section>
      </main>
      <BottomBar />
    </div>
  );
}