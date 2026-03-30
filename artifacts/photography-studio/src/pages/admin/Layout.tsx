import React from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Calendar, MessageSquare, Star, LogOut } from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const nav = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare },
    { name: "Testimonials", path: "/admin/testimonials", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-white/5">
          <span className="font-display text-xl tracking-[0.2em] font-bold text-gradient-gold">
            AURELIA
          </span>
          <span className="block text-xs text-foreground/50 uppercase tracking-widest mt-1">Admin Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${
                  active ? "bg-primary text-black" : "text-foreground/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-sm text-foreground/50 hover:text-white transition-colors text-sm">
            <LogOut size={18} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
