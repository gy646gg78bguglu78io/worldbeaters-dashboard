"use client";

import { useState } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

const periods = ["7 Days", "30 Days", "90 Days", "12 Months"];

const lineData = {
  "7 Days": [42, 38, 55, 47, 62, 58, 71],
  "30 Days": [30, 35, 28, 42, 38, 55, 47, 62, 58, 71, 65, 78, 72, 85, 80, 92, 88, 95, 90, 98, 93, 88, 82, 90, 95, 102, 98, 105, 100, 110],
  "90 Days": [20, 25, 30, 35, 28, 32, 38, 42, 36, 40, 45, 50, 42, 48, 55, 60, 52, 58, 65, 70, 62, 68, 75, 80, 72, 78, 85, 90, 82, 88],
  "12 Months": [45, 52, 48, 61, 55, 70, 65, 78, 72, 85, 80, 97],
};

const topPages = [
  { page: "/products/wireless-headphones", views: 12453, conversion: 4.2, trend: "up" },
  { page: "/products/smart-watch-pro", views: 9871, conversion: 3.8, trend: "up" },
  { page: "/blog/tech-trends-2026", views: 8234, conversion: 1.2, trend: "down" },
  { page: "/products/laptop-stand", views: 7102, conversion: 5.1, trend: "up" },
  { page: "/pricing", views: 6890, conversion: 6.7, trend: "up" },
  { page: "/about", views: 5432, conversion: 0.8, trend: "down" },
];

const channelData = [
  { channel: "Organic Search", sessions: 45200, rate: 3.2, revenue: 128000, color: "bg-accent" },
  { channel: "Direct", sessions: 32100, rate: 4.1, revenue: 98000, color: "bg-accent-green" },
  { channel: "Social Media", sessions: 28400, rate: 2.8, revenue: 76000, color: "bg-accent-purple" },
  { channel: "Email", sessions: 18900, rate: 5.6, revenue: 89000, color: "bg-accent-orange" },
  { channel: "Referral", sessions: 12300, rate: 3.9, revenue: 52000, color: "bg-accent-cyan" },
  { channel: "Paid Search", sessions: 9800, rate: 4.5, revenue: 67000, color: "bg-accent-pink" },
];

const heatmapData: number[][] = [];
for (let week = 0; week < 12; week++) {
  const row: number[] = [];
  for (let day = 0; day < 7; day++) {
    row.push(Math.floor(Math.random() * 100));
  }
  heatmapData.push(row);
}
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function LineChart({ data }: { data: number[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 700;
  const h = 200;
  const padding = 20;

  const points = data.map((v, i) => ({
    x: padding + (i / (data.length - 1)) * (w - padding * 2),
    y: padding + (1 - (v - min) / range) * (h - padding * 2),
    value: v,
  }));

  const pathD = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  const areaD = pathD + ` L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${w} ${h + 20}`}
      className="overflow-visible"
      onMouseLeave={() => setHoverIdx(null)}
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent-cyan)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
        <line
          key={pct}
          x1={padding}
          x2={w - padding}
          y1={padding + pct * (h - padding * 2)}
          y2={padding + pct * (h - padding * 2)}
          stroke="var(--card-border)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}
      {/* Area */}
      <path d={areaD} fill="url(#lineGrad)" className="transition-all duration-500" />
      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#strokeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        className="transition-all duration-500"
        style={{ animation: "dash 2s ease forwards" }}
      />
      {/* Hover zones */}
      {points.map((p, i) => (
        <g key={i} onMouseEnter={() => setHoverIdx(i)}>
          <rect x={p.x - 15} y={0} width={30} height={h} fill="transparent" className="cursor-pointer" />
          {hoverIdx === i && (
            <>
              <line x1={p.x} y1={padding} x2={p.x} y2={h - padding} stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <circle cx={p.x} cy={p.y} r="6" fill="var(--accent)" opacity="0.2" />
              <circle cx={p.x} cy={p.y} r="4" fill="var(--accent)" />
              <rect x={p.x - 28} y={p.y - 30} width="56" height="22" rx="6" fill="var(--card)" stroke="var(--accent)" strokeWidth="1" />
              <text x={p.x} y={p.y - 15} textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">${p.value}K</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30 Days");
  const maxSessions = Math.max(...channelData.map((c) => c.sessions));

  return (
    <main className="flex-1 p-8 ml-64 min-h-screen">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-muted mt-1">Deep dive into your performance metrics.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Page Views", value: 284102, prefix: "", icon: "👁️" },
          { label: "Unique Visitors", value: 42890, prefix: "", icon: "🧑" },
          { label: "Bounce Rate", value: 32.4, prefix: "", suffix: "%", decimals: 1, icon: "↩️" },
          { label: "Session Duration", value: 4.2, prefix: "", suffix: "m", decimals: 1, icon: "⏱️" },
        ].map((s, i) => (
          <div key={s.label} className="bg-card border border-card-border rounded-xl p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">{s.label}</span>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-white">
              <AnimatedCounter end={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} decimals={s.decimals || 0} />
            </p>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-card border border-card-border rounded-xl p-6 mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
          <div className="flex gap-1 bg-background rounded-lg p-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  period === p ? "bg-accent text-white shadow-md" : "text-muted hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <LineChart data={lineData[period as keyof typeof lineData]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Channel Breakdown */}
        <div className="bg-card border border-card-border rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <h3 className="text-lg font-semibold text-white mb-6">Channel Performance</h3>
          <div className="space-y-4">
            {channelData.map((c) => (
              <div key={c.channel} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-white font-medium">{c.channel}</span>
                  <span className="text-sm text-muted">{(c.sessions / 1000).toFixed(1)}K sessions</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${c.color} transition-all duration-1000 group-hover:shadow-lg`}
                    style={{ width: `${(c.sessions / maxSessions) * 100}%`, animation: "growRight 1.5s ease-out forwards", ["--target-width" as string]: `${(c.sessions / maxSessions) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-card border border-card-border rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
          <h3 className="text-lg font-semibold text-white mb-4">Activity Heatmap</h3>
          <p className="text-sm text-muted mb-4">User activity over the last 12 weeks</p>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 mr-2 mt-0">
              {days.map((d) => (
                <div key={d} className="text-[10px] text-muted h-4 flex items-center">{d}</div>
              ))}
            </div>
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((val, di) => (
                  <div
                    key={di}
                    className="w-4 h-4 rounded-sm cursor-pointer transition-all hover:scale-125 hover:ring-1 hover:ring-white/30"
                    style={{
                      backgroundColor:
                        val < 20 ? "rgba(59,130,246,0.1)" :
                        val < 40 ? "rgba(59,130,246,0.25)" :
                        val < 60 ? "rgba(59,130,246,0.45)" :
                        val < 80 ? "rgba(59,130,246,0.65)" :
                        "rgba(59,130,246,0.9)",
                    }}
                    title={`${days[di]}, Week ${wi + 1}: ${val} events`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-card border border-card-border rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
        <h3 className="text-lg font-semibold text-white mb-6">Top Pages</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Page</th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Views</th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Conversion</th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((p) => (
              <tr key={p.page} className="border-b border-card-border/50 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 text-sm text-accent font-mono">{p.page}</td>
                <td className="py-3 text-sm text-white font-medium">{p.views.toLocaleString()}</td>
                <td className="py-3 text-sm text-white">{p.conversion}%</td>
                <td className="py-3">
                  <span className={`text-sm ${p.trend === "up" ? "text-accent-green" : "text-accent-red"}`}>
                    {p.trend === "up" ? "↑" : "↓"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
