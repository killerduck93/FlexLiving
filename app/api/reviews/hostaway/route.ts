import { NextResponse } from 'next/server';
import mockReviews from '@/data/mockReviews.json';
import { HostawayReview, NormalizedReview } from '@/types/review';
import { normalizeReview } from '@/lib/reviewUtils';
import { getDisplayStatus } from '@/lib/displayStatus';

// In a real implementation, this would fetch from the Hostaway API
async function fetchHostawayReviews(): Promise<HostawayReview[]> {
  // Mock implementation - in production, this would call:
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

  // For now, return mock data
  return mockReviews as HostawayReview[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const listingName = searchParams.get('listingName');
    const rating = searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : undefined;
    const category = searchParams.get('category') || undefined;
    const channel = searchParams.get('channel') || undefined;
    const type = searchParams.get('type') as 'host-to-guest' | 'guest-to-host' | undefined;
    const status = searchParams.get('status') || undefined;

    // Fetch reviews from Hostaway (mocked)
    const hostawayReviews = await fetchHostawayReviews();

    // Normalize reviews
    const normalizedReviews: NormalizedReview[] = hostawayReviews.map(normalizeReview);

    // Apply filters if provided
    let filteredReviews = normalizedReviews;
    if (listingName) {
      filteredReviews = filteredReviews.filter(r => r.listingName === listingName);
    }
    if (rating !== undefined) {
      filteredReviews = filteredReviews.filter(r => {
        const reviewRating = r.rating || r.averageCategoryRating;
        return Math.floor(reviewRating) === rating;
      });
    }
    if (category) {
      filteredReviews = filteredReviews.filter(r =>
        r.reviewCategory.some(cat => cat.category === category)
      );
    }
    if (channel) {
      filteredReviews = filteredReviews.filter(r => r.channel === channel);
    }
    if (type) {
      filteredReviews = filteredReviews.filter(r => r.type === type);
    }
    if (status) {
      filteredReviews = filteredReviews.filter(r => r.status === status);
    }

    // Add display status to reviews using shared storage
    const reviewsWithDisplayStatus = filteredReviews.map(review => ({
      ...review,
      displayOnWebsite: getDisplayStatus(review.id),
    }));

    return NextResponse.json({
      success: true,
      count: reviewsWithDisplayStatus.length,
      data: reviewsWithDisplayStatus,
      source: 'mock', // In production, this would be 'hostaway'
    });
  } catch (error) {
    console.error('Error fetching Hostaway reviews:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch reviews',
      },
      { status: 500 }
    );
  }
}

