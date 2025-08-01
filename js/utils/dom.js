/**
 * DOM Utility Functions
 * Modern DOM manipulation and query utilities
 */

export class DOM {
  /**
   * Query selector with error handling
   * @param {string} selector - CSS selector
   * @param {Element} context - Search context (default: document)
   * @returns {Element|null}
   */
  static query(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return null;
    }
  }

  /**
   * Query all elements with error handling
   * @param {string} selector - CSS selector
   * @param {Element} context - Search context (default: document)
   * @returns {NodeList}
   */
  static queryAll(selector, context = document) {
    try {
      return context.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return [];
    }
  }

  /**
   * Create element with attributes and children
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {Array|string|Element} children - Child elements or text
   * @returns {Element}
   */
  static create(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else if (key.startsWith('data-')) {
        element.setAttribute(key, value);
      } else {
        element[key] = value;
      }
    });

    // Add children
    if (typeof children === 'string') {
      element.textContent = children;
    } else if (children instanceof Element) {
      element.appendChild(children);
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof Element) {
          element.appendChild(child);
        }
      });
    }

    return element;
  }

  /**
   * Add event listener with automatic cleanup
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   * @returns {Function} Cleanup function
   */
  static on(element, event, handler, options = {}) {
    if (!element || typeof handler !== 'function') {
      console.warn('Invalid element or handler for event listener');
      return () => {};
    }

    element.addEventListener(event, handler, options);
    
    return () => element.removeEventListener(event, handler, options);
  }

  /**
   * Add delegated event listener
   * @param {Element} parent - Parent element
   * @param {string} selector - Child selector
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @returns {Function} Cleanup function
   */
  static delegate(parent, selector, event, handler) {
    const delegatedHandler = (e) => {
      const target = e.target.closest(selector);
      if (target && parent.contains(target)) {
        handler.call(target, e);
      }
    };

    return this.on(parent, event, delegatedHandler);
  }

  /**
   * Toggle class with optional condition
   * @param {Element} element - Target element
   * @param {string} className - Class name
   * @param {boolean} condition - Force add/remove
   */
  static toggleClass(element, className, condition = undefined) {
    if (!element) return;
    
    if (condition === undefined) {
      element.classList.toggle(className);
    } else {
      element.classList.toggle(className, condition);
    }
  }

  /**
   * Check if element has class
   * @param {Element} element - Target element
   * @param {string} className - Class name
   * @returns {boolean}
   */
  static hasClass(element, className) {
    return element?.classList?.contains(className) || false;
  }

  /**
   * Get element's offset position
   * @param {Element} element - Target element
   * @returns {Object} Position object {top, left}
   */
  static getOffset(element) {
    if (!element) return { top: 0, left: 0 };
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }

  /**
   * Check if element is in viewport
   * @param {Element} element - Target element
   * @param {number} threshold - Visibility threshold (0-1)
   * @returns {boolean}
   */
  static isInViewport(element, threshold = 0.1) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const verticalVisible = (rect.top <= windowHeight - (windowHeight * threshold)) && 
                           ((rect.top + rect.height) >= (windowHeight * threshold));
    const horizontalVisible = (rect.left <= windowWidth - (windowWidth * threshold)) && 
                             ((rect.left + rect.width) >= (windowWidth * threshold));
    
    return verticalVisible && horizontalVisible;
  }

  /**
   * Smooth scroll to element
   * @param {Element|string} target - Target element or selector
   * @param {Object} options - Scroll options
   */
  static scrollTo(target, options = {}) {
    const element = typeof target === 'string' ? this.query(target) : target;
    if (!element) return;

    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      offset: 0
    };

    const scrollOptions = { ...defaultOptions, ...options };
    const elementPosition = this.getOffset(element).top - scrollOptions.offset;

    window.scrollTo({
      top: elementPosition,
      behavior: scrollOptions.behavior
    });
  }

  /**
   * Wait for DOM content loaded
   * @returns {Promise}
   */
  static ready() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      } else {
        resolve();
      }
    });
  }

  /**
   * Wait for element to exist in DOM
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<Element>}
   */
  static waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const element = this.query(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = this.query(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Animate element with CSS classes
   * @param {Element} element - Target element
   * @param {string} animationClass - Animation class name
   * @param {Function} callback - Completion callback
   */
  static animate(element, animationClass, callback = null) {
    if (!element) return;

    const handleAnimationEnd = (e) => {
      if (e.target === element) {
        element.classList.remove(animationClass);
        element.removeEventListener('animationend', handleAnimationEnd);
        if (callback) callback();
      }
    };

    element.addEventListener('animationend', handleAnimationEnd);
    element.classList.add(animationClass);
  }

  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Execute immediately
   * @returns {Function} Debounced function
   */
  static debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  }

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}