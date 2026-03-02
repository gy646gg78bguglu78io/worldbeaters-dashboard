"use client";

import { useState } from "react";

const allOrders = [
  { id: "WB-2026-001", customer: "Acme Corporation", items: 5, total: 1247, status: "delivered", date: "2026-02-28", tracking: "1Z999AA10123456784" },
  { id: "WB-2026-002", customer: "Stark Industries", items: 12, total: 4589, status: "shipped", date: "2026-02-27", tracking: "1Z999AA10123456785" },
  { id: "WB-2026-003", customer: "Weyland Corp", items: 3, total: 897, status: "processing", date: "2026-03-01", tracking: null },
  { id: "WB-2026-004", customer: "Globex Industries", items: 8, total: 2341, status: "shipped", date: "2026-02-26", tracking: "1Z999AA10123456786" },
  { id: "WB-2026-005", customer: "Umbrella Corp", items: 1, total: 449, status: "delivered", date: "2026-02-25", tracking: "1Z999AA10123456787" },
  { id: "WB-2026-006", customer: "LexCorp", items: 6, total: 1834, status: "processing", date: "2026-03-02", tracking: null },
  { id: "WB-2026-007", customer: "Oscorp Labs", items: 2, total: 658, status: "pending", date: "2026-03-02", tracking: null },
  { id: "WB-2026-008", customer: "Initech Solutions", items: 4, total: 1123, status: "cancelled", date: "2026-02-24", tracking: null },
  { id: "WB-2026-009", customer: "Wayne Enterprises", items: 15, total: 6780, status: "delivered", date: "2026-02-22", tracking: "1Z999AA10123456788" },
  { id: "WB-2026-010", customer: "Cyberdyne Systems", items: 7, total: 2100, status: "shipped", date: "2026-02-25", tracking: "1Z999AA10123456789" },
];

const statuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusConfig: Record<string, { color: string; bg: string; icon: string; step: number }> = {
  pending: { color: "text-accent-yellow", bg: "bg-accent-yellow/10", icon: "⏳", step: 0 },
  processing: { color: "text-accent", bg: "bg-accent/10", icon: "⚙️", step: 1 },
  shipped: { color: "text-accent-purple", bg: "bg-accent-purple/10", icon: "🚚", step: 2 },
  delivered: { color: "text-accent-green", bg: "bg-accent-green/10", icon: "✅", step: 3 },
  cancelled: { color: "text-accent-red", bg: "bg-accent-red/10", icon: "❌", step: -1 },
};

const pipelineSteps = ["Pending", "Processing", "Shipped", "Delivered"];

function OrderTimeline({ status }: { status: string }) {
  const currentStep = statusConfig[status]?.step ?? -1;
  if (currentStep === -1) return <p className="text-sm text-accent-red">Order cancelled</p>;

  return (
    <div className="flex items-center gap-0 w-full">
      {pipelineSteps.map((step, i) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
              i <= currentStep
                ? "bg-accent-green text-white shadow-lg shadow-accent-green/30"
                : "bg-card-border text-muted"
            }`}>
              {i < currentStep ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] ${i <= currentStep ? "text-white" : "text-muted"}`}>{step}</span>
          </div>
          {i < pipelineSteps.length - 1 && (
            <div className="flex-1 h-0.5 mx-1 mb-4">
              <div className={`h-full rounded-full transition-all duration-700 ${
                i < currentStep ? "bg-accent-green" : "bg-card-border"
              }`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = allOrders.filter((o) =>
    filter === "All" || o.status === filter.toLowerCase()
  );

  const pipelineCounts = {
    pending: allOrders.filter((o) => o.status === "pending").length,
    processing: allOrders.filter((o) => o.status === "processing").length,
    shipped: allOrders.filter((o) => o.status === "shipped").length,
    delivered: allOrders.filter((o) => o.status === "delivered").length,
  };

  return (
    <main className="flex-1 p-8 ml-64 min-h-screen">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-muted mt-1">Track and manage all customer orders.</p>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(pipelineCounts).map(([status, count], i) => {
          const config = statusConfig[status];
          return (
            <div
              key={status}
              className={`bg-card border border-card-border rounded-xl p-5 hover:border-accent/30 transition-all cursor-pointer animate-fade-in-up ${filter === status.charAt(0).toUpperCase() + status.slice(1) ? "ring-2 ring-accent" : ""}`}
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
              onClick={() => setFilter(filter === status.charAt(0).toUpperCase() + status.slice(1) ? "All" : status.charAt(0).toUpperCase() + status.slice(1))}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{config.icon}</span>
                <span className={`text-2xl font-bold ${config.color}`}>{count}</span>
              </div>
              <p className="text-sm text-muted capitalize">{status}</p>
            </div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-card border border-card-border rounded-lg p-1 mb-6 w-fit animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
              filter === s ? "bg-accent text-white" : "text-muted hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filtered.map((order, i) => {
          const config = statusConfig[order.status];
          const isExpanded = expandedId === order.id;

          return (
            <div
              key={order.id}
              className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 animate-fade-in-up ${
                isExpanded ? "border-accent/30 shadow-lg shadow-accent/5" : "border-card-border hover:border-accent/20"
              }`}
              style={{ animationDelay: `${0.5 + i * 0.05}s`, opacity: 0 }}
            >
              <div
                className="p-5 flex items-center gap-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <span className="text-2xl">{config.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white font-mono">{order.id}</span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${config.color} ${config.bg}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-0.5">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">${order.total.toLocaleString()}</p>
                  <p className="text-xs text-muted">{order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">{order.date}</p>
                </div>
                <svg
                  className={`w-5 h-5 text-muted transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-card-border animate-fade-in">
                  <div className="mb-4">
                    <p className="text-xs text-muted mb-3">Order Progress</p>
                    <OrderTimeline status={order.status} />
                  </div>
                  {order.tracking && (
                    <div className="mt-4 p-3 bg-background rounded-lg">
                      <p className="text-xs text-muted">Tracking Number</p>
                      <p className="text-sm text-accent font-mono">{order.tracking}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted mt-6">{filtered.length} orders shown. Click to expand.</p>
    </main>
  );
}
