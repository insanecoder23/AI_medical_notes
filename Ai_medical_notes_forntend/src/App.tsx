import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConsultationProvider } from "@/contexts/ConsultationContext";

import ConsentPage from "./pages/ConsentPage";
import RecordPage from "./pages/RecordPage";
import ProcessingPage from "./pages/ProcessingPage";
import DashboardPage from "./pages/DashboardPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { motion } from "framer-motion";

import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef } from "react";

import "locomotive-scroll/dist/locomotive-scroll.css";

const queryClient = new QueryClient();

const App = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  return (

          <QueryClientProvider client={queryClient}>

      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ConsultationProvider>
          <BrowserRouter>
           <div className="relative min-h-screen bg-black overflow-hidden  ">
            
                  <div className="absolute inset-0">
                    
                    <motion.div
                      animate={{
                        x: ["0vw", "10vw", "20vw", "40vw", "50vw", "65vw", "-7vw", "0vw"],
                        y: [
                          "0vh",
                          "15vh",
                          "30vh",
                          "45vh",
                          "55vh",
                          "60vh",
                          "-10vh",
                          "0vh",
                        ],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-60 h-60 bg-[#251728] rounded-full blur-3xl left-20 top-20"
                    />
                    
                    <motion.div
                      className="absolute w-52 h-40 bg-blue-900 rounded-full blur-3xl right-20 bottom-20"
                      animate={{
                        x: ["0vw", "-20vw", "-20vw", "-35vw", "-32vw", "20vw", "0vw"],
                        y: ["0vh", "-30vh", "-47vh", "-56vh", "-65vh", "10vh", "0vh"],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    
                  </div>
                
           <div ref={scrollRef} data-scroll-container   className="relative z-10 min-h-screen"  >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Consentpage" element={<ConsentPage />} />
                <Route path="/record" element={<RecordPage />} />
                <Route path="/processing" element={<ProcessingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>  
            </div>
          </BrowserRouter>
        </ConsultationProvider>
      </TooltipProvider>
    </QueryClientProvider>
            
  );
};

export default App;

