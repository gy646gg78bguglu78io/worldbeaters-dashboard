export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: "📊", active: true },
    { label: "Analytics", icon: "📈", active: false },
    { label: "Customers", icon: "👥", active: false },
    { label: "Products", icon: "📦", active: false },
    { label: "Orders", icon: "🛒", active: false },
    { label: "Settings", icon: "⚙️", active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-card-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-lg">
            W
          </div>
          <div>
            <h2 className="font-bold text-white text-lg leading-tight">WorldBeaters</h2>
            <p className="text-xs text-muted">Enterprise Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-card-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-accent-purple flex items-center justify-center text-white text-sm font-bold">
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
