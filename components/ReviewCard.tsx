'use client';

import { NormalizedReview } from '@/types/review';
import { Star, Calendar, User, Building, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: NormalizedReview;
  onToggleDisplay?: (reviewId: number, displayOnWebsite: boolean) => void;
  showDisplayToggle?: boolean;
}

export default function ReviewCard({ review, onToggleDisplay, showDisplayToggle = false }: ReviewCardProps) {
  const rating = review.rating || review.averageCategoryRating;
  const stars = Math.floor(rating);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      review.displayOnWebsite ? 'border-green-500' : 'border-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-900">{review.guestName}</span>
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
        {showDisplayToggle && onToggleDisplay && (
          <button
            onClick={() => onToggleDisplay(review.id, !review.displayOnWebsite)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              review.displayOnWebsite
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {review.displayOnWebsite ? 'Hide' : 'Display'}
          </button>
        )}
      </div>

      {rating && (
        <div className="flex items-center gap-2 mb-3">
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
          <span className="text-lg font-semibold text-gray-900">{rating.toFixed(1)}</span>
        </div>
      )}

      <p className="text-gray-700 mb-4">{review.publicReview}</p>

      {review.reviewCategory.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-4 border-t">
          {review.reviewCategory.map((category, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 capitalize">
                {category.category.replace('_', ' ')}
              </span>
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

