import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { BottomBar } from "@/components/BottomBar";
import { Plus, Repeat, MapPin, Search, Loader2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sheetsApi, type RouteRow } from "@/lib/sheets";

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

function RoutesPage() {
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const routesQuery = useQuery({
    queryKey: ["routes"],
    queryFn: () => sheetsApi.listRoutes(),
  });

  const filtered = useMemo(() => {
    const rows = routesQuery.data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.from, r.to, r.carrierName, r.schedule]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [routesQuery.data, query]);

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
            onClick={() => setShowForm((s) => !s)}
            className="size-10 rounded-full bg-slate-900 text-white grid place-items-center active:scale-95 transition-transform"
          >
            {showForm ? <X className="size-5" /> : <Plus className="size-5" />}
          </button>
        </header>

        {showForm && <NewRouteForm onSaved={() => { setShowForm(false); qc.invalidateQueries({ queryKey: ["routes"] }); }} />}

        {/* Search */}
        <div className="mb-5 flex items-center gap-3 p-3 rounded-2xl bg-[#F9FAFB] border border-slate-900/5">
          <Search className="size-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, schedule, carrier…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <section className="space-y-4 mb-10">
          {routesQuery.isLoading && (
            <div className="flex items-center justify-center py-10 text-slate-400">
              <Loader2 className="size-5 animate-spin" />
            </div>
          )}
          {routesQuery.isError && (
            <p className="text-sm text-red-600">Couldn’t load routes: {(routesQuery.error as Error).message}</p>
          )}
          {!routesQuery.isLoading && filtered.length === 0 && (
            <p className="text-sm text-slate-500 py-6 text-center">
              {query ? "No routes match that search." : "No routes yet — publish your first commute."}
            </p>
          )}
          {filtered.map((r) => (
            <article
              key={r.id}
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
                  {r.status || "Active"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-900/5">
                <span className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                  <Repeat className="size-3.5" /> {r.schedule}
                </span>
                {r.carrierName && (
                  <span className="text-xs font-semibold text-[#2563EB]">{r.carrierName}</span>
                )}
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
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-slate-900 font-medium text-sm px-4 py-2 rounded-full"
            >
              Publish route
            </button>
          </div>
        </section>
      </main>
      <BottomBar />
    </div>
  );
}

function NewRouteForm({ onSaved }: { onSaved: () => void }) {
  const [carrierName, setCarrierName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [schedule, setSchedule] = useState("");
  const m = useMutation({
    mutationFn: () =>
      sheetsApi.createRoute({
        carrierName,
        from,
        to,
        schedule,
        status: "active",
      } as Partial<RouteRow>),
    onSuccess: onSaved,
  });
  return (
    <div className="mb-6 p-5 rounded-3xl bg-white border border-slate-900/10 shadow-sm space-y-3">
      {[
        ["Your name", carrierName, setCarrierName],
        ["From", from, setFrom],
        ["To", to, setTo],
        ["Schedule (e.g. Weekdays 08:00)", schedule, setSchedule],
      ].map(([ph, val, setter]) => (
        <input
          key={ph as string}
          value={val as string}
          onChange={(e) => (setter as (s: string) => void)(e.target.value)}
          placeholder={ph as string}
          className="w-full p-3 rounded-xl bg-[#F9FAFB] border border-slate-900/5 text-sm outline-none focus:border-[#2563EB]/40"
        />
      ))}
      <button
        disabled={!from || !to || m.isPending}
        onClick={() => m.mutate()}
        className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl disabled:opacity-50 inline-flex items-center justify-center gap-2"
      >
        {m.isPending && <Loader2 className="size-4 animate-spin" />}
        Publish route
      </button>
      {m.isError && <p className="text-xs text-red-600">{(m.error as Error).message}</p>}
    </div>
  );
}