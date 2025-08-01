/**
 * Main Application Entry Point
 * Initializes all components and handles global functionality
 */

import { DOM } from './utils/dom.js';
import AnimationController from './utils/animations.js';
import Navigation from './components/navigation.js';
import Projects from './components/projects.js';
import Contact from './components/contact.js';

class PortfolioApp {
  constructor() {
    this.components = {};
    this.isInitialized = false;
    
    this.init();
  }

  async init() {
    try {
      // Wait for DOM to be ready
      await DOM.ready();
      
      // Initialize global settings
      this.setupGlobalSettings();
      
      // Initialize components
      await this.initializeComponents();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Handle initial page state
      this.handleInitialState();
      
      this.isInitialized = true;
      console.log('Portfolio application initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize portfolio application:', error);
    }
  }

  setupGlobalSettings() {
    // Setup viewport meta tag if not present
    if (!DOM.query('meta[name="viewport"]')) {
      const viewport = DOM.create('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      });
      document.head.appendChild(viewport);
    }

    // Setup theme-color meta tag
    if (!DOM.query('meta[name="theme-color"]')) {
      const themeColor = DOM.create('meta', {
        name: 'theme-color',
        content: '#1e40af'
      });
      document.head.appendChild(themeColor);
    }

    // Add no-js/js class handling
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // Setup reduced motion detection
    this.handleReducedMotion();

    // Setup color scheme preference
    this.handleColorScheme();
  }

  async initializeComponents() {
    // Initialize Animation Controller first
    this.components.animations = AnimationController;

    // Initialize Navigation
    if (DOM.query('.nav')) {
      this.components.navigation = new Navigation();
    }

    // Initialize Projects
    if (DOM.query('.projects')) {
      this.components.projects = new Projects();
    }

    // Initialize Contact
    if (DOM.query('.contact')) {
      this.components.contact = new Contact();
    }

    // Initialize other components
    this.initializeSkillsAnimations();
    this.initializeScrollEffects();
    this.initializeLazyLoading();
    this.initializeFormEnhancements();
  }

  initializeSkillsAnimations() {
    const skillBars = DOM.queryAll('.skill-item');
    if (!skillBars.length) return;

    // Setup intersection observer for skill bars
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target.querySelector('.skill-item__fill');
          const skillLevel = skillBar?.dataset.skill;
          
          if (skillLevel) {
            setTimeout(() => {
              skillBar.style.width = `${skillLevel}%`;
              skillBar.classList.add('animate-skill');
            }, 200);
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(skill => observer.observe(skill));
  }

  initializeScrollEffects() {
    let ticking = false;

    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    DOM.on(window, 'scroll', scrollHandler, { passive: true });
  }

  updateScrollEffects() {
    const scrollY = window.pageYOffset;

    // Update progress indicator
    this.updateScrollProgress();

    // Update parallax elements
    this.updateParallaxElements(scrollY);

    // Update back-to-top button
    this.updateBackToTopButton(scrollY);
  }

  updateScrollProgress() {
    const scrollProgress = DOM.query('.scroll-progress');
    if (!scrollProgress) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    scrollProgress.style.width = `${scrollPercent}%`;
  }

  updateParallaxElements(scrollY) {
    const parallaxElements = DOM.queryAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrollY - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  }

  updateBackToTopButton(scrollY) {
    const backToTop = DOM.query('.footer__back-to-top');
    if (!backToTop) return;

    const shouldShow = scrollY > 300;
    DOM.toggleClass(backToTop, 'show', shouldShow);
  }

  initializeLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    // Observe all lazy images
    const lazyImages = DOM.queryAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  initializeFormEnhancements() {
    // Add focus-visible polyfill for older browsers
    if (!CSS.supports('selector(:focus-visible)')) {
      this.addFocusVisiblePolyfill();
    }

    // Enhance all forms with better UX
    const forms = DOM.queryAll('form');
    forms.forEach(form => {
      this.enhanceForm(form);
    });
  }

  enhanceForm(form) {
    // Add floating labels
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (input.type !== 'submit' && input.type !== 'button') {
        this.addFloatingLabel(input);
      }
    });

    // Add input validation indicators
    const validatableInputs = form.querySelectorAll('input[required], textarea[required]');
    validatableInputs.forEach(input => {
      DOM.on(input, 'invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
      });

      DOM.on(input, 'input', () => {
        if (input.validity.valid) {
          input.classList.remove('error');
          input.classList.add('success');
        }
      });
    });
  }

  addFloatingLabel(input) {
    const wrapper = input.parentNode;
    const label = wrapper.querySelector('label');
    
    if (!label) return;

    const updateLabelState = () => {
      const hasValue = input.value.length > 0;
      const isFocused = document.activeElement === input;
      
      DOM.toggleClass(label, 'floating', hasValue || isFocused);
    };

    DOM.on(input, 'focus', updateLabelState);
    DOM.on(input, 'blur', updateLabelState);
    DOM.on(input, 'input', updateLabelState);

    // Initial state
    updateLabelState();
  }

  addFocusVisiblePolyfill() {
    // Simple focus-visible polyfill
    let isKeyboardUser = false;

    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Tab') {
        isKeyboardUser = true;
      }
    });

    DOM.on(document, 'mousedown', () => {
      isKeyboardUser = false;
    });

    DOM.on(document, 'focusin', (e) => {
      if (isKeyboardUser) {
        e.target.classList.add('focus-visible');
      }
    });

    DOM.on(document, 'focusout', (e) => {
      e.target.classList.remove('focus-visible');
    });
  }

  setupGlobalEvents() {
    // Handle window resize
    DOM.on(window, 'resize', DOM.debounce(() => {
      this.handleResize();
    }, 250));

    // Handle visibility change
    DOM.on(document, 'visibilitychange', () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });

    // Handle online/offline status
    DOM.on(window, 'online', () => {
      this.handleOnlineStatus(true);
    });

    DOM.on(window, 'offline', () => {
      this.handleOnlineStatus(false);
    });

    // Global keyboard shortcuts
    DOM.on(document, 'keydown', (e) => {
      this.handleGlobalKeyboard(e);
    });

    // Handle print
    DOM.on(window, 'beforeprint', () => {
      document.body.classList.add('printing');
    });

    DOM.on(window, 'afterprint', () => {
      document.body.classList.remove('printing');
    });
  }

  handleResize() {
    // Update viewport height for mobile browsers
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Trigger resize event for components
    Object.values(this.components).forEach(component => {
      if (component && typeof component.handleResize === 'function') {
        component.handleResize();
      }
    });
  }

  handlePageHidden() {
    // Pause animations or timers when page is hidden
    if (this.components.animations) {
      // Implementation would depend on animation controller
    }
  }

  handlePageVisible() {
    // Resume animations when page becomes visible
    if (this.components.animations) {
      // Implementation would depend on animation controller
    }
  }

  handleOnlineStatus(isOnline) {
    // Show/hide offline indicator
    const offlineIndicator = DOM.query('.offline-indicator');
    if (offlineIndicator) {
      DOM.toggleClass(offlineIndicator, 'show', !isOnline);
    }

    // Update components
    Object.values(this.components).forEach(component => {
      if (component && typeof component.handleOnlineStatus === 'function') {
        component.handleOnlineStatus(isOnline);
      }
    });
  }

  handleGlobalKeyboard(e) {
    // Escape key - close modals, menus, etc.
    if (e.key === 'Escape') {
      const openModal = DOM.query('.modal.show, .project-modal--show');
      if (openModal) {
        // Let the modal handle its own closing
        return;
      }

      // Close mobile menu if open
      if (this.components.navigation) {
        this.components.navigation.closeMobileMenu();
      }
    }

    // Ctrl/Cmd + K - Focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = DOM.query('[data-search]');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }

  handleInitialState() {
    // Handle initial scroll position
    if (window.location.hash) {
      setTimeout(() => {
        const target = DOM.query(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }

    // Set initial viewport height
    this.handleResize();

    // Trigger initial scroll effects
    this.updateScrollEffects();
  }

  handleReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateMotionPreference = (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    };

    updateMotionPreference(mediaQuery);
    mediaQuery.addEventListener('change', updateMotionPreference);
  }

  handleColorScheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateColorScheme = (e) => {
      document.documentElement.classList.toggle('dark-mode', e.matches);
    };

    updateColorScheme(mediaQuery);
    mediaQuery.addEventListener('change', updateColorScheme);
  }

  // Public API
  getComponent(name) {
    return this.components[name];
  }

  isReady() {
    return this.isInitialized;
  }

  // Debug methods
  debug() {
    return {
      components: Object.keys(this.components),
      isInitialized: this.isInitialized,
      version: '1.0.0'
    };
  }
}

// Initialize application
const app = new PortfolioApp();

// Export for global access
window.Portfolio = app;

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

export default app;