import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);

export default function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}
