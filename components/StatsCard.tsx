'use client';

import { TrendingUp, Star, MessageSquare, Building } from 'lucide-react';

/**
 * Props for the StatsCard component
 */
interface StatsCardProps {
  /** Title/label for the statistic */
  title: string;
  /** The value to display (can be string or number) */
  value: string | number;
  /** Icon to display alongside the statistic */
  icon: React.ReactNode;
  /** Optional trend indicator showing percentage change */
  trend?: {
    /** Percentage value of the trend */
    value: number;
    /** Whether the trend is positive (up) or negative (down) */
    isPositive: boolean;
  };
}

/**
 * StatsCard Component
 * 
 * Displays a single statistic with an icon and optional trend indicator.
 * Used throughout the dashboard to show key metrics.
 * 
 * @param props - StatsCardProps
 * @returns JSX element representing a statistics card
 */
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

/**
 * TotalReviewsCard Component
 * 
 * Specialized stats card for displaying total number of reviews.
 * 
 * @param value - Total number of reviews
 * @param trend - Optional trend indicator
 * @returns JSX element representing total reviews card
 */
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

/**
 * AverageRatingCard Component
 * 
 * Specialized stats card for displaying average rating.
 * Formats the value to 1 decimal place.
 * 
 * @param value - Average rating value
 * @param trend - Optional trend indicator
 * @returns JSX element representing average rating card
 */
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

/**
 * PropertiesCard Component
 * 
 * Specialized stats card for displaying total number of properties.
 * 
 * @param value - Total number of properties
 * @returns JSX element representing properties card
 */
export function PropertiesCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Properties"
      value={value}
      icon={<Building className="w-6 h-6 text-primary-600" />}
    />
  );
}

