'use client';

import { useState, useEffect, useCallback } from 'react';
import { NormalizedReview, ReviewStats } from '@/types/review';
import ReviewCard from '@/components/ReviewCard';
import FilterBar from '@/components/FilterBar';
import { TotalReviewsCard, AverageRatingCard, PropertiesCard } from '@/components/StatsCard';
import { ReviewFilters } from '@/types/review';
import { Search, SortAsc, SortDesc } from 'lucide-react';

type SortField = 'date' | 'rating' | 'listing';
type SortDirection = 'asc' | 'desc';

export default function Dashboard() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<NormalizedReview[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ReviewFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  useEffect(() => {
    fetchReviews();
    fetchStats();
    fetchDisplayStatus();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews/hostaway');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
        setFilteredReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/reviews/stats');
      const data = await response.json();
      if (data.status === 'success') {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchDisplayStatus = async () => {
    try {
      const response = await fetch('/api/reviews/approve');
      const data = await response.json();
      if (data.status === 'success' && data.reviews) {
        const displayMap = new Map(data.reviews.map((r: any) => [r.id, r.displayOnWebsite]));
        setReviews(prev => prev.map(r => ({
          ...r,
          displayOnWebsite: displayMap.get(r.id) || false,
        })));
      }
    } catch (error) {
      console.error('Error fetching display status:', error);
    }
  };

  const handleFilterChange = useCallback((newFilters: ReviewFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    let filtered = [...reviews];

    // Apply filters
    if (filters.listingName) {
      filtered = filtered.filter(r => r.listingName === filters.listingName);
    }
    if (filters.rating !== undefined) {
      filtered = filtered.filter(r => {
        const rating = r.rating || r.averageCategoryRating;
        return Math.floor(rating) === filters.rating;
      });
    }
    if (filters.category) {
      filtered = filtered.filter(r =>
        r.reviewCategory.some(cat => cat.category === filters.category)
      );
    }
    if (filters.channel) {
      filtered = filtered.filter(r => r.channel === filters.channel);
    }
    if (filters.type) {
      filtered = filtered.filter(r => r.type === filters.type);
    }
    if (filters.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.guestName.toLowerCase().includes(query) ||
        r.publicReview.toLowerCase().includes(query) ||
        r.listingName.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'date':
          aValue = a.submittedAt.getTime();
          bValue = b.submittedAt.getTime();
          break;
        case 'rating':
          aValue = a.rating || a.averageCategoryRating;
          bValue = b.rating || b.averageCategoryRating;
          break;
        case 'listing':
          aValue = a.listingName;
          bValue = b.listingName;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredReviews(filtered);
  }, [reviews, filters, searchQuery, sortField, sortDirection]);

  const handleToggleDisplay = async (reviewId: number, displayOnWebsite: boolean) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/display`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayOnWebsite }),
      });

      if (response.ok) {
        setReviews(prev => prev.map(r =>
          r.id === reviewId ? { ...r, displayOnWebsite } : r
        ));
      }
    } catch (error) {
      console.error('Error updating display status:', error);
    }
  };

  const listings = Array.from(new Set(reviews.map(r => r.listingName)));
  const channels = Array.from(new Set(reviews.map(r => r.channel)));
  const categories = Array.from(new Set(
    reviews.flatMap(r => r.reviewCategory.map(c => c.category))
  ));

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and analyze guest reviews across all properties</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <TotalReviewsCard value={stats.totalReviews} />
            <AverageRatingCard value={stats.averageRating} />
            <PropertiesCard value={Object.keys(stats.reviewsByListing).length} />
          </div>
        )}

        {/* Filters */}
        <FilterBar
          listings={listings}
          channels={channels}
          categories={categories}
          onFilterChange={handleFilterChange}
        />

        {/* Search and Sort */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews by guest name, content, or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('date')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  sortField === 'date'
                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Date
                {sortField === 'date' && (sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
              </button>
              <button
                onClick={() => handleSort('rating')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  sortField === 'rating'
                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Rating
                {sortField === 'rating' && (sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
              </button>
              <button
                onClick={() => handleSort('listing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  sortField === 'listing'
                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Property
                {sortField === 'listing' && (sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No reviews match your filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                onToggleDisplay={handleToggleDisplay}
                showDisplayToggle={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

