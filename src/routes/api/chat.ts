import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";
import { generateText } from "ai";

const SYSTEM_PROMPT =
  "You are SehatBot, a friendly health assistant for Pakistan. Give simple, clear health advice. Always recommend consulting a real doctor for serious symptoms. Keep responses under 100 words.";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { message } = (await request.json()) as { message?: string };
          if (!message || typeof message !== "string") {
            return new Response(JSON.stringify({ error: "message required" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }
          const gateway = createLovableAiGatewayProvider(key);
          const model = gateway("google/gemini-3-flash-preview");
          const { text } = await generateText({
            model,
            system: SYSTEM_PROMPT,
            prompt: message,
          });
          return new Response(JSON.stringify({ reply: text }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          console.error("chat error", err);
          const msg = err instanceof Error ? err.message : "unknown error";
          return new Response(JSON.stringify({ error: msg }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
