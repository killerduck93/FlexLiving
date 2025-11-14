'use client';

import { NormalizedReview } from '@/types/review';
import { Star, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface PublicReviewsProps {
  reviews: NormalizedReview[];
}

export default function PublicReviews({ reviews }: PublicReviewsProps) {
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + (r.rating || r.averageCategoryRating), 0) / reviews.length
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Hero Section */}
        <div className="h-64 bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Flex Living Properties</h1>
            <p className="text-lg opacity-90">Premium accommodation in London</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600">
              Experience luxury living in the heart of London with our carefully curated properties.
              Each space is designed to provide comfort, style, and convenience for both short and long stays.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['WiFi', 'Kitchen', 'Heating', 'Washer', 'Smart TV', 'Work Space'].map(a => (
                <div key={a} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Reviews Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
              <div className="flex items-center gap-2">
                <Star size={24} className="text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-gray-900">
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-gray-500">({reviews.length} reviews)</span>
              </div>
            </div>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map(review => {
                  const rating = review.rating || review.averageCategoryRating;
                  const stars = Math.floor(rating / 2); // Convert 10-point scale to 5-star
                  
                  return (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.guestName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{review.guestName}</p>
                          <p className="text-xs text-gray-500">{formatDate(review.submittedAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-sm font-medium text-gray-700 ml-1">{rating.toFixed(1)}/10</span>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed">{review.publicReview}</p>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">{review.listingName}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No reviews selected for display yet.</p>
                <p className="text-sm mt-2">Use the dashboard to select reviews to show here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

