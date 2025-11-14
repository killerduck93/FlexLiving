import { NextResponse } from 'next/server';
import mockReviews from '@/data/mockReviews.json';
import { HostawayReview } from '@/types/review';
import { normalizeReview, calculateStats } from '@/lib/reviewUtils';

async function fetchHostawayReviews(): Promise<HostawayReview[]> {
  return mockReviews as HostawayReview[];
}

export async function GET() {
  try {
    const hostawayReviews = await fetchHostawayReviews();
    const normalizedReviews = hostawayReviews.map(normalizeReview);
    const stats = calculateStats(normalizedReviews);

    return NextResponse.json({
      status: 'success',
      stats,
    });
  } catch (error) {
    console.error('Error calculating review stats:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to calculate stats',
      },
      { status: 500 }
    );
  }
}

