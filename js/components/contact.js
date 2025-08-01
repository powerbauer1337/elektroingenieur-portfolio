/**
 * Contact Component
 * Handles contact form validation, submission, and interactions
 */

import { DOM } from '../utils/dom.js';

export class Contact {
  constructor() {
    this.form = DOM.query('.contact__form');
    this.inputs = DOM.queryAll('.contact__form .form-input, .contact__form .form-textarea');
    this.submitButton = DOM.query('.contact__form .btn');
    this.successMessage = DOM.query('.contact__success');
    
    this.validationRules = {
      name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-ZäöüÄÖÜß\s-']+$/
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      subject: {
        required: true,
        minLength: 3
      },
      message: {
        required: true,
        minLength: 10
      }
    };
    
    this.init();
  }

  init() {
    if (!this.form) return;

    this.setupEventListeners();
    this.setupValidation();
    this.setupAccessibility();
  }

  setupEventListeners() {
    // Form submission
    DOM.on(this.form, 'submit', this.handleSubmit.bind(this));

    // Real-time validation
    this.inputs.forEach(input => {
      DOM.on(input, 'blur', () => this.validateField(input));
      DOM.on(input, 'input', DOM.debounce(() => this.validateField(input), 300));
    });

    // Floating contact buttons
    const floatingButtons = DOM.queryAll('.contact__floating-btn');
    floatingButtons.forEach(button => {
      DOM.on(button, 'click', this.handleFloatingButtonClick.bind(this));
    });

    // Back to top button
    const backToTopBtn = DOM.query('.footer__back-to-top');
    if (backToTopBtn) {
      DOM.on(backToTopBtn, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  setupValidation() {
    // Add novalidate to form to handle validation ourselves
    this.form.setAttribute('novalidate', 'true');

    // Setup validation for each field
    this.inputs.forEach(input => {
      const fieldName = input.name;
      if (this.validationRules[fieldName]) {
        this.setupFieldValidation(input, fieldName);
      }
    });
  }

  setupFieldValidation(input, fieldName) {
    const rules = this.validationRules[fieldName];
    
    // Set HTML5 validation attributes
    if (rules.required) {
      input.setAttribute('required', 'true');
      input.setAttribute('aria-required', 'true');
    }
    
    if (rules.minLength) {
      input.setAttribute('minlength', rules.minLength);
    }
    
    if (rules.pattern && input.type !== 'email') {
      input.setAttribute('pattern', rules.pattern.source);
    }

    // Associate error message with input
    const errorElement = DOM.query(`#${fieldName}-error`);
    if (errorElement) {
      input.setAttribute('aria-describedby', `${fieldName}-error`);
    }
  }

  validateField(input) {
    const fieldName = input.name;
    const rules = this.validationRules[fieldName];
    const value = input.value.trim();
    const errorElement = DOM.query(`#${fieldName}-error`);

    if (!rules) return true;

    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (rules.required && !value) {
      isValid = false;
      errorMessage = 'Dieses Feld ist erforderlich.';
    }
    // Min length validation
    else if (rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMessage = `Mindestens ${rules.minLength} Zeichen erforderlich.`;
    }
    // Pattern validation
    else if (rules.pattern && value && !rules.pattern.test(value)) {
      isValid = false;
      if (fieldName === 'email') {
        errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      } else if (fieldName === 'name') {
        errorMessage = 'Bitte verwenden Sie nur Buchstaben, Leerzeichen und Bindestriche.';
      } else {
        errorMessage = 'Ungültiges Format.';
      }
    }

    // Update field state
    this.updateFieldState(input, isValid, errorMessage);
    
    // Update error message
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.setAttribute('aria-live', 'polite');
    }

    return isValid;
  }

  updateFieldState(input, isValid, errorMessage) {
    // Remove existing classes
    input.classList.remove('error', 'success');
    
    // Add appropriate class
    if (input.value.trim()) {
      input.classList.add(isValid ? 'success' : 'error');
    }

    // Update ARIA attributes
    input.setAttribute('aria-invalid', !isValid);
    
    // Update custom validity for HTML5 validation API
    input.setCustomValidity(isValid ? '' : errorMessage);
  }

  validateForm() {
    let isFormValid = true;
    
    this.inputs.forEach(input => {
      const fieldValid = this.validateField(input);
      if (!fieldValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!this.validateForm()) {
      this.focusFirstError();
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      // Get form data
      const formData = this.getFormData();
      
      // Submit form (replace with actual submission logic)
      const success = await this.submitForm(formData);
      
      if (success) {
        this.showSuccessMessage();
        this.resetForm();
      } else {
        this.showErrorMessage('Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      this.setLoadingState(false);
    }
  }

  getFormData() {
    const formData = {};
    this.inputs.forEach(input => {
      formData[input.name] = input.value.trim();
    });
    return formData;
  }

  async submitForm(formData) {
    // This is a mock implementation
    // In a real application, you would send the data to your backend
    console.log('Submitting form data:', formData);
    
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate success (90% success rate for demo)
        resolve(Math.random() > 0.1);
      }, 2000);
    });
  }

  setLoadingState(isLoading) {
    DOM.toggleClass(this.form, 'loading', isLoading);
    
    if (this.submitButton) {
      this.submitButton.disabled = isLoading;
      this.submitButton.textContent = isLoading ? 'Wird gesendet...' : 'Nachricht senden';
      this.submitButton.setAttribute('aria-busy', isLoading);
    }

    // Disable all inputs during loading
    this.inputs.forEach(input => {
      input.disabled = isLoading;
    });
  }

  showSuccessMessage() {
    // Create or show success message
    let successElement = this.successMessage;
    
    if (!successElement) {
      successElement = DOM.create('div', {
        className: 'contact__success',
        innerHTML: `
          <h4>Nachricht erfolgreich gesendet!</h4>
          <p>Vielen Dank für Ihre Nachricht. Ich werde mich so schnell wie möglich bei Ihnen melden.</p>
        `
      });
      this.form.parentNode.appendChild(successElement);
    }

    successElement.classList.add('show');
    successElement.setAttribute('aria-live', 'polite');
    successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Hide success message after 10 seconds
    setTimeout(() => {
      successElement.classList.remove('show');
    }, 10000);
  }

  showErrorMessage(message) {
    // Create temporary error message
    const errorElement = DOM.create('div', {
      className: 'contact__error',
      innerHTML: `
        <h4>Fehler beim Senden</h4>
        <p>${message}</p>
      `,
      style: 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;'
    });

    this.form.appendChild(errorElement);
    errorElement.setAttribute('aria-live', 'assertive');
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove error message after 8 seconds
    setTimeout(() => {
      errorElement.remove();
    }, 8000);
  }

  resetForm() {
    this.form.reset();
    
    // Clear validation states
    this.inputs.forEach(input => {
      input.classList.remove('error', 'success');
      input.setAttribute('aria-invalid', 'false');
      input.setCustomValidity('');
    });

    // Clear error messages
    const errorElements = DOM.queryAll('.form-error');
    errorElements.forEach(error => {
      error.textContent = '';
    });
  }

  focusFirstError() {
    const firstErrorField = DOM.query('.form-input.error, .form-textarea.error');
    if (firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  handleFloatingButtonClick(e) {
    e.preventDefault();
    
    const button = e.currentTarget;
    const action = button.dataset.action;
    
    switch (action) {
      case 'email':
        window.location.href = 'mailto:max.mueller@elektro-portfolio.de';
        break;
      case 'phone':
        window.location.href = 'tel:+4917012345678';
        break;
      case 'whatsapp':
        window.open('https://wa.me/4917012345678', '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/max-mueller-ee', '_blank');
        break;
      default:
        // Scroll to contact form
        const contactSection = DOM.query('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }

  setupAccessibility() {
    // Ensure form has proper labels and descriptions
    this.inputs.forEach(input => {
      const label = DOM.query(`label[for="${input.id}"]`);
      if (!label) {
        console.warn(`No label found for input: ${input.id}`);
      }
    });

    // Add live regions for dynamic content
    if (!DOM.query('[aria-live="polite"]')) {
      const liveRegion = DOM.create('div', {
        'aria-live': 'polite',
        'aria-atomic': 'true',
        className: 'sr-only'
      });
      document.body.appendChild(liveRegion);
    }

    // Improve submit button accessibility
    if (this.submitButton) {
      this.submitButton.setAttribute('aria-describedby', 'submit-help');
      
      const helpText = DOM.create('div', {
        id: 'submit-help',
        className: 'sr-only',
        textContent: 'Formular wird validiert und gesendet'
      });
      this.submitButton.parentNode.appendChild(helpText);
    }
  }

  // Public methods
  focusFirstField() {
    const firstInput = this.inputs[0];
    if (firstInput) {
      firstInput.focus();
    }
  }

  isFormValid() {
    return this.validateForm();
  }

  getFieldValue(fieldName) {
    const input = DOM.query(`[name="${fieldName}"]`);
    return input ? input.value.trim() : '';
  }

  setFieldValue(fieldName, value) {
    const input = DOM.query(`[name="${fieldName}"]`);
    if (input) {
      input.value = value;
      this.validateField(input);
    }
  }
}

export default Contact;