"use client"
import { Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import React, { ReactNode } from 'react';

type StatsCardProps = {
    label: string;
    value: string;
    icon: ReactNode;
    gradient: string;
    iconBg: string;
    description: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
};

const Stats = () => {
    const StatsCard = ({ 
        label, 
        value, 
        icon, 
        gradient, 
        iconBg, 
        description, 
        trend = 'neutral',
        trendValue 
    }: StatsCardProps) => {
        const getTrendColor = () => {
            switch (trend) {
                case 'up': return 'text-green-600';
                case 'down': return 'text-red-600';
                default: return 'text-gray-600';
            }
        };

        const getTrendIcon = () => {
            switch (trend) {
                case 'up': return <TrendingUp className="w-3 h-3" />;
                case 'down': return <TrendingUp className="w-3 h-3 rotate-180" />;
                default: return null;
            }
        };

        return (
            <div className={`${gradient} p-6 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 group`}>
                <div className='flex items-center justify-between mb-4'>
                    <div className={`${iconBg} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                    </div>
                    {trendValue && (
                        <div className={`flex items-center gap-1 ${getTrendColor()} text-sm font-medium`}>
                            {getTrendIcon()}
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                
                <div className="space-y-1">
                    <h3 className='font-semibold text-lg text-gray-800'>{label}</h3>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
            </div>
        );
    };

    return (
        <div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6'>
            <StatsCard
                icon={<Package className="w-6 h-6 text-blue-600" />}
                label="Items in Stock"
                iconBg="bg-blue-100"
                value="1,247"
                gradient="bg-gradient-to-br from-blue-50 to-blue-100"
                description="Active inventory across all warehouses"
                trend="up"
                trendValue="+12%"
            />
            
            <StatsCard
                icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
                label="Low Stock Alert"
                iconBg="bg-amber-100"
                value="23"
                gradient="bg-gradient-to-br from-amber-50 to-amber-100"
                description="Items requiring immediate restocking"
                trend="down"
                trendValue="-5%"
            />
            
            <StatsCard
                icon={<DollarSign className="w-6 h-6 text-green-600" />}
                label="Total Revenue"
                iconBg="bg-green-100"
                value="$24,560"
                gradient="bg-gradient-to-br from-green-50 to-green-100"
                description="Monthly sales performance"
                trend="up"
                trendValue="+18%"
            />
            
            <StatsCard
                icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
                label="Growth Rate"
                iconBg="bg-purple-100"
                value="8.2%"
                gradient="bg-gradient-to-br from-purple-50 to-purple-100"
                description="Year-over-year business growth"
                trend="up"
                trendValue="+2.1%"
            />
        </div>
        </div>
    );
};

export default Stats;