# 🔧 Troubleshooting Guide

Common issues and solutions for Flex Living Reviews Dashboard.

## 404 NOT_FOUND Error on Vercel

### Problem
Getting `404: NOT_FOUND` error when accessing the deployed application on Vercel.

### Solutions

#### 1. Remove vercel.json (Recommended)
Vercel automatically detects Next.js projects. Having a `vercel.json` file can sometimes cause conflicts.

**Solution:** Remove `vercel.json` and let Vercel auto-detect Next.js.

#### 2. Verify Framework Detection
1. Go to Vercel Dashboard → Your Project → Settings
2. Check **Framework Preset** is set to **Next.js**
3. If not, set it manually and redeploy

#### 3. Check Build Logs
1. Vercel Dashboard → Deployments → Latest deployment
2. Click on the deployment
3. Check **Build Logs** for errors
4. Look for any TypeScript or build errors

#### 4. Verify Project Structure
Ensure your project has:
- `app/page.tsx` (main page)
- `app/layout.tsx` (root layout)
- `package.json` with Next.js dependency
- `next.config.js` (optional but recommended)

#### 5. Clear Build Cache
1. Vercel Dashboard → Your Project → Settings
2. Go to **Build & Development Settings**
3. Clear build cache
4. Redeploy

#### 6. Force Redeploy
```bash
# Via CLI
vercel --prod --force

# Or via Dashboard
# Deployments → ... → Redeploy
```

### Common Causes

1. **vercel.json conflicts** - Remove if present
2. **Framework not detected** - Set manually in settings
3. **Build errors** - Check build logs
4. **Missing files** - Verify all required files are committed
5. **Cached deployment** - Clear cache and redeploy

---

## Build Errors

### TypeScript Errors
- Run `npm run build` locally first
- Fix all TypeScript errors before deploying
- Check `tsconfig.json` configuration

### Missing Dependencies
- Ensure `package.json` has all dependencies
- Run `npm install` before building
- Check for peer dependency warnings

---

## API Routes Not Working

### 404 on API Routes
- Verify routes are in `app/api/` folder
- Check route file exports `GET`, `POST`, etc.
- Ensure `export const dynamic = 'force-dynamic'` for dynamic routes

### 500 Errors
- Check function logs in Vercel Dashboard
- Verify environment variables are set
- Check for runtime errors in code

---

## Environment Variables

### Variables Not Working
1. Vercel Dashboard → Settings → Environment Variables
2. Ensure variables are set for correct environment (Production, Preview, Development)
3. Redeploy after adding variables

---

## Performance Issues

### Slow Loading
- Check bundle size in build output
- Use dynamic imports for large components
- Optimize images
- Check CDN cache settings

---

## Still Having Issues?

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [Vercel Error Codes](https://vercel.com/docs/errors)
3. Check build logs in Vercel Dashboard
4. Verify all files are committed to Git
5. Try a fresh deployment

---

**Reference:** [Vercel Error Documentation](https://vercel.com/docs/errors#not_found)

