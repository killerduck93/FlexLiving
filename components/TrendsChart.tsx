'use client';

import { ReviewStats } from '@/types/review';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendsChartProps {
  trends: ReviewStats['recentTrends'];
}

/**
 * TrendsChart Component
 * 
 * Displays recent review trends over the last 30 days.
 * Shows review count and average rating trends to help managers
 * identify patterns and changes in guest feedback.
 * 
 * @param trends - Array of trend data points with date, count, and averageRating
 */
export default function TrendsChart({ trends }: TrendsChartProps) {
  // Safety check: ensure trends is an array
  if (!Array.isArray(trends) || trends.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trends</h3>
        <p className="text-gray-500 text-center py-8">No recent review data available</p>
      </div>
    );
  }

  // Calculate trend direction (comparing first and last data points)
  const firstRating = trends[0]?.averageRating || 0;
  const lastRating = trends[trends.length - 1]?.averageRating || 0;
  const ratingTrend = lastRating - firstRating;
  const isPositive = ratingTrend >= 0;

  // Get max count for scaling
  const maxCount = Math.max(...trends.map(t => t.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Trends (Last 30 Days)</h3>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <TrendingUp className="w-5 h-5" />
          ) : (
            <TrendingDown className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">
            {ratingTrend >= 0 ? '+' : ''}{ratingTrend.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Simple bar chart */}
      <div className="space-y-2">
        {trends.slice(-7).map((trend, idx) => {
          const barWidth = (trend.count / maxCount) * 100;
          const date = new Date(trend.date);
          const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-16 text-xs text-gray-600">{dateLabel}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    trend.averageRating >= 8
                      ? 'bg-green-500'
                      : trend.averageRating >= 6
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-gray-700">
                  <span className="font-medium">{trend.count} reviews</span>
                  <span className="font-semibold">{trend.averageRating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-500">Total Reviews</p>
          <p className="text-lg font-bold text-gray-900">
            {trends.reduce((sum, t) => sum + t.count, 0)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Avg Rating</p>
          <p className="text-lg font-bold text-gray-900">
            {trends.length > 0
              ? (trends.reduce((sum, t) => sum + t.averageRating, 0) / trends.length).toFixed(1)
              : '0.0'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Days Active</p>
          <p className="text-lg font-bold text-gray-900">{trends.length}</p>
        </div>
      </div>
    </div>
  );
}

