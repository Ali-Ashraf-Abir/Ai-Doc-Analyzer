# Deployment Guide

Complete guide for deploying AI Document Analyzer to production.

## Prerequisites

- [x] GitHub account
- [x] Vercel account (free tier)
- [x] Groq API key ([Get it here](https://console.groq.com))
- [x] Git installed locally

## Quick Deploy to Vercel (Recommended)

### Step 1: Get Your Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to "API Keys" section
4. Click "Create API Key"
5. Copy your key (starts with `gsk_`)

### Step 2: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (replace with your repo)
git remote add origin https://github.com/YOUR_USERNAME/ai-document-analyzer.git

# Push
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Key: `GROQ_API_KEY`
   - Value: Your Groq API key
   - Environment: All (Production, Preview, Development)

6. Click "Deploy"

**Done! Your app will be live in ~2 minutes** 🎉

---

## Alternative Deployment Options

### Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import from Git"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Add environment variable:
   - `GROQ_API_KEY`: Your API key
7. Deploy

### Deploy to Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add environment variable:
   - `GROQ_API_KEY`: Your API key
6. Railway will auto-detect Next.js and deploy

### Self-Hosting (VPS/Cloud)

#### Requirements
- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)
- SSL certificate (Let's Encrypt)

#### Setup Steps

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/ai-document-analyzer.git
cd ai-document-analyzer

# 2. Install dependencies
npm install

# 3. Create production .env
echo "GROQ_API_KEY=your_key_here" > .env

# 4. Build application
npm run build

# 5. Install PM2 globally
npm install -g pm2

# 6. Start with PM2
pm2 start npm --name "doc-analyzer" -- start

# 7. Setup PM2 to start on boot
pm2 startup
pm2 save

# 8. Configure Nginx (see below)
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Your Groq API key | `gsk_xxxxxxxxxxxxx` |

### Optional Variables (Future)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Your app URL | `http://localhost:3000` |
| `MAX_FILE_SIZE` | Max upload size | `10485760` (10MB) |
| `RATE_LIMIT_REQUESTS` | Max requests/minute | `30` |

---

## Post-Deployment Checklist

### ✅ Functionality Tests

- [ ] Homepage loads correctly
- [ ] Landing page displays properly
- [ ] File upload works (PDF)
- [ ] File upload works (DOCX)
- [ ] Document analysis completes
- [ ] Chat functionality works
- [ ] Image generation works
- [ ] Export JSON works
- [ ] Export TXT works
- [ ] History saves and loads
- [ ] Mobile responsive
- [ ] All links work

### ✅ Performance Tests

- [ ] Page load < 3 seconds
- [ ] Analysis completes < 15 seconds
- [ ] Chat response < 5 seconds
- [ ] No console errors
- [ ] No memory leaks

### ✅ Security Tests

- [ ] API key not exposed
- [ ] HTTPS enabled
- [ ] File validation works
- [ ] Size limits enforced
- [ ] Error handling secure

---

## Monitoring & Analytics

### Setup Vercel Analytics (Free)

1. In Vercel dashboard, go to your project
2. Click "Analytics" tab
3. Enable Analytics
4. View real-time traffic and performance

### Setup Google Analytics (Optional)

```typescript
// Add to src/app/layout.tsx
export const metadata = {
  // ... existing metadata
  other: {
    'google-site-verification': 'your-code-here',
  },
};

// Add GA script in layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### Setup Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

---

## Custom Domain Setup

### Vercel Custom Domain

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   
   OR
   
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

5. Wait for DNS propagation (5-30 minutes)
6. SSL certificate auto-issued by Vercel

---

## Scaling Considerations

### Free Tier Limits

**Vercel Free Tier:**
- 100 GB bandwidth/month
- 100 hours serverless function execution
- Unlimited deployments
- 10 team members

**Groq Free Tier:**
- 30 requests/minute
- 14,400 requests/day
- Rate limiting applies

### When to Upgrade

Upgrade when you reach:
- 1000+ daily users
- Rate limit errors
- Bandwidth limits
- Need for team features

### Optimization Tips

1. **Enable Caching**
```typescript
// In API routes
export const dynamic = 'force-dynamic'; // or 'force-static'
```

2. **Implement Rate Limiting**
```typescript
// Use upstash/ratelimit
import { Ratelimit } from "@upstash/ratelimit";
```

3. **Optimize Bundle Size**
```bash
npm run build
# Check .next/analyze output
```

---

## Troubleshooting Deployment

### Common Issues

**1. Build Fails**
```
Error: Cannot find module 'X'
```
**Solution**: Run `npm install` locally and push package-lock.json

**2. API Key Not Found**
```
Error: GROQ_API_KEY is not defined
```
**Solution**: Add environment variable in Vercel dashboard

**3. Large Bundle Size**
```
Warning: Bundle size exceeds recommended limit
```
**Solution**: Implement code splitting and lazy loading

**4. Slow Cold Starts**
```
First request takes 5+ seconds
```
**Solution**: This is normal for serverless. Consider upgrading plan.

**5. CORS Errors**
```
Access to fetch has been blocked by CORS policy
```
**Solution**: Next.js handles CORS automatically. Check API route configuration.

---

## Rollback Strategy

### Rollback on Vercel

1. Go to "Deployments" tab
2. Find previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

### Rollback on Self-Hosted

```bash
# View PM2 processes
pm2 list

# Stop application
pm2 stop doc-analyzer

# Pull previous version
git checkout <previous-commit-hash>

# Rebuild
npm run build

# Restart
pm2 restart doc-analyzer
```

---

## Backup Strategy

### Code Backup
- ✅ GitHub repository (automatic)
- ✅ Git branches for features
- ✅ Regular commits

### User Data
- ⚠️ Client-side only (localStorage)
- No server-side backup needed
- Users responsible for exports

### Configuration
- ✅ .env.example in repo
- ✅ Document environment variables
- ✅ Keep deployment notes

---

## CI/CD Pipeline (Optional)

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test # when tests are added
```

---

## Support & Maintenance

### Regular Tasks
- **Weekly**: Check error logs
- **Monthly**: Update dependencies
- **Quarterly**: Review analytics
- **Yearly**: Security audit

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Or use npm-check-updates
npx npm-check-updates -u
npm install
```

---

## Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Need Help?** Open an issue on GitHub or contact the maintainer.

**Last Updated**: November 2024