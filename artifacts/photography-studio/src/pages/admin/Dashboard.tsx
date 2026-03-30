import { AdminLayout } from "./Layout";
import { useGetAdminStats } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Calendar, Clock, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats();

  if (isLoading) return <AdminLayout><div className="text-white">Loading stats...</div></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Revenue" value={formatCurrency(stats?.totalRevenue || 0)} icon={<DollarSign />} color="text-green-400" />
        <StatCard title="Total Bookings" value={stats?.totalBookings || 0} icon={<Calendar />} color="text-primary" />
        <StatCard title="Pending Approvals" value={stats?.pendingBookings || 0} icon={<Clock />} color="text-amber-400" />
        <StatCard title="Unread Messages" value={stats?.unreadMessages || 0} icon={<MessageSquare />} color="text-blue-400" />
      </div>

      <div className="glass p-8 rounded-sm border-white/5">
        <h3 className="text-xl font-display text-white mb-6">Recent Activity</h3>
        <p className="text-foreground/50 text-sm">Detailed charts and activity logs would render here.</p>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-card border border-white/5 p-6 rounded-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wider">{title}</h4>
        <div className={`p-2 rounded-sm bg-white/5 ${color}`}>{icon}</div>
      </div>
      <p className="text-3xl font-display text-white">{value}</p>
    </div>
  );
}
