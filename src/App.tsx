import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
