"use client"
import { Package, TrendingUp, AlertTriangle, CircleAlert, DollarSign } from 'lucide-react';
import React, { ReactNode , useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store"; 
import { fetchInventoryStats } from '../redux/slices/inventorySlice';
import { formatCurrency } from "../utils/formatCurrency"

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
     const { currency } = useSelector((s: RootState) => s.settings.preferences);
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

    const dispatch = useDispatch<AppDispatch>();
    const stats = useSelector((s: RootState) => s.product.stats);

    useEffect(() => {
        dispatch(fetchInventoryStats());
    }, [dispatch]);

    // Format currency value
    // const formatCurrency = (value: number) => {
    //     return new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: 'USD',
    //         minimumFractionDigits: 0,
    //         maximumFractionDigits: 0,
    //     }).format(value);
    // };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6'>

                <StatsCard
                    icon={<Package className="w-6 h-6 text-blue-600" />}
                    label="Items in Stock"
                    iconBg="bg-blue-100"
                    value={stats?.totalItems.toString() ?? "0"}
                    gradient="bg-gradient-to-br from-blue-50 to-blue-100"
                    description="Active inventory across all warehouses"
                />

                <StatsCard
                    icon={<DollarSign className="w-6 h-6 text-green-600" />}
                    label="Total Inventory Value"
                    iconBg="bg-green-100"
                    value={formatCurrency(stats?.totalInventoryValue ?? 0, currency)}
                    gradient="bg-gradient-to-br from-green-50 to-green-100"
                    description="Current worth of all stock items"
                    trend="up"
                    trendValue="+5.2%"
                />

                <StatsCard
                    icon={<AlertTriangle className="w-6 h-6 text-amber-600" />}
                    label="Low Stock Alert"
                    iconBg="bg-amber-100"
                    value={stats?.lowStock.toString() ?? "0"}
                    gradient="bg-gradient-to-br from-amber-50 to-amber-100"
                    description="Items requiring immediate restocking"
                />

                <StatsCard
                    icon={<CircleAlert className="w-6 h-6 text-red-600" />}
                    label="Out of Stock"
                    iconBg="bg-red-100"
                    value={`${stats?.outOfStock.toLocaleString() ?? "0"}`}
                    gradient="bg-gradient-to-br from-red-100 to-red-200"
                    description="Items currently unavailable"
                />
                
            </div>
        </div>
    );
};

export default Stats;