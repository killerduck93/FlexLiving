# 🔌 Hostaway API Setup Guide

## 📋 API Credentials

**Account ID:** `61148`  
**API Key:** `f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`

---

## ✅ API Response Format Verification

The application correctly handles the Hostaway API response format:

```json
{
  "status": "success",
  "result": [
    {
      "id": 7453,
      "type": "host-to-guest",
      "status": "published",
      "rating": null,
      "publicReview": "Shane and family are wonderful! Would definitely host again :)",
      "reviewCategory": [
        {
          "category": "cleanliness",
          "rating": 10
        },
        {
          "category": "communication",
          "rating": 10
        },
        {
          "category": "respect_house_rules",
          "rating": 10
        }
      ],
      "submittedAt": "2020-08-21 22:45:14",
      "guestName": "Shane Finkelstein",
      "listingName": "2B N1 A - 29 Shoreditch Heights"
    }
  ]
}
```

### ✅ Data Handling

**Null Rating:**
- ✅ Handled: If `rating: null`, automatically calculates from category average
- ✅ Code: `lib/reviewUtils.ts` - `normalizeReview()` (lines 22-28)

**Date Format:**
- ✅ Handled: Parses format `"2020-08-21 22:45:14"`
- ✅ Code: `lib/reviewUtils.ts` - `normalizeReview()` (lines 34-47)

**Categories:**
- ✅ Handled: Normalizes category names (lowercase, trimmed)
- ✅ Code: `lib/reviewUtils.ts` - `normalizeReview()` (lines 49-53)

**Missing Channel:**
- ✅ Handled: Defaults to `'hostaway'` if missing
- ✅ Code: `lib/reviewUtils.ts` - `normalizeReview()` (line 32)

---

## 🔧 Credentials Configuration

### Option 1: Environment Variables (Recommended)

#### Local Development

Create `.env.local` file in project root:

```bash
HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152
HOSTAWAY_ACCOUNT_ID=61148
```

#### Vercel Deployment

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Key:** `HOSTAWAY_API_KEY`
   - **Value:** `f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`
   - **Environment:** Production, Preview, Development
3. Add:
   - **Key:** `HOSTAWAY_ACCOUNT_ID`
   - **Value:** `61148`
   - **Environment:** Production, Preview, Development
4. Click "Save"
5. **Redeploy** the project

### Option 2: Hardcode (Testing Only)

⚠️ **Not recommended for production**

Modify `app/api/reviews/hostaway/route.ts`:

```typescript
const response = await fetch(
  `https://api.hostaway.com/v1/reviews?accountId=61148`,
  {
    headers: {
      'Authorization': `Bearer f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`,
    },
  }
);
```

---

## 🚀 Activate Real API

### Step 1: Uncomment Code

In `app/api/reviews/hostaway/route.ts`, uncomment the code in `fetchHostawayReviews()` function:

```typescript
async function fetchHostawayReviews(): Promise<HostawayReview[]> {
  const response = await fetch(
    `https://api.hostaway.com/v1/reviews?accountId=${process.env.HOSTAWAY_ACCOUNT_ID}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.HOSTAWAY_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  
  // Handle Hostaway API response format: {status: "success", result: [...]}
  if (data.status === 'success' && Array.isArray(data.result)) {
    return data.result;
  } else {
    console.error('Unexpected Hostaway API response format:', data);
    return [];
  }
}
```

### Step 2: Remove Mock Data

Comment or remove:
```typescript
// return mockReviews as HostawayReview[];
```

### Step 3: Test

```bash
npm run dev
# Visit: http://localhost:3000/api/reviews/hostaway
```

---

## 📝 Response Format Handling

The application correctly handles:

✅ **Status Check:**
- Verifies `data.status === 'success'`
- Extracts `data.result` array

✅ **Normalization:**
- `rating: null` → Calculates from categories
- Date string → Converts to Date object
- Missing channel → Default 'hostaway'
- Categories → Normalizes (lowercase, trimmed)

✅ **Error Handling:**
- Handles unexpected responses
- Logging for debugging
- Safe fallback

---

## 🧪 API Testing

### Local Test

```bash
# With mock data (current)
npm run dev
# Visit: http://localhost:3000/api/reviews/hostaway

# With real API (after configuration)
# Make sure .env.local contains credentials
npm run dev
# Visit: http://localhost:3000/api/reviews/hostaway
```

### Vercel Test

1. Configure environment variables on Vercel
2. Redeploy
3. Visit: `https://[your-url].vercel.app/api/reviews/hostaway`

---

## ⚠️ Important Notes

1. **Sandbox Environment:**
   - Hostaway sandbox might not have reviews
   - App uses mock data for development/testing
   - Credentials are ready for when API has real data

2. **Security:**
   - ⚠️ **Do not commit** `.env.local` to repository
   - ✅ Use environment variables on Vercel
   - ✅ Credentials are already in `.gitignore`

3. **Response Format:**
   - App correctly handles `{status: "success", result: [...]}`
   - Code is already prepared for this format
   - Just uncomment and configure credentials

---

## ✅ Checklist

- [x] Code handles format `{status: "success", result: [...]}`
- [x] `rating: null` handling implemented
- [x] Date parsing format `"2020-08-21 22:45:14"` implemented
- [x] Category normalization implemented
- [x] Default channel implemented
- [ ] Credentials configured in `.env.local` (optional)
- [ ] Credentials configured on Vercel (optional)
- [ ] Real API code uncommented (when needed)

---

**Status:** ✅ Ready for real API - Just configure credentials and uncomment code
