import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Films", path: "/videos" },
  { name: "About", path: "/about" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { toasts } = useToast();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="glass-gold px-6 py-4 rounded-sm animate-in slide-in-from-bottom-5">
            {t.title && <h4 className="font-display font-bold text-primary">{t.title}</h4>}
            {t.description && <p className="text-sm text-foreground/80">{t.description}</p>}
          </div>
        ))}
      </div>

      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent",
          isScrolled ? "glass py-3 border-white/5 shadow-2xl" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo-mark.png`} 
              alt="Logo" 
              className="w-10 h-10 object-contain group-hover:rotate-90 transition-transform duration-700"
            />
            <span className="font-display text-xl tracking-[0.2em] font-bold text-gradient-gold">
              AURELIA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm uppercase tracking-widest font-medium transition-colors hover:text-primary",
                  location === link.path ? "text-primary" : "text-foreground/70"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/book" 
              className="ml-4 px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 rounded-sm font-sans uppercase tracking-widest text-xs font-bold"
            >
              Book Session
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 transition-all duration-500 flex items-center justify-center md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "font-display text-3xl tracking-widest transition-colors",
                location === link.path ? "text-primary" : "text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/book" 
            className="mt-4 text-2xl font-display text-primary border-b border-primary pb-1"
          >
            BOOK NOW
          </Link>
        </nav>
      </div>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-card mt-24 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <span className="font-display text-2xl tracking-[0.2em] font-bold text-gradient-gold block mb-6">
                AURELIA STUDIOS
              </span>
              <p className="text-foreground/60 max-w-sm font-sans leading-relaxed">
                Capturing life's most precious moments with cinematic elegance and timeless grace. Based in New York, available worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-display text-primary mb-6 text-lg tracking-wider">Contact</h4>
              <ul className="space-y-4 text-foreground/70 font-sans text-sm">
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  125 Fifth Avenue, NY 10003
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  hello@aureliastudios.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-primary mb-6 text-lg tracking-wider">Social</h4>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-foreground/40 font-sans tracking-widest">
            <p>&copy; {new Date().getFullYear()} AURELIA STUDIOS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/admin" className="hover:text-primary">ADMIN PORTAL</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:scale-110 transition-transform z-50"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  );
}
