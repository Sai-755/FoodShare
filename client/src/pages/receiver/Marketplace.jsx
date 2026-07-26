import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  MapPin,
  Clock,
  Package,
  Users,
} from "lucide-react";
import { toast } from "react-hot-toast";

import DashboardShell from "../../components/layout/DashboardShell";
import StatusBadge from "../../components/ui/StatusBadge";

import { donationService } from "../../services/donationService";
import { requestService } from "../../services/requestService";

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Marketplace() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [requestingId, setRequestingId] = useState(null);

  const loadDonations = async () => {
    try {
      setLoading(true);

      const donations = await donationService.getAvailableDonations();

console.log("Donations:", donations);

setDonations(donations || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load marketplace.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const filteredDonations = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return donations;

    return donations.filter((donation) => {
      return (
        donation.foodName?.toLowerCase().includes(keyword) ||
        donation.foodType?.toLowerCase().includes(keyword) ||
        donation.pickupAddress?.toLowerCase().includes(keyword)
      );
    });
  }, [donations, search]);

  const totalMeals = donations.reduce((sum, donation) => {
    return sum + Number(donation.quantity || 0);
  }, 0);

  const handleRequest = async (donation) => {
    try {
      setRequestingId(donation._id);

      await requestService.createRequest({
        donationId: donation._id,
      });

      toast.success("Request sent successfully.");

      loadDonations();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to send request."
      );
    } finally {
      setRequestingId(null);
    }
  };

  return (
    <DashboardShell
      title="Food Marketplace"
      description="Browse available food donations from nearby donors."
    >
              {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Available Food Donations
          </h2>
          <p className="mt-2 text-gray-500">
            Discover fresh food donated by restaurants, supermarkets, and
            individuals.
          </p>
        </div>

        <button
          onClick={loadDonations}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Donations</p>
              <h3 className="mt-2 text-3xl font-bold">
                {donations.length}
              </h3>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3">
              <Package className="text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Meals Available</p>
              <h3 className="mt-2 text-3xl font-bold">
                {totalMeals}
              </h3>
            </div>

            <div className="rounded-xl bg-blue-100 p-3">
              <Users className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Showing Results</p>
              <h3 className="mt-2 text-3xl font-bold">
                {filteredDonations.length}
              </h3>
            </div>

            <div className="rounded-xl bg-orange-100 p-3">
              <Search className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by food, type or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border bg-white py-20 text-center shadow-sm">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>

          <p className="text-gray-500">
            Loading available donations...
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredDonations.length === 0 && (
        <div className="rounded-2xl border bg-white py-20 text-center shadow-sm">
          <Package
            size={60}
            className="mx-auto mb-5 text-gray-300"
          />

          <h3 className="text-xl font-semibold">
            No donations found
          </h3>

          <p className="mt-2 text-gray-500">
            Try another search or refresh the marketplace.
          </p>
        </div>
      )}

      {!loading && filteredDonations.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
  src={
    donation.images?.[0] ||
    "https://placehold.co/600x400?text=Food+Donation"
  }
  alt={donation.foodName}
  className="h-full w-full object-cover"
/>

                <div className="absolute right-4 top-4">
                  <StatusBadge status={donation.status || "AVAILABLE"} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {donation.foodName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {donation.foodType || "Food Donation"}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-emerald-600" />
                    <span>
                      <strong>Quantity:</strong>{" "}
                      {donation.quantity || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-500" />
                    <span>
                      {donation.pickupAddress || "Pickup location unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" />
                    <span>
                      Expires: {formatDate(donation.expiryTime)}
                    </span>
                  </div>
                </div>

                {donation.description && (
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {donation.description}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => handleRequest(donation)}
                  disabled={
                    requestingId === donation._id ||
                    donation.status !== "AVAILABLE"
                  }
                  className={`w-full rounded-xl py-3 font-semibold transition ${
                    requestingId === donation._id
                      ? "cursor-not-allowed bg-gray-300 text-white"
                      : donation.status !== "AVAILABLE"
                      ? "cursor-not-allowed bg-gray-300 text-white"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {requestingId === donation._id
                    ? "Sending Request..."
                    : donation.status !== "AVAILABLE"
                    ? "Unavailable"
                    : "Request Food"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
