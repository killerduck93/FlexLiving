# 🧪 Testing Guide

Quick guide for testing the Flex Living Reviews Dashboard.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## ✅ Test Checklist

### Basic Functionality

- [ ] Page loads without errors
- [ ] Statistics cards show numbers (Total Reviews, Avg Rating, Properties)
- [ ] Manager Dashboard displays reviews
- [ ] Public View shows only approved reviews

### Dashboard Features

- [ ] Filters work (Property, Channel, Rating, Category, Type, Status)
- [ ] Search works (guest name, content, property)
- [ ] Sorting works (Date, Rating, Property)
- [ ] Display toggle works (eye icon)
- [ ] Statistics update when filters change

### API Endpoints

Test these URLs in browser or Postman:

- [ ] `GET /api/reviews/hostaway` - Returns JSON with reviews
- [ ] `GET /api/reviews/hostaway?rating=5` - Filters by rating
- [ ] `GET /api/reviews/stats` - Returns statistics
- [ ] `GET /api/reviews/public` - Returns only approved reviews
- [ ] `PATCH /api/reviews/[id]/display` - Toggles display status

### Public View

- [ ] Only reviews with `displayOnWebsite: true` are shown
- [ ] Layout matches Flex Living website style
- [ ] Responsive on mobile devices

## 🧪 Build Test

```bash
# Test production build
npm run build

# Should complete without errors
```

## 📱 Mobile Testing

- [ ] Responsive design works on mobile
- [ ] All features accessible on small screens
- [ ] Touch interactions work correctly

---

**For detailed testing, see the application in action at:**  
https://flex-living-reviews-9b3a915we-killerduck93s-projects.vercel.app

