import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Brain, FileText, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_TRANSCRIPT =
  "Patient reports fever for 3 days, temperature 102°F, mild cough, no breathlessness. History of diabetes, currently on Metformin 500mg. Doctor recommends Paracetamol 650mg twice daily, increased fluid intake, and follow-up in 5 days if fever persists. CBC test advised.";

const steps = [
  { icon: Mic, label: "Transcribing consultation audio..." },
  { icon: Brain, label: "Generating clinical SOAP note..." },
  { icon: FileText, label: "Preparing patient summary..." },
];

const ProcessingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => { setCurrentStep(1); setShowTranscript(true); }, 2500),
      setTimeout(() => setCurrentStep(2), 4500),
      setTimeout(() => { setCurrentStep(3); setAllDone(true); }, 6500),
      setTimeout(() => navigate("/dashboard"), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  // Stream transcript characters
  useEffect(() => {
    if (!showTranscript) return;
    if (visibleChars >= MOCK_TRANSCRIPT.length) return;
    const t = setTimeout(() => setVisibleChars((v) => v + 2), 30);
    return () => clearTimeout(t);
  }, [showTranscript, visibleChars]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <motion.div
          className="space-y-6 mb-10 rounded-2xl p-6 transition-colors duration-500"
          animate={{
            backgroundColor: allDone ? "hsl(137, 100%, 97%)" : "transparent",
          }}
        >
          {steps.map((step, i) => {
            const done = currentStep > i;
            const active = currentStep === i;
            const StepIcon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-500 ${
                  done ? "bg-success/10" : active ? "bg-card shadow-md border border-border" : "bg-transparent"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                  done ? "bg-success" : active ? "bg-primary" : "bg-muted"
                }`}>
                  {done ? (
                    <Check className="h-5 w-5 text-success-foreground" />
                  ) : (
                    <StepIcon className={`h-5 w-5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  )}
                </div>
                <span className={`text-sm font-medium ${done ? "text-success" : active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
                {active && (
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <div key={d} className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${d * 0.2}s` }} />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}

          <AnimatePresence>
            {allDone && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm font-medium text-success pt-2"
              >
                All done! Loading your dashboard...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {showTranscript && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Live Transcript</p>
            <div className="max-h-40 overflow-y-auto rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-foreground">
              {MOCK_TRANSCRIPT.slice(0, visibleChars)}
              {visibleChars < MOCK_TRANSCRIPT.length && (
                <span className="inline-block h-4 w-0.5 animate-pulse bg-primary ml-0.5" />
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProcessingPage;
