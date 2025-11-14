# Flex Living Reviews Dashboard

A comprehensive review management system for Flex Living property managers to assess property performance, analyze guest feedback, and manage public review display.

## 🚀 Live Application

**Production URL:**  
https://flex-living-reviews-killerduck93s-projects.vercel.app

**Important:** If you see a 404 or "Couldn't find any `pages` or `app` directory" error:
1. Go to: https://vercel.com/killerduck93s-projects/flex-living-reviews/settings/general
2. Verify **Framework Preset** = "Next.js"
3. **CRITICAL:** Set **Root Directory** = empty (leave blank) or `./`
4. Click "Save" and redeploy

## 📋 Features

### Manager Dashboard
- **Real-time Statistics**: Total reviews, average ratings, property count
- **Advanced Filtering**: Filter by property, channel, rating, category, type, and status
- **Search**: Search reviews by guest name, content, or property name
- **Sorting**: Sort by date, rating, or property name
- **Review Approval**: Toggle which reviews appear on the public website
- **Analytics**: Property performance metrics, category breakdowns, and trend analysis
- **Insights**: Automatic detection of recurring issues and recommendations

### Public Review Display
- **Approved Reviews Only**: Shows only reviews approved by managers
- **Property-Specific Pages**: Dedicated pages for each property
- **Flex Living Design**: Matches Flex Living website layout

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
├── app/
│   ├── api/reviews/          # API routes for reviews
│   ├── dashboard/            # Manager dashboard page
│   ├── property/[slug]/      # Public property pages
│   └── page.tsx              # Main application page
├── components/               # React components
├── data/                     # Mock review data
├── lib/                      # Utility functions
└── types/                    # TypeScript type definitions
```

## 🔌 API Endpoints

### GET `/api/reviews/hostaway`
Fetches and normalizes reviews from Hostaway API (currently using mock data).

**Query Parameters:**
- `listingName`: Filter by property name
- `rating`: Filter by rating (1-5)
- `category`: Filter by category
- `channel`: Filter by channel
- `type`: Filter by review type
- `status`: Filter by status

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...],
  "source": "mock"
}
```

### GET `/api/reviews/stats`
Returns aggregated statistics for the dashboard.

### GET `/api/reviews/public`
Returns only reviews approved for public display.

### PATCH `/api/reviews/[id]/display`
Updates the display status of a review.

## 🎨 Design Decisions

### Data Normalization
- Handles missing ratings by calculating averages from category ratings
- Normalizes dates from various formats
- Converts 1-10 scale ratings to 1-5 star display
- Handles null/undefined values with safe defaults

### State Management
- Uses React hooks for local state
- In-memory storage for display status (production should use database)
- Optimistic UI updates for better UX

### UI/UX
- Manager-first design: minimal clicks to complete tasks
- Visual feedback for all actions
- Responsive design for all screen sizes
- Clear visual indicators for approved/hidden reviews

## 📊 Hostaway API Integration

The application is designed to work with the Hostaway Reviews API. Currently using mock data since the sandbox environment contains no reviews.

**API Response Format:**
```json
{
  "status": "success",
  "result": [
    {
      "id": 7453,
      "type": "host-to-guest",
      "status": "published",
      "rating": null,
      "publicReview": "...",
      "reviewCategory": [...],
      "submittedAt": "2020-08-21 22:45:14",
      "guestName": "...",
      "listingName": "..."
    }
  ]
}
```

**API Credentials:**
- Account ID: `61148`
- API Key: `f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`

To activate the real API:
1. Uncomment the API call code in `app/api/reviews/hostaway/route.ts`
2. Add environment variables to Vercel
3. Redeploy

## 🌐 Google Reviews

For Google Reviews integration research and findings, see [docs/GOOGLE_REVIEWS.md](docs/GOOGLE_REVIEWS.md).

## 📝 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [Testing Guide](docs/TESTING.md)
- [Google Reviews Research](docs/GOOGLE_REVIEWS.md)
- [Assessment Verification](docs/ASSESSMENT_VERIFICATION.md)

## 🤖 AI Tool Disclosure

This project was developed with assistance from:
- **Cursor IDE** - AI-powered code editor for code generation, debugging, and optimization
- **ChatGPT Pro** - AI assistant for problem-solving, code review, and implementation guidance

## 📄 License

Private project for Flex Living assessment.
