// =============================================================================
// Gelato Modal Component - TypeScript Example
// =============================================================================

import { ModalComponent, ModalOptions } from '@/types/components';

export class GelatoModal implements ModalComponent {
  public element: HTMLElement;
  public isOpen: boolean = false;
  
  private trigger: HTMLElement | null = null;
  private modal: HTMLElement | null = null;
  private closeButton: HTMLElement | null = null;
  private overlay: HTMLElement | null = null;
  private options: ModalOptions;

  constructor(element: HTMLElement, options: ModalOptions) {
    this.element = element;
    this.options = {
      animationDuration: 300,
      preventScroll: true,
      ...options
    };
    
    this.init();
  }

  public init(): void {
    this.trigger = this.element.querySelector(this.options.triggerSelector);
    this.modal = this.element.querySelector(this.options.modalSelector);
    this.closeButton = this.element.querySelector(this.options.closeSelector);
    
    if (this.options.overlaySelector) {
      this.overlay = this.element.querySelector(this.options.overlaySelector);
    }

    this.bindEvents();
  }

  public open(): void {
    if (!this.modal || this.isOpen) return;

    this.isOpen = true;
    this.modal.style.display = 'block';
    
    // Add active classes
    this.modal.classList.add('modal--active');
    if (this.overlay) {
      this.overlay.classList.add('modal-overlay--active');
    }

    // Prevent body scroll
    if (this.options.preventScroll) {
      document.body.style.overflow = 'hidden';
    }

    // Trigger open callback
    if (this.options.onOpen) {
      this.options.onOpen();
    }

    // Dispatch custom event
    this.dispatchEvent('modal:opened');
  }

  public close(): void {
    if (!this.modal || !this.isOpen) return;

    this.isOpen = false;
    
    // Remove active classes
    this.modal.classList.remove('modal--active');
    if (this.overlay) {
      this.overlay.classList.remove('modal-overlay--active');
    }

    // Restore body scroll
    if (this.options.preventScroll) {
      document.body.style.overflow = '';
    }

    // Hide modal after animation
    setTimeout(() => {
      if (this.modal && !this.isOpen) {
        this.modal.style.display = 'none';
      }
    }, this.options.animationDuration);

    // Trigger close callback
    if (this.options.onClose) {
      this.options.onClose();
    }

    // Dispatch custom event
    this.dispatchEvent('modal:closed');
  }

  public destroy(): void {
    this.close();
    this.unbindEvents();
  }

  private bindEvents(): void {
    if (this.trigger) {
      this.trigger.addEventListener('click', this.handleTriggerClick.bind(this));
    }

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.handleCloseClick.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));
    }

    // Close on escape key
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  private unbindEvents(): void {
    if (this.trigger) {
      this.trigger.removeEventListener('click', this.handleTriggerClick.bind(this));
    }

    if (this.closeButton) {
      this.closeButton.removeEventListener('click', this.handleCloseClick.bind(this));
    }

    if (this.overlay) {
      this.overlay.removeEventListener('click', this.handleOverlayClick.bind(this));
    }

    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  private handleTriggerClick(event: Event): void {
    event.preventDefault();
    this.open();
  }

  private handleCloseClick(event: Event): void {
    event.preventDefault();
    this.close();
  }

  private handleOverlayClick(event: Event): void {
    if (event.target === this.overlay) {
      this.close();
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  private dispatchEvent(eventName: string, detail?: any): void {
    const customEvent = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true
    });
    
    this.element.dispatchEvent(customEvent);
  }
}

// Factory function for easy instantiation
export function createGelatoModal(
  element: HTMLElement, 
  options: ModalOptions
): GelatoModal {
  return new GelatoModal(element, options);
}
