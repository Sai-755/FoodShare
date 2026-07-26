import {
  HeartHandshake,
  Package,
  Clock3,
  CheckCircle2,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardShell from "../../components/layout/DashboardShell";
import { useAuth } from "../../hooks/useAuth";
import DonationForm from "./DonationForm";
import { dashboardService } from "../../services/dashboardService";



export default function DonorOverview() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await dashboardService.getDonorDashboard();
        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);


const stats = [
  {
    title: "Total Donations",
    value: dashboard?.totalDonations ?? 0,
    icon: Package,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Available",
    value: dashboard?.available ?? 0,
    icon: Clock3,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Pending Requests",
    value: dashboard?.pendingRequests ?? 0,
    icon: Users,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Completed",
    value: dashboard?.completedRequests ?? 0,
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Requested",
    value: dashboard?.requested ?? 0,
    icon: HeartHandshake,
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "Picked Up",
    value: dashboard?.pickedUp ?? 0,
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-700",
  },
];

  const recentDonations = [
    {
      food: "Rice",
      quantity: "20 Kg",
      status: "Available",
    },
    {
      food: "Vegetables",
      quantity: "15 Kg",
      status: "Reserved",
    },
    {
      food: "Bread",
      quantity: "40 Packs",
      status: "Completed",
    },
  ];

  const requests = [
    {
      name: "Abdul",
      item: "Rice",
      status: "Pending",
    },
    {
      name: "Rahul",
      item: "Vegetables",
      status: "Accepted",
    },
  ];

  const activities = [
    "Donation created successfully",
    "Receiver requested 10 Kg Rice",
    "Donation accepted",
    "Food picked up",
    "Donation completed",
  ];

  if (loading) {
  return (
    <DashboardShell
      title="Overview"
      description="Loading dashboard..."
    >
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        Loading dashboard...
      </div>
    </DashboardShell>
  );
}
  return (
    <DashboardShell
      title="Overview"
      description="Manage your donations and track your community impact."
    >
      {/* Welcome Banner */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500 p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold">
          Welcome back, {user?.fullName?.split(" ")[0] || "Donor"} 👋
        </h2>

        <p className="mt-3 max-w-2xl text-emerald-100">
          Every donation you make helps reduce food waste and feeds someone in
          need. Thank you for making a difference.
        </p>
      </div>

      {/* Donation Form */}
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Donate Food
          </h2>

          <p className="mt-2 text-slate-500">
            Share your surplus food with people in need.
          </p>
        </div>

        <DonationForm />
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

              <h2 className="mt-6 text-4xl font-bold">
                {item.value}
              </h2>

              <p className="mt-2 text-slate-500">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Grid */}
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* Recent Donations */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Recent Donations
            </h2>

            <button
              onClick={() => navigate("/my-donations")}
              className="text-emerald-700"
            >
              <ArrowRight />
            </button>
          </div>

          <div className="space-y-4">
            {recentDonations.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
              >
                <div>
                  <h3 className="font-semibold">{item.food}</h3>

                  <p className="text-sm text-slate-500">
                    {item.quantity}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Requests */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            Latest Requests
          </h2>

          <div className="space-y-4">
            {requests.map((request, index) => (
              <div
                key={index}
                className="rounded-xl bg-slate-50 p-4"
              >
                <h3 className="font-semibold">
                  {request.name}
                </h3>

                <p className="text-sm text-slate-500">
                  Requested {request.item}
                </p>

                <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
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
                <div className="mt-1 h-3 w-3 rounded-full bg-emerald-600"></div>

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