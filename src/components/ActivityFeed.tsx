const activities = [
  {
    user: "Sarah K.",
    action: "closed deal with Acme Corp",
    time: "2 min ago",
    color: "bg-accent-green",
  },
  {
    user: "Mike R.",
    action: "added 12 new leads",
    time: "15 min ago",
    color: "bg-accent",
  },
  {
    user: "Jessica L.",
    action: "launched email campaign",
    time: "1 hr ago",
    color: "bg-accent-purple",
  },
  {
    user: "Tom H.",
    action: "resolved 5 support tickets",
    time: "2 hrs ago",
    color: "bg-accent-yellow",
  },
  {
    user: "Anna W.",
    action: "updated product pricing",
    time: "3 hrs ago",
    color: "bg-accent-red",
  },
];

export default function ActivityFeed() {
  return (
    <div className="animate-fade-in bg-card border border-card-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
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
  );
}
