import { useEffect, useState } from "react";
import {
  CheckCircle2,
  RefreshCw,
  User,
  Phone,
  MapPin,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

import DashboardShell from "../../components/layout/DashboardShell";
import StatusBadge from "../../components/ui/StatusBadge";
import { requestService } from "../../services/requestService";

export default function DonorRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState("");

  const loadRequests = async () => {
    try {
      setLoading(true);

      const data = await requestService.getReceivedRequests();

      setRequests(data.requests || data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      setProcessing(id);

      await requestService.acceptRequest(id);

      toast.success("Request accepted");

      loadRequests();
    } catch (err) {
      console.error(err);
      toast.error("Unable to accept request");
    } finally {
      setProcessing("");
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessing(id);

      await requestService.rejectRequest(id);

      toast.success("Request rejected");

      loadRequests();
    } catch (err) {
      console.error(err);
      toast.error("Unable to reject request");
    } finally {
      setProcessing("");
    }
  };

  return (
    <DashboardShell
      title="Incoming Requests"
      description="Manage requests received for your donations."
    >
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Donation Requests
          </h2>

          <p className="text-gray-500 mt-2">
            Review and respond to incoming requests.
          </p>
        </div>

        <button
          onClick={loadRequests}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {loading && (
        <div className="py-20 text-center">
          Loading...
        </div>
      )}

      {!loading && requests.length === 0 && (
        <div className="rounded-2xl border bg-white py-20 text-center shadow">
          <h2 className="text-2xl font-semibold">
            No Requests Received
          </h2>

          <p className="mt-3 text-gray-500">
            Incoming requests will appear here.
          </p>
        </div>
      )}

      <div className="space-y-6">

        {requests.map((request) => (

          <div
            key={request._id}
            className="rounded-2xl border bg-white p-6 shadow"
          >

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  {request.donation?.foodName}
                </h2>

                <p className="text-gray-500 mt-1">
                  {request.donation?.category}
                </p>

              </div>

              <StatusBadge status={request.status} />

            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">

              <div className="flex items-center gap-3">
                <User size={18} />
                {request.requester?.fullName}
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                {request.requester?.phone}
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                {request.donation?.pickupAddress}
              </div>

            </div>

            {request.status === "PENDING" && (

              <div className="mt-6 flex gap-4">

                <button
                  disabled={processing === request._id}
                  onClick={() => handleAccept(request._id)}
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                >
                  <CheckCircle2 size={18} />
                  Accept
                </button>

                <button
                  disabled={processing === request._id}
                  onClick={() => handleReject(request._id)}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                >
                  <XCircle size={18} />
                  Reject
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </DashboardShell>
  );
}