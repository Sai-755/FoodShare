import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getApiError } from "../../api/client";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
  event.preventDefault();
  setIsSubmitting(true);

  try {
    const session = await authService.login({
      email,
      password,
    });

    login(session);

    toast.success(
      `Welcome back, ${session.user.fullName.split(" ")[0]}`
    );

   navigate("/dashboard");
   
  } catch (error) {
    toast.error(getApiError(error, "We couldn't sign you in."));
  } finally {
    setIsSubmitting(false);
  }
}

  return <main className="grid min-h-screen bg-[#f7faf8] lg:grid-cols-2"><section className="flex items-center justify-center px-5 py-12 sm:px-8"><div className="w-full max-w-md"><Link to="/" className="inline-flex items-center gap-2 text-xl font-semibold tracking-[-.045em]"><span className="grid size-9 place-items-center rounded-xl bg-emerald-700 text-lg text-white">✦</span>FoodShare</Link><p className="mt-14 text-xs font-bold uppercase tracking-[.16em] text-emerald-700">Welcome back</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.055em] text-slate-950">Sign in to your workspace.</h1><p className="mt-3 leading-7 text-slate-600">Continue sharing good food with your community.</p><form onSubmit={handleSubmit} className="mt-8 space-y-5"><label className="block text-sm font-semibold text-slate-700">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"/></label><label className="block text-sm font-semibold text-slate-700">Password<div className="relative mt-2"><input required minLength="6" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400" aria-label="Show password">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label><Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : <>Sign in <ArrowRight size={17}/></>}</Button></form><p className="mt-6 text-center text-sm text-slate-600">New to FoodShare? <Link className="font-bold text-emerald-700 hover:text-emerald-800" to="/register">Create an account</Link></p></div></section><section className="relative hidden overflow-hidden bg-emerald-950 p-14 text-white lg:flex lg:flex-col lg:justify-between"><div className="absolute -right-16 -top-12 size-80 rounded-full bg-emerald-400/20 blur-3xl"/><div className="relative flex items-center gap-2 text-sm font-semibold text-emerald-100"><LockKeyhole size={17}/>Private, simple & built for impact</div><div className="relative max-w-lg"><p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-300">Share better</p><blockquote className="mt-6 text-4xl font-semibold leading-tight tracking-[-.05em]">“A few surplus meals can become a meaningful moment for a whole community.”</blockquote><p className="mt-7 text-emerald-100/70">FoodShare brings generous people, organizations, and volunteers together in one dependable local network.</p></div><p className="relative text-sm text-emerald-100/60">Good food belongs on plates.</p></section></main>;
}
