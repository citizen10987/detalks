
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Professional from "@/pages/Professional";
import Stats from "@/pages/Stats";
import Leaderboard from "@/pages/Leaderboard";
import Journal from "@/pages/Journal";
import Mood from "@/pages/Mood";
import Profile from "@/pages/Profile";
import NotFound from "./pages/NotFound";
import CalmingRoom from "@/pages/CalmingRoom";
import Breathing from "@/pages/Breathing";
import Habits from "@/pages/Habits";
import Therapists from "@/pages/Therapists";
import Appointment from "@/pages/Appointment";
import SecureChat from "@/pages/SecureChat";
import AiChat from "@/pages/AiChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calming-room" element={<CalmingRoom />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/secure-chat" element={<SecureChat />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
