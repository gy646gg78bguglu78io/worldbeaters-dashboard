const data = [
  { month: "Sep", value: 65 },
  { month: "Oct", value: 78 },
  { month: "Nov", value: 52 },
  { month: "Dec", value: 91 },
  { month: "Jan", value: 84 },
  { month: "Feb", value: 97 },
];

export default function BarChart() {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="animate-fade-in bg-card border border-card-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Monthly Revenue</h3>
          <p className="text-sm text-muted">Last 6 months performance (in $K)</p>
        </div>
        <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
          <span>+18.2% vs prior period</span>
        </div>
      </div>
      <div className="flex items-end gap-4 h-48">
        {data.map((d, i) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-xs text-muted font-medium">${d.value}K</span>
            <div className="w-full relative" style={{ height: "160px" }}>
              <div
                className="bar-animate absolute bottom-0 w-full rounded-t-lg bg-accent hover:bg-accent/80 transition-colors"
                style={{
                  height: `${(d.value / max) * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
            <span className="text-xs text-muted">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
