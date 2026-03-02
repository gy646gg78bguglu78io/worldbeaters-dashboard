"use client";

import { useState } from "react";

const allCustomers = [
  { id: 1, name: "Acme Corporation", contact: "John Smith", email: "john@acme.com", spent: 142000, orders: 47, status: "active", avatar: "AC", joined: "Jan 2024", industry: "Technology" },
  { id: 2, name: "Globex Industries", contact: "Sarah Connor", email: "sarah@globex.com", spent: 98500, orders: 32, status: "active", avatar: "GI", joined: "Mar 2024", industry: "Manufacturing" },
  { id: 3, name: "Initech Solutions", contact: "Peter Gibbons", email: "peter@initech.com", spent: 76200, orders: 28, status: "active", avatar: "IS", joined: "Feb 2024", industry: "Consulting" },
  { id: 4, name: "Umbrella Corp", contact: "Alice Wong", email: "alice@umbrella.com", spent: 215000, orders: 63, status: "active", avatar: "UC", joined: "Nov 2023", industry: "Biotech" },
  { id: 5, name: "Stark Industries", contact: "Tony Richards", email: "tony@stark.com", spent: 320000, orders: 89, status: "active", avatar: "SI", joined: "Sep 2023", industry: "Technology" },
  { id: 6, name: "Wayne Enterprises", contact: "Bruce Wayne", email: "bruce@wayne.com", spent: 187000, orders: 55, status: "inactive", avatar: "WE", joined: "Dec 2023", industry: "Finance" },
  { id: 7, name: "Oscorp Labs", contact: "Norman Price", email: "norman@oscorp.com", spent: 45000, orders: 12, status: "new", avatar: "OL", joined: "Jan 2026", industry: "Research" },
  { id: 8, name: "LexCorp", contact: "Lex Lawson", email: "lex@lexcorp.com", spent: 89000, orders: 23, status: "active", avatar: "LC", joined: "Jul 2024", industry: "Energy" },
  { id: 9, name: "Cyberdyne Systems", contact: "Miles Dyson", email: "miles@cyberdyne.com", spent: 56000, orders: 18, status: "inactive", avatar: "CS", joined: "May 2024", industry: "AI & Robotics" },
  { id: 10, name: "Weyland Corp", contact: "Peter Weyland", email: "peter@weyland.com", spent: 430000, orders: 112, status: "active", avatar: "WC", joined: "Jun 2023", industry: "Aerospace" },
];

const filters = ["All", "Active", "Inactive", "New"];
const avatarColors = ["bg-accent", "bg-accent-purple", "bg-accent-green", "bg-accent-orange", "bg-accent-cyan", "bg-accent-pink"];
const statusStyles: Record<string, string> = {
  active: "text-accent-green bg-accent-green/10",
  inactive: "text-muted bg-white/5",
  new: "text-accent-cyan bg-accent-cyan/10",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "spent" | "orders">("spent");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = allCustomers
    .filter((c) => {
      if (filter !== "All" && c.status !== filter.toLowerCase()) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.contact.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const mult = sortDir === "desc" ? -1 : 1;
      if (sortBy === "name") return mult * a.name.localeCompare(b.name);
      return mult * ((a[sortBy] as number) - (b[sortBy] as number));
    });

  const handleSort = (col: "name" | "spent" | "orders") => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  return (
    <main className="flex-1 p-8 ml-64 min-h-screen">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <p className="text-muted mt-1">Manage your customer relationships.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Customers", value: allCustomers.length, icon: "👥" },
          { label: "Active", value: allCustomers.filter((c) => c.status === "active").length, icon: "✅" },
          { label: "Total Revenue", value: `$${(allCustomers.reduce((s, c) => s + c.spent, 0) / 1000).toFixed(0)}K`, icon: "💰" },
        ].map((s, i) => (
          <div key={s.label} className="bg-card border border-card-border rounded-xl p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">{s.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
              </div>
              <span className="text-3xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-card border border-card-border rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" strokeLinecap="round" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-card-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
          <div className="flex gap-1 bg-background rounded-lg p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                  filter === f ? "bg-accent text-white shadow-md" : "text-muted hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border">
                {[
                  { key: "name" as const, label: "Company" },
                  { key: "name" as const, label: "Contact" },
                  { key: "spent" as const, label: "Total Spent" },
                  { key: "orders" as const, label: "Orders" },
                ].map((col) => (
                  <th
                    key={col.label}
                    className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label} {sortBy === col.key && (sortDir === "desc" ? "↓" : "↑")}
                  </th>
                ))}
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <>
                  <tr
                    key={c.id}
                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                    className={`border-b border-card-border/50 cursor-pointer transition-all duration-200 ${
                      expandedId === c.id ? "bg-accent/5" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}>
                          {c.avatar}
                        </div>
                        <span className="text-sm font-medium text-white">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted">{c.contact}</td>
                    <td className="py-4 text-sm text-white font-medium">${(c.spent / 1000).toFixed(0)}K</td>
                    <td className="py-4 text-sm text-white">{c.orders}</td>
                    <td className="py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                  {expandedId === c.id && (
                    <tr key={`${c.id}-detail`} className="bg-accent/5">
                      <td colSpan={5} className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
                          <div>
                            <p className="text-xs text-muted mb-1">Email</p>
                            <p className="text-sm text-accent">{c.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Industry</p>
                            <p className="text-sm text-white">{c.industry}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Customer Since</p>
                            <p className="text-sm text-white">{c.joined}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted mb-1">Avg. Order Value</p>
                            <p className="text-sm text-white">${Math.round(c.spent / c.orders).toLocaleString()}</p>
                          </div>
                          <div className="col-span-2 md:col-span-4">
                            <p className="text-xs text-muted mb-2">Spending Progress (vs. $500K target)</p>
                            <div className="h-2 bg-background rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan transition-all duration-1000"
                                style={{ width: `${Math.min((c.spent / 500000) * 100, 100)}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted mt-1">{((c.spent / 500000) * 100).toFixed(1)}% of target</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-4">{filtered.length} of {allCustomers.length} customers shown. Click a row to expand.</p>
      </div>
    </main>
  );
}
