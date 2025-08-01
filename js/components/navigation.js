/**
 * Navigation Component
 * Handles mobile menu, smooth scrolling, and active states
 */

import { DOM } from '../utils/dom.js';

export class Navigation {
  constructor() {
    this.nav = DOM.query('.nav');
    this.menuToggle = DOM.query('.nav__toggle');
    this.menu = DOM.query('.nav__menu');
    this.menuLinks = DOM.queryAll('.nav__link');
    this.sections = DOM.queryAll('section[id]');
    
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    this.scrollDirection = 'up';
    
    this.init();
  }

  init() {
    if (!this.nav) return;

    this.setupEventListeners();
    this.setupScrollSpy();
    this.setupSmoothScrolling();
    this.handleInitialLoad();
  }

  setupEventListeners() {
    // Mobile menu toggle
    if (this.menuToggle) {
      DOM.on(this.menuToggle, 'click', this.toggleMobileMenu.bind(this));
    }

    // Close menu when clicking outside
    DOM.on(document, 'click', (e) => {
      if (this.isMenuOpen && !this.nav.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
        this.menuToggle?.focus();
      }
    });

    // Handle window resize
    DOM.on(window, 'resize', DOM.debounce(() => {
      if (window.innerWidth >= 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, 250));

    // Scroll handling
    DOM.on(window, 'scroll', DOM.throttle(() => {
      this.handleScroll();
    }, 16));

    // Menu link clicks
    this.menuLinks.forEach(link => {
      DOM.on(link, 'click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          this.scrollToSection(href);
          this.closeMobileMenu();
        }
      });
    });
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isMenuOpen = true;
    this.menu?.classList.add('nav__menu--open');
    this.menuToggle?.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstLink = this.menu?.querySelector('.nav__link');
    setTimeout(() => firstLink?.focus(), 300);

    // Animate menu items
    this.animateMenuItems(true);
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.menu?.classList.remove('nav__menu--open');
    this.menuToggle?.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    this.animateMenuItems(false);
  }

  animateMenuItems(show) {
    const menuItems = DOM.queryAll('.nav__item');
    menuItems.forEach((item, index) => {
      if (show) {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      } else {
        item.style.opacity = '';
        item.style.transform = '';
      }
    });
  }

  setupScrollSpy() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveLink(entry.target.id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  updateActiveLink(sectionId) {
    // Remove active class from all links
    this.menuLinks.forEach(link => {
      link.classList.remove('nav__link--active');
    });

    // Add active class to current section link
    const activeLink = DOM.query(`[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add('nav__link--active');
    }
  }

  setupSmoothScrolling() {
    // Handle anchor links in URL
    if (window.location.hash) {
      setTimeout(() => {
        this.scrollToSection(window.location.hash);
      }, 100);
    }
  }

  scrollToSection(hash) {
    const target = DOM.query(hash);
    if (!target) return;

    const navHeight = this.nav?.offsetHeight || 80;
    const targetPosition = target.offsetTop - navHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Update URL without triggering scroll
    history.replaceState(null, null, hash);
  }

  handleScroll() {
    const currentScrollY = window.pageYOffset;
    
    // Determine scroll direction
    if (currentScrollY > this.lastScrollY) {
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }

    // Hide/show navigation on scroll
    this.handleNavigationVisibility(currentScrollY);
    
    // Update navigation background
    this.updateNavigationBackground(currentScrollY);
    
    this.lastScrollY = currentScrollY;
  }

  handleNavigationVisibility(scrollY) {
    if (!this.nav || this.isMenuOpen) return;

    const shouldHide = scrollY > 100 && 
                      this.scrollDirection === 'down' && 
                      scrollY > this.lastScrollY + 5;

    DOM.toggleClass(this.nav, 'nav--hidden', shouldHide);
  }

  updateNavigationBackground(scrollY) {
    if (!this.nav) return;

    const shouldHaveBackground = scrollY > 50;
    DOM.toggleClass(this.nav, 'nav--scrolled', shouldHaveBackground);
  }

  handleInitialLoad() {
    // Set initial active link based on scroll position
    setTimeout(() => {
      const scrollY = window.pageYOffset;
      let activeSection = 'hero'; // default

      this.sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          activeSection = section.id;
        }
      });

      this.updateActiveLink(activeSection);
    }, 100);
  }

  // Keyboard navigation support
  handleKeyboardNavigation(e) {
    if (!this.isMenuOpen) return;

    const menuLinks = Array.from(this.menuLinks);
    const currentIndex = menuLinks.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % menuLinks.length;
        menuLinks[nextIndex]?.focus();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? menuLinks.length - 1 : currentIndex - 1;
        menuLinks[prevIndex]?.focus();
        break;
        
      case 'Home':
        e.preventDefault();
        menuLinks[0]?.focus();
        break;
        
      case 'End':
        e.preventDefault();
        menuLinks[menuLinks.length - 1]?.focus();
        break;
    }
  }

  // Public methods for external control
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getCurrentSection() {
    const scrollY = window.pageYOffset;
    let currentSection = null;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection = section.id;
      }
    });

    return currentSection;
  }

  // Accessibility improvements
  setupAccessibility() {
    // Add aria-current to active link
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const link = mutation.target;
          if (link.classList.contains('nav__link--active')) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        }
      });
    });

    this.menuLinks.forEach(link => {
      observer.observe(link, { attributes: true });
    });

    // Keyboard navigation
    DOM.on(this.menu, 'keydown', this.handleKeyboardNavigation.bind(this));
  }

  // Cleanup
  destroy() {
    // Remove event listeners and observers
    // Implementation would depend on how events are tracked
  }
}

export default Navigation;