# Customization Guide - Elektroingenieur Portfolio

## 🎨 Complete Customization Guide

This guide will help you customize every aspect of the portfolio to match your professional profile and brand.

## 📝 Content Customization

### 1. Personal Information

#### Edit HTML Content (`index.html`)

**Hero Section:**
```html
<!-- Update line ~47 -->
<h1 class="hero__title">
  Your Name
  <span class="hero__subtitle">Your Title, Certifications</span>
</h1>
<p class="hero__description">
  Your professional summary and specializations...
</p>
```

**Contact Information:**
```html
<!-- Update lines ~380-420 -->
<a href="mailto:your-email@domain.com">your-email@domain.com</a>
<a href="tel:+1234567890">+1 234 567 890</a>
<span class="contact__text">Your City, Country</span>
<a href="https://linkedin.com/in/your-profile">linkedin.com/in/your-profile</a>
```

#### Update Meta Tags

```html
<!-- Lines ~6-15 -->
<meta name="description" content="Your professional description">
<meta name="keywords" content="your,keywords,electrical,engineering">
<meta name="author" content="Your Name">

<!-- Open Graph -->
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:url" content="https://your-domain.com">
```

### 2. Projects Section

#### Add Your Projects

Replace the existing project cards starting around line ~100:

```html
<article class="project-card">
  <div class="project-card__image">
    <img src="assets/images/projects/your-project.jpg" 
         alt="Your Project Description" loading="lazy">
  </div>
  <div class="project-card__content">
    <h3 class="project-card__title">Your Project Title</h3>
    <p class="project-card__description">
      Detailed description of your project, technologies used, 
      and impact achieved...
    </p>
    <div class="project-card__tech">
      <span class="tech-tag">Technology 1</span>
      <span class="tech-tag">Technology 2</span>
      <span class="tech-tag">Technology 3</span>
    </div>
    <div class="project-card__metrics">
      <div class="metric">
        <span class="metric__value">Your KPI</span>
        <span class="metric__label">Metric Label</span>
      </div>
      <div class="metric">
        <span class="metric__value">Achievement</span>
        <span class="metric__label">Impact Measure</span>
      </div>
    </div>
  </div>
</article>
```

#### Project Categories

Add filtering by adding data attributes:
```html
<article class="project-card" data-category="power-systems">
  <!-- Project content -->
</article>
```

Activate filters by adding filter buttons:
```html
<div class="projects__filter">
  <button class="projects__filter-btn projects__filter-btn--active" data-filter="all">
    Alle
  </button>
  <button class="projects__filter-btn" data-filter="power-systems">
    Power Systems
  </button>
  <button class="projects__filter-btn" data-filter="automation">
    Automation
  </button>
</div>
```

### 3. Skills & Certifications

#### Update Skill Levels

Edit skill percentages around line ~200:

```html
<div class="skill-item">
  <span class="skill-item__name">Your Skill</span>
  <div class="skill-item__bar">
    <div class="skill-item__fill" data-skill="85"></div>
  </div>
</div>
```

#### Add New Skill Categories

```html
<div class="skill-category">
  <h3 class="skill-category__title">Your Skill Category</h3>
  <div class="skill-category__items">
    <!-- Add skill items here -->
  </div>
</div>
```

#### Update Certifications

Replace certification items around line ~280:

```html
<div class="cert-item">
  <div class="cert-item__icon">🏅</div>
  <h4 class="cert-item__title">Your Certification</h4>
  <p class="cert-item__issuer">Issuing Organization</p>
  <p class="cert-item__year">Year</p>
</div>
```

### 4. Experience Timeline

#### Update Work Experience

Replace timeline items starting around line ~320:

```html
<article class="timeline__item timeline__item--current">
  <div class="timeline__marker"></div>
  <div class="timeline__content">
    <div class="timeline__header">
      <h3 class="timeline__title">Your Job Title</h3>
      <span class="timeline__company">Company Name</span>
      <span class="timeline__period">Start Date - Present</span>
    </div>
    <p class="timeline__description">
      Your role description and responsibilities...
    </p>
    <ul class="timeline__achievements">
      <li>Your key achievement 1</li>
      <li>Your key achievement 2</li>
      <li>Your key achievement 3</li>
    </ul>
    <div class="timeline__tech">
      <span class="tech-tag">Technology 1</span>
      <span class="tech-tag">Technology 2</span>
    </div>
  </div>
</article>
```

## 🎨 Visual Customization

### 1. Colors & Branding

#### Primary Color Scheme

Edit `css/utils/variables.css`:

```css
:root {
  /* Main brand colors */
  --color-primary: #1e40af;        /* Your primary color */
  --color-primary-light: #3b82f6;  /* Lighter variant */
  --color-primary-dark: #1e3a8a;   /* Darker variant */
  --color-secondary: #0ea5e9;      /* Secondary accent */
  --color-accent: #f59e0b;         /* Accent color */
}
```

#### Generate Color Palette

Use tools like:
- [Coolors.co](https://coolors.co/) for palette generation
- [Adobe Color](https://color.adobe.com/) for professional palettes
- [Material Design Colors](https://materialui.co/colors/) for consistent colors

#### Test Color Contrast

Ensure WCAG compliance:
- Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Minimum ratio: 4.5:1 for normal text
- Minimum ratio: 3:1 for large text

### 2. Typography

#### Change Fonts

Update CSS variables:
```css
:root {
  --font-family-primary: 'Your Font', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'Your Mono Font', 'Fira Code', monospace;
}
```

#### Add Google Fonts

Add to HTML `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 3. Layout & Spacing

#### Adjust Container Widths

```css
:root {
  --container-sm: 640px;   /* Small screens */
  --container-md: 768px;   /* Medium screens */
  --container-lg: 1024px;  /* Large screens */
  --container-xl: 1280px;  /* Extra large */
  --container-2xl: 1536px; /* 2X large */
}
```

#### Modify Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-4: 1rem;      /* 16px */
  --space-8: 2rem;      /* 32px */
  /* Add custom spacing as needed */
}
```

## 📱 PWA Customization

### 1. App Manifest

Edit `manifest.json`:

```json
{
  "name": "Your Name - Professional Portfolio",
  "short_name": "Your Portfolio",
  "description": "Your professional description",
  "theme_color": "#your-primary-color",
  "background_color": "#ffffff",
  "start_url": "/",
  "icons": [
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### 2. Generate PWA Icons

Use tools like:
- [PWA Icon Generator](https://tools.crawlink.com/tools/pwa-icon-generator/)
- [Favicon.io](https://favicon.io/)

Required sizes:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### 3. App Screenshots

Add to `manifest.json`:
```json
"screenshots": [
  {
    "src": "assets/screenshots/desktop-home.png",
    "sizes": "1280x720",
    "type": "image/png",
    "form_factor": "wide"
  }
]
```

## 🖼️ Image Optimization

### 1. Replace Images

#### Profile Images
- Location: `assets/images/profile/`
- Recommended: 400x400px minimum
- Format: WebP with JPG fallback
- Optimize with tools like [Squoosh](https://squoosh.app/)

#### Project Images
- Location: `assets/images/projects/`
- Recommended: 800x600px (4:3 aspect ratio)
- Use descriptive file names
- Add alt text for accessibility

### 2. Image Optimization Script

Add to `package.json`:
```json
"scripts": {
  "optimize-images": "imagemin assets/images/**/* --out-dir=assets/images/optimized"
}
```

### 3. Lazy Loading

Images are automatically lazy-loaded. For new images:
```html
<img src="assets/images/your-image.jpg" 
     alt="Descriptive alt text" 
     loading="lazy">
```

## 🌐 SEO Customization

### 1. Structured Data

Update JSON-LD in HTML `<head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person", 
  "name": "Your Name",
  "jobTitle": "Your Job Title",
  "description": "Your description",
  "url": "https://your-domain.com",
  "sameAs": [
    "https://linkedin.com/in/your-profile",
    "https://github.com/your-username"
  ]
}
</script>
```

### 2. Sitemap Updates

Edit `sitemap.xml`:
```xml
<url>
  <loc>https://your-domain.com/</loc>
  <lastmod>2024-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1.0</priority>
</url>
```

### 3. Robots.txt

Update `robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

## ⚡ JavaScript Customization

### 1. Contact Form

#### Update Form Action

Edit `js/components/contact.js`:
```javascript
async submitForm(formData) {
  const response = await fetch('/your-form-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  return response.ok;
}
```

#### Add New Form Fields

1. Add HTML input
2. Update validation rules in `contact.js`
3. Style with CSS

### 2. Animation Customization

#### Disable Animations

Add to CSS:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Custom Animations

Add to `css/components/`:
```css
@keyframes your-animation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.your-element {
  animation: your-animation 0.5s ease-out;
}
```

### 3. Add New Components

1. Create HTML structure
2. Add CSS file in `css/components/`
3. Create JS file in `js/components/`
4. Import in respective main files

## 📊 Analytics Integration

### 1. Google Analytics

Add to HTML `<head>`:
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

### 2. Privacy Compliance

Add cookie consent banner and privacy-compliant tracking.

## 🔧 Advanced Customization

### 1. Custom CSS Architecture

#### Add New Utility Classes

In `css/utils/utilities.css`:
```css
.your-utility {
  /* Your styles */
}

.responsive-utility {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .responsive-utility {
    /* Desktop styles */
  }
}
```

#### Component Methodology

Follow BEM convention:
```css
.component-name { }
.component-name__element { }
.component-name--modifier { }
```

### 2. Build Process Customization

#### PostCSS Plugins

Add to `postcss.config.js`:
```javascript
module.exports = {
  plugins: [
    require('your-plugin'),
    // ... existing plugins
  ]
};
```

#### Custom Build Scripts

Add to `package.json`:
```json
"scripts": {
  "your-script": "your-command"
}
```

## ✅ Testing Your Customizations

### 1. Visual Testing
- Test on multiple screen sizes
- Check color contrast
- Verify typography scaling
- Test dark mode (if implemented)

### 2. Functionality Testing
- Test all interactive elements
- Verify form validation
- Check navigation behavior
- Test PWA functionality

### 3. Performance Testing
```bash
npm run test:performance
```

### 4. Accessibility Testing
```bash
npm run test:accessibility
```

## 🚀 Deployment After Customization

1. **Test locally**: `npm run build && npm run serve`
2. **Run quality checks**: `npm run lint && npm test`
3. **Optimize images**: Ensure all images are optimized
4. **Update documentation**: Document your changes
5. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)

## 🎯 Industry-Specific Customization

### Power Systems Engineers
- Emphasize smart grid projects
- Highlight power quality analysis
- Show transmission/distribution experience

### Automation Engineers  
- Focus on PLC programming
- Showcase HMI development
- Highlight process optimization

### PCB Design Engineers
- Display board layouts
- Show component selection expertise
- Emphasize EMC/EMI compliance

### Embedded Systems Engineers
- Highlight microcontroller projects
- Show real-time system experience
- Emphasize IoT connectivity

Remember to keep your content professional, quantify your achievements, and regularly update your portfolio with new projects and skills!