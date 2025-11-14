'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { NormalizedReview } from '@/types/review';
import PublicReviews from '@/components/PublicReviews';
import { Star, MapPin, Calendar, Wifi, Utensils, Droplet, Tv, Briefcase } from 'lucide-react';

export default function PropertyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicReviews();
  }, []);

  const fetchPublicReviews = async () => {
    try {
      const response = await fetch('/api/reviews/public');
      const data = await response.json();
      if (data.success) {
        // Filter by property slug if needed
        const propertyName = slug.replace(/-/g, ' ');
        const propertyReviews = data.data.filter((r: NormalizedReview) =>
          r.listingName.toLowerCase().includes(propertyName.toLowerCase())
        );
        setReviews(propertyReviews);
      }
    } catch (error) {
      console.error('Error fetching public reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  const propertyName = slug.replace(/-/g, ' ');
  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + (r.rating || r.averageCategoryRating), 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{propertyName}</h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>London, UK</span>
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{avgRating.toFixed(1)}</span>
                <span>({reviews.length} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Image Placeholder */}
        <div className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg h-96 mb-8 flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">Property Image</span>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Experience luxury living in the heart of London with this carefully curated property.
              The space is designed to provide comfort, style, and convenience for both short and long stays.
              Located in a vibrant neighborhood with excellent transport links and local amenities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This beautifully appointed accommodation features modern furnishings, fully equipped kitchen,
              high-speed WiFi, and all the comforts of home. Perfect for business travelers, families,
              or anyone looking to experience London like a local.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">High-Speed WiFi</span>
              </div>
              <div className="flex items-center gap-3">
                <Utensils className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">Fully Equipped Kitchen</span>
              </div>
              <div className="flex items-center gap-3">
                <Droplet className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">Washer & Dryer</span>
              </div>
              <div className="flex items-center gap-3">
                <Tv className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">Smart TV</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">Dedicated Workspace</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</span>
                <span className="text-gray-500">({reviews.length} reviews)</span>
              </div>
            )}
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(review => {
                const rating = review.rating || review.averageCategoryRating;
                const stars = Math.floor(rating / 2);
                
                return (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {review.guestName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.guestName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.submittedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-700 ml-2">{rating.toFixed(1)}/10</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{review.publicReview}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No reviews available for this property yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

