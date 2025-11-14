'use client';

import { ReviewStats } from '@/types/review';
import { Building, Star, TrendingUp } from 'lucide-react';

interface PropertyPerformanceProps {
  reviewsByListing: ReviewStats['reviewsByListing'];
}

/**
 * PropertyPerformance Component
 * 
 * Displays performance metrics for each property.
 * Helps managers quickly identify which properties are performing well
 * and which may need attention.
 * 
 * @param reviewsByListing - Object mapping property names to count and average rating
 */
export default function PropertyPerformance({ reviewsByListing }: PropertyPerformanceProps) {
  const properties = Object.entries(reviewsByListing)
    .map(([listing, data]) => ({
      listing,
      ...data,
    }))
    .sort((a, b) => b.averageRating - a.averageRating); // Sort by rating descending

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Performance</h3>
        <p className="text-gray-500 text-center py-8">No property data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Building className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Property Performance</h3>
      </div>
      <div className="space-y-3">
        {properties.map(({ listing, count, averageRating }) => {
          const getPerformanceColor = (rating: number) => {
            if (rating >= 8) return 'text-green-600';
            if (rating >= 6) return 'text-yellow-600';
            return 'text-red-600';
          };

          const getPerformanceBadge = (rating: number) => {
            if (rating >= 9) return 'bg-green-100 text-green-800';
            if (rating >= 7) return 'bg-yellow-100 text-yellow-800';
            return 'bg-red-100 text-red-800';
          };

          return (
            <div
              key={listing}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">{listing}</p>
                <p className="text-sm text-gray-500">{count} review{count !== 1 ? 's' : ''}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1 ${getPerformanceColor(averageRating)}`}>
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceBadge(
                    averageRating
                  )}`}
                >
                  {averageRating >= 9
                    ? 'Excellent'
                    : averageRating >= 7
                    ? 'Good'
                    : averageRating >= 5
                    ? 'Fair'
                    : 'Needs Improvement'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

