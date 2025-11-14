import { NextResponse } from 'next/server';
import { setDisplayStatus, getAllDisplayStatuses } from '@/lib/displayStatus';

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reviewId, displayOnWebsite } = body;

    if (typeof reviewId !== 'number') {
      return NextResponse.json(
        { status: 'error', message: 'Invalid reviewId' },
        { status: 400 }
      );
    }

    setDisplayStatus(reviewId, displayOnWebsite || false);

    return NextResponse.json({
      status: 'success',
      reviewId,
      displayOnWebsite: displayOnWebsite || false,
    });
  } catch (error) {
    console.error('Error updating review display status:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to update review display status',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all review IDs with their display status
  const allStatuses = getAllDisplayStatuses();
  
  return NextResponse.json({
    status: 'success',
    reviews: allStatuses,
  });
}

