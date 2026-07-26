import {
  Store,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  MapPin,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "../../components/layout/DashboardShell";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function ReceiverOverview() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      title: "Available Donations",
      value: 48,
      icon: Store,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Requests Sent",
      value: 14,
      icon: ClipboardCheck,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Pending",
      value: 3,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Accepted",
      value: 9,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Nearby Donors",
      value: 18,
      icon: MapPin,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Meals Received",
      value: 127,
      icon: HeartHandshake,
      color: "bg-pink-100 text-pink-700",
    },
  ];

  const nearbyFood = [
    {
      food: "Rice",
      quantity: "20 Kg",
      location: "2 km away",
    },
    {
      food: "Vegetables",
      quantity: "15 Kg",
      location: "1.5 km away",
    },
    {
      food: "Milk",
      quantity: "30 Packs",
      location: "4 km away",
    },
  ];

  const myRequests = [
    {
      food: "Rice",
      donor: "Food Bank",
      status: "Accepted",
    },
    {
      food: "Bread",
      donor: "Restaurant",
      status: "Pending",
    },
    {
      food: "Vegetables",
      donor: "Hotel",
      status: "Completed",
    },
  ];

  const activities = [
    "Food request submitted",
    "Donation accepted by donor",
    "Pickup scheduled",
    "Food collected successfully",
    "Request completed",
  ];

  return (
    <DashboardShell
      title="Receiver Dashboard"
      description="Discover nearby food donations and track your requests."
      action={{
        label: "Browse Marketplace",
        onClick: () => navigate("/marketplace"),
      }}
    >
      {/* Welcome Banner */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold">
          Welcome back, {user?.fullName?.split(" ")[0] || "Receiver"} 👋
        </h2>

        <p className="mt-3 max-w-2xl text-blue-100">
          Find available food near you, request what you need, and help reduce
          food waste together with our community.
        </p>

        <div className="mt-6">
          <Button onClick={() => navigate("/marketplace")}>
            Browse Marketplace
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <h2 className="mt-6 text-4xl font-bold">{item.value}</h2>

              <p className="mt-2 text-slate-500">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* Nearby Food */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Nearby Food
            </h2>

            <button
              onClick={() => navigate("/marketplace")}
              className="text-emerald-700"
            >
              <ArrowRight />
            </button>
          </div>

          <div className="space-y-4">
            {nearbyFood.map((food, index) => (
              <div
                key={index}
                className="rounded-xl bg-slate-50 p-4"
              >
                <h3 className="font-semibold">{food.food}</h3>

                <p className="text-sm text-slate-500">
                  {food.quantity}
                </p>

                <p className="mt-1 text-xs text-emerald-700">
                  {food.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* My Requests */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            My Requests
          </h2>

          <div className="space-y-4">
            {myRequests.map((request, index) => (
              <div
                key={index}
                className="rounded-xl bg-slate-50 p-4"
              >
                <h3 className="font-semibold">{request.food}</h3>

                <p className="text-sm text-slate-500">
                  Donor: {request.donor}
                </p>

                <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            Recent Activity
          </h2>

          <div className="space-y-5">
            {activities.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-blue-600"></div>

                <div>
                  <p className="font-medium">{activity}</p>

                  <p className="text-sm text-slate-400">
                    Today
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}