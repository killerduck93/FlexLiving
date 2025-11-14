import { NextResponse } from 'next/server';
import mockReviews from '@/data/mockReviews.json';
import { HostawayReview, NormalizedReview } from '@/types/review';
import { normalizeReview } from '@/lib/reviewUtils';
import { getDisplayStatus } from '@/lib/displayStatus';

/**
 * Fetches reviews from Hostaway API
 * 
 * In production, this function would make an actual API call to Hostaway.
 * Currently using mock data since the sandbox environment contains no reviews.
 * 
 * @returns Promise<HostawayReview[]> - Array of raw reviews from Hostaway API
 */
async function fetchHostawayReviews(): Promise<HostawayReview[]> {
  // Production implementation would call the Hostaway API:
  // const response = await fetch(
  //   `https://api.hostaway.com/v1/reviews?accountId=${process.env.HOSTAWAY_ACCOUNT_ID}`,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${process.env.HOSTAWAY_API_KEY}`,
  //     },
  //   }
  // );
  // const data = await response.json();
  // return data.result || [];

  // Return mock data for development/testing
  return mockReviews as HostawayReview[];
}

/**
 * GET /api/reviews/hostaway
 * 
 * Fetches and normalizes reviews from Hostaway API (currently mocked).
 * Supports query parameters for filtering reviews.
 * 
 * Query Parameters:
 * - listingName: Filter by property name
 * - rating: Filter by rating (1-5, integer)
 * - category: Filter by review category (e.g., 'cleanliness', 'communication')
 * - channel: Filter by channel (e.g., 'airbnb', 'booking.com')
 * - type: Filter by review type ('guest-to-host' or 'host-to-guest')
 * - status: Filter by review status (e.g., 'published', 'pending')
 * 
 * @param request - Next.js request object
 * @returns JSON response with normalized reviews
 */
export async function GET(request: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const listingName = searchParams.get('listingName');
    const rating = searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : undefined;
    const category = searchParams.get('category') || undefined;
    const channel = searchParams.get('channel') || undefined;
    const type = searchParams.get('type') as 'host-to-guest' | 'guest-to-host' | undefined;
    const status = searchParams.get('status') || undefined;

    // Fetch raw reviews from Hostaway API (mocked in development)
    const hostawayReviews = await fetchHostawayReviews();

    // Normalize reviews: convert dates, calculate averages, set defaults
    const normalizedReviews: NormalizedReview[] = hostawayReviews.map(normalizeReview);

    // Apply filters based on query parameters
    let filteredReviews = normalizedReviews;
    
    // Filter by property/listing name
    if (listingName) {
      filteredReviews = filteredReviews.filter(r => r.listingName === listingName);
    }
    
    // Filter by rating (matches the integer part of the rating)
    if (rating !== undefined) {
      filteredReviews = filteredReviews.filter(r => {
        const reviewRating = r.rating || r.averageCategoryRating;
        return Math.floor(reviewRating) === rating;
      });
    }
    
    // Filter by category (checks if review has the specified category)
    if (category) {
      filteredReviews = filteredReviews.filter(r =>
        r.reviewCategory.some(cat => cat.category === category)
      );
    }
    
    // Filter by channel (e.g., airbnb, booking.com, hostaway)
    if (channel) {
      filteredReviews = filteredReviews.filter(r => r.channel === channel);
    }
    
    // Filter by review type (guest-to-host or host-to-guest)
    if (type) {
      filteredReviews = filteredReviews.filter(r => r.type === type);
    }
    
    // Filter by review status (published, pending, etc.)
    if (status) {
      filteredReviews = filteredReviews.filter(r => r.status === status);
    }

    // Add display status to each review (whether it's approved for public display)
    // This uses shared in-memory storage (in production, use a database)
    const reviewsWithDisplayStatus = filteredReviews.map(review => ({
      ...review,
      displayOnWebsite: getDisplayStatus(review.id),
    }));

    // Return successful response with normalized and filtered reviews
    return NextResponse.json({
      success: true,
      count: reviewsWithDisplayStatus.length,
      data: reviewsWithDisplayStatus,
      source: 'mock', // In production, this would be 'hostaway'
    });
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching Hostaway reviews:', error);
    
    // Return error response
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch reviews',
      },
      { status: 500 }
    );
  }
}

