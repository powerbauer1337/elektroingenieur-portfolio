# Deployment Guide - Elektroingenieur Portfolio

## 🚀 Complete Deployment Guide

This guide covers multiple deployment options from free hosting to enterprise solutions.

## 📋 Pre-Deployment Checklist

### ✅ Content Review
- [ ] All personal information updated
- [ ] Project descriptions complete and accurate
- [ ] Contact information correct
- [ ] Links working and pointing to correct URLs
- [ ] Images optimized and properly sized
- [ ] PDF documents uploaded and accessible

### ✅ Technical Validation
- [ ] All pages load without errors
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Forms validate and submit correctly
- [ ] SEO meta tags complete
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Performance optimized (Lighthouse score 90+)

### ✅ Testing
```bash
# Run complete test suite
npm test

# Check build process
npm run build

# Test production build locally
npm run serve
```

### ✅ Analytics & Monitoring
- [ ] Google Analytics configured (if desired)
- [ ] Error tracking setup
- [ ] Performance monitoring ready

## 🆓 Free Hosting Options

### 1. Netlify (Recommended)

**Advantages:**
- Free SSL certificates
- Global CDN
- Form handling
- Continuous deployment
- Preview deployments
- Edge functions

**Setup Steps:**

1. **Prepare for deployment**
```bash
npm run build
```

2. **Connect GitHub repository**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

3. **Configure build settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Environment variables** (if needed)
   - Go to Site settings > Environment variables
   - Add any required variables

5. **Custom domain** (optional)
   - Go to Domain management
   - Add your custom domain
   - Configure DNS settings

**Deploy with CLI:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod --dir dist
```

**Continuous Deployment:**
- Automatic deploys on git push
- Branch previews for testing
- Deploy previews for pull requests

### 2. Vercel

**Advantages:**
- Excellent performance
- Edge functions
- Preview deployments
- Zero-config deployments

**Setup:**
1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy
```bash
npm run build
vercel --prod
```

**GitHub Integration:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   ```
   Framework Preset: Other
   Build Command: npm run build  
   Output Directory: dist
   ```

### 3. GitHub Pages

**Advantages:**
- Free for public repositories
- Simple setup
- Integrated with GitHub workflow

**Setup:**

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add deploy script to package.json**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

4. **Configure GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select "gh-pages" branch

**Custom Domain:**
- Add CNAME file with your domain
- Configure DNS to point to GitHub Pages

### 4. Firebase Hosting

**Advantages:**
- Google's global CDN
- Easy integration with other Firebase services
- SSL included

**Setup:**
1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase**
```bash
firebase login
firebase init hosting
```

3. **Configure firebase.json**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. **Deploy**
```bash
npm run build && firebase deploy
```

## 💼 Professional Hosting

### 1. Own VPS/Server

**Advantages:**
- Full control
- Custom server configuration
- Better for enterprise needs

**Requirements:**
- Linux server (Ubuntu 20.04+ recommended)
- Nginx web server
- SSL certificate (Let's Encrypt)
- Domain name

**Setup Steps:**

1. **Server Preparation**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

2. **Upload Files**
```bash
# Build locally
npm run build

# Upload to server (using rsync)
rsync -avz --delete dist/ user@your-server:/var/www/your-domain/
```

3. **Nginx Configuration**
Create `/etc/nginx/sites-available/your-domain`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/your-domain;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/css
        text/javascript
        text/xml
        text/plain
        text/x-component
        application/javascript
        application/x-javascript
        application/json
        application/xml
        application/rss+xml
        application/atom+xml
        font/truetype
        font/opentype
        application/vnd.ms-fontobject
        image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Cache static assets
    location ~* \.(css|js|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Main location
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Handle service worker
    location /sw.js {
        add_header Cache-Control "no-cache";
        proxy_cache_bypass $http_pragma;
        proxy_cache_revalidate on;
        expires off;
        access_log off;
    }
}
```

4. **Enable Site and SSL**
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 2. CDN Integration

**Cloudflare Setup:**
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS encryption
4. Configure caching rules
5. Enable security features

**Performance Optimizations:**
- Enable Brotli compression
- Configure browser cache TTL
- Set up page rules for caching
- Enable HTTP/2

## 🔄 Automated Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Run accessibility tests
      run: npm run test:accessibility

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    # Deploy to Netlify
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
    
    # Alternative: Deploy to GitHub Pages
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Environment Secrets

Add to GitHub repository secrets:
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`
- Any other deployment credentials

## 🌐 Domain Configuration

### DNS Settings

**A Records:**
```
@ -> Your server IP
www -> Your server IP
```

**CNAME Records:**
```
www -> your-domain.com
```

**For Netlify/Vercel:**
Follow their specific DNS configuration guides.

### SSL Certificate

**Let's Encrypt (Free):**
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

**Cloudflare (Free):**
- Enable "Full (strict)" SSL/TLS encryption
- Enable "Always Use HTTPS"
- Configure HSTS

## 📊 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run analyze

# Optimize images
npm run optimize-images

# Minify and compress
npm run build
```

### Server-Side Optimizations

**Enable Gzip/Brotli:**
```nginx
# Gzip
gzip on;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

# Brotli (if available)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml;
```

**HTTP/2:**
```nginx
listen 443 ssl http2;
```

**Cache Headers:**
```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔍 Monitoring & Analytics

### Error Monitoring

**Sentry Integration:**
```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

### Performance Monitoring

**Web Vitals:**
```javascript
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);  
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Analytics

**Google Analytics 4:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Considerations

### HTTPS Enforcement

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### Security Headers

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.google-analytics.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data: https:;
               connect-src 'self' https://www.google-analytics.com;">
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**404 Errors on Refresh:**
Configure server for SPA routing:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**SSL Certificate Issues:**
```bash
# Renew certificates
sudo certbot renew --dry-run
```

**Performance Issues:**
- Check image optimization
- Verify gzip compression
- Analyze bundle size
- Test with Lighthouse

### Testing Deployment

**Local Production Build:**
```bash
npm run build
npm run serve
# Test at http://localhost:8080
```

**Lighthouse Audit:**
```bash
npm run test:performance
```

**Accessibility Check:**
```bash
npm run test:accessibility
```

## 📈 Post-Deployment

### 1. SEO Setup
- Submit sitemap to Google Search Console
- Verify all meta tags are working
- Test rich snippets
- Monitor search rankings

### 2. Performance Monitoring
- Set up Core Web Vitals monitoring
- Configure uptime monitoring
- Monitor error rates
- Track user engagement

### 3. Maintenance
- Regular security updates
- Content updates
- Performance optimization
- Backup strategy

### 4. Continuous Improvement
- A/B testing for conversion optimization
- User feedback collection
- Regular accessibility audits
- Performance benchmarking

## 🎯 Platform-Specific Tips

### Netlify
- Use `_redirects` file for redirects
- Environment variables in dashboard
- Form handling built-in
- Deploy previews for branches

### Vercel  
- `vercel.json` for configuration
- Edge functions for dynamic content
- Automatic HTTPS
- Integration with analytics

### GitHub Pages
- Only static files
- Custom domain via CNAME
- HTTPS automatically enabled
- Branch-based deployment

Remember: Always test your deployment thoroughly before announcing your portfolio to the world!