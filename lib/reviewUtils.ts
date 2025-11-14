import { HostawayReview, NormalizedReview, ReviewStats } from '@/types/review';

export function normalizeReview(review: HostawayReview): NormalizedReview {
  // Calculate average category rating
  const categoryRatings = review.reviewCategory.map(cat => cat.rating);
  const averageCategoryRating = categoryRatings.length > 0
    ? categoryRatings.reduce((sum, rating) => sum + rating, 0) / categoryRatings.length
    : (review.rating || 0);

  // Determine channel (default to 'hostaway' if not specified)
  const channel = review.channel || 'hostaway';

  return {
    ...review,
    submittedAt: new Date(review.submittedAt),
    averageCategoryRating: Math.round(averageCategoryRating * 10) / 10,
    channel,
    displayOnWebsite: false, // Default to not displayed
  };
}

export function calculateStats(reviews: NormalizedReview[]): ReviewStats {
  const stats: ReviewStats = {
    totalReviews: reviews.length,
    averageRating: 0,
    reviewsByCategory: {},
    reviewsByChannel: {},
    reviewsByListing: {},
    recentTrends: [],
  };

  if (reviews.length === 0) return stats;

  // Calculate average rating
  const ratings = reviews
    .map(r => r.rating || r.averageCategoryRating)
    .filter(r => r !== null && r !== undefined);
  stats.averageRating = ratings.length > 0
    ? Math.round((ratings.reduce((sum, r) => sum + r, 0) / ratings.length) * 10) / 10
    : 0;

  // Group by category
  reviews.forEach(review => {
    review.reviewCategory.forEach(cat => {
      if (!stats.reviewsByCategory[cat.category]) {
        stats.reviewsByCategory[cat.category] = { count: 0, averageRating: 0 };
      }
      stats.reviewsByCategory[cat.category].count++;
      stats.reviewsByCategory[cat.category].averageRating += cat.rating;
    });
  });

  // Calculate category averages
  Object.keys(stats.reviewsByCategory).forEach(category => {
    const data = stats.reviewsByCategory[category];
    data.averageRating = Math.round((data.averageRating / data.count) * 10) / 10;
  });

  // Group by channel
  reviews.forEach(review => {
    stats.reviewsByChannel[review.channel] = (stats.reviewsByChannel[review.channel] || 0) + 1;
  });

  // Group by listing
  reviews.forEach(review => {
    if (!stats.reviewsByListing[review.listingName]) {
      stats.reviewsByListing[review.listingName] = { count: 0, averageRating: 0 };
    }
    stats.reviewsByListing[review.listingName].count++;
    const rating = review.rating || review.averageCategoryRating;
    stats.reviewsByListing[review.listingName].averageRating += rating;
  });

  // Calculate listing averages
  Object.keys(stats.reviewsByListing).forEach(listing => {
    const data = stats.reviewsByListing[listing];
    data.averageRating = Math.round((data.averageRating / data.count) * 10) / 10;
  });

  // Calculate recent trends (last 30 days)
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const recentReviews = reviews.filter(r => r.submittedAt >= thirtyDaysAgo);

  // Group by date
  const reviewsByDate: Record<string, { count: number; ratings: number[] }> = {};
  recentReviews.forEach(review => {
    const dateKey = review.submittedAt.toISOString().split('T')[0];
    if (!reviewsByDate[dateKey]) {
      reviewsByDate[dateKey] = { count: 0, ratings: [] };
    }
    reviewsByDate[dateKey].count++;
    const rating = review.rating || review.averageCategoryRating;
    reviewsByDate[dateKey].ratings.push(rating);
  });

  // Convert to trend format
  stats.recentTrends = Object.keys(reviewsByDate)
    .sort()
    .map(date => ({
      date,
      count: reviewsByDate[date].count,
      averageRating: Math.round(
        (reviewsByDate[date].ratings.reduce((sum, r) => sum + r, 0) / reviewsByDate[date].ratings.length) * 10
      ) / 10,
    }));

  return stats;
}

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
    if (filters.listingName && review.listingName !== filters.listingName) return false;
    if (filters.rating) {
      const reviewRating = review.rating || review.averageCategoryRating;
      if (Math.floor(reviewRating) !== filters.rating) return false;
    }
    if (filters.category) {
      const hasCategory = review.reviewCategory.some(cat => cat.category === filters.category);
      if (!hasCategory) return false;
    }
    if (filters.channel && review.channel !== filters.channel) return false;
    if (filters.type && review.type !== filters.type) return false;
    if (filters.dateFrom && review.submittedAt < filters.dateFrom) return false;
    if (filters.dateTo && review.submittedAt > filters.dateTo) return false;
    if (filters.status && review.status !== filters.status) return false;
    if (filters.approvedOnly !== undefined && review.isApproved !== filters.approvedOnly) return false;
    return true;
  });
}

