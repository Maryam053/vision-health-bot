export const initialHealthTips = [
  {
    id: "1",
    title: "Stay Hydrated / پانی پیتے رہیں",
    body: "Drink at least 8 glasses of water daily, especially in Pakistan's hot climate.",
    emoji: "💧",
  },
  {
    id: "2",
    title: "Daily Walk / روزانہ چہل قدمی",
    body: "A 30-minute walk after dinner improves digestion and heart health.",
    emoji: "🚶",
  },
  {
    id: "3",
    title: "Eat Seasonal Fruits / موسمی پھل کھائیں",
    body: "Mangoes, oranges, and guavas boost immunity naturally.",
    emoji: "🥭",
  },
  {
    id: "4",
    title: "Wash Hands / ہاتھ دھوئیں",
    body: "Wash hands with soap for 20 seconds to prevent disease.",
    emoji: "🧼",
  },
  {
    id: "5",
    title: "Sleep Well / اچھی نیند",
    body: "Adults need 7–9 hours of sleep for mental and physical wellbeing.",
    emoji: "😴",
  },
  {
    id: "6",
    title: "Limit Sugar / چینی کم کریں",
    body: "Reduce sugary tea and sodas to lower diabetes risk.",
    emoji: "🍬",
  },
];

export const mockClinics: Record<string, { name: string; address: string; phone: string }[]> = {
  karachi: [
    { name: "Aga Khan University Hospital", address: "Stadium Road, Karachi", phone: "021-3486-1111" },
    { name: "Liaquat National Hospital", address: "Stadium Road, Karachi", phone: "021-3441-2645" },
    { name: "South City Hospital", address: "Block 3, Clifton, Karachi", phone: "021-3586-2301" },
  ],
  lahore: [
    { name: "Shaukat Khanum Memorial", address: "7-A Block R-3, Johar Town, Lahore", phone: "042-3590-5000" },
    { name: "Services Hospital", address: "Jail Road, Lahore", phone: "042-9920-3402" },
    { name: "Doctors Hospital", address: "152-G/1, Johar Town, Lahore", phone: "042-3513-2939" },
  ],
  islamabad: [
    { name: "Shifa International", address: "Sector H-8/4, Islamabad", phone: "051-846-4646" },
    { name: "PIMS Hospital", address: "Sector G-8/3, Islamabad", phone: "051-925-6000" },
    { name: "Maroof International", address: "F-10 Markaz, Islamabad", phone: "051-222-3700" },
  ],
  peshawar: [
    { name: "Lady Reading Hospital", address: "Soekarno Chowk, Peshawar", phone: "091-921-1300" },
    { name: "Hayatabad Medical Complex", address: "Phase 4, Hayatabad, Peshawar", phone: "091-901-7333" },
  ],
  quetta: [
    { name: "Bolan Medical Complex", address: "Brewery Road, Quetta", phone: "081-928-1300" },
    { name: "Combined Military Hospital", address: "Cantt, Quetta", phone: "081-920-1234" },
  ],
};

export const mockQueries = [
  { id: 1, user: "User #1042", query: "Fever and headache for 2 days", time: "2 min ago", symptom: "Fever" },
  { id: 2, user: "User #1041", query: "Stomach pain after eating", time: "8 min ago", symptom: "Stomach pain" },
  { id: 3, user: "User #1040", query: "Cough with mucus", time: "15 min ago", symptom: "Cough" },
  { id: 4, user: "User #1039", query: "High blood pressure reading", time: "22 min ago", symptom: "BP" },
  { id: 5, user: "User #1038", query: "Difficulty sleeping", time: "40 min ago", symptom: "Insomnia" },
  { id: 6, user: "User #1037", query: "Skin rash on arms", time: "1 hr ago", symptom: "Skin" },
  { id: 7, user: "User #1036", query: "Sore throat and fever", time: "1 hr ago", symptom: "Fever" },
  { id: 8, user: "User #1035", query: "Dizziness when standing", time: "2 hr ago", symptom: "Dizziness" },
  { id: 9, user: "User #1034", query: "Chest tightness", time: "3 hr ago", symptom: "Chest pain" },
  { id: 10, user: "User #1033", query: "Persistent cough", time: "4 hr ago", symptom: "Cough" },
];

export const mockSymptomStats = [
  { symptom: "Fever", count: 142 },
  { symptom: "Cough", count: 98 },
  { symptom: "Headache", count: 76 },
  { symptom: "Stomach", count: 54 },
  { symptom: "BP", count: 41 },
  { symptom: "Skin", count: 32 },
];

export const mockUsageData = [
  { day: "Mon", queries: 120 },
  { day: "Tue", queries: 145 },
  { day: "Wed", queries: 180 },
  { day: "Thu", queries: 165 },
  { day: "Fri", queries: 210 },
  { day: "Sat", queries: 240 },
  { day: "Sun", queries: 195 },
];

export const mockReferrals = [
  { id: "R-2041", patient: "Anonymous #A-201", summary: "Possible viral fever, advised consultation", status: "New", time: "5 min ago" },
  { id: "R-2040", patient: "Anonymous #A-200", summary: "Chronic cough, needs chest examination", status: "New", time: "30 min ago" },
  { id: "R-2039", patient: "Anonymous #A-199", summary: "BP fluctuation, needs cardiology follow-up", status: "Contacted", time: "2 hr ago" },
  { id: "R-2038", patient: "Anonymous #A-198", summary: "Skin allergy, recommended dermatologist", status: "Closed", time: "1 day ago" },
  { id: "R-2037", patient: "Anonymous #A-197", summary: "Diabetes management consultation", status: "Contacted", time: "1 day ago" },
];
