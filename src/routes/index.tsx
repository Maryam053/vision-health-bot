import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Search, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatBubble } from "@/components/ChatBubble";
import { initialHealthTips, mockClinics } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: UserView,
});

function UserView() {
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
    <div className="space-y-10 pb-24">
      {/* Hero */}
      <section className="rounded-3xl bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground p-8 md:p-12 shadow-lg overflow-hidden relative">
        <div className="absolute -right-12 -top-12 size-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium mb-4">
            <Heart className="size-3.5" fill="currentColor" /> SDG 3 · Vision 2030
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Your AI Health Companion <br />
            <span className="opacity-90 text-2xl md:text-3xl">آپ کا ذاتی صحت معاون</span>
          </h1>
          <p className="mt-3 opacity-90 max-w-lg">
            Get instant health guidance in Urdu & English, find nearby clinics, and stay
            informed with daily wellness tips — all in one place.
          </p>
          <p className="mt-4 text-sm opacity-80">
            Tap the floating chat to talk with SehatBot →
          </p>
        </div>
      </section>

      {/* Find clinics */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Find Nearby Clinics</h2>
            <p className="text-sm text-muted-foreground">قریبی کلینک تلاش کریں</p>
          </div>
          <MapPin className="size-5 text-primary" />
        </div>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city (Karachi, Lahore, Islamabad…)"
                className="flex-1"
              />
              <Button type="submit" className="sm:w-auto">
                <Search className="size-4 mr-2" /> Search
              </Button>
            </form>

            {results !== null && (
              <div className="mt-6">
                {results.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No clinics found for "{searched}". Try Karachi, Lahore, Islamabad, Peshawar, or Quetta.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {results.map((c, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border bg-accent/30 hover:bg-accent transition-colors"
                      >
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-start gap-1.5">
                          <MapPin className="size-3 mt-0.5 shrink-0" /> {c.address}
                        </div>
                        <div className="text-xs text-primary mt-1.5 flex items-center gap-1.5 font-medium">
                          <Phone className="size-3" /> {c.phone}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Health tips */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Daily Health Tips</h2>
          <p className="text-sm text-muted-foreground">روزانہ کی صحت کی تجاویز</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialHealthTips.map((t) => (
            <Card key={t.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-3xl mb-2">{t.emoji}</div>
                <CardTitle className="text-base">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ChatBubble />
    </div>
  );
}
