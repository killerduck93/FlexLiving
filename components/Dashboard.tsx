'use client';

import { useState, useEffect, useCallback } from 'react';
import { NormalizedReview, ReviewStats } from '@/types/review';
import ReviewCard from '@/components/ReviewCard';
import FilterBar from '@/components/FilterBar';
import { TotalReviewsCard, AverageRatingCard, PropertiesCard } from '@/components/StatsCard';
import TrendsChart from '@/components/TrendsChart';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import PropertyPerformance from '@/components/PropertyPerformance';
import { ReviewFilters } from '@/types/review';
import { Search, SortAsc, SortDesc, AlertCircle, TrendingUp } from 'lucide-react';

/**
 * Sort field options for review sorting
 */
type SortField = 'date' | 'rating' | 'listing';

/**
 * Sort direction (ascending or descending)
 */
type SortDirection = 'asc' | 'desc';

/**
 * Manager Dashboard Component
 * 
 * Main dashboard interface for property managers to:
 * - View real-time statistics (total reviews, average rating, properties count)
 * - Filter reviews by property, channel, rating, category, type, and status
 * - Search reviews by guest name, content, or property name
 * - Sort reviews by date, rating, or property name
 * - Toggle review display status (approve/hide for public website)
 * - Analyze property performance and trends
 * 
 * @returns JSX element representing the manager dashboard
 */
export default function Dashboard() {
  // State management for reviews and UI
  const [reviews, setReviews] = useState<NormalizedReview[]>([]); // All reviews from API
  const [filteredReviews, setFilteredReviews] = useState<NormalizedReview[]>([]); // Reviews after filtering/sorting
  const [stats, setStats] = useState<ReviewStats | null>(null); // Aggregated statistics
  const [loading, setLoading] = useState(true); // Loading state
  const [filters, setFilters] = useState<ReviewFilters>({}); // Active filter criteria
  const [searchQuery, setSearchQuery] = useState(''); // Search text input
  const [sortField, setSortField] = useState<SortField>('date'); // Current sort field
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc'); // Current sort direction

  // Fetch all data on component mount
  useEffect(() => {
    fetchReviews();
    fetchStats();
    fetchDisplayStatus();
  }, []);

  /**
   * Fetches all reviews from the Hostaway API endpoint
   * Updates both reviews and filteredReviews state
   */
  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews/hostaway');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
        setFilteredReviews(data.data); // Initialize filtered reviews with all reviews
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false); // Always set loading to false, even on error
    }
  };

  /**
   * Fetches aggregated statistics for the dashboard
   * Includes total reviews, average rating, category breakdowns, etc.
   */
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

  /**
   * Fetches display status for all reviews (which are approved for public display)
   * Updates reviews state with display status information
   */
  const fetchDisplayStatus = async () => {
    try {
      const response = await fetch('/api/reviews/approve');
      const data = await response.json();
      if (data.status === 'success' && data.reviews) {
        // Create a map of review ID to display status for quick lookup
        const displayMap = new Map<number, boolean>(
          data.reviews.map((r: { id: number; displayOnWebsite: boolean }) => [r.id, r.displayOnWebsite])
        );
        // Update reviews with their display status
        setReviews(prev => prev.map(r => ({
          ...r,
          displayOnWebsite: displayMap.get(r.id) ?? false,
        })));
      }
    } catch (error) {
      console.error('Error fetching display status:', error);
    }
  };

  /**
   * Handles filter changes from the FilterBar component
   * Uses useCallback to prevent unnecessary re-renders
   */
  const handleFilterChange = useCallback((newFilters: ReviewFilters) => {
    setFilters(newFilters);
  }, []);

  /**
   * Effect hook that applies filters, search, and sorting whenever dependencies change
   * This ensures the filtered reviews list is always up-to-date
   */
  useEffect(() => {
    // Start with a copy of all reviews
    let filtered = [...reviews];

    // Apply property/listing filter
    if (filters.listingName) {
      filtered = filtered.filter(r => r.listingName === filters.listingName);
    }
    
    // Apply rating filter (matches integer part, e.g., 5 matches 5.0-5.9)
    if (filters.rating !== undefined) {
      filtered = filtered.filter(r => {
        const rating = r.rating || r.averageCategoryRating;
        return Math.floor(rating) === filters.rating;
      });
    }
    
    // Apply category filter (checks if review contains the category)
    if (filters.category) {
      filtered = filtered.filter(r =>
        r.reviewCategory.some(cat => cat.category === filters.category)
      );
    }
    
    // Apply channel filter (airbnb, booking.com, etc.)
    if (filters.channel) {
      filtered = filtered.filter(r => r.channel === filters.channel);
    }
    
    // Apply review type filter (guest-to-host or host-to-guest)
    if (filters.type) {
      filtered = filtered.filter(r => r.type === filters.type);
    }
    
    // Apply status filter (published, pending, etc.)
    if (filters.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    // Apply search query (searches guest name, review text, and property name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.guestName.toLowerCase().includes(query) ||
        r.publicReview.toLowerCase().includes(query) ||
        r.listingName.toLowerCase().includes(query)
      );
    }

    // Apply sorting based on selected field and direction
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      // Get the value to compare based on sort field
      switch (sortField) {
        case 'date':
          aValue = a.submittedAt.getTime(); // Convert date to timestamp for comparison
          bValue = b.submittedAt.getTime();
          break;
        case 'rating':
          aValue = a.rating || a.averageCategoryRating;
          bValue = b.rating || b.averageCategoryRating;
          break;
        case 'listing':
          aValue = a.listingName; // String comparison
          bValue = b.listingName;
          break;
        default:
          return 0;
      }

      // Compare values based on sort direction
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Update filtered reviews state
    setFilteredReviews(filtered);
  }, [reviews, filters, searchQuery, sortField, sortDirection]);

  /**
   * Toggles the display status of a review (approve/hide for public website)
   * Makes API call to update status and optimistically updates UI
   * 
   * @param reviewId - ID of the review to toggle
   * @param displayOnWebsite - New display status (true = show on website, false = hide)
   */
  const handleToggleDisplay = async (reviewId: number, displayOnWebsite: boolean) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/display`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayOnWebsite }),
      });

      // Update local state if API call succeeds
      if (response.ok) {
        setReviews(prev => prev.map(r =>
          r.id === reviewId ? { ...r, displayOnWebsite } : r
        ));
      }
    } catch (error) {
      console.error('Error updating display status:', error);
    }
  };

  // Extract unique values for filter dropdowns
  const listings = Array.from(new Set(reviews.map(r => r.listingName)));
  const channels = Array.from(new Set(reviews.map(r => r.channel)));
  const categories = Array.from(new Set(
    reviews.flatMap(r => r.reviewCategory.map(c => c.category))
  ));

  /**
   * Handles sort button clicks
   * If clicking the same field, toggles direction. Otherwise, sets new field with default desc direction.
   * 
   * @param field - Field to sort by
   */
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with default descending direction
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

        {/* Insights Section - Property Performance and Trends */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PropertyPerformance reviewsByListing={stats.reviewsByListing} />
            <CategoryBreakdown reviewsByCategory={stats.reviewsByCategory} />
          </div>
        )}

        {/* Trends Chart */}
        {stats && stats.recentTrends.length > 0 && (
          <div className="mb-8">
            <TrendsChart trends={stats.recentTrends} />
          </div>
        )}

        {/* Recurring Issues Detection */}
        {stats && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Insights & Recommendations</h3>
            </div>
            <div className="space-y-3">
              {/* Find categories with low ratings */}
              {Object.entries(stats.reviewsByCategory)
                .filter(([_, data]) => data.averageRating < 7)
                .map(([category, data]) => (
                  <div key={category} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 capitalize">
                        {category.replace('_', ' ')} needs attention
                      </p>
                      <p className="text-sm text-gray-600">
                        Average rating: {data.averageRating.toFixed(1)}/10 from {data.count} review
                        {data.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              {/* Show if no issues */}
              {Object.values(stats.reviewsByCategory).every(data => data.averageRating >= 7) && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <p className="text-gray-700">
                    All categories are performing well! Keep up the great work.
                  </p>
                </div>
              )}
            </div>
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
