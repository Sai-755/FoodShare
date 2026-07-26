import {
  Bell,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Store,
  Inbox,
  User,
  Camera,
  Menu,
  X,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/cn";

const navigation = [
  [LayoutDashboard, "Overview", "/dashboard"],
  [ClipboardList, "My Donations", "/my-donations"],
  [Store, "Marketplace", "/marketplace"],
  [ClipboardList, "My Requests", "/my-requests"],
  [Inbox, "Donation Requests", "/donation-requests"],
];

export default function DashboardShell({
  children,
  title,
  description,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dashboardLink = "/dashboard";

  function signOut() {
    logout();
    navigate("/");
  }

  const avatar =
    user?.profileImage ||
    `https://ui-avatars.com/api/?background=059669&color=ffffff&size=256&name=${encodeURIComponent(
      user?.fullName || "FoodShare"
    )}`;

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-slate-900">

      {/* ================= Mobile Backdrop ================= */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= Sidebar ================= */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform duration-300 ease-in-out lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>

        <div className="flex items-center justify-between px-3">
          <NavLink
            to={dashboardLink}
            className="flex items-center gap-2 text-xl font-semibold tracking-[-.045em]"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-emerald-700 text-lg text-white">
              ✦
            </span>
            FoodShare
          </NavLink>
          
          {/* Close button for mobile */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-8 px-3 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">
          Workspace
        </p>

        <nav className="mt-3 space-y-1">
          {navigation.map(([Icon, label, to]) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="px-3 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">
            Coming Soon
          </p>

          <div className="mt-2 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">
              <Bell size={18} />
              Notifications
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">
              <Settings size={18} />
              Settings
            </button>
          </div>
        </div>

        <div className="mt-auto rounded-2xl bg-emerald-50 p-4">
          <CircleHelp className="text-emerald-700" size={20} />
          <p className="mt-3 text-sm font-semibold text-slate-800">
            Need a hand?
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Our sharing guide is always here.
          </p>
        </div>

        <button
          onClick={signOut}
          className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          <LogOut size={18} />
          Sign Out
        </button>

      </aside>

      {/* ================= Main ================= */}

      <div className="lg:pl-64">

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f6f8f7]/90 px-5 py-4 backdrop-blur sm:px-8 lg:px-10">

          <div className="mx-auto flex max-w-7xl items-center">

            <div className="flex items-center gap-3">
              {/* Hamburger menu trigger for mobile */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <NavLink
                to={dashboardLink}
                className="flex items-center gap-2 text-lg font-semibold tracking-[-.04em] lg:hidden"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-700 text-sm text-white">
                  ✦
                </span>
                FoodShare
              </NavLink>
            </div>

            <div className="ml-auto flex items-center gap-4">

              <button className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow">
                <Bell size={19} />
              </button>

              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-2xl bg-white px-2 py-2 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
                >
                  <img
                    src={avatar}
                    alt="Profile"
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-slate-800">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {user?.role}
                    </p>
                  </div>

                  <ChevronDown
                    size={17}
                    className={`transition duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-96 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 px-8 py-8 text-white">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <img
                            src={avatar}
                            alt="Profile"
                            className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl"
                          />
                          <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg transition hover:scale-105">
                            <Camera size={18} />
                            <input type="file" accept="image/*" className="hidden" />
                          </label>
                        </div>
                        <h2 className="mt-5 text-2xl font-bold">
                          {user?.fullName}
                        </h2>
                        <p className="mt-2 flex items-center gap-2 text-sm text-emerald-100">
                          <Mail size={15} />
                          {user?.email}
                        </p>
                        <span className="mt-4 rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                          {user?.role}
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile");
                        }}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-slate-100"
                      >
                        <User size={19} />
                        <span className="font-medium">My Profile</span>
                      </button>

                      <button className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-slate-100">
                        <Settings size={19} />
                        <span className="font-medium">Settings</span>
                      </button>

                      <div className="my-3 border-t border-slate-100" />

                      <button
                        onClick={signOut}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={19} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">
              FoodShare Workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-slate-950 sm:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-slate-600">{description}</p>
            )}
          </div>
          {children}
        </main>

      </div>

    </div>
  );
}