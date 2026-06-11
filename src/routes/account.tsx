import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { BottomBar } from "@/components/BottomBar";
import avatarUser from "@/assets/avatar-user.jpg";
import { BadgeCheck, ChevronRight, Star, ShieldCheck, Bell, HelpCircle, LogOut } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — CARRY by OTZARI" },
      { name: "description", content: "Manage your profile, verification and preferences." },
      { property: "og:title", content: "Account — CARRY" },
      { property: "og:description", content: "Manage your profile and verification." },
    ],
  }),
  component: AccountPage,
});

const rows = [
  { Icon: ShieldCheck, label: "Verification", value: "Emirates ID verified" },
  { Icon: Bell, label: "Notifications", value: "Push, Email" },
  { Icon: HelpCircle, label: "Support", value: "Get help" },
  { Icon: LogOut, label: "Sign out", value: "" },
];

function AccountPage() {
  return (
    <div className="min-h-dvh bg-white font-sans text-slate-900">
      <TopNav />
      <main className="px-6 pt-8 pb-28 max-w-md mx-auto">
        <section className="flex items-center gap-4 mb-8">
          <div className="size-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src={avatarUser}
              alt="You"
              width={64}
              height={64}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif text-2xl">Ahmed K.</h1>
              <BadgeCheck className="size-5 text-[#2563EB] fill-[#2563EB] stroke-white" />
            </div>
            <p className="text-xs text-slate-500 inline-flex items-center gap-1">
              <Star className="size-3 fill-amber-400 stroke-amber-400" /> 4.96 · 38
              deliveries
            </p>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3 mb-8">
          {[
            ["Trust", "98"],
            ["Reliability", "99"],
            ["Speed", "4.9"],
          ].map(([l, v]) => (
            <div key={l} className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5 text-center">
              <p className="font-serif text-2xl">{v}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
                {l}
              </p>
            </div>
          ))}
        </section>

        <ul className="space-y-2">
          {rows.map(({ Icon, label, value }) => (
            <li
              key={label}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9FAFB] border border-slate-900/5 hover:bg-white hover:border-slate-900/10 transition-colors cursor-pointer"
            >
              <Icon className="size-4 text-slate-700" />
              <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
                {value && <p className="text-xs text-slate-500">{value}</p>}
              </div>
              <ChevronRight className="size-4 text-slate-400" />
            </li>
          ))}
        </ul>
      </main>
      <BottomBar />
    </div>
  );
}