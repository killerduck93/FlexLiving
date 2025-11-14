import { HostawayReview, NormalizedReview, ReviewStats } from '@/types/review';

/**
 * Normalizes a raw Hostaway review into a standardized format
 * 
 * This function:
 * - Converts date strings to Date objects
 * - Calculates average category rating if overall rating is missing
 * - Sets default channel if not specified
 * - Initializes display status to false
 * 
 * @param review - Raw review from Hostaway API
 * @returns Normalized review with consistent data structure
 */
export function normalizeReview(review: HostawayReview): NormalizedReview {
  // Calculate average rating from category ratings if overall rating is missing
  // This ensures we always have a rating value for display and filtering
  const categoryRatings = review.reviewCategory.map(cat => cat.rating);
  const averageCategoryRating = categoryRatings.length > 0
    ? categoryRatings.reduce((sum, rating) => sum + rating, 0) / categoryRatings.length
    : (review.rating || 0);

  // Determine channel source (default to 'hostaway' if not specified)
  // This helps track where reviews originate from
  const channel = review.channel || 'hostaway';

  return {
    ...review,
    submittedAt: new Date(review.submittedAt), // Convert string to Date object
    averageCategoryRating: Math.round(averageCategoryRating * 10) / 10, // Round to 1 decimal place
    channel,
    displayOnWebsite: false, // Default to not displayed (manager must approve)
  };
}

/**
 * Calculates comprehensive statistics from a collection of reviews
 * 
 * Generates aggregated statistics including:
 * - Overall average rating
 * - Reviews grouped by category with averages
 * - Reviews grouped by channel
 * - Reviews grouped by property/listing
 * - Recent trends (last 30 days)
 * 
 * @param reviews - Array of normalized reviews
 * @returns ReviewStats object with all calculated metrics
 */
export function calculateStats(reviews: NormalizedReview[]): ReviewStats {
  // Initialize stats object with default values
  const stats: ReviewStats = {
    totalReviews: reviews.length,
    averageRating: 0,
    reviewsByCategory: {},
    reviewsByChannel: {},
    reviewsByListing: {},
    recentTrends: [],
  };

  // Return empty stats if no reviews
  if (reviews.length === 0) return stats;

  // Calculate overall average rating across all reviews
  // Uses overall rating if available, otherwise falls back to average category rating
  const ratings = reviews
    .map(r => r.rating || r.averageCategoryRating)
    .filter(r => r !== null && r !== undefined);
  stats.averageRating = ratings.length > 0
    ? Math.round((ratings.reduce((sum, r) => sum + r, 0) / ratings.length) * 10) / 10
    : 0;

  // Group reviews by category and calculate averages
  // This helps identify which aspects (cleanliness, communication, etc.) need improvement
  reviews.forEach(review => {
    review.reviewCategory.forEach(cat => {
      if (!stats.reviewsByCategory[cat.category]) {
        stats.reviewsByCategory[cat.category] = { count: 0, averageRating: 0 };
      }
      stats.reviewsByCategory[cat.category].count++;
      stats.reviewsByCategory[cat.category].averageRating += cat.rating;
    });
  });

  // Calculate average rating for each category
  Object.keys(stats.reviewsByCategory).forEach(category => {
    const data = stats.reviewsByCategory[category];
    data.averageRating = Math.round((data.averageRating / data.count) * 10) / 10;
  });

  // Group reviews by channel (airbnb, booking.com, etc.)
  // Helps understand which platforms generate the most reviews
  reviews.forEach(review => {
    stats.reviewsByChannel[review.channel] = (stats.reviewsByChannel[review.channel] || 0) + 1;
  });

  // Group reviews by property/listing
  // Enables per-property performance analysis
  reviews.forEach(review => {
    if (!stats.reviewsByListing[review.listingName]) {
      stats.reviewsByListing[review.listingName] = { count: 0, averageRating: 0 };
    }
    stats.reviewsByListing[review.listingName].count++;
    const rating = review.rating || review.averageCategoryRating;
    stats.reviewsByListing[review.listingName].averageRating += rating;
  });

  // Calculate average rating for each property
  Object.keys(stats.reviewsByListing).forEach(listing => {
    const data = stats.reviewsByListing[listing];
    data.averageRating = Math.round((data.averageRating / data.count) * 10) / 10;
  });

  // Calculate recent trends for the last 30 days
  // This helps identify patterns and changes in review volume and quality over time
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const recentReviews = reviews.filter(r => r.submittedAt >= thirtyDaysAgo);

  // Group reviews by date (YYYY-MM-DD format)
  const reviewsByDate: Record<string, { count: number; ratings: number[] }> = {};
  recentReviews.forEach(review => {
    const dateKey = review.submittedAt.toISOString().split('T')[0]; // Extract date part
    if (!reviewsByDate[dateKey]) {
      reviewsByDate[dateKey] = { count: 0, ratings: [] };
    }
    reviewsByDate[dateKey].count++;
    const rating = review.rating || review.averageCategoryRating;
    reviewsByDate[dateKey].ratings.push(rating);
  });

  // Convert grouped data to trend format (sorted by date)
  stats.recentTrends = Object.keys(reviewsByDate)
    .sort() // Sort dates chronologically
    .map(date => ({
      date,
      count: reviewsByDate[date].count,
      averageRating: Math.round(
        (reviewsByDate[date].ratings.reduce((sum, r) => sum + r, 0) / reviewsByDate[date].ratings.length) * 10
      ) / 10,
    }));

  return stats;
}

/**
 * Filters reviews based on multiple criteria
 * 
 * Applies all provided filters in sequence. A review must pass all filters to be included.
 * 
 * @param reviews - Array of reviews to filter
 * @param filters - Filter criteria object
 * @param filters.listingName - Filter by property name (exact match)
 * @param filters.rating - Filter by rating (matches integer part, e.g., 5 matches 5.0-5.9)
 * @param filters.category - Filter by review category (e.g., 'cleanliness')
 * @param filters.channel - Filter by channel (e.g., 'airbnb', 'booking.com')
 * @param filters.type - Filter by review type ('guest-to-host' or 'host-to-guest')
 * @param filters.dateFrom - Filter reviews submitted after this date
 * @param filters.dateTo - Filter reviews submitted before this date
 * @param filters.status - Filter by review status (e.g., 'published', 'pending')
 * @param filters.approvedOnly - Filter by display approval status
 * @returns Filtered array of reviews
 */
export function filterReviews(
  reviews: NormalizedReview[],
  filters: {
    listingName?: string;
    rating?: number;
    category?: string;
    channel?: string;
    type?: 'host-to-guest' | 'guest-to-host';
    dateFrom?: Date;
    dateTo?: Date;
    status?: string;
    approvedOnly?: boolean;
  }
): NormalizedReview[] {
  return reviews.filter(review => {
    // Filter by property/listing name (exact match)
    if (filters.listingName && review.listingName !== filters.listingName) return false;
    
    // Filter by rating (matches the integer part, e.g., rating 5 matches 5.0-5.9)
    if (filters.rating) {
      const reviewRating = review.rating || review.averageCategoryRating;
      if (Math.floor(reviewRating) !== filters.rating) return false;
    }
    
    // Filter by category (checks if review contains the specified category)
    if (filters.category) {
      const hasCategory = review.reviewCategory.some(cat => cat.category === filters.category);
      if (!hasCategory) return false;
    }
    
    // Filter by channel (e.g., airbnb, booking.com, hostaway)
    if (filters.channel && review.channel !== filters.channel) return false;
    
    // Filter by review type (guest-to-host or host-to-guest)
    if (filters.type && review.type !== filters.type) return false;
    
    // Filter by date range (from)
    if (filters.dateFrom && review.submittedAt < filters.dateFrom) return false;
    
    // Filter by date range (to)
    if (filters.dateTo && review.submittedAt > filters.dateTo) return false;
    
    // Filter by review status (published, pending, etc.)
    if (filters.status && review.status !== filters.status) return false;
    
    // Filter by display approval status
    if (filters.approvedOnly !== undefined && review.displayOnWebsite !== filters.approvedOnly) return false;
    
    // Review passes all filters
    return true;
  });
}

