# Vercel Deployment Fix Guide

## Problem
Vercel build fails with error: "Couldn't find any `pages` or `app` directory"

## Root Cause
The Vercel project has an incorrect **Root Directory** setting, causing it to look for the `app` folder in the wrong location.

## Solution (Manual Fix Required)

### Step 1: Access Vercel Project Settings
1. Go to: https://vercel.com/killerduck93s-projects/flex-living-reviews/settings/general
2. Log in if needed

### Step 2: Fix Root Directory
1. Scroll down to **"Root Directory"** section
2. **Clear the field** (make it empty) or set it to `./`
3. **DO NOT** set it to `docs` or any other subdirectory
4. The root directory should be the repository root where `app/`, `package.json`, and `vercel.json` are located

### Step 3: Verify Framework Settings
1. Ensure **Framework Preset** = "Next.js"
2. **Build Command** should be: `npm run build` (or auto-detected)
3. **Output Directory** should be: `.next` (or auto-detected)

### Step 4: Save and Redeploy
1. Click **"Save"** button
2. Go to **Deployments** tab
3. Click **"Redeploy"** on the latest deployment, or trigger a new deployment

## Verification
After redeploying, check:
- Build logs show successful compilation
- Application loads at: https://flex-living-reviews-killerduck93s-projects.vercel.app
- Dashboard displays reviews correctly

## Alternative: Delete and Recreate Project
If the above doesn't work:
1. Delete the project in Vercel dashboard
2. Run: `vercel --prod` from the project root
3. Follow prompts to create a new project
4. Ensure Root Directory is left empty during setup

