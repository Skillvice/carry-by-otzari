import { createFileRoute, Link } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { BottomBar } from "@/components/BottomBar";
import { FileText, Key, Mail, Package, Smartphone, MoreHorizontal, MapPin, Camera, Clock } from "lucide-react";

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
            ["Pickup", "Enter pickup location"],
            ["Dropoff", "Enter dropoff location"],
          ].map(([label, placeholder]) => (
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
            {items.map(({ label, Icon }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5 hover:border-[#2563EB]/30 hover:bg-white transition-colors"
              >
                <Icon className="size-5 text-slate-700" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
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
            {urgencies.map((u, i) => (
              <button
                key={u}
                className={`p-3 rounded-xl text-sm font-medium border transition-colors ${
                  i === 1
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-900/10 hover:border-slate-900/30"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </section>

        <Link
          to="/"
          className="block w-full text-center bg-[#2563EB] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#2563EB]/20 active:scale-[0.98] transition-transform"
        >
          See Matching Carriers
        </Link>
      </main>
      <BottomBar />
    </div>
  );
}