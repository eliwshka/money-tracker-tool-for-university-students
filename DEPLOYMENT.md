# 🚀 Deploy University Money Tracker to Vercel

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

1. **Create a GitHub repository:**
   - Go to [GitHub.com](https://github.com) and create a new repository
   - Name it `university-money-tracker` (or any name you prefer)
   - Don't initialize with README (we already have one)

2. **Push your code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/university-money-tracker.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account

2. **Import Project:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Configure Deployment:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `out` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Get your live URL!

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd /Users/aliyessenbek/Desktop/money-tracking-tool
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **What's your project's name?** → university-money-tracker
- **In which directory is your code located?** → ./

### Step 3: Production Deploy
```bash
vercel --prod
```

## 🎯 **Deployment Configuration**

Your project is already configured for Vercel deployment with:

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

## ✅ **What Happens After Deployment**

1. **Automatic Builds:** Every push to main branch triggers a new deployment
2. **Custom Domain:** You can add a custom domain in Vercel dashboard
3. **Environment Variables:** No additional setup needed (uses localStorage)
4. **Performance:** Static export for optimal loading speed

## 🔧 **Troubleshooting**

### Build Errors
- **Tailwind CSS not working:** Make sure `postcss.config.js` is present
- **TypeScript errors:** Run `npm run build` locally first
- **Missing dependencies:** Check `package.json` has all required packages

### Common Issues
- **404 on refresh:** This is normal for static exports, users should use navigation
- **Local storage not working:** This is expected - data is client-side only
- **Slow loading:** Static export is optimized for speed

## 📱 **Testing Your Deployment**

1. **Visit your Vercel URL**
2. **Test all features:**
   - Add transactions (income/expense)
   - Create budgets
   - Check dashboard overview
   - Test filtering and search

3. **Mobile testing:**
   - Open on phone/tablet
   - Test responsive design
   - Verify touch interactions

## 🎉 **Success!**

Your University Money Tracker is now live and accessible to anyone with the URL!

### Features Available:
- ✅ Dashboard with financial overview
- ✅ Income/expense tracking with student categories
- ✅ Budget management with real-time calculations
- ✅ Transaction history with filtering
- ✅ Responsive design for all devices
- ✅ Local storage for privacy
- ✅ No server required

### Next Steps:
- Share the URL with friends/classmates
- Add to bookmarks for easy access
- Consider adding a custom domain
- Set up automatic deployments for updates

---

**Need help?** Check the [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
