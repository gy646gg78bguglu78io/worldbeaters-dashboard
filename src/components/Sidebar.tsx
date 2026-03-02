"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "📊", href: "/" },
  { label: "Analytics", icon: "📈", href: "/analytics" },
  { label: "Customers", icon: "👥", href: "/customers" },
  { label: "Products", icon: "📦", href: "/products" },
  { label: "Orders", icon: "🛒", href: "/orders" },
  { label: "Settings", icon: "⚙️", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-card-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-card-border">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
            W
          </div>
          <div>
            <h2 className="font-bold text-white text-lg leading-tight">WorldBeaters</h2>
            <p className="text-xs text-muted">Enterprise Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                    active
                      ? "bg-accent/15 text-accent shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"
                      : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full" />
                  )}
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  {item.label}
                  {active && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-accent animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Live Status */}
      <div className="px-6 py-3 border-t border-card-border">
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          All systems operational
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-card-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent flex items-center justify-center text-white text-sm font-bold">
            CB
          </div>
          <div>
            <p className="text-sm font-medium text-white">Chris B.</p>
            <p className="text-xs text-muted">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
