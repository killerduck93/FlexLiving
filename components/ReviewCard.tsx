'use client';

import { NormalizedReview } from '@/types/review';
import { Star, Calendar, User, Building, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Props for the ReviewCard component
 */
interface ReviewCardProps {
  /** The review data to display */
  review: NormalizedReview;
  /** Callback function when display toggle is clicked */
  onToggleDisplay?: (reviewId: number, displayOnWebsite: boolean) => void;
  /** Whether to show the display toggle button */
  showDisplayToggle?: boolean;
}

/**
 * ReviewCard Component
 * 
 * Displays a single review with all relevant information including:
 * - Guest name and review date
 * - Property name and channel
 * - Star rating and overall rating
 * - Review text
 * - Category ratings
 * - Display toggle button (if enabled)
 * 
 * @param props - ReviewCardProps
 * @returns JSX element representing a review card
 */
export default function ReviewCard({ review, onToggleDisplay, showDisplayToggle = false }: ReviewCardProps) {
  // Use overall rating if available, otherwise use calculated average from categories
  const rating = review.rating || review.averageCategoryRating;
  // Calculate number of filled stars (1-5 scale, rating is 1-10 scale)
  const stars = Math.floor(rating);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      // Green border indicates review is approved for public display
      // Gray border indicates review is hidden from public view
      review.displayOnWebsite ? 'border-green-500' : 'border-gray-300'
    }`}>
      {/* Header section with guest info and display toggle */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {/* Guest name and display status badge */}
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-900">{review.guestName}</span>
            {/* Display status badge (only shown in dashboard) */}
            {showDisplayToggle && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                review.displayOnWebsite 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {review.displayOnWebsite ? 'Displayed' : 'Hidden'}
              </span>
            )}
          </div>
          {/* Review metadata: property, date, channel */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span>{review.listingName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(review.submittedAt, 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span className="capitalize">{review.channel}</span>
            </div>
          </div>
        </div>
        {/* Display toggle button (only shown in dashboard) */}
        {showDisplayToggle && onToggleDisplay && (
          <button
            onClick={() => onToggleDisplay(review.id, !review.displayOnWebsite)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              // Red button to hide, green button to display
              review.displayOnWebsite
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {review.displayOnWebsite ? 'Hide' : 'Display'}
          </button>
        )}
      </div>

      {/* Star rating display (only shown if rating exists) */}
      {rating && (
        <div className="flex items-center gap-2 mb-3">
          {/* Display 5 stars, filled based on rating (1-10 scale converted to 1-5 stars) */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          {/* Numeric rating display (1-10 scale) */}
          <span className="text-lg font-semibold text-gray-900">{rating.toFixed(1)}</span>
        </div>
      )}

      {/* Review text content */}
      <p className="text-gray-700 mb-4">{review.publicReview}</p>

      {/* Category ratings breakdown (cleanliness, communication, location, etc.) */}
      {review.reviewCategory.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-4 border-t">
          {review.reviewCategory.map((category, idx) => (
            <div key={idx} className="flex justify-between items-center">
              {/* Category name with underscores replaced by spaces */}
              <span className="text-sm text-gray-600 capitalize">
                {category.category.replace('_', ' ')}
              </span>
              {/* Category rating with star icon */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{category.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

