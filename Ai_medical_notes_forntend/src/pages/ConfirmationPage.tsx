import { useNavigate } from "react-router-dom";
import { CheckCircle, Download, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useConsultation } from "@/contexts/ConsultationContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { data } = useConsultation();

  const now = new Date();
  const timestamp = now.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) + " — " + now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <div className="min-h-screen bg-secondary/50">
      <Navbar />
      <main className="container mx-auto flex flex-col items-center px-4 py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-6"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/15">
            <CheckCircle className="h-14 w-14 text-success" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-foreground">Consultation Saved Successfully</h1>
          <p className="mb-8 text-muted-foreground">
            Clinical note and patient summary have been documented.
          </p>

          <div className="mb-2 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Patient: {data.patientName || "Demo Patient"}
            </span>
            <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
              Consultation ID: VRX-20240413-001
            </span>
          </div>
          <p className="mb-10 text-xs text-muted-foreground">{timestamp}</p>

          <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
            <Button size="lg" className="w-full gap-2 text-base font-semibold" onClick={() => toast.info("PDF download started!")}>
              <Download className="h-5 w-5" />
              Download Clinical Note (PDF)
            </Button>
            <Button variant="outline-success" size="lg" className="w-full gap-2 text-base font-semibold" onClick={() => toast.success("WhatsApp summary sent to patient!")}>
              <MessageSquare className="h-5 w-5" />
              Send Summary to Patient via WhatsApp
            </Button>
            <Button variant="outline-muted" size="lg" className="w-full gap-2 text-base font-semibold" onClick={() => navigate("/")}>
              <Plus className="h-5 w-5" />
              Start New Consultation
            </Button>
          </div>

          <p className="mt-10 text-xs text-muted-foreground">
            This documentation was AI-assisted and reviewed by the consulting physician.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default ConfirmationPage;
