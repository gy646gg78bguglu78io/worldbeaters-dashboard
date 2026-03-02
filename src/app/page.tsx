import Sidebar from "@/components/Sidebar";
import KPICard from "@/components/KPICard";
import BarChart from "@/components/BarChart";
import ActivityFeed from "@/components/ActivityFeed";
import TeamTable from "@/components/TeamTable";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-muted mt-1">Welcome back! Here&apos;s what&apos;s happening at WorldBeaters.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value="$2.4M"
            change="+12.5%"
            positive
            icon="revenue"
          />
          <KPICard
            title="Active Users"
            value="18,472"
            change="+8.2%"
            positive
            icon="users"
          />
          <KPICard
            title="Conversion Rate"
            value="3.6%"
            change="-0.4%"
            positive={false}
            icon="conversion"
          />
          <KPICard
            title="Avg. Order Value"
            value="$127"
            change="+5.1%"
            positive
            icon="order"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <BarChart />
          </div>
          <ActivityFeed />
        </div>

        {/* Team Table */}
        <TeamTable />
      </main>
    </div>
  );
}
