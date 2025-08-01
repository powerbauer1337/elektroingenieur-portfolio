# Elektroingenieur Portfolio - Max Müller

Ein modernes, professionelles Portfolio für Elektroingenieure, das mit Vanilla JavaScript, modernem CSS und Best Practices der Webentwicklung erstellt wurde.

## 🚀 Features

### ⚡ Performance & Technologie
- **Lighthouse Score 95+** in allen Kategorien
- Vanilla JavaScript ES2024 mit modularer Architektur
- Modernes CSS mit Grid, Flexbox und Custom Properties
- Progressive Web App (PWA) Funktionalität
- Lazy Loading für optimale Performance
- Service Worker für Offline-Funktionalität

### 🎨 Design & UX
- Responsive Design (Mobile-First)
- Smooth Scrolling und Animationen
- Dark Mode Support
- WCAG 2.1 AA konform
- Moderne BEM-CSS-Architektur
- Container Queries für responsive Komponenten

### 🔧 Branchenspezifisch
- Power Systems & Energy Engineering Projekte
- Industrial Automation & Control Systems
- PCB Design & Hardware Development
- IoT & Embedded Systems Showcases
- Quantifizierte Projekterfolge und KPIs
- Professionelle Zertifizierungen (PE, CEM, PMP)

## 📁 Projektstruktur

```
elektroingenieur-portfolio/
├── index.html                 # Hauptseite
├── manifest.json             # PWA Manifest
├── sitemap.xml              # SEO Sitemap
├── robots.txt               # Suchmaschinen-Anweisungen
├── package.json             # Dependencies und Scripts
├── assets/                  # Statische Ressourcen
│   ├── images/             # Bilder und Icons
│   ├── docs/              # PDF-Dokumente
│   └── icons/             # PWA-Icons
├── css/                    # Modulare Stylesheets
│   ├── main.css           # Haupt-CSS mit Importen
│   ├── components/        # Komponenten-Styles
│   └── utils/            # Variablen und Utilities
├── js/                    # JavaScript-Module
│   ├── main.js           # Hauptanwendung
│   ├── components/       # UI-Komponenten
│   └── utils/           # Utility-Funktionen
└── docs/                # Dokumentation
```

## 🛠 Installation & Setup

### Voraussetzungen
- Node.js 16+ 
- npm 8+

### Schnellstart
```bash
# Repository klonen
git clone https://github.com/maxmueller-ee/elektroingenieur-portfolio.git
cd elektroingenieur-portfolio

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Seite ist dann unter `http://localhost:3000` verfügbar.

## 📜 Verfügbare Scripts

### Entwicklung
```bash
npm run dev          # Entwicklungsserver mit Hot Reload
npm run build        # Produktions-Build erstellen
npm start           # Build und Server starten
npm run serve       # Production Server
```

### Code-Qualität
```bash
npm run lint        # Alle Code-Linter ausführen
npm run test        # Vollständige Test-Suite
npm run format      # Code formatieren mit Prettier
npm run validate    # HTML, CSS und Links validieren
```

### Performance & Testing
```bash
npm run test:accessibility    # Pa11y Accessibility Tests
npm run test:performance     # Lighthouse Performance Audit
npm run analyze             # Bundle-Analyse
npm run security           # Sicherheitsaudit
```

### Deployment
```bash
npm run deploy:netlify      # Netlify Deployment
npm run deploy:github       # GitHub Pages
npm run deploy:vercel       # Vercel Deployment
```

## 🎯 Performance-Optimierungen

### Core Web Vitals Zielwerte
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Implementierte Optimierungen
- Critical CSS inline, Non-critical asynchron
- Lazy Loading für Bilder und Komponenten
- Service Worker für Caching
- Minifizierung und Komprimierung
- Moderne Bildformate (WebP, AVIF)

## ♿ Accessibility Features

- WCAG 2.1 AA konform
- Vollständige Tastaturnavigation
- Screen Reader optimiert
- Ausreichende Farbkontraste
- Focus Management
- ARIA-Labels und semantisches HTML

## 🌐 SEO & Structured Data

- JSON-LD Schema.org Markup
- Open Graph Tags
- Twitter Card Support
- Vollständige Meta-Tags
- XML Sitemap
- Robots.txt optimiert

## 📱 PWA Features

- Web App Manifest
- Service Worker für Offline-Funktionalität
- App-Icons für verschiedene Plattformen
- Installierbare Website-Erfahrung
- Push-Notifications ready

## 🚀 Deployment

### Netlify (Empfohlen)
1. Repository mit Netlify verbinden
2. Build-Einstellungen konfigurieren:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Automatische Deployments bei Git-Push

### GitHub Pages
```bash
npm run deploy:github
```

### Vercel
```bash
npm run deploy:vercel
```

### Eigener Server
- Nginx-Konfiguration in `/docs/nginx.conf`
- SSL-Setup mit Let's Encrypt
- Performance-Optimierungen inkludiert

## 🔧 Anpassung

### Portfolio-Inhalte ändern
1. **HTML**: Projekte, Skills und Erfahrungen in `index.html`
2. **Bilder**: Ersetze Bilder in `/assets/images/`
3. **Dokumente**: CV und Zertifikate in `/assets/docs/`
4. **Manifest**: PWA-Einstellungen in `manifest.json`

### Design anpassen
1. **Farben**: CSS Custom Properties in `/css/utils/variables.css`
2. **Schriften**: Font-Einstellungen in Variables
3. **Layout**: Komponenten-Styles in `/css/components/`

### Funktionalität erweitern
1. **JavaScript**: Module in `/js/components/`
2. **Animationen**: Animation Controller erweitern
3. **Formulare**: Contact Component anpassen

## 🧪 Testing

### Automatisierte Tests
- HTML-Validierung mit html-validate
- CSS-Linting mit Stylelint  
- JavaScript-Linting mit ESLint
- Accessibility-Tests mit Pa11y
- Performance-Audits mit Lighthouse

### Manuelle Tests
- Cross-Browser Testing (Chrome, Firefox, Safari, Edge)
- Mobile Device Testing
- Screen Reader Testing
- Keyboard Navigation Testing

## 📊 Monitoring & Analytics

### Performance Monitoring
- Core Web Vitals Tracking
- Real User Monitoring (RUM)
- Error Reporting konfiguriert

### Analytics Integration
- Google Analytics 4 ready
- Privacy-compliant tracking
- GDPR-konforme Implementation

## 🔒 Sicherheit

### Implementierte Sicherheitsmaßnahmen
- Content Security Policy (CSP)
- Secure Headers Configuration
- XSS-Protection
- CSRF-Mitigation
- HTTPS Enforcement

## 📚 Browser-Unterstützung

```
Chrome >= 90
Firefox >= 88  
Safari >= 14
Edge >= 90
```

### Graceful Degradation
- Fallbacks für ältere Browser
- Progressive Enhancement
- Core-Funktionalität ohne JavaScript

## 🤝 Mitwirken

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Änderungen committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 👨‍💼 Kontakt

**Max Müller**  
Elektroingenieur, PE

- 📧 Email: max.mueller@elektro-portfolio.de
- 💼 LinkedIn: [max-mueller-ee](https://linkedin.com/in/max-mueller-ee)
- 🌐 Website: [max-mueller-portfolio.de](https://max-mueller-portfolio.de)

## 🙏 Danksagungen

- [Modern CSS Reset](https://github.com/hankchizljaw/modern-css-reset)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web.dev Performance Guidelines](https://web.dev/performance/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/)

---

⚡ **Hinweis**: Diese Portfolio-Vorlage ist speziell für Elektroingenieure optimiert und kann einfach an individuelle Bedürfnisse angepasst werden.