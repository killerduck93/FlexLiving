'use client';

import { ReviewStats } from '@/types/review';
import { Star } from 'lucide-react';

interface CategoryBreakdownProps {
  reviewsByCategory: ReviewStats['reviewsByCategory'];
}

/**
 * CategoryBreakdown Component
 * 
 * Displays a breakdown of reviews by category (cleanliness, communication, etc.)
 * Helps managers identify which aspects of their properties need improvement.
 * 
 * @param reviewsByCategory - Object mapping category names to count and average rating
 */
export default function CategoryBreakdown({ reviewsByCategory }: CategoryBreakdownProps) {
  // Safety check: ensure reviewsByCategory is an object
  if (!reviewsByCategory || typeof reviewsByCategory !== 'object') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
        <p className="text-gray-500 text-center py-8">No category data available</p>
      </div>
    );
  }

  const categories = Object.entries(reviewsByCategory)
    .map(([category, data]) => ({
      category,
      count: data?.count ?? 0,
      averageRating: typeof data?.averageRating === 'number' ? data.averageRating : 0,
    }))
    .filter(cat => cat.count > 0) // Filter out categories with no reviews
    .sort((a, b) => b.averageRating - a.averageRating); // Sort by rating descending

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
        <p className="text-gray-500 text-center py-8">No category data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
      <div className="space-y-3">
        {categories.map(({ category, count, averageRating }) => {
          const ratingPercentage = (averageRating / 10) * 100;
          const getRatingColor = (rating: number) => {
            if (rating >= 8) return 'bg-green-500';
            if (rating >= 6) return 'bg-yellow-500';
            return 'bg-red-500';
          };

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {category.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">({count} reviews)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getRatingColor(averageRating)}`}
                  style={{ width: `${ratingPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

