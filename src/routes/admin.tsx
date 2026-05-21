import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, MessageSquare, TrendingUp, Plus, Trash2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  initialHealthTips,
  mockQueries,
  mockSymptomStats,
  mockUsageData,
} from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/admin")({
  component: AdminView,
});

function AdminView() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("admin");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const [tips, setTips] = useState(initialHealthTips);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="size-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-2">
              <ShieldCheck className="size-6" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">Demo: admin / admin</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" />
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
            />
            {err && <p className="text-xs text-destructive">{err}</p>}
            <Button
              className="w-full"
              onClick={() => {
                if (user === "admin" && pw === "admin") {
                  setAuthed(true);
                  setErr("");
                } else setErr("Invalid credentials. Hint: admin / admin");
              }}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addTip = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    setTips([
      { id: Date.now().toString(), title: newTitle, body: newBody, emoji: "🌿" },
      ...tips,
    ]);
    setNewTitle("");
    setNewBody("");
  };

  return (
    <div className="space-y-8 pb-24">
      <header>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of SehatBot platform activity</p>
      </header>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total Users" value="12,438" icon={Users} trend="+8.2% this week" />
        <StatCard label="Queries Today" value="1,255" icon={MessageSquare} trend="+12% vs yesterday" />
        <StatCard label="Top Symptom" value="Fever" icon={TrendingUp} trend="142 queries today" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Queries</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 150)" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="oklch(0.55 0.14 152)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Common Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSymptomStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.02 150)" />
                <XAxis dataKey="symptom" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="oklch(0.55 0.14 152)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Queries table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Query</TableHead>
                  <TableHead>Symptom</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockQueries.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.user}</TableCell>
                    <TableCell className="max-w-xs truncate">{q.query}</TableCell>
                    <TableCell>
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">
                        {q.symptom}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">{q.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Manage tips */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Health Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-[1fr_2fr_auto] gap-2">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
            />
            <Input
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Tip description"
            />
            <Button onClick={addTip}>
              <Plus className="size-4 mr-1" /> Add
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((t) => (
              <div
                key={t.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card"
              >
                <div className="text-2xl">{t.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{t.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{t.body}</div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setTips(tips.filter((x) => x.id !== t.id))}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-3xl font-bold mt-1">{value}</div>
            <div className="text-xs text-primary mt-2">{trend}</div>
          </div>
          <div className="size-11 rounded-xl bg-accent text-primary flex items-center justify-center">
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
