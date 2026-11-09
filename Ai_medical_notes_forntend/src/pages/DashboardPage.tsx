import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, User, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { useConsultation } from "@/contexts/ConsultationContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const soapSections = [
  { key: "S", title: "Subjective", default: "Patient reports fever for 3 days (102°F), mild cough, no breathlessness. Known diabetic on Metformin 500mg." },
  { key: "O", title: "Objective", default: "Temperature: 102°F. No respiratory distress noted. No other vitals documented." },
  { key: "A", title: "Assessment", default: "Viral fever, likely URTI. Diabetes - stable." },
  { key: "P", title: "Plan", default: "Paracetamol 650mg BD x 5 days. Increase fluid intake. CBC test advised. Follow-up in 5 days if fever persists." },
];

const summaryEN = [
  { emoji: "🩺", title: "What We Found", text: "You have a viral fever with mild throat infection. Your diabetes is currently stable." },
  { emoji: "💊", title: "Your Medications", text: "Paracetamol 650mg — take twice daily after meals for 5 days." },
  { emoji: "🥗", title: "Lifestyle Advice", text: "Drink plenty of water and rest. Avoid cold drinks and oily food." },
  { emoji: "📅", title: "Next Steps", text: "Get a CBC blood test done. Come back in 5 days if fever continues." },
  { emoji: "🚨", title: "Come Back Immediately If", text: "Fever crosses 104°F, you have difficulty breathing, or you feel very weak." },
];

const summaryHI = [
  { emoji: "🩺", title: "क्या पाया गया", text: "आपको वायरल बुखार और हल्का गले का संक्रमण है। आपकी मधुमेह अभी नियंत्रण में है।" },
  { emoji: "💊", title: "आपकी दवाइयाँ", text: "पेरासिटामोल 650mg — 5 दिनों तक खाने के बाद दिन में दो बार लें।" },
  { emoji: "🥗", title: "जीवनशैली सलाह", text: "खूब पानी पिएं और आराम करें। ठंडे पेय और तैलीय खाने से बचें।" },
  { emoji: "📅", title: "अगले कदम", text: "CBC रक्त परीक्षण करवाएं। यदि बुखार जारी रहे तो 5 दिनों में वापस आएं।" },
  { emoji: "🚨", title: "तुरंत वापस आएं यदि", text: "यदि बुखार 104°F से अधिक हो, सांस लेने में कठिनाई हो, या बहुत कमज़ोरी महसूस हो तो तुरंत वापस आएं।" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data } = useConsultation();
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [editing, setEditing] = useState<string | null>(null);
  const [soapValues, setSoapValues] = useState<Record<string, string>>(
    Object.fromEntries(soapSections.map((s) => [s.key, s.default]))
  );

  const summary = lang === "en" ? summaryEN : summaryHI;

  const handleApprove = () => {
    toast.success("Consultation approved and saved!");
    navigate("/confirmation");
  };

  return (
    <div className="min-h-screen bg-secondary/50 pb-20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* LEFT — SOAP Note */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 bg-primary px-6 py-4">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
              <h2 className="font-semibold text-primary-foreground">Clinical Note (Physician View)</h2>
            </div>
            <div className="space-y-4 p-6">
              {soapSections.map((section) => (
                <div key={section.key}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">
                      {section.key} — {section.title}
                    </span>
                    <button
                      onClick={() => setEditing(editing === section.key ? null : section.key)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {editing === section.key ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </button>
                  </div>
                  {editing === section.key ? (
                    <Textarea
                      value={soapValues[section.key]}
                      onChange={(e) => setSoapValues({ ...soapValues, [section.key]: e.target.value })}
                      className="min-h-[80px] text-sm"
                    />
                  ) : (
                    <p className="rounded-lg bg-muted/50 px-4 py-3 text-sm leading-relaxed text-foreground">
                      {soapValues[section.key]}
                    </p>
                  )}
                  {section.key === "A" && (
                    <div className="mt-2 inline-block rounded-md bg-info px-3 py-1 text-xs font-medium text-info-foreground">
                      Suggested ICD-10: J06.9 — Acute Upper Respiratory Infection
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Patient Summary */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center justify-between bg-success px-6 py-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-success-foreground" />
                <h2 className="font-semibold text-success-foreground">Patient Summary</h2>
              </div>
              <div className="flex rounded-lg bg-success-foreground/20 p-0.5">
                <button
                  onClick={() => setLang("en")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    lang === "en" ? "bg-success-foreground text-success" : "text-success-foreground"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("hi")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    lang === "hi" ? "bg-success-foreground text-success" : "text-success-foreground"
                  }`}
                >
                  🇮🇳 Hindi
                </button>
              </div>
            </div>
            <div className="space-y-3 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {summary.map((card, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border bg-muted/30 p-4"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-lg">{card.emoji}</span>
                        <span className="text-sm font-semibold text-foreground">{card.title}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-muted-foreground">
            ← Back to Edit
          </Button>
          <Button
            size="lg"
            onClick={handleApprove}
            className="gap-2 text-base font-semibold bg-success hover:bg-success/90 text-success-foreground"
          >
            <Check className="h-5 w-5" />
            Approve & Save Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
