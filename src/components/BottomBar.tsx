import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Route as RouteIcon, Wallet, UserRound } from "lucide-react";

const items = [
  { to: "/", label: "Explore", Icon: Compass },
  { to: "/routes", label: "Routes", Icon: RouteIcon },
  { to: "/wallet", label: "Wallet", Icon: Wallet },
  { to: "/account", label: "Account", Icon: UserRound },
] as const;

export function BottomBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-t border-slate-900/5 px-8 py-3 flex items-center justify-between"
    >
      {items.map(({ to, label, Icon }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 transition-colors ${
              active ? "text-[#2563EB]" : "text-slate-400"
            }`}
          >
            <Icon className="size-5" strokeWidth={2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}