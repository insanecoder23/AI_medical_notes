import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, ShieldCheck, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useConsultation } from "@/contexts/ConsultationContext";
import { motion, AnimatePresence } from "framer-motion";

const ConsentPage = () => {
  const navigate = useNavigate();
  const { setData } = useConsultation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("English");
  const [consultationType, setConsultationType] = useState("General Physician");
  const [consented, setConsented] = useState(false);

  const canSubmit = name.trim() && age.trim() && consented;

  const handleStart = () => {
    if (!canSubmit) return;
    setData({
      patientName: name,
      patientAge: age,
      language,
      consultationType,
      consentTimestamp: new Date().toISOString(),
    });
    navigate("/record");
  };

  return (
    <div className="min-h-screen bg-secondar">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Activity className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">VoiceRx</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-success/10 px-4 py-1.5 text-sm font-medium text-success">
            <ShieldCheck className="h-4 w-4" />
            Secure & HIPAA-Aligned
          </div>
        </div>
      </header>

      <main className="container mx-auto flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-lg shadow-primary/5"
        >
          <h1 className="mb-6 text-2xl font-bold text-foreground">New Consultation</h1>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name</Label>
              <Input id="name" placeholder="Enter patient name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Patient Age</Label>
              <Input id="age" placeholder="Enter patient age" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Consultation Type</Label>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Physician">General Physician</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Specialist Referral">Specialist Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-xl bg-info p-4 text-sm text-info-foreground">
              <div className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>This consultation will be recorded solely for generating clinical documentation. Recording begins only after explicit consent.</p>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={consented}
                  onCheckedChange={(v) => setConsented(v === true)}
                  className="mt-0.5 h-5 w-5 border-2 border-primary"
                />
                <Label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground cursor-pointer">
                  I, the patient, consent to this consultation being recorded for documentation purposes only.
                </Label>
              </div>
              <AnimatePresence>
                {!consented && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 ml-8 text-xs font-medium text-destructive"
                  >
                    Please check the box above to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button
              className="w-full text-base font-semibold transition-opacity"
              size="lg"
              disabled={!canSubmit}
              onClick={handleStart}
              style={{
                opacity: canSubmit ? 1 : 0.5,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              Start Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Consent timestamp will be logged securely.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ConsentPage;
