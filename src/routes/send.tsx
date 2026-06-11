import { createFileRoute, Link } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { BottomBar } from "@/components/BottomBar";
import { FileText, Key, Mail, Package, Smartphone, MoreHorizontal, MapPin, Camera, Clock, Loader2, BadgeCheck, Star } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sheetsApi, type RouteRow } from "@/lib/sheets";

export const Route = createFileRoute("/send")({
  head: () => ({
    meta: [
      { title: "Send an Item — CARRY by OTZARI" },
      { name: "description", content: "Create a delivery in seconds. Match with a verified UAE commuter." },
      { property: "og:title", content: "Send an Item — CARRY" },
      { property: "og:description", content: "Create a delivery in seconds." },
    ],
  }),
  component: SendPage,
});

const items = [
  { label: "Document", Icon: FileText },
  { label: "Keys", Icon: Key },
  { label: "Envelope", Icon: Mail },
  { label: "Small Package", Icon: Package },
  { label: "Electronics", Icon: Smartphone },
  { label: "Other", Icon: MoreHorizontal },
];

const urgencies = ["Flexible", "Same Day", "Next Day", "Urgent"];

function SendPage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [itemType, setItemType] = useState("Document");
  const [urgency, setUrgency] = useState("Same Day");
  const [matches, setMatches] = useState<RouteRow[] | null>(null);

  const submit = useMutation({
    mutationFn: async () => {
      await sheetsApi.createDelivery({
        pickup,
        dropoff,
        itemType,
        urgency,
        status: "pending",
        requesterName: "Guest",
      });
      return sheetsApi.matchRoutes(pickup, dropoff);
    },
    onSuccess: (rows) => setMatches(rows),
  });

  const canSubmit = pickup.trim() && dropoff.trim() && !submit.isPending;

  return (
    <div className="min-h-dvh bg-white font-sans text-slate-900">
      <TopNav />
      <main className="px-6 pt-6 pb-28 max-w-md mx-auto">
        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
            Step 1 of 5
          </p>
          <h1 className="font-serif text-4xl leading-[1.05]">Create a delivery</h1>
        </header>

        {/* Locations */}
        <section className="space-y-3 mb-8">
          {[
            { label: "Pickup", placeholder: "e.g. Abu Dhabi, Al Zahiyah", value: pickup, setter: setPickup },
            { label: "Dropoff", placeholder: "e.g. Dubai Internet City", value: dropoff, setter: setDropoff },
          ].map(({ label, placeholder, value, setter }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5"
            >
              <MapPin className="size-4 text-[#2563EB]" />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  {label}
                </p>
                <input
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                  placeholder={placeholder}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Item type */}
        <section className="mb-8">
          <h2 className="font-semibold text-sm uppercase tracking-wider mb-4">Item type</h2>
          <div className="grid grid-cols-3 gap-3">
            {items.map(({ label, Icon }) => {
              const active = itemType === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setItemType(label)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-colors ${
                    active
                      ? "bg-white border-[#2563EB]/40 ring-1 ring-[#2563EB]/30"
                      : "bg-[#F9FAFB] border-slate-900/5 hover:border-[#2563EB]/30 hover:bg-white"
                  }`}
                >
                  <Icon className="size-5 text-slate-700" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Photo */}
        <section className="mb-8">
          <h2 className="font-semibold text-sm uppercase tracking-wider mb-4">Photo</h2>
          <button className="w-full aspect-[3/2] rounded-2xl bg-[#F9FAFB] border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-white hover:border-[#2563EB]/40 transition-colors">
            <Camera className="size-6" />
            <span className="text-sm font-medium">Add a photo of your item</span>
          </button>
        </section>

        {/* Urgency */}
        <section className="mb-10">
          <h2 className="font-semibold text-sm uppercase tracking-wider mb-4 inline-flex items-center gap-2">
            <Clock className="size-4" /> Urgency
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {urgencies.map((u) => {
              const active = urgency === u;
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUrgency(u)}
                  className={`p-3 rounded-xl text-sm font-medium border transition-colors ${
                    active
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-900/10 hover:border-slate-900/30"
                  }`}
                >
                  {u}
                </button>
              );
            })}
          </div>
        </section>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => submit.mutate()}
          className="w-full text-center bg-[#2563EB] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#2563EB]/20 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {submit.isPending && <Loader2 className="size-4 animate-spin" />}
          {submit.isPending ? "Saving & matching…" : "See Matching Carriers"}
        </button>

        {submit.isError && (
          <p className="mt-3 text-sm text-red-600">
            Couldn’t save: {(submit.error as Error).message}
          </p>
        )}

        {matches && (
          <section className="mt-8">
            <h2 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {matches.length} matching {matches.length === 1 ? "carrier" : "carriers"}
            </h2>
            {matches.length === 0 ? (
              <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-slate-900/5 text-sm text-slate-500">
                No active route matches yet — we’ll notify you when a commuter publishes one.
                <Link to="/" className="block mt-3 text-[#2563EB] font-medium">Back to home →</Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {matches.map((m) => (
                  <li key={m.id} className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm">{m.carrierName || "Carrier"}</span>
                        <BadgeCheck className="size-3.5 text-[#2563EB] fill-[#2563EB] stroke-white" />
                      </div>
                      <span className="text-xs text-[#2563EB] font-bold">{m.score}% MATCH</span>
                    </div>
                    <p className="text-sm">
                      {m.from} <span className="text-slate-400 mx-1">→</span> {m.to}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 inline-flex items-center gap-1">
                      {m.schedule}
                      {m.rating ? (
                        <>
                          <span className="text-slate-300">•</span>
                          <Star className="size-3 fill-amber-400 stroke-amber-400" /> {m.rating}
                        </>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
      <BottomBar />
    </div>
  );
}