import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import Exercises from "@/pages/Exercises";
import Forum from "@/pages/Forum";
import Author from "@/pages/Author";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/courses" component={Courses} />
          <Route path="/exercises" component={Exercises} />
          <Route path="/forum" component={Forum} />
          <Route path="/author" component={Author} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
