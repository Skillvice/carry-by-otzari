import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { BottomBar } from "@/components/BottomBar";
import avatarCarrier from "@/assets/avatar-carrier.jpg";
import { BadgeCheck, ShieldCheck, Leaf, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CARRY by OTZARI — Your parcel is already going there." },
      {
        name: "description",
        content:
          "Peer-to-peer deliveries through verified UAE commuters already travelling your route. Secure, fast, sustainable.",
      },
      { property: "og:title", content: "CARRY by OTZARI" },
      {
        property: "og:description",
        content: "Deliver through verified commuters already on the road.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-white font-sans text-slate-900">
      <TopNav />

      <main className="px-6 pt-8 pb-28 max-w-md mx-auto">
        {/* Hero */}
        <header className="mb-10">
          <h1 className="font-serif text-5xl leading-[1.05] mb-4 tracking-tight">
            Your parcel is
            <br />
            <span className="italic text-[#2563EB]">already</span> going there.
          </h1>
          <p className="text-slate-500 leading-relaxed text-lg">
            Connect with verified commuters on your route. Sustainable, secure, and
            significantly faster.
          </p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <Link
            to="/send"
            className="flex flex-col items-start p-4 rounded-2xl bg-slate-900 text-white transition-transform active:scale-95 hover:-translate-y-0.5"
          >
            <span className="text-xs opacity-60 mb-8">Need to send?</span>
            <span className="font-medium">Ship Item</span>
          </Link>
          <Link
            to="/routes"
            className="flex flex-col items-start p-4 rounded-2xl bg-[#2563EB] text-white transition-transform active:scale-95 hover:-translate-y-0.5"
          >
            <span className="text-xs opacity-80 mb-8">Commuting?</span>
            <span className="font-medium">Earn Money</span>
          </Link>
        </div>

        {/* Recommended Match */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm uppercase tracking-wider">
              Recommended Match
            </h2>
            <span className="text-xs text-[#2563EB] font-bold">98% MATCH</span>
          </div>
          <div className="relative p-6 rounded-3xl bg-[#F9FAFB] border border-slate-900/5 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img
                  src={avatarCarrier}
                  alt="Sarah J."
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">Sarah J.</span>
                  <BadgeCheck className="size-4 text-[#2563EB] fill-[#2563EB] stroke-white" />
                </div>
                <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                  Emirates ID Verified
                  <span className="text-slate-300">•</span>
                  <Star className="size-3 fill-amber-400 stroke-amber-400" /> 4.98
                </span>
              </div>
            </div>

            <div className="space-y-4 relative">
              <div className="absolute left-[7px] top-3 w-px h-10 bg-slate-900/10" />
              <div className="flex items-center gap-4">
                <div className="size-3 rounded-full border-2 border-slate-900 bg-white z-10" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Leaving
                  </p>
                  <p className="text-sm font-medium">Abu Dhabi, Al Zahiyah</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-3 rounded-full bg-[#2563EB] z-10" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Heading to
                  </p>
                  <p className="text-sm font-medium">Dubai Internet City</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Est. Delivery
                </span>
                <span className="font-semibold text-slate-900">Today, 6:30 PM</span>
              </div>
              <Link
                to="/send"
                className="px-6 py-2 bg-white border border-slate-900/10 rounded-full font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm inline-flex items-center gap-1"
              >
                Details <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-10">
          <h2 className="font-semibold text-sm uppercase tracking-wider mb-6">
            How it works
          </h2>
          <ol className="space-y-6">
            {[
              ["01", "Create delivery", "Snap a photo and set pickup & dropoff."],
              ["02", "Match a carrier", "Smart engine pairs you with a verified commuter."],
              ["03", "Pay securely", "Funds held in escrow until delivery is confirmed."],
              ["04", "Track & confirm", "Live updates door-to-door."],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-5">
                <span className="font-serif text-2xl text-[#2563EB] leading-none w-8 shrink-0">
                  {n}
                </span>
                <div>
                  <p className="font-medium text-slate-900">{t}</p>
                  <p className="text-sm text-slate-500">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div className="mb-4 size-8 bg-emerald-500/10 rounded-lg grid place-items-center">
              <Leaf className="size-4 text-emerald-700" />
            </div>
            <p className="text-2xl font-serif text-emerald-900">1,240kg</p>
            <p className="text-xs text-emerald-700 font-medium">CO₂ Emissions Saved</p>
          </div>
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
            <div className="mb-4 size-8 bg-blue-500/10 rounded-lg grid place-items-center">
              <ShieldCheck className="size-4 text-blue-700" />
            </div>
            <p className="text-2xl font-serif text-blue-900">AED 42k</p>
            <p className="text-xs text-blue-700 font-medium">Community Earnings</p>
          </div>
        </section>

        {/* Popular corridors */}
        <section>
          <h2 className="font-semibold text-sm uppercase tracking-wider mb-4">
            Popular Corridors
          </h2>
          <ul className="space-y-3">
            {[
              ["Abu Dhabi", "Dubai Internet City", "From AED 45"],
              ["Dubai Marina", "DIFC", "From AED 25"],
              ["Sharjah", "Business Bay", "From AED 30"],
              ["Ajman", "Dubai", "From AED 35"],
              ["Al Ain", "Abu Dhabi", "From AED 40"],
            ].map(([from, to, price]) => (
              <li
                key={`${from}-${to}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5 hover:bg-slate-100/60 transition-colors"
              >
                <span className="text-sm font-medium">
                  {from} <span className="text-slate-400 mx-1">→</span> {to}
                </span>
                <span className="text-xs text-slate-400">{price}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}
