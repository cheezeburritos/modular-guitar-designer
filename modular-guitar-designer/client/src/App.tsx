import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Customize from "@/pages/customize";
import Gallery from "@/pages/gallery";
import Orders from "@/pages/orders";
import BottomNavigation from "@/components/bottom-navigation";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/customize" component={Customize} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/orders" component={Orders} />
        <Route component={NotFound} />
      </Switch>
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
