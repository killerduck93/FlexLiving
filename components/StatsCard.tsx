'use client';

import { TrendingUp, Star, MessageSquare, Building } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="p-3 bg-primary-100 rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${!trend.isPositive ? 'rotate-180' : ''}`} />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}

export function TotalReviewsCard({ value, trend }: { value: number; trend?: { value: number; isPositive: boolean } }) {
  return (
    <StatsCard
      title="Total Reviews"
      value={value}
      icon={<MessageSquare className="w-6 h-6 text-primary-600" />}
      trend={trend}
    />
  );
}

export function AverageRatingCard({ value, trend }: { value: number; trend?: { value: number; isPositive: boolean } }) {
  return (
    <StatsCard
      title="Average Rating"
      value={value.toFixed(1)}
      icon={<Star className="w-6 h-6 text-primary-600" />}
      trend={trend}
    />
  );
}

export function PropertiesCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Properties"
      value={value}
      icon={<Building className="w-6 h-6 text-primary-600" />}
    />
  );
}

