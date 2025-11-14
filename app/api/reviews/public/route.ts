import { NextResponse } from 'next/server';
import mockReviews from '@/data/mockReviews.json';
import { HostawayReview, NormalizedReview } from '@/types/review';
import { normalizeReview } from '@/lib/reviewUtils';
import { getDisplayStatus } from '@/lib/displayStatus';

async function fetchHostawayReviews(): Promise<HostawayReview[]> {
  return mockReviews as HostawayReview[];
}

export async function GET() {
  try {
    const hostawayReviews = await fetchHostawayReviews();
    const normalizedReviews: NormalizedReview[] = hostawayReviews.map(normalizeReview);
    
    // Apply display status from shared storage
    const reviewsWithDisplayStatus = normalizedReviews.map(review => ({
      ...review,
      displayOnWebsite: getDisplayStatus(review.id),
    }));

    // Return only reviews marked for public display
    const publicReviews = reviewsWithDisplayStatus.filter(r => r.displayOnWebsite);

    return NextResponse.json({
      success: true,
      count: publicReviews.length,
      data: publicReviews,
    });
  } catch (error) {
    console.error('Error fetching public reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch public reviews',
      },
      { status: 500 }
    );
  }
}

