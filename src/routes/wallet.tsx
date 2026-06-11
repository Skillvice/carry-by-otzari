import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { BottomBar } from "@/components/BottomBar";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet — CARRY by OTZARI" },
      { name: "description", content: "Balance, earnings and withdrawals." },
      { property: "og:title", content: "Wallet — CARRY" },
      { property: "og:description", content: "Balance, earnings and withdrawals." },
    ],
  }),
  component: WalletPage,
});

const tx = [
  { type: "in", label: "Delivery #2841", sub: "Sarah J. · Today", amt: "+ AED 45" },
  { type: "out", label: "Withdrawal", sub: "Emirates NBD · Yesterday", amt: "− AED 320" },
  { type: "in", label: "Delivery #2837", sub: "Khalid M. · 2 days ago", amt: "+ AED 60" },
  { type: "in", label: "Delivery #2832", sub: "Aisha R. · 3 days ago", amt: "+ AED 35" },
];

function WalletPage() {
  return (
    <div className="min-h-dvh bg-white font-sans text-slate-900">
      <TopNav />
      <main className="px-6 pt-8 pb-28 max-w-md mx-auto">
        <header className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-2">
            Wallet
          </p>
          <h1 className="font-serif text-4xl leading-[1.05]">Available balance</h1>
        </header>

        <section className="p-6 rounded-3xl bg-slate-900 text-white mb-6">
          <p className="text-xs opacity-60 uppercase tracking-widest mb-2">AED</p>
          <p className="font-serif text-5xl mb-6">1,284.<span className="opacity-60 text-3xl">50</span></p>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white text-slate-900 rounded-xl py-3 text-sm font-semibold">
              Withdraw
            </button>
            <button className="bg-white/10 text-white rounded-xl py-3 text-sm font-semibold border border-white/10">
              Add credit
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              Pending
            </p>
            <p className="font-serif text-2xl">AED 240</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              This month
            </p>
            <p className="font-serif text-2xl">AED 1.8k</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-sm uppercase tracking-wider mb-4">
            Recent activity
          </h2>
          <ul className="space-y-2">
            {tx.map((t, i) => (
              <li
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5"
              >
                <div
                  className={`size-10 rounded-full grid place-items-center ${
                    t.type === "in" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {t.type === "in" ? (
                    <ArrowDownLeft className="size-4" />
                  ) : (
                    <ArrowUpRight className="size-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-slate-500">{t.sub}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    t.type === "in" ? "text-emerald-700" : "text-slate-900"
                  }`}
                >
                  {t.amt}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <BottomBar />
    </div>
  );
}