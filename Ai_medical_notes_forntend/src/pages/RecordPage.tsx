import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Square, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsultation } from "@/contexts/ConsultationContext";
import { motion, AnimatePresence } from "framer-motion";

const RecordPage = () => {
  const navigate = useNavigate();
  const { data } = useConsultation();
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [recording]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleStop = () => {
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    navigate("/processing");
  };

  const waveformBars = [0, 1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-secondary/50">
      {/* Top bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex flex-wrap items-center gap-4 px-6 py-3 text-sm">
          <span className="font-semibold text-foreground">{data.patientName || "Patient"}, {data.patientAge || "—"}</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{data.consultationType}</span>
          <span className="ml-auto flex items-center gap-1.5 text-success">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-medium">Consent Logged</span>
          </span>
        </div>
      </div>

      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          {/* Record button */}
          <div className="relative mb-8">
            {recording && (
              <>
                <div className="absolute inset-0 rounded-full bg-alert/20 animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full bg-alert/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
              </>
            )}
            <button
              onClick={() => !recording && setRecording(true)}
              className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-full transition-all duration-300 ${
                recording
                  ? "bg-alert shadow-lg shadow-alert/30"
                  : "bg-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
              }`}
            >
              <Mic className="h-12 w-12 text-primary-foreground" />
            </button>
          </div>

          <p className="mb-4 text-lg font-medium text-foreground">
            {recording ? "Recording in progress..." : "Click to Start Recording"}
          </p>

          {/* Timer - always visible */}
          <p className={`mb-8 font-mono text-2xl font-bold transition-colors duration-300 ${
            recording ? "text-foreground" : "text-muted-foreground/50"
          }`}>
            {formatTime(seconds)}
          </p>

          {/* Waveform - 5 animated bars */}
          <div className="mb-8 flex h-16 items-center gap-2">
            {waveformBars.map((i) => (
              <motion.div
                key={i}
                className={`w-2 rounded-full transition-colors duration-300 ${
                  recording ? "bg-primary" : "bg-[hsl(0,0%,88%)]"
                }`}
                animate={{
                  height: recording
                    ? [12, 20 + i * 8, 12, 36 - i * 4, 12]
                    : [8, 16 + i * 4, 8, 20 - i * 2, 8],
                }}
                transition={{
                  duration: recording ? 0.6 + i * 0.1 : 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Stop button */}
          <AnimatePresence>
            {recording && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Button variant="destructive" size="lg" onClick={handleStop} className="gap-2 text-base font-semibold">
                  <Square className="h-4 w-4" />
                  Stop Recording
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-10 text-sm text-muted-foreground">
            Speak naturally. Hindi, English, or both are supported.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default RecordPage;
