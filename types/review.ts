export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface HostawayReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel?: string;
}

export interface NormalizedReview {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: string;
  rating: number | null;
  averageCategoryRating: number;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: Date;
  guestName: string;
  listingName: string;
  channel: string;
  displayOnWebsite: boolean;
}

export interface ReviewFilters {
  listingName?: string;
  rating?: number;
  category?: string;
  channel?: string;
  type?: 'host-to-guest' | 'guest-to-host';
  dateFrom?: Date;
  dateTo?: Date;
  status?: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  reviewsByCategory: Record<string, { count: number; averageRating: number }>;
  reviewsByChannel: Record<string, number>;
  reviewsByListing: Record<string, { count: number; averageRating: number }>;
  recentTrends: {
    date: string;
    count: number;
    averageRating: number;
  }[];
}

