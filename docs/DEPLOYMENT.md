# 🚀 Vercel Deployment Guide

## Prerequisites

- ✅ Code pushed to GitHub: https://github.com/killerduck93/FlexLiving
- ✅ Vercel account (you can create it with GitHub)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Access Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub" to link your account

### Step 2: Create New Project

1. From the dashboard, click "Add New..." → "Project"
2. Search for the repository `killerduck93/FlexLiving`
3. Click "Import"

### Step 3: Configure the Project

Vercel will automatically detect:
- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

**No need to change anything!** Click "Deploy"

### Step 4: Wait for Deployment

- Deployment takes 2-3 minutes
- Vercel will show logs in real-time
- At the end, you'll see "Congratulations! Your project has been deployed"

### Step 5: Get the URL

Vercel will give you a URL like:
- `https://flex-living.vercel.app`
- Or a custom URL if configured

**This is your live URL!** 🎉

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login

```bash
vercel login
```

It will ask you to authenticate via browser.

### Step 3: Deploy

From the project folder:

```bash
cd FlexLiving
vercel
```

Answer the questions:
- **Set up and deploy?** → Y
- **Which scope?** → (select your account)
- **Link to existing project?** → N
- **Project name?** → flex-living (or leave default)
- **Directory?** → ./
- **Override settings?** → N

### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## Environment Variables (Optional)

If you want to use real APIs in the future:

### Via Dashboard:

1. Go to Project Settings → Environment Variables
2. Add:
   - **Key:** `HOSTAWAY_API_KEY`
   - **Value:** (your API key)
   - **Environment:** Production, Preview, Development
3. Click "Save"
4. Also add:
   - **Key:** `HOSTAWAY_ACCOUNT_ID`
   - **Value:** (your account ID)

### Via CLI:

```bash
vercel env add HOSTAWAY_API_KEY
vercel env add HOSTAWAY_ACCOUNT_ID
```

---

## Deployment Verification

### Test 1: Homepage

1. Go to your Vercel URL
2. Verify that the page loads
3. Verify that you see "Flex Living Reviews"

### Test 2: Dashboard

1. Click on "Manager Dashboard"
2. Verify that statistics load
3. Verify that reviews are visible

### Test 3: API Endpoints

1. Go to `https://[your-url].vercel.app/api/reviews/hostaway`
2. Verify that it returns valid JSON
3. Also try `/api/reviews/public` and `/api/reviews/stats`

### Test 4: Public View

1. Click on "Public View"
2. Verify that approved reviews are visible

### Test 5: Mobile

1. Open the URL on mobile
2. Verify that the design is responsive

---

## Custom Domain (Optional)

If you want a custom domain:

1. Go to Project Settings → Domains
2. Add your domain
3. Follow the instructions to configure DNS

---

## Troubleshooting

### Build Fails

**Error:** "Module not found"

**Solution:**
- Verify that `package.json` contains all dependencies
- Check build logs for specific errors

**Error:** "TypeScript errors"

**Solution:**
- Verify that there are no TypeScript errors locally
- Run `npm run build` locally to test

### Runtime Errors

**Error:** "API route not found"

**Solution:**
- Verify that API routes are in the `app/api/` folder
- Check that file names are correct

**Error:** "Environment variable not found"

**Solution:**
- Verify that environment variables are configured in Vercel
- Restart deployment after adding variables

### Performance Issues

**Slow loading:**

1. Verify that images are optimized
2. Check bundle size
3. Use Vercel Analytics to identify issues

---

## Continuous Deployment

Vercel automatically deploys on every GitHub push:

1. Push to `main` → Production Deploy
2. Push to other branches → Preview Deploy
3. Pull Request → Preview Deploy with unique URL

**No action needed!** Vercel handles everything automatically.

---

## Monitoring

### Vercel Analytics

1. Go to Project Settings → Analytics
2. Enable Vercel Analytics (free for hobby plan)
3. Monitor performance and errors

### Logs

1. Go to Deployments
2. Click on a deployment
3. Go to "Functions" to see API route logs

---

## Rollback

If something goes wrong:

1. Go to Deployments
2. Find the previous deployment that worked
3. Click "..." → "Promote to Production"

---

## Best Practices

1. **Always test locally before pushing**
2. **Use Preview Deployments to test PRs**
3. **Monitor logs after each deployment**
4. **Keep environment variables secure**
5. **Use Vercel Analytics to optimize**

---

## Support

- **Vercel Documentation:** https://vercel.com/docs
- **Community:** https://github.com/vercel/vercel/discussions
- **Status:** https://vercel-status.com

---

## Final Checklist

- [ ] Code pushed to GitHub
- [ ] Deployment completed on Vercel
- [ ] Live URL working
- [ ] All tests pass on live URL
- [ ] Environment variables configured (if needed)
- [ ] Custom domain configured (optional)
- [ ] Monitoring active (optional)

---

**🎉 Congratulations! Your app is live!**

Share the URL in your assessment submission.
