import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShieldCheck, Building2, User as UserIcon, ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_CREDENTIALS, login, type Role } from "@/lib/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Search = { redirect?: string; role?: Role };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
    role:
      s.role === "admin" || s.role === "client" || s.role === "user"
        ? s.role
        : undefined,
  }),
  component: LoginPage,
});

const roleConfig: { role: Role; icon: typeof ShieldCheck; gradient: string; target: string }[] = [
  { role: "admin", icon: ShieldCheck, gradient: "from-emerald-600 to-emerald-800", target: "/admin" },
  { role: "client", icon: Building2, gradient: "from-teal-600 to-emerald-700", target: "/client" },
  { role: "user", icon: UserIcon, gradient: "from-green-500 to-emerald-600", target: "/" },
];

function LoginPage() {
  const search = useSearch({ from: "/login" });
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Role | null>(search.role ?? null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const pickRole = (role: Role) => {
    setSelected(role);
    setUsername(DEMO_CREDENTIALS[role].username);
    setPassword(DEMO_CREDENTIALS[role].password);
    setErr("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (login(selected, username, password)) {
      toast.success(`Welcome, ${DEMO_CREDENTIALS[selected].label}!`);
      const target =
        search.redirect ?? roleConfig.find((r) => r.role === selected)!.target;
      navigate({ to: target });
    } else {
      setErr("Invalid credentials. Use the demo credentials shown.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/50 via-background to-background p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-6">
          <div className="size-14 rounded-2xl bg-primary mx-auto flex items-center justify-center shadow-lg shadow-primary/30">
            <Heart className="size-7 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold mt-3">SehatBot</h1>
          <p className="text-sm text-muted-foreground">صحت آپ کی، ہماری ذمہ داری</p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="pt-6">
            {!selected ? (
              <>
                <h2 className="text-lg font-semibold text-center mb-1">Sign in to continue</h2>
                <p className="text-sm text-muted-foreground text-center mb-5">
                  Choose your role to log in
                </p>
                <div className="space-y-2.5">
                  {roleConfig.map(({ role, icon: Icon, gradient }) => (
                    <button
                      key={role}
                      onClick={() => pickRole(role)}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:scale-[1.02] hover:shadow-md bg-gradient-to-r text-white",
                        gradient,
                      )}
                    >
                      <div className="size-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{DEMO_CREDENTIALS[role].label} Login</div>
                        <div className="text-xs opacity-90">
                          {role === "admin" && "Manage platform & view analytics"}
                          {role === "client" && "View patient referrals"}
                          {role === "user" && "Chat with SehatBot & find clinics"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setSelected(null);
                    setErr("");
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-3"
                >
                  <ArrowLeft className="size-3.5" /> Choose a different role
                </button>
                <h2 className="text-lg font-semibold mb-1">
                  {DEMO_CREDENTIALS[selected].label} Login
                </h2>

                {/* Demo credentials banner */}
                <div className="mt-3 mb-4 p-3 rounded-lg bg-accent/60 border border-primary/20 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-primary mb-1">
                    <KeyRound className="size-3.5" /> Demo credentials
                  </div>
                  <div className="font-mono text-foreground">
                    username: <span className="font-semibold">{DEMO_CREDENTIALS[selected].username}</span>
                    <br />
                    password: <span className="font-semibold">{DEMO_CREDENTIALS[selected].password}</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Username</label>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  {err && <p className="text-xs text-destructive">{err}</p>}
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          SDG 3 · Vision 2030 — Good Health & Well-Being for Pakistan
        </p>
      </div>
    </div>
  );
}
