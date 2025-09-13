"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;
const COLORS = [
  "#0088FE", // blue
  "#00C49F", // green
  "#FFBB28", // yellow
  "#FF8042", // orange
  "#A020F0", // purple
  "#FF69B4", // pink
  "#ef4444", // red
  "#065f46", // dark green
  "#6b7280", // gray
  "#f43f5e", // rose
  "#8b4513", // brown
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={12}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CategoryPieChart() {
  const items = useSelector((state: RootState) => state.product.items);

  const categoryCounts: Record<string, number> = {};
  items.forEach((item) => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
  });

  const data = Object.keys(categoryCounts).map((category) => ({
    name: category,
    value: categoryCounts[category],
  }));

  if (data.length === 0) {
    return <p className="text-center text-gray-500">No data to display</p>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg mb-7 p-6  m-6">
      <h1 className="text-2xl font-bold text-gray-900">Inventory Chart by Category</h1>
      <p className="text-gray-600 mt-1">Track how your inventory is spread across categories.</p>

      <div style={{ width: "100%", height: 440 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-4 h-4 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            {entry.name} ({entry.value})
          </div>
        ))}
      </div>
    </div>
  );
}