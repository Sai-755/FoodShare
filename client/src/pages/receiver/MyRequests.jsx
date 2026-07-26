import { useEffect, useState } from "react";
import { Clock, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

import DashboardShell from "../../components/layout/DashboardShell";
import StatusBadge from "../../components/ui/StatusBadge";
import { requestService } from "../../services/requestService";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const data = await requestService.getMyRequests();

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

  return (
    <DashboardShell
      title="My Requests"
      description="Track all your donation requests."
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            My Donation Requests
          </h2>

          <p className="text-gray-500 mt-2">
            View every request you've sent.
          </p>
        </div>

        <button
          onClick={loadRequests}
          className="bg-emerald-600 hover:bg-emerald-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow border p-6">
          <Clock className="text-orange-500 mb-3" />
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold">
            {requests.filter(r => r.status==="PENDING").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <CheckCircle2 className="text-green-500 mb-3" />
          <p className="text-gray-500">Accepted</p>
          <h2 className="text-3xl font-bold">
            {requests.filter(r => r.status==="ACCEPTED").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <XCircle className="text-red-500 mb-3" />
          <p className="text-gray-500">Rejected</p>
          <h2 className="text-3xl font-bold">
            {requests.filter(r => r.status==="REJECTED").length}
          </h2>
        </div>

      </div>

      {loading && (

        <div className="text-center py-20">

          Loading Requests...

        </div>

      )}

      {!loading && requests.length===0 && (

        <div className="bg-white rounded-2xl border shadow py-20 text-center">

          <h3 className="text-2xl font-semibold">
            No Requests Found
          </h3>

          <p className="text-gray-500 mt-3">
            Start requesting food from the marketplace.
          </p>

        </div>

      )}

      {!loading && requests.length>0 && (

        <div className="space-y-6">

          {requests.map((request)=>(
            <div
              key={request._id}
              className="bg-white rounded-2xl border shadow p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {request.donation?.foodName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {request.donation?.pickupAddress}
                  </p>

                </div>

                <StatusBadge status={request.status} />

              </div>

            </div>
          ))}

        </div>

      )}

    </DashboardShell>
  );
}