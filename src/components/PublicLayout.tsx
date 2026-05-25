import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#vision", label: "Vision 2030" },
  { to: "/#clinics", label: "Clinics" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const auth = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-emerald-700 flex items-center justify-center shadow-md shadow-primary/20">
            <Heart className="size-4.5 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="font-bold text-lg tracking-tight">
            Sehat<span className="text-primary">Bot</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
            const active = l.to === location.pathname;
            return (
              <a
                key={l.to}
                href={l.to}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {auth ? (
            <Link to={auth.role === "admin" ? "/admin" : auth.role === "client" ? "/client" : "/"}>
              <Button size="sm" variant="outline">
                {auth.role === "admin" ? "Admin Dashboard" : auth.role === "client" ? "Clinic Portal" : "My Account"}
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-gradient-to-r from-primary to-emerald-700 hover:opacity-95">
                <LogIn className="size-3.5" /> Login
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </a>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="block">
              <Button className="w-full mt-2 bg-gradient-to-r from-primary to-emerald-700">
                <LogIn className="size-3.5" /> Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-emerald-700 flex items-center justify-center">
              <Heart className="size-4.5 text-primary-foreground" fill="currentColor" />
            </div>
            <div className="font-bold text-lg">SehatBot</div>
          </Link>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
            AI-powered health guidance for every Pakistani — bilingual, free, and built to support
            UN SDG 3 and Pakistan Vision 2030.
          </p>
          <p className="text-xs text-muted-foreground mt-4">صحت آپ کی، ہماری ذمہ داری</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/#features" className="hover:text-foreground">Features</a></li>
            <li><a href="/#clinics" className="hover:text-foreground">Find Clinics</a></li>
            <li><a href="/#tips" className="hover:text-foreground">Health Tips</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Access</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/login" className="hover:text-foreground">Login</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">Admin</Link></li>
            <li><Link to="/client" className="hover:text-foreground">Clinic Portal</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SehatBot · Made in Pakistan 🇵🇰</div>
          <div className="flex items-center gap-4">
            <span>SDG 3 · Good Health & Well-Being</span>
            <span className="hidden sm:inline">·</span>
            <span>Vision 2030 Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
