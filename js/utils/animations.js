/**
 * Animation Utilities
 * Handles scroll animations, intersection observers, and CSS animations
 */

import { DOM } from './dom.js';

export class AnimationController {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.handleReducedMotion();
  }

  /**
   * Setup intersection observer for scroll animations
   */
  setupIntersectionObserver() {
    if (this.prefersReducedMotion) return;

    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: [0.1, 0.3, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target);
          this.animatedElements.add(entry.target);
          
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements with animation classes
    const animatableElements = DOM.queryAll('.animate-on-scroll, .skill-item, .project-card, .timeline__item, .cert-item');
    animatableElements.forEach(element => {
      observer.observe(element);
    });

    this.observers.set('scroll', observer);
  }

  /**
   * Animate element when it enters viewport
   * @param {Element} element - Element to animate
   */
  animateElement(element) {
    if (this.prefersReducedMotion) {
      element.classList.add('is-visible');
      return;
    }

    // Add base visibility class
    element.classList.add('is-visible');

    // Handle different element types
    if (element.classList.contains('skill-item')) {
      this.animateSkillBar(element);
    } else if (element.classList.contains('project-card')) {
      this.animateProjectCard(element);
    } else if (element.classList.contains('timeline__item')) {
      this.animateTimelineItem(element);
    } else if (element.classList.contains('cert-item')) {
      this.animateCertItem(element);
    }

    // Generic fade in animation
    if (element.classList.contains('animate-on-scroll')) {
      element.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }
  }

  /**
   * Animate skill progress bars
   * @param {Element} skillItem - Skill item element
   */
  animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-item__fill');
    if (!progressBar) return;

    const skillLevel = progressBar.dataset.skill;
    if (skillLevel) {
      // Animate width
      progressBar.style.setProperty('--skill-percentage', `${skillLevel}%`);
      progressBar.classList.add('animate-skill');
      
      // For circular progress (mobile)
      const circularProgress = skillItem.querySelector('.skill-item__circle');
      if (circularProgress) {
        const angle = (skillLevel / 100) * 360;
        circularProgress.style.setProperty('--skill-angle', `${angle}deg`);
      }
    }

    skillItem.classList.add('animate-in');
  }

  /**
   * Animate project cards
   * @param {Element} projectCard - Project card element
   */
  animateProjectCard(projectCard) {
    projectCard.classList.add('animate-in');
    
    // Animate metrics with counter effect
    const metrics = projectCard.querySelectorAll('.metric__value');
    metrics.forEach(metric => {
      const text = metric.textContent;
      const numbers = text.match(/\d+/);
      if (numbers) {
        const targetNumber = parseInt(numbers[0]);
        this.animateCounter(metric, 0, targetNumber, 1500, text.replace(numbers[0], ''));
      }
    });
  }

  /**
   * Animate timeline items
   * @param {Element} timelineItem - Timeline item element
   */
  animateTimelineItem(timelineItem) {
    timelineItem.classList.add('animate-in');
    
    // Animate achievement list items
    const achievements = timelineItem.querySelectorAll('.timeline__achievements li');
    achievements.forEach((achievement, index) => {
      setTimeout(() => {
        achievement.style.animation = 'slideInLeft 0.4s ease-out forwards';
      }, index * 100);
    });
  }

  /**
   * Animate certification items
   * @param {Element} certItem - Certification item element
   */
  animateCertItem(certItem) {
    certItem.classList.add('animate-in');
  }

  /**
   * Animate counter numbers
   * @param {Element} element - Target element
   * @param {number} start - Start number
   * @param {number} end - End number
   * @param {number} duration - Animation duration
   * @param {string} suffix - Text suffix
   */
  animateCounter(element, start, end, duration, suffix = '') {
    if (this.prefersReducedMotion) {
      element.textContent = end + suffix;
      return;
    }

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  /**
   * Setup scroll-based animations
   */
  setupScrollAnimations() {
    if (this.prefersReducedMotion) return;

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  /**
   * Update scroll-based animations
   */
  updateScrollAnimations() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Parallax effects
    const parallaxElements = DOM.queryAll('[data-parallax]');
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementVisible = (elementTop < scrollY + windowHeight) && (elementTop + rect.height > scrollY);
      
      if (elementVisible) {
        const yPos = -(scrollY - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    });

    // Navigation background on scroll
    const nav = DOM.query('.nav');
    if (nav) {
      const shouldHaveBackground = scrollY > 50;
      DOM.toggleClass(nav, 'nav--scrolled', shouldHaveBackground);
    }

    // Back to top button
    const backToTop = DOM.query('.footer__back-to-top');
    if (backToTop) {
      const shouldShow = scrollY > 300;
      DOM.toggleClass(backToTop, 'show', shouldShow);
    }
  }

  /**
   * Handle reduced motion preference
   */
  handleReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      this.prefersReducedMotion = e.matches;
      
      if (e.matches) {
        // Disable animations
        this.disableAnimations();
      } else {
        // Re-enable animations
        this.enableAnimations();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
  }

  /**
   * Disable all animations
   */
  disableAnimations() {
    const style = document.createElement('style');
    style.id = 'disable-animations';
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Enable animations
   */
  enableAnimations() {
    const style = document.getElementById('disable-animations');
    if (style) {
      style.remove();
    }
  }

  /**
   * Create floating animation
   * @param {Element} element - Element to animate
   * @param {Object} options - Animation options
   */
  createFloatingAnimation(element, options = {}) {
    if (this.prefersReducedMotion || !element) return;

    const defaultOptions = {
      duration: 3000,
      distance: 10,
      direction: 'vertical'
    };

    const config = { ...defaultOptions, ...options };
    
    element.style.animation = `float-${config.direction} ${config.duration}ms ease-in-out infinite`;
    
    // Add CSS animation if not already present
    if (!document.getElementById('floating-animations')) {
      const style = document.createElement('style');
      style.id = 'floating-animations';
      style.textContent = `
        @keyframes float-vertical {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${config.distance}px); }
        }
        @keyframes float-horizontal {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(${config.distance}px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Create staggered animations
   * @param {NodeList} elements - Elements to animate
   * @param {Object} options - Animation options
   */
  createStaggeredAnimation(elements, options = {}) {
    if (this.prefersReducedMotion) return;

    const defaultOptions = {
      delay: 100,
      animation: 'fadeInUp',
      duration: 600
    };

    const config = { ...defaultOptions, ...options };

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.animation = `${config.animation} ${config.duration}ms ease-out forwards`;
        element.classList.add('is-visible');
      }, index * config.delay);
    });
  }

  /**
   * Cleanup observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// CSS Animation Classes
export const AnimationClasses = {
  FADE_IN: 'fadeIn',
  FADE_IN_UP: 'fadeInUp',
  FADE_IN_DOWN: 'fadeInDown',
  FADE_IN_LEFT: 'fadeInLeft',
  FADE_IN_RIGHT: 'fadeInRight',
  SLIDE_IN_UP: 'slideInUp',
  SLIDE_IN_DOWN: 'slideInDown',
  SLIDE_IN_LEFT: 'slideInLeft',
  SLIDE_IN_RIGHT: 'slideInRight',
  ZOOM_IN: 'zoomIn',
  BOUNCE_IN: 'bounceIn',
  PULSE: 'pulse',
  SHAKE: 'shake'
};

// Export default instance
export default new AnimationController();