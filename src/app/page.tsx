"use client";

import { useState, useEffect } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

const kpis = [
  { title: "Total Revenue", value: 2400000, prefix: "$", suffix: "", decimals: 0, change: "+12.5%", positive: true, icon: "💰", gradient: "from-accent to-accent-cyan" },
  { title: "Active Users", value: 18472, prefix: "", suffix: "", decimals: 0, change: "+8.2%", positive: true, icon: "👥", gradient: "from-accent-purple to-accent-pink" },
  { title: "Conversion Rate", value: 3.6, prefix: "", suffix: "%", decimals: 1, change: "-0.4%", positive: false, icon: "🎯", gradient: "from-accent-orange to-accent-yellow" },
  { title: "Avg. Order Value", value: 127, prefix: "$", suffix: "", decimals: 0, change: "+5.1%", positive: true, icon: "📦", gradient: "from-accent-green to-accent-cyan" },
];

const revenueData = [
  { month: "Sep", value: 65 }, { month: "Oct", value: 78 }, { month: "Nov", value: 52 },
  { month: "Dec", value: 91 }, { month: "Jan", value: 84 }, { month: "Feb", value: 97 },
];

const donutData = [
  { label: "Direct", value: 35, color: "var(--accent)" },
  { label: "Organic", value: 28, color: "var(--accent-green)" },
  { label: "Referral", value: 22, color: "var(--accent-purple)" },
  { label: "Social", value: 15, color: "var(--accent-orange)" },
];

const activities = [
  { user: "Sarah K.", action: "closed deal with Acme Corp", time: "2 min ago", color: "bg-accent-green" },
  { user: "Mike R.", action: "added 12 new leads", time: "15 min ago", color: "bg-accent" },
  { user: "Jessica L.", action: "launched email campaign", time: "1 hr ago", color: "bg-accent-purple" },
  { user: "Tom H.", action: "resolved 5 support tickets", time: "2 hrs ago", color: "bg-accent-yellow" },
  { user: "Anna W.", action: "updated product pricing", time: "3 hrs ago", color: "bg-accent-red" },
  { user: "David M.", action: "deployed v2.3 to production", time: "4 hrs ago", color: "bg-accent-cyan" },
];

const sparklineData = [
  [3, 5, 4, 7, 6, 8, 7, 9, 8, 11, 10, 12],
  [8, 7, 9, 6, 8, 5, 7, 6, 8, 7, 9, 8],
  [2, 3, 5, 4, 6, 8, 7, 9, 11, 10, 12, 14],
  [5, 6, 4, 7, 5, 8, 6, 9, 7, 10, 8, 11],
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

function DonutChart({ data }: { data: typeof donutData }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="animate-spin-slow" style={{ animationDuration: "20s" }}>
        {data.map((d, i) => {
          const start = cumulative;
          cumulative += d.value;
          const startAngle = (start / total) * 360 - 90;
          const endAngle = (cumulative / total) * 360 - 90;
          const largeArc = endAngle - startAngle > 180 ? 1 : 0;
          const r = hovered === i ? 78 : 72;
          const ir = 52;
          const x1 = 90 + r * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 90 + r * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 90 + r * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 90 + r * Math.sin((endAngle * Math.PI) / 180);
          const ix1 = 90 + ir * Math.cos((endAngle * Math.PI) / 180);
          const iy1 = 90 + ir * Math.sin((endAngle * Math.PI) / 180);
          const ix2 = 90 + ir * Math.cos((startAngle * Math.PI) / 180);
          const iy2 = 90 + ir * Math.sin((startAngle * Math.PI) / 180);
          const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;

          return (
            <path
              key={i}
              d={path}
              fill={d.color}
              opacity={hovered === null || hovered === i ? 1 : 0.4}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="transition-all duration-300 cursor-pointer"
              style={{ filter: hovered === i ? `drop-shadow(0 0 8px ${d.color})` : "none" }}
            />
          );
        })}
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-white">
          {hovered !== null ? `${data[hovered].value}%` : `${total}%`}
        </p>
        <p className="text-xs text-muted">
          {hovered !== null ? data[hovered].label : "Total"}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [liveVisitors, setLiveVisitors] = useState(342);
  const max = Math.max(...revenueData.map((d) => d.value));
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((v) => v + Math.floor(Math.random() * 11) - 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-1 p-8 ml-64 min-h-screen">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-muted mt-1">Welcome back! Here&apos;s what&apos;s happening at WorldBeaters.</p>
          </div>
          <div className="flex items-center gap-3 bg-card border border-card-border rounded-xl px-4 py-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-accent-green" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent-green animate-ping opacity-75" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{liveVisitors}</p>
              <p className="text-xs text-muted">visitors now</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, i) => (
          <div
            key={kpi.title}
            className="group bg-card border border-card-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 animate-fade-in-up relative overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${kpi.gradient} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`} />
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted">{kpi.title}</span>
              <span className="text-2xl group-hover:animate-float">{kpi.icon}</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-white">
                <AnimatedCounter end={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.decimals} />
              </p>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${kpi.positive ? "text-accent-green bg-accent-green/10" : "text-accent-red bg-accent-red/10"}`}>
                {kpi.change}
              </span>
            </div>
            <div className="mt-4">
              <Sparkline data={sparklineData[i]} color={kpi.positive ? "var(--accent-green)" : "var(--accent-red)"} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card border border-card-border rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Monthly Revenue</h3>
              <p className="text-sm text-muted">Last 6 months performance (in $K)</p>
            </div>
            <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
              <span>+18.2% vs prior period</span>
            </div>
          </div>
          <div className="flex items-end gap-4 h-52">
            {revenueData.map((d, i) => (
              <div
                key={d.month}
                className="flex-1 flex flex-col items-center gap-2"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <span className={`text-xs font-medium transition-colors ${hoveredBar === i ? "text-white" : "text-muted"}`}>
                  ${d.value}K
                </span>
                <div className="w-full relative cursor-pointer" style={{ height: "180px" }}>
                  <div
                    className={`bar-animate absolute bottom-0 w-full rounded-t-lg transition-all duration-300 ${
                      hoveredBar === i ? "bg-accent shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "bg-accent/70"
                    }`}
                    style={{
                      height: `${(d.value / max) * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                </div>
                <span className={`text-xs transition-colors ${hoveredBar === i ? "text-white" : "text-muted"}`}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut + Legend */}
        <div className="bg-card border border-card-border rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
          <DonutChart data={donutData} />
          <div className="mt-6 space-y-3">
            {donutData.map((d) => (
              <div key={d.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-muted">{d.label}</span>
                </div>
                <span className="text-white font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-card border border-card-border rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors animate-slide-in-left"
              style={{ animationDelay: `${0.7 + i * 0.08}s`, opacity: 0 }}
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${a.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted">{a.action}</span>
                </p>
                <p className="text-xs text-muted mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
