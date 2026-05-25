import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Search,
  Phone,
  Heart,
  MessageCircleHeart,
  Stethoscope,
  Shield,
  Sparkles,
  ArrowRight,
  Globe,
  Target,
  CheckCircle2,
  Activity,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatBubble } from "@/components/ChatBubble";
import { initialHealthTips, mockClinics } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SehatBot — AI Health Assistant for Pakistan" },
      {
        name: "description",
        content:
          "SehatBot gives free, bilingual (Urdu & English) health guidance, finds nearby clinics, and shares daily wellness tips — built for Pakistan, aligned with SDG 3 & Vision 2030.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Clinics />
      <Vision />
      <Tips />
      <CTA />
      <ChatBubble />
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-20 -right-24 size-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-teal-200/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" /> Aligned with UN SDG 3 · Pakistan Vision 2030
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
          AI-Powered Health Guidance for{" "}
          <span className="bg-gradient-to-r from-primary via-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Every Pakistani
          </span>
        </h1>

        <p className="mt-3 text-lg md:text-xl font-medium text-muted-foreground" dir="rtl">
          آپ کا ذاتی صحت معاون — اردو اور انگریزی میں
        </p>

        <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
          SehatBot answers your health questions, helps you find nearby clinics, and shares simple
          wellness tips — free, fast, and built for our communities. Always consult a real doctor
          for serious symptoms.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/login">
            <Button size="lg" className="h-12 px-7 bg-gradient-to-r from-primary to-emerald-700 hover:opacity-95 shadow-lg shadow-primary/25">
              Get Started <ArrowRight className="size-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="h-12 px-7">
              Explore Features
            </Button>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 font-medium">
            <Target className="size-3.5 text-primary" /> SDG 3 · Good Health
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 font-medium">
            <Globe className="size-3.5 text-blue-600" /> Vision 2030 Aligned
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 font-medium">
            <Shield className="size-3.5 text-emerald-600" /> Free & Private
          </span>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Users, value: "5+", label: "Major cities covered" },
            { icon: Activity, value: "8", label: "Symptom categories" },
            { icon: Clock, value: "24/7", label: "Always available" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border bg-card/70 backdrop-blur p-4 md:p-5">
              <Icon className="size-5 mx-auto text-primary" />
              <div className="mt-2 text-2xl md:text-3xl font-bold">{value}</div>
              <div className="text-[11px] md:text-xs text-muted-foreground mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const features = [
    {
      icon: MessageCircleHeart,
      color: "from-emerald-500 to-emerald-700",
      title: "Bilingual AI Chat",
      urdu: "اردو اور انگریزی",
      body: "Describe a symptom in Urdu or English. SehatBot gives clear, friendly guidance in seconds.",
    },
    {
      icon: Stethoscope,
      color: "from-teal-500 to-emerald-700",
      title: "Find Nearby Clinics",
      urdu: "قریبی کلینک",
      body: "Search trusted clinics across Karachi, Lahore, Islamabad, Peshawar and Quetta with phone & address.",
    },
    {
      icon: Heart,
      color: "from-rose-500 to-emerald-700",
      title: "Daily Wellness Tips",
      urdu: "روزانہ کی تجاویز",
      body: "Practical, evidence-aware health tips covering hydration, sleep, nutrition and mental wellbeing.",
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Features</div>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
          Built for how Pakistanis ask about health
        </h2>
        <p className="mt-3 text-muted-foreground">
          Three focused tools — accessible, bilingual, and designed to support real conversations
          with real doctors.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="group relative overflow-hidden border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.color}`} />
            <CardHeader>
              <div className={`size-12 rounded-xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <f.icon className="size-6" />
              </div>
              <CardTitle className="mt-4 text-xl">{f.title}</CardTitle>
              <p className="text-xs text-muted-foreground" dir="rtl">{f.urdu}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------- Clinics ---------- */
function Clinics() {
  const [city, setCity] = useState("");
  const [results, setResults] = useState<typeof mockClinics[string] | null>(null);
  const [searched, setSearched] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const key = city.trim().toLowerCase();
    setSearched(city.trim());
    setResults(mockClinics[key] ?? []);
  };

  return (
    <section id="clinics" className="bg-gradient-to-b from-accent/30 to-background border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Clinic finder
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Trusted clinics, one search away
            </h2>
            <p className="mt-3 text-muted-foreground">
              From Karachi to Quetta — find verified clinics with addresses and phone numbers,
              ready when you need them.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              {["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"].map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span className="font-medium">{c}</span>
                  <span className="text-muted-foreground text-xs">covered</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="shadow-xl border-border/60">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city…"
                    className="pl-9 h-11"
                  />
                </div>
                <Button type="submit" className="h-11 px-6 bg-gradient-to-r from-primary to-emerald-700">
                  <Search className="size-4" /> Search
                </Button>
              </form>

              {results !== null && (
                <div className="mt-6">
                  {results.length === 0 ? (
                    <div className="text-sm text-muted-foreground bg-accent/40 border rounded-lg p-4">
                      No clinics found for "<span className="font-semibold">{searched}</span>". Try
                      Karachi, Lahore, Islamabad, Peshawar, or Quetta.
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {results.map((c, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl border bg-background hover:border-primary/40 hover:shadow-md transition-all"
                        >
                          <div className="font-semibold leading-tight">{c.name}</div>
                          <div className="text-xs text-muted-foreground mt-2 flex items-start gap-1.5">
                            <MapPin className="size-3 mt-0.5 shrink-0" /> {c.address}
                          </div>
                          <div className="text-xs text-primary mt-2 flex items-center gap-1.5 font-medium">
                            <Phone className="size-3" /> {c.phone}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {results === null && (
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Try typing <span className="font-medium">Karachi</span>,{" "}
                  <span className="font-medium">Lahore</span> or{" "}
                  <span className="font-medium">Islamabad</span>.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ---------- Vision ---------- */
function Vision() {
  return (
    <section id="vision" className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Pakistan Vision 2030
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            A healthier digital generation
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Pakistan Vision 2030 calls for accessible, equitable healthcare for every citizen.
            SehatBot delivers free, AI-assisted health guidance in Urdu and English — bringing
            quality information to underserved communities, from Karachi to Gilgit.
          </p>

          <ul className="mt-7 space-y-3.5">
            {[
              "Equal access to health information for every region",
              "Bilingual responses for diverse Pakistani households",
              "Always recommends a real doctor for serious symptoms",
              "Aligned with UN SDG 3 — Good Health & Well-Being",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-emerald-300/20 to-teal-200/20 blur-2xl rounded-3xl" />
          <div className="relative rounded-3xl border bg-gradient-to-br from-card to-accent/40 p-8 md:p-10 shadow-xl">
            <div className="flex items-baseline gap-3">
              <div className="text-7xl font-black bg-gradient-to-br from-primary to-emerald-700 bg-clip-text text-transparent leading-none">
                3
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  UN Sustainable Development Goal
                </div>
                <div className="text-lg font-bold">Good Health & Well-Being</div>
              </div>
            </div>
            <blockquote className="mt-6 text-sm text-muted-foreground italic leading-relaxed border-l-2 border-primary pl-4">
              "Ensure healthy lives and promote well-being for all at all ages."
            </blockquote>

            <div className="mt-7 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-background border p-3">
                <div className="text-xs font-semibold">Free for all</div>
              </div>
              <div className="rounded-xl bg-background border p-3">
                <div className="text-xs font-semibold">Bilingual AI</div>
              </div>
              <div className="rounded-xl bg-background border p-3">
                <div className="text-xs font-semibold">Made in 🇵🇰</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tips ---------- */
function Tips() {
  return (
    <section id="tips" className="bg-accent/20 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Daily Wellness
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            Small habits, big impact
          </h2>
          <p className="mt-3 text-muted-foreground">
            روزانہ کی صحت کی تجاویز — practical tips you can start today.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {initialHealthTips.map((t) => (
            <Card key={t.id} className="border-border/60 hover:border-primary/40 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="text-4xl">{t.emoji}</div>
                <CardTitle className="text-lg mt-2">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-emerald-700 to-teal-700 p-10 md:p-16 text-primary-foreground shadow-2xl shadow-primary/30">
        <div className="absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Start a healthier conversation today
          </h2>
          <p className="mt-4 opacity-90 leading-relaxed">
            Tap the chat button to ask SehatBot anything in Urdu or English — or sign in to access
            your personalized dashboard.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="h-12 px-7 bg-white text-primary hover:bg-white/90">
                Sign in to SehatBot <ArrowRight className="size-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="h-12 px-7 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white">
                Learn more
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
