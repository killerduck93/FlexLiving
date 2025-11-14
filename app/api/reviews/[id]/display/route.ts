import { NextResponse } from 'next/server';
import { setDisplayStatus, getDisplayStatus } from '@/lib/displayStatus';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = parseInt(params.id);
    const body = await request.json();
    const { displayOnWebsite } = body;

    if (isNaN(reviewId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid review ID' },
        { status: 400 }
      );
    }

    if (typeof displayOnWebsite !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'displayOnWebsite must be a boolean' },
        { status: 400 }
      );
    }

    setDisplayStatus(reviewId, displayOnWebsite);

    return NextResponse.json({
      success: true,
      data: {
        id: reviewId,
        displayOnWebsite,
      },
    });
  } catch (error) {
    console.error('Error updating display status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update display status',
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = parseInt(params.id);
    
    if (isNaN(reviewId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid review ID' },
        { status: 400 }
      );
    }

    const displayOnWebsite = getDisplayStatus(reviewId);

    return NextResponse.json({
      success: true,
      data: {
        id: reviewId,
        displayOnWebsite,
      },
    });
  } catch (error) {
    console.error('Error fetching display status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch display status',
      },
      { status: 500 }
    );
  }
}

