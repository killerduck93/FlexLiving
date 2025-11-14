# Deployment Guide

## Quick Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js
6. Click "Deploy"

## Configuration

### Vercel Project Settings

1. Go to Project Settings → General
2. **Framework Preset**: Next.js
3. **Root Directory**: Leave empty (or `./`)
4. **Build Command**: `npm run build` (auto-detected)
5. **Output Directory**: `.next` (auto-detected)

### Environment Variables (Optional)

If using real Hostaway API:

1. Go to Project Settings → Environment Variables
2. Add:
   - `HOSTAWAY_API_KEY` = `f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152`
   - `HOSTAWAY_ACCOUNT_ID` = `61148`
3. Redeploy

## Verification

After deployment, verify:

- [ ] Application loads without errors
- [ ] Dashboard displays reviews
- [ ] Filters work correctly
- [ ] Public view shows only approved reviews
- [ ] API endpoints return JSON

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure `package.json` has all dependencies
- Verify TypeScript compiles: `npm run build`

### 404 Errors
- Verify Framework Preset is set to "Next.js"
- Check Root Directory is empty or `./`
- Ensure `vercel.json` exists (if needed)

### API Routes Not Working
- Check browser console for errors
- Verify API routes in `app/api/` folder
- Check Vercel function logs
