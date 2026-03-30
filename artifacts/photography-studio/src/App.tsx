import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import About from "./pages/About";
import Book from "./pages/Book";
import BookingConfirmation from "./pages/BookingConfirmation";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/Bookings";
import AdminMessages from "./pages/admin/Messages";
import AdminTestimonials from "./pages/admin/Testimonials";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-6xl font-display text-primary mb-4">404</h1>
        <p className="text-lg text-foreground/60 mb-8 font-sans">The page you're looking for fades into the shadows.</p>
        <a href="/" className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 rounded-sm font-sans uppercase tracking-widest text-xs font-bold">
          Return Home
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/videos" component={Videos} />
      <Route path="/about" component={About} />
      <Route path="/book" component={Book} />
      <Route path="/booking-confirmation/:id" component={BookingConfirmation} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/bookings" component={AdminBookings} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/testimonials" component={AdminTestimonials} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
