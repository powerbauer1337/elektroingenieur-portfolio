# API Reference - Elektroingenieur Portfolio

## 📚 JavaScript API Documentation

This document provides a complete reference for all JavaScript classes, methods, and utilities in the portfolio.

## 🎯 Core Classes

### DOM Utility Class

Location: `js/utils/dom.js`

The DOM class provides a comprehensive set of utilities for DOM manipulation and event handling.

#### Static Methods

##### `DOM.query(selector, context)`
Query selector with error handling.

**Parameters:**
- `selector` (string): CSS selector
- `context` (Element, optional): Search context (default: document)

**Returns:** Element|null

**Example:**
```javascript
const nav = DOM.query('.nav');
const menuItems = DOM.query('.nav__item', nav);
```

##### `DOM.queryAll(selector, context)`
Query all elements with error handling.

**Parameters:**
- `selector` (string): CSS selector  
- `context` (Element, optional): Search context (default: document)

**Returns:** NodeList

**Example:**
```javascript
const cards = DOM.queryAll('.project-card');
```

##### `DOM.create(tag, attributes, children)`
Create element with attributes and children.

**Parameters:**
- `tag` (string): HTML tag name
- `attributes` (Object): Element attributes
- `children` (Array|string|Element): Child elements or text

**Returns:** Element

**Example:**
```javascript
const button = DOM.create('button', {
  className: 'btn btn--primary',
  'aria-label': 'Submit form',
  textContent: 'Submit'
});

const container = DOM.create('div', { className: 'container' }, [
  DOM.create('h2', {}, 'Title'),
  DOM.create('p', {}, 'Description')
]);
```

##### `DOM.on(element, event, handler, options)`
Add event listener with automatic cleanup.

**Parameters:**
- `element` (Element): Target element
- `event` (string): Event type
- `handler` (Function): Event handler
- `options` (Object, optional): Event options

**Returns:** Function (cleanup function)

**Example:**
```javascript
const cleanup = DOM.on(button, 'click', (e) => {
  console.log('Button clicked');
});

// Later: cleanup();
```

##### `DOM.delegate(parent, selector, event, handler)`
Add delegated event listener.

**Parameters:**
- `parent` (Element): Parent element
- `selector` (string): Child selector
- `event` (string): Event type
- `handler` (Function): Event handler

**Returns:** Function (cleanup function)

**Example:**
```javascript
const cleanup = DOM.delegate(document, '.btn', 'click', function(e) {
  // 'this' refers to the clicked button
  console.log('Button clicked:', this);
});
```

##### `DOM.toggleClass(element, className, condition)`
Toggle class with optional condition.

**Parameters:**
- `element` (Element): Target element
- `className` (string): Class name
- `condition` (boolean, optional): Force add/remove

**Example:**
```javascript
DOM.toggleClass(nav, 'nav--open'); // Toggle
DOM.toggleClass(nav, 'nav--open', true); // Force add
DOM.toggleClass(nav, 'nav--open', false); // Force remove
```

##### `DOM.isInViewport(element, threshold)`
Check if element is in viewport.

**Parameters:**
- `element` (Element): Target element
- `threshold` (number, optional): Visibility threshold (0-1, default: 0.1)

**Returns:** boolean

**Example:**
```javascript
if (DOM.isInViewport(element, 0.5)) {
  // Element is 50% visible
  element.classList.add('animate');
}
```

##### `DOM.scrollTo(target, options)`
Smooth scroll to element.

**Parameters:**
- `target` (Element|string): Target element or selector
- `options` (Object, optional): Scroll options

**Example:**
```javascript
DOM.scrollTo('#contact', { offset: 80 });
DOM.scrollTo(element, { behavior: 'smooth', block: 'center' });
```

##### `DOM.debounce(func, wait, immediate)`
Debounce function execution.

**Parameters:**
- `func` (Function): Function to debounce
- `wait` (number): Wait time in milliseconds
- `immediate` (boolean, optional): Execute immediately

**Returns:** Function (debounced function)

**Example:**
```javascript
const debouncedResize = DOM.debounce(() => {
  console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);
```

##### `DOM.throttle(func, limit)`
Throttle function execution.

**Parameters:**
- `func` (Function): Function to throttle
- `limit` (number): Time limit in milliseconds

**Returns:** Function (throttled function)

**Example:**
```javascript
const throttledScroll = DOM.throttle(() => {
  console.log('Scrolled');
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);
```

---

### AnimationController Class

Location: `js/utils/animations.js`

Handles scroll animations, intersection observers, and CSS animations.

#### Constructor

```javascript
const animationController = new AnimationController();
```

#### Methods

##### `animateElement(element)`
Animate element when it enters viewport.

**Parameters:**
- `element` (Element): Element to animate

**Example:**
```javascript
animationController.animateElement(document.querySelector('.hero'));
```

##### `animateCounter(element, start, end, duration, suffix)`
Animate counter numbers.

**Parameters:**
- `element` (Element): Target element
- `start` (number): Start number
- `end` (number): End number  
- `duration` (number): Animation duration in ms
- `suffix` (string, optional): Text suffix

**Example:**
```javascript
animationController.animateCounter(
  document.querySelector('.stat'), 
  0, 
  100, 
  2000, 
  '%'
);
```

##### `createFloatingAnimation(element, options)`
Create floating animation.

**Parameters:**
- `element` (Element): Element to animate
- `options` (Object): Animation options

**Options:**
- `duration` (number): Animation duration (default: 3000)
- `distance` (number): Float distance (default: 10)
- `direction` (string): 'vertical' or 'horizontal' (default: 'vertical')

**Example:**
```javascript
animationController.createFloatingAnimation(icon, {
  duration: 4000,
  distance: 15,
  direction: 'vertical'
});
```

##### `createStaggeredAnimation(elements, options)`
Create staggered animations for multiple elements.

**Parameters:**
- `elements` (NodeList): Elements to animate
- `options` (Object): Animation options

**Options:**
- `delay` (number): Delay between animations (default: 100)
- `animation` (string): Animation name (default: 'fadeInUp')
- `duration` (number): Animation duration (default: 600)

**Example:**
```javascript
const cards = document.querySelectorAll('.project-card');
animationController.createStaggeredAnimation(cards, {
  delay: 150,
  animation: 'slideInUp',
  duration: 800
});
```

---

### Navigation Class

Location: `js/components/navigation.js`

Handles mobile menu, smooth scrolling, and active states.

#### Constructor

```javascript
const navigation = new Navigation();
```

#### Methods

##### `scrollToSection(hash)`
Scroll to section by hash.

**Parameters:**
- `hash` (string): Section hash (e.g., '#projects')

**Example:**
```javascript
navigation.scrollToSection('#contact');
```

##### `closeMobileMenu()`
Close mobile menu programmatically.

**Example:**
```javascript
navigation.closeMobileMenu();
```

##### `getCurrentSection()`
Get currently active section ID.

**Returns:** string

**Example:**
```javascript
const currentSection = navigation.getCurrentSection();
console.log('Current section:', currentSection);
```

---

### Projects Class

Location: `js/components/projects.js`

Handles project filtering, animations, and interactions.

#### Constructor

```javascript
const projects = new Projects();
```

#### Methods

##### `filterProjects(filter)`
Filter projects by category.

**Parameters:**
- `filter` (string): Filter category or 'all'

**Example:**
```javascript
projects.filterProjects('power-systems');
projects.filterProjects('all');
```

##### `showProject(projectId)`
Show specific project modal.

**Parameters:**
- `projectId` (string): Project ID

**Example:**
```javascript
projects.showProject('smart-grid-project');
```

##### `getFilteredProjects()`
Get currently filtered projects.

**Returns:** Array<Element>

**Example:**
```javascript
const visibleProjects = projects.getFilteredProjects();
console.log(`${visibleProjects.length} projects visible`);
```

---

### Contact Class  

Location: `js/components/contact.js`

Handles contact form validation, submission, and interactions.

#### Constructor

```javascript
const contact = new Contact();
```

#### Methods

##### `validateField(input)`
Validate individual form field.

**Parameters:**
- `input` (Element): Input element to validate

**Returns:** boolean

**Example:**
```javascript
const emailInput = document.querySelector('#email');
const isValid = contact.validateField(emailInput);
```

##### `validateForm()`
Validate entire form.

**Returns:** boolean

**Example:**
```javascript
if (contact.validateForm()) {
  // Form is valid, can submit
}
```

##### `focusFirstField()`
Focus first form field.

**Example:**
```javascript
contact.focusFirstField();
```

##### `setFieldValue(fieldName, value)`
Set field value and validate.

**Parameters:**
- `fieldName` (string): Field name
- `value` (string): Field value

**Example:**
```javascript
contact.setFieldValue('email', 'user@example.com');
```

---

## 🎨 CSS Custom Properties

### Color Variables

```css
:root {
  /* Primary Colors */
  --color-primary: #1e40af;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1e3a8a;
  --color-secondary: #0ea5e9;
  --color-accent: #f59e0b;
  
  /* Text Colors */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  
  /* Background Colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
}
```

### Typography Variables

```css
:root {
  /* Font Families */
  --font-family-primary: 'Inter', sans-serif;
  --font-family-mono: 'Fira Code', monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Spacing Variables  

```css
:root {
  /* Spacing Scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Layout Variables

```css
:root {
  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## 🎬 Animation Classes

### Fade Animations

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Slide Animations

```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Scale Animations

```css
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## 🎯 Utility Classes

### Display Utilities

```css
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.hidden { display: none; }
```

### Flexbox Utilities

```css
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
```

### Spacing Utilities

```css
.m-0 { margin: var(--space-0); }
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-4 { margin: var(--space-4); }
.m-8 { margin: var(--space-8); }

.p-0 { padding: var(--space-0); }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-4 { padding: var(--space-4); }
.p-8 { padding: var(--space-8); }
```

### Text Utilities

```css
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }

.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }
```

## 🔧 Configuration Objects

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
```

### Stylelint Configuration

```javascript
// .stylelintrc.js
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+)?$',
    'custom-property-pattern': '^[a-z]([a-z0-9-]+)*$'
  }
};
```

### PostCSS Configuration

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true
      }
    }),
    require('autoprefixer')
  ]
};
```

## 📱 PWA Configuration

### Manifest Structure

```json
{
  "name": "Portfolio Name",
  "short_name": "Portfolio",
  "description": "Professional portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e40af",
  "icons": [
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Service Worker Events

```javascript
// Service Worker API
self.addEventListener('install', event => {
  // Cache installation
});

self.addEventListener('activate', event => {
  // Cache cleanup
});

self.addEventListener('fetch', event => {
  // Request interception
});

self.addEventListener('sync', event => {
  // Background sync
});

self.addEventListener('push', event => {
  // Push notifications
});
```

## 🎯 Event System

### Custom Events

```javascript
// Dispatch custom event
const event = new CustomEvent('portfolio:loaded', {
  detail: { timestamp: Date.now() }
});
document.dispatchEvent(event);

// Listen for custom event
document.addEventListener('portfolio:loaded', (e) => {
  console.log('Portfolio loaded at:', e.detail.timestamp);
});
```

### Available Custom Events

- `portfolio:loaded` - Fired when application is fully initialized
- `navigation:changed` - Fired when active navigation changes
- `project:opened` - Fired when project modal opens
- `form:submitted` - Fired when contact form is submitted
- `animation:complete` - Fired when animations complete

## 🎨 CSS Architecture

### BEM Methodology

```css
/* Block */
.component { }

/* Element */
.component__element { }

/* Modifier */
.component--modifier { }
.component__element--modifier { }
```

### Component Structure

```css
/* Component base styles */
.project-card {
  /* Base styles */
}

/* Component elements */
.project-card__header { }
.project-card__content { }
.project-card__footer { }

/* Component modifiers */
.project-card--featured { }
.project-card--large { }

/* Component states */
.project-card.is-loading { }
.project-card.is-active { }
```

This API reference covers all the main classes, methods, and utilities available in the portfolio. Use it as a guide for customization and extension of the portfolio functionality.