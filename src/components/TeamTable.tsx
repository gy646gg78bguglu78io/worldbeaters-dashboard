const team = [
  { name: "Sarah Kim", role: "Sales Lead", deals: 24, revenue: "$380K", status: "On Track" },
  { name: "Mike Rodriguez", role: "Marketing Mgr", deals: 18, revenue: "$295K", status: "Ahead" },
  { name: "Jessica Lee", role: "Account Exec", deals: 31, revenue: "$512K", status: "On Track" },
  { name: "Tom Huang", role: "Support Lead", deals: 15, revenue: "$180K", status: "Behind" },
  { name: "Anna Walsh", role: "Product Mgr", deals: 22, revenue: "$340K", status: "Ahead" },
];

const statusColors: Record<string, string> = {
  "On Track": "text-accent bg-accent/10",
  Ahead: "text-accent-green bg-accent-green/10",
  Behind: "text-accent-red bg-accent-red/10",
};

export default function TeamTable() {
  return (
    <div className="animate-fade-in bg-card border border-card-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Team Performance</h3>
          <p className="text-sm text-muted">Q1 2026 targets</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                Name
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                Role
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                Deals
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                Revenue
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr
                key={member.name}
                className="border-b border-card-border/50 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm font-medium text-white">{member.name}</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-muted">{member.role}</td>
                <td className="py-4 text-sm text-white font-medium">{member.deals}</td>
                <td className="py-4 text-sm text-white font-medium">{member.revenue}</td>
                <td className="py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[member.status]}`}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
