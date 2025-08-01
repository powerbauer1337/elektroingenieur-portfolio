# Setup Guide - Elektroingenieur Portfolio

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** for version control
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/elektroingenieur-portfolio.git
cd elektroingenieur-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 📂 Project Structure

```
elektroingenieur-portfolio/
├── 📄 index.html              # Main HTML file
├── 📱 manifest.json           # PWA manifest
├── 🗺️ sitemap.xml            # SEO sitemap
├── 🤖 robots.txt             # Search engine instructions
├── 📦 package.json           # Dependencies & scripts
├── 🔧 sw.js                  # Service Worker
├── 📁 assets/                # Static resources
│   ├── 🖼️ images/            # Images and graphics
│   │   ├── profile/          # Profile photos
│   │   └── projects/         # Project screenshots
│   ├── 📄 docs/              # PDF documents
│   │   ├── cv-max-mueller.pdf
│   │   ├── portfolio-max-mueller.pdf
│   │   └── certifications.pdf
│   └── 🎨 icons/             # PWA icons
├── 🎨 css/                   # Stylesheets
│   ├── main.css              # Main CSS with imports
│   ├── components/           # Component styles
│   │   ├── navigation.css
│   │   ├── hero.css
│   │   ├── projects.css
│   │   ├── skills.css
│   │   ├── experience.css
│   │   ├── contact.css
│   │   └── footer.css
│   └── utils/                # Utilities
│       ├── variables.css     # CSS custom properties
│       ├── reset.css         # CSS reset
│       └── utilities.css     # Utility classes
├── ⚡ js/                    # JavaScript modules
│   ├── main.js               # Main application
│   ├── components/           # UI components
│   │   ├── navigation.js
│   │   ├── projects.js
│   │   └── contact.js
│   └── utils/                # Utilities
│       ├── dom.js            # DOM helpers
│       └── animations.js     # Animation controller
└── 📚 docs/                  # Documentation
    ├── SETUP.md              # This file
    ├── CUSTOMIZATION.md      # Customization guide
    ├── DEPLOYMENT.md         # Deployment guide
    └── API.md                # API reference
```

## ⚙️ Development Environment

### Available Scripts

#### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm start           # Build and serve production version
npm run serve       # Serve production build
```

#### Testing & Quality
```bash
npm test            # Run all tests
npm run lint        # Run all linters
npm run format      # Format code with Prettier
npm run validate    # Validate HTML, CSS, and links
```

#### Specific Tests
```bash
npm run test:html         # Validate HTML
npm run test:css          # Lint CSS
npm run test:js           # Lint JavaScript
npm run test:accessibility # Accessibility audit
npm run test:performance  # Performance audit
```

#### Analysis
```bash
npm run analyze     # Bundle analysis
npm run security    # Security audit
```

### Development Server

The development server provides:
- **Hot reload** for CSS and HTML changes
- **Live server** on `http://localhost:3000`
- **CORS enabled** for API testing
- **Source maps** for debugging

### File Watching

```bash
npm run watch:css   # Watch CSS changes
npm run watch:js    # Watch JavaScript changes
```

## 🔧 Configuration Files

### package.json
Contains all dependencies, scripts, and project metadata.

### PostCSS (postcss.config.js)
- **Autoprefixer** for vendor prefixes
- **PostCSS Preset Env** for future CSS features
- **CSSnano** for production minification

### ESLint (.eslintrc.js)
- ES2022 support
- Browser environment
- Custom rules for code quality

### Stylelint (.stylelintrc.js)
- BEM naming convention enforcement
- Property ordering
- Modern CSS feature support

## 🎯 Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Browserslist Configuration
```
defaults
not IE 11
not op_mini all
maintained node versions
```

### Progressive Enhancement
- Core functionality works without JavaScript
- Graceful degradation for older browsers
- Accessibility features work across all browsers

## 🚨 Troubleshooting

### Common Issues

#### Port 3000 already in use
```bash
# Use different port
npm run dev -- --port 3001
```

#### Node/npm version issues
```bash
# Check versions
node --version    # Should be 16+
npm --version     # Should be 8+

# Update npm
npm install -g npm@latest
```

#### Permission errors on Windows
```bash
# Run as administrator or use:
npm install --no-optional
```

#### CSS not loading
1. Check file paths in `css/main.css`
2. Verify PostCSS configuration
3. Clear browser cache

#### JavaScript errors
1. Check browser developer console
2. Verify ES module support
3. Check for syntax errors with linter

### Performance Issues

#### Slow build times
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

#### Large bundle size
```bash
# Analyze bundle
npm run analyze
```

### Development Tips

#### Hot Reload Not Working
1. Check if files are being watched correctly
2. Verify server is running on correct port
3. Clear browser cache

#### Linting Errors
```bash
# Auto-fix most issues
npm run lint:css -- --fix
npm run lint:js -- --fix
```

## 🌐 Environment Variables

Create `.env.local` for local configuration:
```env
# Development
NODE_ENV=development
PORT=3000

# Analytics (optional)
GA_TRACKING_ID=your-ga-id

# API URLs (if needed)
API_BASE_URL=http://localhost:3001/api
```

## 🔒 Security Considerations

### Content Security Policy
Configured in HTML meta tags for XSS protection.

### HTTPS in Production
Always use HTTPS in production environments.

### Environment Secrets
Never commit sensitive data to version control.

## 📱 PWA Testing

### Install PWA Locally
1. Open Chrome DevTools
2. Go to Application tab
3. Click "Manifest" to verify PWA configuration
4. Use "Add to homescreen" to test installation

### Service Worker Testing
1. Open Chrome DevTools
2. Go to Application > Service Workers
3. Test offline functionality
4. Clear cache to test updates

## 🎨 Customization Quick Start

### Change Colors
Edit `css/utils/variables.css`:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-secondary;
}
```

### Update Content
1. Edit `index.html` for text content
2. Replace images in `assets/images/`
3. Update `manifest.json` for PWA details

### Add New Sections
1. Add HTML structure
2. Create CSS component file
3. Add JavaScript functionality if needed
4. Import new CSS in `css/main.css`

For detailed customization instructions, see [CUSTOMIZATION.md](CUSTOMIZATION.md).

## 📈 Performance Targets

### Core Web Vitals
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## 🆘 Getting Help

### Documentation
- [Customization Guide](CUSTOMIZATION.md)
- [Deployment Guide](DEPLOYMENT.md)
- [API Reference](API.md)

### Community Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [Can I Use](https://caniuse.com/)

### Issues and Support
If you encounter issues:
1. Check this documentation
2. Review browser console for errors
3. Verify your environment meets prerequisites
4. Create an issue on GitHub with:
   - Operating system and version
   - Node.js and npm versions
   - Browser and version
   - Error messages and screenshots