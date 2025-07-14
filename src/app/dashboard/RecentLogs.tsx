'use client';
import React from 'react';

type RecentLogProps = {
  status: '✔️ Updated' | '➕ Added' | '❌ Removed';
  product: string;
  timeAgo: string;
};

const LogItem: React.FC<RecentLogProps> = ({ status, product, timeAgo }) => {
  return (
    <li className="text-sm text-gray-700 mb-5 flex justify-between items-start">
      <div className="flex items-center gap-2">
        <span>{status}</span>
        <span>{status.split('️')[1]} <strong>{product}</strong></span>
      </div>
      <span className="text-xs text-gray-400">{timeAgo}</span>
    </li>
  );
};

const RecentLogs: React.FC = () => {
  const logs: RecentLogProps[] = [
    { status: '➕ Added', product: 'Lace Wig', timeAgo: '5 mins ago' },
    { status: '✔️ Updated', product: 'Curly Bundle', timeAgo: '20 mins ago' },
    { status: '❌ Removed', product: 'Straight Wig', timeAgo: '1 hour ago' },
     { status: '➕ Added', product: 'Lace Wig', timeAgo: '5 mins ago' },
    { status: '❌ Removed', product: 'Straight Wig', timeAgo: '1 hour ago' },
    { status: '✔️ Updated', product: 'Curly Bundle', timeAgo: '20 mins ago' },
    { status: '❌ Removed', product: 'Straight Wig', timeAgo: '1 hour ago' },
    { status: '➕ Added', product: 'Lace Wig', timeAgo: '5 mins ago' },
    
   
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {logs.map((log, idx) => (
          <LogItem key={idx} {...log} />
        ))}
      </ul>
    </div>
  );
};

export default RecentLogs;