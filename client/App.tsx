import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import EnvironmentRequest from "./pages/EnvironmentRequest"
import Anastasia from "./pages/Anastasia";
import Umair from "./pages/Umair";
import Rachel from "./pages/Rachel";
import NotFound from "./pages/NotFound";
import { QueryCreator } from "./pages/QueryCreator";

const queryClient = new QueryClient();

const rawBase = import.meta.env.BASE_URL;
const basename = rawBase === "/" ? "/" : rawBase.replace(/\/$/, "");

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/environment-request" element={<EnvironmentRequest />} />
          <Route path="/anastasia" element={<Anastasia/>} />
          <Route path="/umair" element={<Umair/>} />
          <Route path="/rachel" element={<Rachel/>}/>
          <Route path="/query-creator" element={<QueryCreator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
