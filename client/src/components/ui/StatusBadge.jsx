import { cn } from "../../lib/cn";

const styles = {
  AVAILABLE: "bg-emerald-100 text-emerald-800",
  REQUESTED: "bg-amber-100 text-amber-800",
  RESERVED: "bg-sky-100 text-sky-800",
  ACCEPTED: "bg-sky-100 text-sky-800",
  PICKED_UP: "bg-violet-100 text-violet-800",
  COMPLETED: "bg-slate-200 text-slate-700",
  EXPIRED: "bg-rose-100 text-rose-800",
  CANCELLED: "bg-slate-200 text-slate-600",
};

export default function StatusBadge({ status = "AVAILABLE" }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide", styles[status] || styles.AVAILABLE)}>{status.replaceAll("_", " ")}</span>;
}
