import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Heart, LayoutDashboard, Building2, MessageCircleHeart, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/", label: "User View", urdu: "صارف", icon: MessageCircleHeart },
  { to: "/admin", label: "Admin", urdu: "ایڈمن", icon: LayoutDashboard },
  { to: "/client", label: "Clinic Partner", urdu: "کلینک", icon: Building2 },
];

function AuthBlock({ compact = false }: { compact?: boolean }) {
  const auth = useAuth();
  const navigate = useNavigate();
  if (auth) {
    return (
      <div className={cn("rounded-lg bg-accent p-3", compact && "p-2")}>
        <div className="text-xs text-muted-foreground">Signed in as</div>
        <div className="text-sm font-semibold capitalize">
          {auth.username} <span className="text-xs text-muted-foreground">({auth.role})</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-2"
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
        >
          <LogOut className="size-3.5 mr-1.5" /> Logout
        </Button>
      </div>
    );
  }
  return (
    <Link to="/login" className="block">
      <Button size="sm" className="w-full">
        <LogIn className="size-3.5 mr-1.5" /> Sign In
      </Button>
    </Link>
  );
}

export function AppSidebar() {
  const { location } = useRouterState();
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-sidebar-border bg-sidebar">
      <div className="px-6 py-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <Heart className="size-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">SehatBot</div>
            <div className="text-xs text-muted-foreground">صحت آپ کی، ہماری ذمہ داری</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1">{item.label}</span>
              <span className={cn("text-xs", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {item.urdu}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 space-y-3">
        <AuthBlock />
        <div className="p-3 rounded-lg bg-accent text-accent-foreground text-xs">
          <div className="font-semibold mb-1">SDG 3 · Vision 2030</div>
          <p>Good Health & Well-Being for all Pakistanis.</p>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const { location } = useRouterState();
  const auth = useAuth();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar border-t border-sidebar-border">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-xs font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
              {item.label.split(" ")[0]}
            </Link>
          );
        })}
        <Link
          to="/login"
          className={cn(
            "flex flex-col items-center gap-1 py-2.5 text-xs font-medium",
            location.pathname === "/login" ? "text-primary" : "text-muted-foreground",
          )}
        >
          {auth ? <LogOut className="size-5" /> : <LogIn className="size-5" />}
          {auth ? "Account" : "Login"}
        </Link>
      </div>
    </nav>
  );
}
