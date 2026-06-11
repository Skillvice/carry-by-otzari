import { Link } from "@tanstack/react-router";
import avatarUser from "@/assets/avatar-user.jpg";

export function TopNav() {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-md border-b border-slate-900/5">
      <Link to="/" className="flex items-center gap-2">
        <div className="size-8 bg-[#2563EB] rounded-full grid place-items-center">
          <div className="size-3 bg-white rounded-sm rotate-45" />
        </div>
        <span className="text-sm font-bold tracking-tight uppercase text-slate-900">
          Carry
        </span>
        <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase ml-1">
          by Otzari
        </span>
      </Link>
      <Link
        to="/account"
        aria-label="Account"
        className="size-10 rounded-full bg-[#F9FAFB] border border-slate-900/5 overflow-hidden"
      >
        <img
          src={avatarUser}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </Link>
    </nav>
  );
}