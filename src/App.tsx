import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Changelog from "./pages/Changelog";
import Applications from "./pages/Applications";
import SDK from "./pages/SDK";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/sdk" element={<SDK />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:characterId" element={<GuideDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
