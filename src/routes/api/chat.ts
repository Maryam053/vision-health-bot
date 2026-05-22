import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";

const DISCLAIMER = "Please consult a real doctor for proper diagnosis.";

type Rule = { keywords: string[]; reply: string };

const RULES: Rule[] = [
  {
    keywords: ["fever", "bukhar", "بخار"],
    reply:
      "بخار کی صورت میں زیادہ پانی پئیں، آرام کریں اور ہلکی غذا لیں۔ اگر بخار 102°F سے زیادہ ہو یا 3 دن سے زیادہ رہے تو فوراً ڈاکٹر سے رجوع کریں۔\n\nFor fever, drink plenty of fluids, rest well, and eat light meals. You may take paracetamol as per the recommended dose. If fever exceeds 102°F or lasts more than 3 days, seek medical help immediately.",
  },
  {
    keywords: ["cough", "khansi", "khaansi", "کھانسی"],
    reply:
      "کھانسی میں نیم گرم پانی، شہد اور ادرک کی چائے فائدہ مند ہے۔ گلے کو غرارے سے صاف رکھیں اور دھویں و ٹھنڈی چیزوں سے پرہیز کریں۔\n\nFor cough, drink warm water, honey with ginger tea, and gargle with salt water. Avoid cold drinks, smoke, and dust. If cough persists more than 2 weeks or has blood, see a doctor.",
  },
  {
    keywords: ["headache", "sir dard", "sar dard", "سر درد"],
    reply:
      "سر درد میں آرام کریں، پانی زیادہ پئیں اور سکرین کا استعمال کم کریں۔ ماتھے پر ٹھنڈا کپڑا رکھیں اور پرسکون جگہ بیٹھیں۔\n\nFor headache, rest in a quiet dark room, stay hydrated, and reduce screen time. A cold compress on the forehead can help. If headaches are severe, frequent, or with vision changes, consult a doctor.",
  },
  {
    keywords: ["stomach", "pait", "pet", "پیٹ"],
    reply:
      "پیٹ کی تکلیف میں ہلکی غذا (کھچڑی، دہی، کیلا) لیں اور مرچ مصالحے سے پرہیز کریں۔ ORS یا نمک چینی کا پانی پیتے رہیں۔\n\nFor stomach issues, eat bland foods like rice, yogurt, and bananas. Avoid spicy and oily food. Drink ORS to prevent dehydration. If pain is severe or there is blood in stool, see a doctor immediately.",
  },
  {
    keywords: ["diabetes", "sugar", "ذیابیطس", "شوگر"],
    reply:
      "شوگر کنٹرول کے لیے میٹھی اشیاء کم کریں، روزانہ 30 منٹ چہل قدمی کریں اور باقاعدگی سے شوگر چیک کرتے رہیں۔ ادویات وقت پر لیں اور سبزیاں و پروٹین زیادہ کھائیں۔\n\nManage diabetes by avoiding sugar and refined carbs, walking 30 minutes daily, and monitoring blood sugar regularly. Take prescribed medication on time and eat more vegetables and protein.",
  },
  {
    keywords: ["blood pressure", "bp", "hypertension", "بلڈ پریشر"],
    reply:
      "بلڈ پریشر کنٹرول کے لیے نمک کم کھائیں، تناؤ سے بچیں اور روزانہ ورزش کریں۔ تمباکو نوشی چھوڑ دیں اور باقاعدگی سے BP چیک کرتے رہیں۔\n\nFor blood pressure, reduce salt intake, manage stress, exercise daily, and avoid smoking. Take prescribed medicines regularly and monitor BP at home. See a doctor if readings stay above 140/90.",
  },
  {
    keywords: ["pregnancy", "hamla", "pregnant", "حاملہ"],
    reply:
      "حمل کے دوران متوازن غذا، فولک ایسڈ اور آئرن لیں، بھرپور آرام کریں اور بھاری وزن نہ اٹھائیں۔ ہر ماہ ڈاکٹر سے چیک اپ کروائیں۔\n\nDuring pregnancy, eat a balanced diet rich in iron and folic acid, rest well, and avoid heavy lifting. Attend all prenatal check-ups and take prescribed supplements.",
  },
  {
    keywords: ["child", "baby", "bachcha", "bacha", "بچہ", "بچے"],
    reply:
      "بچے کی صحت کے لیے ویکسینیشن مکمل کروائیں، صاف پانی پلائیں اور متوازن غذا دیں۔ ہاتھ دھونے کی عادت ڈالیں اور بخار یا دست کی صورت میں ORS دیں۔\n\nFor child health, ensure complete vaccination, give clean water and balanced meals, and teach hand hygiene. Give ORS for diarrhea and monitor growth regularly.",
  },
];

const FALLBACK =
  "آپ کی علامت کے بارے میں درست مشورہ کے لیے مستند ڈاکٹر سے ملنا ضروری ہے۔ زیادہ پانی پئیں، آرام کریں اور خود سے دوا لینے سے گریز کریں۔\n\nFor your symptom, it is best to consult a qualified doctor for accurate diagnosis. Stay hydrated, rest well, and avoid self-medication.";

function getReply(message: string): string {
  const lower = message.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      return `${rule.reply}\n\n${DISCLAIMER}`;
    }
  }
  return `${FALLBACK}\n\n${DISCLAIMER}`;
}

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
          return new Response(JSON.stringify({ reply: getReply(message) }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
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
