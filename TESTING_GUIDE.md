# 🧪 Complete Testing Guide for the Application

## Method 1: Quick Test with Artifact (Fastest)

### Use the First Artifact I Created

1. Look at **Artifact #1** above (the one with the title "Flex Living Reviews Dashboard")

2. Click on the preview button in the artifact

3. You can interact directly with the application!

### What to Test in the Artifact:

- ✅ Click on "Manager Dashboard" and "Public View" to switch views

- ✅ Try the filters (Property, Channel, Sort By, Min Rating)

- ✅ Click on the eye icon to hide/show reviews

- ✅ Verify that the numbers in the statistics change

- ✅ In Public View, see only reviews with the green eye icon

---

## Method 2: Local Installation (Complete)

### Step 1: Prepare Your Computer

```bash
# Verify you have Node.js installed
node --version
# Must show v18.0.0 or higher

# If you don't have Node.js, download it from:
# https://nodejs.org/
```

### Step 2: Clone and Install

```bash
# Clone the repository
git clone https://github.com/killerduck93/FlexLiving.git
cd FlexLiving

# Install dependencies
npm install
```

### Step 3: Start the Server

```bash
# In the terminal, from the project folder
npm run dev
```

You'll see something like:

```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Step 4: Open the Browser

1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see the application!

---

## 🎯 Test Checklist - What to Verify

### Test 1: Page Loads Correctly ✅

- [ ] The page loads without errors
- [ ] You see the header "Flex Living Reviews"
- [ ] You see 3 cards with statistics (Total Reviews, Avg Rating, Properties)
- [ ] You see the buttons "Manager Dashboard" and "Public View"

### Test 2: Statistics Are Correct ✅

Verify these numbers (may vary slightly):

- [ ] Total Reviews: **10**
- [ ] Avg Rating: approximately **8.5-8.8**
- [ ] Properties: **3-4** (Shoreditch Heights, Camden Lock, Notting Hill Gate, Spitalfields)

### Test 3: Manager Dashboard Works ✅

1. Click on "Manager Dashboard" (if you're not already there)
2. Verify that you see:
   - [ ] Statistics at the top
   - [ ] Filter bar
   - [ ] Search bar
   - [ ] List of reviews

### Test 4: Filters Work ✅

#### Test Property Filter

1. Click on the "Property" dropdown in the filters
2. Select a property (e.g., "2B N1 A - 29 Shoreditch Heights")
3. Verify: you see only reviews for that property
4. Set back to "All Properties"

#### Test Channel Filter

1. Click on the "Channel" dropdown
2. Select "airbnb"
3. Verify: you see only reviews from Airbnb
4. Select "booking.com"
5. Verify: you see only reviews from Booking.com

#### Test Rating Filter

1. Click on the "Rating" dropdown
2. Select "5 Stars"
3. Verify: you see only reviews with rating 5
4. Try with other ratings

#### Test Category Filter

1. Click on the "Category" dropdown
2. Select a category (e.g., "cleanliness")
3. Verify: you see only reviews with that category

### Test 5: Sort Works ✅

1. Click on the sort buttons (Date, Rating, Property)
2. Verify that reviews reorder
3. Click again to reverse the order

### Test 6: Search Works ✅

1. In the search bar, type a name (e.g., "Sarah")
2. Verify: you see only reviews that contain "Sarah"
3. Try with other terms (e.g., "Shoreditch", "amazing")

### Test 7: Toggle Display Works ✅

1. Find a review with "Display" (green) or "Hide" (red) button
2. Click on the button
3. Verify: the button changes color and text
4. The card border changes (green if displayed, gray if hidden)

### Test 8: Public View ✅

1. Click on the "Public View" button in the top right
2. Verify that you see:
   - [ ] Banner with "Flex Living Properties"
   - [ ] "About" section
   - [ ] "Amenities" section with 6 icons
   - [ ] "Guest Reviews" section
3. Count the reviews: they must be only those with "Display" active
4. Verify that each review shows:
   - [ ] Avatar with name initial
   - [ ] Guest name
   - [ ] Date
   - [ ] Yellow stars
   - [ ] Review text
   - [ ] Property name at the bottom

### Test 9: Property Page ✅

1. Go to: `http://localhost:3000/property/2B-N1-A-29-Shoreditch-Heights`
2. Verify that you see:
   - [ ] Header with property name
   - [ ] Image placeholder
   - [ ] "About this property" section
   - [ ] "Amenities" section
   - [ ] "Guest Reviews" section with only approved reviews

### Test 10: API Endpoints ✅

Open these URLs in the browser:

1. **http://localhost:3000/api/reviews/hostaway**
   - Verify: you see JSON with `success: true` and `data` array with reviews
   - Each review has: id, rating, publicReview, guestName, etc.

2. **http://localhost:3000/api/reviews/public**
   - Verify: you see only reviews with `displayOnWebsite: true`

3. **http://localhost:3000/api/reviews/stats**
   - Verify: you see aggregated statistics

### Test 11: Responsive Design ✅

1. Reduce the browser width (or use DevTools mobile view)
2. Verify that:
   - [ ] Cards arrange in a column on mobile
   - [ ] Filters stack vertically
   - [ ] Reviews remain readable
   - [ ] In Public View, reviews go to 1 column

---

## 🐛 Common Problems and Solutions

### Error: "Module not found: lucide-react"

```bash
npm install lucide-react
```

### Error: "Cannot find module @/components/..."

- Verify you have installed all dependencies: `npm install`
- Verify that the folder structure is correct

### Error: "Cannot find module @/lib/..."

- Verify that the `lib/` folder exists in the root
- Verify that TypeScript files are correct

### Page is Blank

1. Open the browser Console (F12)
2. Look for red errors
3. Verify that all files have been copied correctly
4. Check the terminal where you ran `npm run dev` for errors

### Filters Don't Work

- Check that the `FilterBar.tsx` file has been copied correctly
- Restart the server: Ctrl+C in the terminal, then `npm run dev`
- Check the browser console for JavaScript errors

### Toggle Display Doesn't Work

- Verify that the API endpoint `/api/reviews/[id]/display` works
- Check the browser console for fetch errors
- Check the Network tab (F12 → Network) to see API calls

---

## 📱 Mobile Testing (Optional)

### With Phone on the Same WiFi Network:

1. In the terminal, find your computer's IP:
   - Windows: `ipconfig` → look for "IPv4 Address"
   - Mac/Linux: `ifconfig` or `ip addr`

2. On your phone, open the browser

3. Go to: `http://[YOUR-IP]:3000`
   - Example: `http://192.168.1.10:3000`

4. Verify that the app works correctly on mobile

---

## ✅ Final Checklist Before Submission

- [ ] The app starts without errors (`npm run dev`)
- [ ] All 11 tests above work
- [ ] Statistics are correct
- [ ] Filters change the displayed reviews
- [ ] Toggle display works
- [ ] Public View shows only approved reviews
- [ ] API endpoints return valid JSON
- [ ] Responsive design on mobile
- [ ] No errors in the browser console
- [ ] No errors in the terminal

---

## 🚀 Ready for Vercel Deployment

Once you've verified that everything works locally, you're ready for:

### 1. Push to GitHub (Already Done!)

The code is already on GitHub: https://github.com/killerduck93/FlexLiving

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In" (you can use GitHub)
3. Click "New Project"
4. Import the repository `killerduck93/FlexLiving`
5. Vercel will automatically detect Next.js
6. Click "Deploy"
7. Wait 2-3 minutes for deployment

### 3. Test the Vercel URL

1. Once completed, Vercel will give you a URL like: `https://flex-living.vercel.app`
2. Repeat all the tests above on the live URL
3. Verify that it works from mobile
4. Share the URL in your submission

### 4. Add Environment Variables (Optional)

If you want to use real APIs in the future:

1. Go to Project Settings → Environment Variables
2. Add:
   - `HOSTAWAY_API_KEY` = (your key)
   - `HOSTAWAY_ACCOUNT_ID` = (your account ID)

---

## 💡 Pro Tip

Record a 2-3 minute video while doing these tests! Show:

1. Dashboard with filters
2. Toggle a review
3. Public View
4. Responsive on mobile

Add the video link to your submission - it will make a great impression!

---

## 📞 Quick Debug

If something doesn't work, check:

1. **Browser Console** (F12 → Console)
   - Look for red errors
   - Verify that API calls work

2. **Terminal where you ran npm run dev**
   - Look for compilation errors
   - Verify that the server is running

3. **Network tab** (F12 → Network)
   - Verify that API calls work
   - Check status codes (should be 200)

4. **React DevTools** (Chrome extension)
   - Check component state
   - Verify that data is loaded correctly

---

## 🎉 You're Ready!

If all tests pass, the application is ready for submission!

**GitHub Repository:** https://github.com/killerduck93/FlexLiving

**Next Steps:**
1. ✅ Code completed and pushed
2. ⏳ Deploy to Vercel
3. ⏳ Test on live URL
4. ⏳ Final submission

Good luck with the assessment! 🚀
