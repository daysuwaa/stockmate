"use client";
import { DollarSign, Calendar, Package, AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";

export default function RevenueSnapshot() {
  const stats = useSelector((s: RootState) => s.product.stats);

  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Revenue Snapshot</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
          label="Today's Revenue"
          value={`$${(stats?.todayRevenue || 0).toLocaleString()}`}
        />
        <StatCard
          icon={<Calendar className="w-6 h-6 text-blue-500" />}
          label="This Week"
          value={`$${(stats?.weeklyRevenue || 0).toLocaleString()}`}
        />
        <StatCard
          icon={<Package className="w-6 h-6 text-purple-500" />}
          label="Inventory Value"
          value={`$${(stats?.totalValue || 0).toLocaleString()}`}
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          label="Low Stock"
          value={stats?.lowStock || 0}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-4 p-8 border rounded-lg bg-gray-50">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}