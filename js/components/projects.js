/**
 * Projects Component
 * Handles project filtering, animations, and interactions
 */

import { DOM } from '../utils/dom.js';
import { AnimationController } from '../utils/animations.js';

export class Projects {
  constructor() {
    this.projectsContainer = DOM.query('.projects__grid');
    this.projectCards = DOM.queryAll('.project-card');
    this.filterButtons = DOM.queryAll('.projects__filter-btn');
    
    this.currentFilter = 'all';
    this.animationController = new AnimationController();
    
    this.init();
  }

  init() {
    if (!this.projectCards.length) return;

    this.setupEventListeners();
    this.setupProjectInteractions();
    this.setupLazyLoading();
    this.initializeProjects();
  }

  setupEventListeners() {
    // Filter buttons
    this.filterButtons.forEach(button => {
      DOM.on(button, 'click', (e) => {
        e.preventDefault();
        const filter = button.dataset.filter || 'all';
        this.filterProjects(filter);
        this.updateActiveFilter(button);
      });
    });

    // Project card interactions
    this.projectCards.forEach(card => {
      this.setupCardInteractions(card);
    });

    // Keyboard navigation for project grid
    DOM.on(this.projectsContainer, 'keydown', this.handleKeyboardNavigation.bind(this));
  }

  setupCardInteractions(card) {
    // Hover effects
    DOM.on(card, 'mouseenter', () => {
      this.onCardHover(card, true);
    });

    DOM.on(card, 'mouseleave', () => {
      this.onCardHover(card, false);
    });

    // Click handling
    DOM.on(card, 'click', (e) => {
      // Don't trigger if clicking on links
      if (e.target.closest('.project-card__link')) return;
      
      this.onCardClick(card, e);
    });

    // Focus handling for accessibility
    DOM.on(card, 'focus', () => {
      this.onCardFocus(card, true);
    });

    DOM.on(card, 'blur', () => {
      this.onCardFocus(card, false);
    });

    // Make cards keyboard accessible
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'article');
    }
  }

  onCardHover(card, isHovering) {
    const image = card.querySelector('.project-card__image img');
    const metrics = card.querySelectorAll('.metric');
    
    if (isHovering) {
      // Animate metrics on hover
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          metric.style.transform = 'scale(1.05)';
        }, index * 50);
      });

      // Add hover class for CSS animations
      card.classList.add('project-card--hover');
    } else {
      // Reset animations
      metrics.forEach(metric => {
        metric.style.transform = '';
      });

      card.classList.remove('project-card--hover');
    }
  }

  onCardClick(card, event) {
    // Check if it's a keyboard activation
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) {
      return;
    }

    // Prevent default for keyboard events
    if (event.type === 'keydown') {
      event.preventDefault();
    }

    // Get project data
    const projectData = this.getProjectData(card);
    
    // Open project modal or navigate to project page
    this.openProjectDetails(projectData);
  }

  onCardFocus(card, isFocused) {
    DOM.toggleClass(card, 'project-card--focused', isFocused);
  }

  getProjectData(card) {
    const title = card.querySelector('.project-card__title')?.textContent || '';
    const description = card.querySelector('.project-card__description')?.textContent || '';
    const image = card.querySelector('.project-card__image img')?.src || '';
    const technologies = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
    const metrics = Array.from(card.querySelectorAll('.metric')).map(metric => ({
      value: metric.querySelector('.metric__value')?.textContent || '',
      label: metric.querySelector('.metric__label')?.textContent || ''
    }));
    const links = Array.from(card.querySelectorAll('.project-card__link')).map(link => ({
      text: link.textContent,
      url: link.href,
      type: link.dataset.type || 'external'
    }));

    return {
      title,
      description,
      image,
      technologies,
      metrics,
      links
    };
  }

  openProjectDetails(projectData) {
    // For now, just log the data
    // In a full implementation, this would open a modal or navigate to a detailed page
    console.log('Opening project details:', projectData);
    
    // Example: Create and show a modal
    this.createProjectModal(projectData);
  }

  createProjectModal(projectData) {
    // Remove existing modal
    const existingModal = DOM.query('.project-modal');
    existingModal?.remove();

    // Create modal
    const modal = DOM.create('div', {
      className: 'project-modal',
      'aria-labelledby': 'modal-title',
      'aria-modal': 'true',
      role: 'dialog'
    });

    const modalContent = DOM.create('div', { className: 'project-modal__content' });
    
    // Modal header
    const header = DOM.create('header', { className: 'project-modal__header' });
    const title = DOM.create('h2', { 
      id: 'modal-title',
      className: 'project-modal__title',
      textContent: projectData.title 
    });
    const closeBtn = DOM.create('button', {
      className: 'project-modal__close',
      'aria-label': 'Schließen',
      textContent: '×'
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Modal body
    const body = DOM.create('div', { className: 'project-modal__body' });
    
    if (projectData.image) {
      const img = DOM.create('img', {
        src: projectData.image,
        alt: projectData.title,
        className: 'project-modal__image'
      });
      body.appendChild(img);
    }

    const description = DOM.create('p', {
      className: 'project-modal__description',
      textContent: projectData.description
    });
    body.appendChild(description);

    // Technologies
    if (projectData.technologies.length) {
      const techContainer = DOM.create('div', { className: 'project-modal__tech' });
      const techTitle = DOM.create('h3', { textContent: 'Technologien:' });
      techContainer.appendChild(techTitle);
      
      projectData.technologies.forEach(tech => {
        const techTag = DOM.create('span', {
          className: 'tech-tag',
          textContent: tech
        });
        techContainer.appendChild(techTag);
      });
      
      body.appendChild(techContainer);
    }

    // Metrics
    if (projectData.metrics.length) {
      const metricsContainer = DOM.create('div', { className: 'project-modal__metrics' });
      const metricsTitle = DOM.create('h3', { textContent: 'Kennzahlen:' });
      metricsContainer.appendChild(metricsTitle);
      
      const metricsGrid = DOM.create('div', { className: 'metrics-grid' });
      projectData.metrics.forEach(metric => {
        const metricItem = DOM.create('div', { className: 'metric' });
        metricItem.innerHTML = `
          <span class="metric__value">${metric.value}</span>
          <span class="metric__label">${metric.label}</span>
        `;
        metricsGrid.appendChild(metricItem);
      });
      
      metricsContainer.appendChild(metricsGrid);
      body.appendChild(metricsContainer);
    }

    modalContent.appendChild(header);
    modalContent.appendChild(body);
    modal.appendChild(modalContent);

    // Add to DOM
    document.body.appendChild(modal);

    // Setup modal interactions
    this.setupModalInteractions(modal, closeBtn);

    // Show modal
    setTimeout(() => {
      modal.classList.add('project-modal--show');
      closeBtn.focus();
    }, 10);
  }

  setupModalInteractions(modal, closeBtn) {
    // Close button
    DOM.on(closeBtn, 'click', () => {
      this.closeModal(modal);
    });

    // Click outside to close
    DOM.on(modal, 'click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    // Escape key to close
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeModal(modal);
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);

    // Trap focus within modal
    this.trapFocus(modal);
  }

  closeModal(modal) {
    modal.classList.remove('project-modal--show');
    setTimeout(() => {
      modal.remove();
      // Return focus to the previously focused element
      // (implementation would depend on focus management strategy)
    }, 300);
  }

  trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    DOM.on(modal, 'keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  filterProjects(filter) {
    this.currentFilter = filter;

    this.projectCards.forEach(card => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      
      if (shouldShow) {
        card.style.display = 'block';
        setTimeout(() => {
          card.classList.add('project-card--visible');
        }, 10);
      } else {
        card.classList.remove('project-card--visible');
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    // Re-animate visible cards
    setTimeout(() => {
      this.animateVisibleCards();
    }, 100);
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach(btn => {
      btn.classList.remove('projects__filter-btn--active');
      btn.setAttribute('aria-pressed', 'false');
    });

    activeButton.classList.add('projects__filter-btn--active');
    activeButton.setAttribute('aria-pressed', 'true');
  }

  animateVisibleCards() {
    const visibleCards = Array.from(this.projectCards).filter(card => 
      card.style.display !== 'none'
    );

    this.animationController.createStaggeredAnimation(visibleCards, {
      delay: 100,
      animation: 'slideInUp',
      duration: 600
    });
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all project images
      const projectImages = DOM.queryAll('.project-card__image img[data-src]');
      projectImages.forEach(img => imageObserver.observe(img));
    }
  }

  handleKeyboardNavigation(e) {
    const focusedCard = document.activeElement;
    if (!focusedCard.classList.contains('project-card')) return;

    const visibleCards = Array.from(this.projectCards).filter(card => 
      card.style.display !== 'none'
    );
    const currentIndex = visibleCards.indexOf(focusedCard);

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % visibleCards.length;
        visibleCards[nextIndex]?.focus();
        break;
        
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? visibleCards.length - 1 : currentIndex - 1;
        visibleCards[prevIndex]?.focus();
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        this.onCardClick(focusedCard, e);
        break;
    }
  }

  initializeProjects() {
    // Set initial visibility
    this.projectCards.forEach(card => {
      card.classList.add('project-card--visible');
    });

    // Setup filter buttons accessibility
    this.filterButtons.forEach(btn => {
      btn.setAttribute('role', 'button');
      btn.setAttribute('aria-pressed', btn.classList.contains('projects__filter-btn--active'));
    });
  }

  // Public methods
  showProject(projectId) {
    const project = DOM.query(`[data-project-id="${projectId}"]`);
    if (project) {
      this.onCardClick(project, { type: 'programmatic' });
    }
  }

  getFilteredProjects() {
    return Array.from(this.projectCards).filter(card => {
      return this.currentFilter === 'all' || card.dataset.category === this.currentFilter;
    });
  }
}

export default Projects;