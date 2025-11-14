'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/app/dashboard/page';
import PublicReviews from '@/components/PublicReviews';
import { NormalizedReview } from '@/types/review';

export default function Home() {
  const [view, setView] = useState<'dashboard' | 'public'>('dashboard');
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews/hostaway');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDisplay = async (id: number) => {
    const review = reviews.find(r => r.id === id);
    if (!review) return;

    try {
      const response = await fetch(`/api/reviews/${id}/display`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayOnWebsite: !review.displayOnWebsite })
      });
      
      if (response.ok) {
        setReviews(reviews.map(r => 
          r.id === id ? { ...r, displayOnWebsite: !r.displayOnWebsite } : r
        ));
      }
    } catch (error) {
      console.error('Error toggling display:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Flex Living Reviews</h1>
              <p className="text-sm text-gray-500">Property Review Management System</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'dashboard' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Manager Dashboard
              </button>
              <button
                onClick={() => setView('public')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'public' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Public View
              </button>
            </div>
          </div>
        </div>
      </header>

      {view === 'dashboard' ? (
        <Dashboard />
      ) : (
        <PublicReviews reviews={reviews.filter(r => r.displayOnWebsite)} />
      )}
    </div>
  );
}

