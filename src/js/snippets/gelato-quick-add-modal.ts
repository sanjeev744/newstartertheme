import { GelatoQuickAddModalCustomForm } from "./gelato-quick-add-modal-custom-form";
// Note: Swiper and PhotoSwipe are loaded dynamically to avoid TypeScript errors
// import Swiper from 'swiper';
// import { Navigation } from 'swiper/modules';
// import PhotoSwipeLightbox from 'photoswipe/lightbox';
// import PhotoSwipe from 'photoswipe';

export class GelatoQuickAddModal {
  private modal: HTMLElement;
  private overlay: HTMLElement;
  private closeButtons: NodeListOf<HTMLElement>;
  private mainSwiper: any = null; // Swiper instance
  private lightbox: any = null; // PhotoSwipeLightbox instance

  constructor(modal: HTMLElement) {
    this.modal = modal;
    this.overlay = modal.querySelector('.gelato-quick-add-modal__overlay')!;
    this.closeButtons = modal.querySelectorAll('[data-modal-close]');
    this.init();
  }

  private init() {
    this.overlay.addEventListener('click', () => this.close());
    this.closeButtons.forEach(btn => btn.addEventListener('click', () => this.close()));
    document.addEventListener('keydown', (e) => {
      if (this.isOpen() && e.key === 'Escape') this.close();
    });
  }

  open() {
    this.modal.hidden = false;
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gelato-modal-open');
    this.modal.focus();
    this.initCustomForm();
    this.initGallery();
  }

  close() {
    this.modal.hidden = true;
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gelato-modal-open');
    this.destroyGallery();
  }

  isOpen() {
    return !this.modal.hidden;
  }

  static getInstance(): GelatoQuickAddModal | null {
    const modal = document.getElementById('gelato-quick-add-modal');
    if (modal) {
      if (!(modal as any)._gelatoQuickAddModalInstance) {
        (modal as any)._gelatoQuickAddModalInstance = new GelatoQuickAddModal(modal);
      }
      return (modal as any)._gelatoQuickAddModalInstance;
    }
    return null;
  }

  // Static method for automatic initialization
  static initializeAll(): void {
    const elements = document.querySelectorAll<HTMLElement>('#gelato-quick-add-modal');
    elements.forEach((element) => {
      if (!(element as any)._gelatoQuickAddModalInstance) {
        (element as any)._gelatoQuickAddModalInstance = new GelatoQuickAddModal(element);
      }
    });
  }

  // --- Custom form logic ---
  public initCustomForm() {
    document.querySelectorAll('.gelato-quick-add-modal__product-form').forEach(form => {
      if ((form as any)._gelatoQuickAddModalCustomForm) return;
      new GelatoQuickAddModalCustomForm(form as HTMLFormElement);
    });
  }

  // --- Gallery logic ---
  private initGallery() {
    const galleryMain = this.modal.querySelector('.gelato-quick-add-modal__gallery-main');
    
    if (galleryMain && typeof (window as any).Swiper !== 'undefined') {
      this.mainSwiper = new (window as any).Swiper(galleryMain as HTMLElement, {
        modules: [(window as any).Swiper.Navigation],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: false,
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,
      });
    }

    // Initialize PhotoSwipe
    this.initPhotoSwipe();
  }

  private destroyGallery() {
    if (this.mainSwiper) {
      this.mainSwiper.destroy(true, true);
      this.mainSwiper = null;
    }
    
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  }

  private initPhotoSwipe(): void {
    if (typeof (window as any).PhotoSwipeLightbox !== 'undefined') {
      this.lightbox = new (window as any).PhotoSwipeLightbox({
        gallery: '.gelato-quick-add-modal__gallery',
        children: 'a[data-pswp-src]',
        pswpModule: (window as any).PhotoSwipe,
      });

      this.lightbox.init();
      console.log("PhotoSwipe initialized for quick add modal gallery");
    }
  }
}