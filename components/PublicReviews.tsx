'use client';

import { NormalizedReview } from '@/types/review';
import { Star, CheckCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

/**
 * Props for the PublicReviews component
 */
interface PublicReviewsProps {
  /** Array of reviews approved for public display */
  reviews: NormalizedReview[];
}

/**
 * PublicReviews Component
 * 
 * Displays the public-facing review page for Flex Living properties.
 * Shows only reviews that have been approved by managers for public display.
 * 
 * Features:
 * - Hero section with Flex Living branding
 * - Property information and amenities
 * - Average rating display
 * - List of approved guest reviews with ratings
 * - Responsive design matching Flex Living website style
 * 
 * @param props - PublicReviewsProps
 * @returns JSX element representing the public reviews page
 */
export default function PublicReviews({ reviews }: PublicReviewsProps) {
  /**
   * Formats a date to a readable string format
   * Handles both Date objects and date strings
   * 
   * @param date - Date object or date string to format
   * @returns Formatted date string (e.g., "Jan 15, 2024")
   */
  const formatDate = (date: Date | string) => {
    try {
      if (!date) return 'Date unknown';
      
      // If it's already a Date object, use it directly
      let dateObj: Date;
      
      if (date instanceof Date) {
        dateObj = date;
      } else if (typeof date === 'string') {
        // Use parseISO for ISO strings (contains 'T' or 'Z'), new Date for other formats
        dateObj = (date.includes('T') || date.includes('Z')) 
          ? parseISO(date) 
          : new Date(date);
      } else {
        return 'Date unknown';
      }
      
      // Validate the date
      if (isNaN(dateObj.getTime())) {
        return 'Date unknown';
      }
      
      return format(dateObj, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error, date);
      return 'Date unknown';
    }
  };

  // Calculate average rating from all displayed reviews
  // Use safe operations to prevent crashes
  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => {
        const rating = r?.rating ?? r?.averageCategoryRating ?? 0;
        return acc + (typeof rating === 'number' && !isNaN(rating) ? rating : 0);
      }, 0) / reviews.length
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
                  // Safe rating calculation with fallbacks
                  const rating = review?.rating ?? review?.averageCategoryRating ?? 0;
                  const safeRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;
                  const stars = Math.floor(safeRating / 2); // Convert 10-point scale to 5-star
                  
                  // Safe guest name handling
                  const guestName = review?.guestName || 'Anonymous';
                  const guestInitial = guestName.charAt(0).toUpperCase();
                  
                  // Safe date handling - handle both Date objects and strings
                  const dateValue = review?.submittedAt;
                  let reviewDate: Date | string;
                  
                  if (dateValue instanceof Date) {
                    reviewDate = dateValue;
                  } else if (typeof dateValue === 'string') {
                    reviewDate = dateValue;
                  } else {
                    reviewDate = new Date();
                  }
                  
                  return (
                    <div key={review?.id || Math.random()} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {guestInitial}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{guestName}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(reviewDate)}
                          </p>
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
                        <span className="text-sm font-medium text-gray-700 ml-1">
                          {safeRating.toFixed(1)}/10
                        </span>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {review?.publicReview || 'No review text available'}
                      </p>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          {review?.listingName || 'Unknown property'}
                        </p>
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

