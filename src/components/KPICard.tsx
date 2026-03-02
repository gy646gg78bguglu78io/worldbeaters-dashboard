interface KPICardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

const icons: Record<string, string> = {
  revenue: "💰",
  users: "👥",
  conversion: "🎯",
  order: "📦",
};

export default function KPICard({ title, value, change, positive, icon }: KPICardProps) {
  return (
    <div className="animate-fade-in bg-card border border-card-border rounded-xl p-6 hover:border-accent/30 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted">{title}</span>
        <span className="text-2xl">{icons[icon]}</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-white">{value}</p>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            positive
              ? "text-accent-green bg-accent-green/10"
              : "text-accent-red bg-accent-red/10"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
