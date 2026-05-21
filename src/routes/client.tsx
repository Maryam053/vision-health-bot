import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Inbox, CheckCircle2, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockReferrals } from "@/lib/mock-data";
import { toast } from "sonner";
import { getAuth } from "@/lib/auth";

export const Route = createFileRoute("/client")({
  beforeLoad: ({ location }) => {
    const auth = getAuth();
    if (!auth || auth.role !== "client") {
      throw redirect({ to: "/login", search: { redirect: location.href, role: "client" } });
    }
  },
  component: ClientView,
});


const statusColor: Record<string, string> = {
  New: "bg-primary/10 text-primary",
  Contacted: "bg-amber-100 text-amber-800",
  Closed: "bg-muted text-muted-foreground",
};

function ClientView() {
  const newCount = mockReferrals.filter((r) => r.status === "New").length;
  const contactedCount = mockReferrals.filter((r) => r.status === "Contacted").length;
  const closedCount = mockReferrals.filter((r) => r.status === "Closed").length;

  const [form, setForm] = useState({ refId: "", name: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.refId || !form.message) {
      toast.error("Please fill in referral ID and message");
      return;
    }
    toast.success(`Response sent for ${form.refId}`);
    setForm({ refId: "", name: "", message: "" });
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex items-start gap-4">
        <div className="size-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
          <Building2 className="size-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Clinic Partner Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Shifa International Hospital · Partner since 2024
          </p>
        </div>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="New Referrals" value={newCount} icon={Inbox} accent="text-primary" />
        <StatCard label="In Progress" value={contactedCount} icon={Clock} accent="text-amber-600" />
        <StatCard label="Closed" value={closedCount} icon={CheckCircle2} accent="text-muted-foreground" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Anonymized Patient Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Query Summary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReferrals.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="text-sm">{r.patient}</TableCell>
                    <TableCell className="max-w-sm text-sm">{r.summary}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">{r.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Respond to a Referral</CardTitle>
          <p className="text-sm text-muted-foreground">
            Contact SehatBot to update or follow up on a referral.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3 max-w-xl">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                placeholder="Referral ID (e.g. R-2041)"
                value={form.refId}
                onChange={(e) => setForm({ ...form, refId: e.target.value })}
              />
              <Input
                placeholder="Your name (optional)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <Textarea
              placeholder="Message to SehatBot team…"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button type="submit">
              <Send className="size-4 mr-2" /> Send Response
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="text-3xl font-bold mt-1">{value}</div>
        </div>
        <Icon className={`size-8 ${accent}`} />
      </CardContent>
    </Card>
  );
}
