import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";
import Container from "./Container";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "About Us",
      type: "route",
      to: "/about",
    },
    {
      label: "How it works",
      type: "section",
      href: "#how-it-works",
    },
    {
      label: "Impact",
      type: "section",
      href: "#impact",
    },
    {
      label: "For organizations",
      type: "section",
      href: "#for-organizations",
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <Container className="flex h-20 items-center justify-between">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-[-0.04em] text-slate-950"
          aria-label="FoodShare Home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-700 text-lg text-white">
            ✦
          </span>

          <span className="text-xl">FoodShare</span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-800"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-800"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop Buttons */}

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="px-2 text-sm font-semibold text-slate-700 hover:text-emerald-800"
          >
            Log in
          </Link>

          <Button
            className="py-2.5"
            onClick={() => (window.location.href = "/register")}
          >
            Get started
            <ArrowUpRight size={16} />
          </Button>
        </div>

        {/* Mobile Toggle */}

        <button
          className="grid size-10 place-items-center rounded-xl hover:bg-emerald-950/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </Container>

      {/* Mobile Menu */}

      {open && (
        <Container className="md:hidden">
          <nav className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">

            {links.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                >
                  {item.label}
                </a>
              )
            )}

            <Button
              className="mt-2 w-full"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Get started
            </Button>
          </nav>
        </Container>
      )}
    </header>
  );
}