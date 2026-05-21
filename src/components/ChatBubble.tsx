import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const greeting: Msg = {
  role: "assistant",
  content:
    "السلام علیکم! I'm SehatBot 🌿 — describe a symptom or ask a health question and I'll guide you. (Not a substitute for a real doctor.)",
};

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `⚠️ ${msg}. Please try again or consult a doctor.` },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open SehatBot chat"
        className={cn(
          "fixed z-50 bottom-20 md:bottom-6 right-4 md:right-6 size-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95",
          open && "rotate-90",
        )}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed z-50 bottom-36 md:bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] sm:h-[560px] origin-bottom-right transition-all duration-200",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <div className="h-full rounded-2xl bg-card border shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-primary text-primary-foreground flex items-center gap-3">
            <div className="size-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">SehatBot</div>
              <div className="text-xs opacity-80 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-300 animate-pulse" /> AI Health Assistant
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-accent/40 to-background">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border rounded-bl-sm shadow-sm",
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-card border shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" /> Thinking…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-card">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Describe your symptom… / علامت بتائیں"
                rows={1}
                className="flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 max-h-32"
              />
              <Button
                onClick={() => void send()}
                disabled={!input.trim() || loading}
                size="icon"
                className="rounded-xl shrink-0"
              >
                <Send className="size-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              For emergencies, call <span className="font-semibold">1122</span>. Always consult a doctor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
