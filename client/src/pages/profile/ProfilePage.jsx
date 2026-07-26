import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Shield,
  User,
  Edit,
  Save,
} from "lucide-react";
import DashboardShell from "../../components/layout/DashboardShell";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardShell
      title="My Profile"
      description="Manage your account information."
    >
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Left Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  user?.profileImage ||
                  `https://ui-avatars.com/api/?background=059669&color=fff&size=200&name=${encodeURIComponent(
                    user?.fullName || "FoodShare"
                  )}`
                }
                alt=""
                className="h-36 w-36 rounded-full object-cover"
              />

              <button className="absolute bottom-1 right-1 rounded-full bg-emerald-600 p-3 text-white shadow-lg hover:bg-emerald-700">
                <Camera size={18} />
              </button>
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              {user?.fullName}
            </h2>

            <p className="mt-1 text-slate-500">
              {user?.email}
            </p>

            <span className="mt-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Personal Information
            </h2>

            <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
              <Edit size={18} />
              Edit
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-500">
                Full Name
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
                <User size={18} />
                {user?.fullName}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-500">
                Email
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
                <Mail size={18} />
                {user?.email}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-500">
                Phone
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
                <Phone size={18} />
                {user?.phone || "Not Added"}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-500">
                Role
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
                <Shield size={18} />
                {user?.role}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-slate-500">
                Address
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
                <MapPin size={18} />
                {user?.address || "Not Added"}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}