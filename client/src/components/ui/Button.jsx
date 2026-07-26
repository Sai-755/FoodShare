import { cn } from "../../lib/cn";

const variants = {
  primary: "bg-emerald-700 text-white shadow-[0_12px_24px_rgba(4,120,87,.2)] hover:bg-emerald-800",
  secondary: "border border-emerald-900/10 bg-white text-slate-800 hover:border-emerald-700/25 hover:bg-emerald-50",
  light: "bg-white/12 text-white ring-1 ring-white/30 hover:bg-white/20",
};

export default function Button({ children, className, variant = "primary", ...props }) {
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:pointer-events-none disabled:opacity-50", variants[variant], className)} {...props}>{children}</button>;
}
