# Google Reviews Integration - Research & Implementation Guide

## Overview

This document outlines the research findings and implementation approach for integrating Google Reviews into the Flex Living Reviews Dashboard.

## Feasibility Assessment

### ✅ Feasible via Google Places API

Google Reviews can be integrated using the Google Places API (New) or Places API (Legacy). The recommended approach uses the Places API (New) which provides structured review data.

## Implementation Methods

### Method 1: Google Places API (New) - Recommended

**Endpoint:** `https://places.googleapis.com/v1/places/{placeId}`

**Required Fields:**
- `reviews` - Returns review data
- `rating` - Overall rating
- `userRatingCount` - Total number of reviews

**Authentication:**
- Requires Google Cloud Platform account
- API Key with Places API enabled
- Billing account (first $200/month free)

**Example Request:**
```typescript
const response = await fetch(
  `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount`,
  {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
    },
  }
);
```

**Response Structure:**
```json
{
  "reviews": [
    {
      "name": "places/ChIJ.../reviews/...",
      "relativePublishTimeDescription": "2 months ago",
      "rating": 5,
      "text": {
        "text": "Great place to stay!",
        "languageCode": "en"
      },
      "authorAttribution": {
        "displayName": "John Doe",
        "uri": "...",
        "photoUri": "..."
      }
    }
  ],
  "rating": 4.5,
  "userRatingCount": 127
}
```

### Method 2: Google Places API (Legacy)

**Endpoint:** `https://maps.googleapis.com/maps/api/place/details/json`

**Example:**
```typescript
const response = await fetch(
  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`
);
```

## Pros & Cons

### ✅ Advantages

1. **Official API:** Reliable and well-documented
2. **Structured Data:** Consistent format for reviews
3. **Rich Information:** Includes ratings, text, author, timestamps
4. **Real-time:** Always up-to-date review data
5. **Scalable:** Handles multiple properties efficiently

### ❌ Disadvantages

1. **Cost:** ~$17 per 1,000 requests (after free tier)
2. **Limited Reviews:** Only returns 5 most helpful reviews per request
3. **No Filtering:** Cannot filter by date, rating, etc. (Google's policy)
4. **Place ID Required:** Each property needs a unique Google Place ID
5. **Setup Complexity:** Requires GCP account and billing setup
6. **Rate Limits:** 1,000 requests/day on free tier

## Cost Analysis

### Pricing Structure

- **Free Tier:** $200/month credit
- **Places API (New):** $17 per 1,000 requests
- **Places API (Legacy):** $32 per 1,000 requests

### Estimated Monthly Costs

**Scenario 1: 10 Properties, Daily Sync**
- Requests per day: 10 properties × 1 request = 10
- Requests per month: 10 × 30 = 300
- Cost: 300 × $0.017 = **$5.10/month**

**Scenario 2: 20 Properties, Daily Sync**
- Requests per day: 20 properties × 1 request = 20
- Requests per month: 20 × 30 = 600
- Cost: 600 × $0.017 = **$10.20/month**

**Scenario 3: 50 Properties, Daily Sync**
- Requests per day: 50 properties × 1 request = 50
- Requests per month: 50 × 30 = 1,500
- Cost: 1,500 × $0.017 = **$25.50/month**

**Note:** All scenarios fall within the free tier ($200/month credit).

## Implementation Steps

### Phase 1: Setup

1. **Create Google Cloud Project**
   ```bash
   # Enable Places API (New)
   gcloud services enable places-backend.googleapis.com
   ```

2. **Get API Key**
   - Go to Google Cloud Console
   - Create API Key
   - Restrict to Places API only
   - Add to environment variables

3. **Find Place IDs**
   - Use Google Maps to find each property
   - Extract Place ID from URL or use Place Search API
   - Store Place IDs in database

### Phase 2: Implementation

**Create API Route:**
```typescript
// app/api/reviews/google/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json(
      { error: 'Place ID required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY!,
        },
      }
    );

    const data = await response.json();
    
    // Normalize Google reviews to match our review format
    const normalizedReviews = data.reviews?.map((review: any) => ({
      id: `google-${review.name.split('/').pop()}`,
      type: 'guest-to-host',
      status: 'published',
      rating: review.rating,
      publicReview: review.text?.text || '',
      reviewCategory: [],
      submittedAt: new Date(review.publishTime || Date.now()),
      guestName: review.authorAttribution?.displayName || 'Anonymous',
      listingName: '', // Will be set from property mapping
      channel: 'google',
      displayOnWebsite: false,
    })) || [];

    return NextResponse.json({
      success: true,
      data: normalizedReviews,
      overallRating: data.rating,
      totalReviews: data.userRatingCount,
    });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Google reviews' },
      { status: 500 }
    );
  }
}
```

### Phase 3: Caching Strategy

To minimize API costs, implement caching:

```typescript
// Cache reviews for 24 hours
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Use Redis or in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

async function getCachedReviews(placeId: string) {
  const cached = cache.get(placeId);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  // Fetch from API
  const reviews = await fetchGoogleReviews(placeId);
  
  // Cache the result
  cache.set(placeId, {
    data: reviews,
    timestamp: Date.now(),
  });
  
  return reviews;
}
```

## Alternative Approaches

### 1. Google My Business API

**Pros:**
- Direct access to business reviews
- More control over data
- Can respond to reviews

**Cons:**
- Requires business verification
- More complex setup
- Limited to verified businesses

### 2. Web Scraping (Not Recommended)

**Why Not:**
- Violates Google's Terms of Service
- Unreliable (breaks when HTML changes)
- Legal risks
- Rate limiting issues

### 3. Manual Import

**Process:**
- Export reviews from Google Business Profile
- Import via CSV upload
- One-time or periodic manual sync

**Use Case:** Small number of properties, infrequent updates

## Recommendation

**Implement Google Reviews as Phase 2 feature:**

1. **Start with:** Manual import or limited API integration
2. **Scale to:** Automated daily sync with caching
3. **Optimize:** Reduce sync frequency based on review activity
4. **Monitor:** Track API usage and costs

**Priority:** Medium (nice-to-have, not critical for MVP)

## Next Steps

1. ✅ Research completed
2. ⏳ Get stakeholder approval for API costs
3. ⏳ Set up Google Cloud Project
4. ⏳ Implement API integration
5. ⏳ Add to dashboard UI
6. ⏳ Set up monitoring and alerts

## Resources

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Places API (New) Guide](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Pricing Information](https://mapsplatform.google.com/pricing/)
- [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

---

**Last Updated:** January 2025  
**Status:** Research Complete, Implementation Pending

