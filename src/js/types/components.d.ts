// =============================================================================
// Component Type Definitions
// =============================================================================

// Base Component Interface
export interface BaseComponent {
  element: HTMLElement;
  init(): void;
  destroy(): void;
}

// Component Options Interface
export interface ComponentOptions {
  [key: string]: any;
}

// Event Handler Types
export type EventHandler = (event: Event) => void;
export type CustomEventHandler<T = any> = (event: CustomEvent<T>) => void;

// Modal Component Types
export interface ModalOptions {
  triggerSelector: string;
  modalSelector: string;
  closeSelector: string;
  overlaySelector?: string;
  animationDuration?: number;
  preventScroll?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ModalComponent extends BaseComponent {
  open(): void;
  close(): void;
  isOpen: boolean;
}

// Dropdown Component Types
export interface DropdownOptions {
  triggerSelector: string;
  dropdownSelector: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  animationDuration?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface DropdownComponent extends BaseComponent {
  open(): void;
  close(): void;
  isOpen: boolean;
}

// Tabs Component Types
export interface TabOptions {
  tabSelector: string;
  contentSelector: string;
  activeClass?: string;
  animationDuration?: number;
  onTabChange?: (activeTab: HTMLElement) => void;
}

export interface TabComponent extends BaseComponent {
  switchTab(tabElement: HTMLElement): void;
  getActiveTab(): HTMLElement | null;
}

// Accordion Component Types
export interface AccordionOptions {
  itemSelector: string;
  triggerSelector: string;
  contentSelector: string;
  activeClass?: string;
  allowMultiple?: boolean;
  animationDuration?: number;
  onItemToggle?: (item: HTMLElement, isOpen: boolean) => void;
}

export interface AccordionComponent extends BaseComponent {
  toggleItem(item: HTMLElement): void;
  openItem(item: HTMLElement): void;
  closeItem(item: HTMLElement): void;
  closeAllItems(): void;
}

// Carousel Component Types
export interface CarouselOptions {
  containerSelector: string;
  itemSelector: string;
  navigationSelector?: string;
  paginationSelector?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  responsive?: CarouselResponsive[];
  onSlideChange?: (currentSlide: number) => void;
}

export interface CarouselResponsive {
  breakpoint: number;
  settings: Partial<CarouselOptions>;
}

export interface CarouselComponent extends BaseComponent {
  next(): void;
  prev(): void;
  goToSlide(index: number): void;
  getCurrentSlide(): number;
  getTotalSlides(): number;
}

// Form Component Types
export interface FormOptions {
  formSelector: string;
  submitSelector: string;
  validationRules?: ValidationRule[];
  onSuccess?: (data: any) => void;
  onError?: (errors: ValidationError[]) => void;
  onBeforeSubmit?: (formData: FormData) => boolean | Promise<boolean>;
}

export interface ValidationRule {
  field: string;
  rule: string;
  message: string;
  params?: any[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormComponent extends BaseComponent {
  validate(): boolean;
  getFormData(): FormData;
  setErrors(errors: ValidationError[]): void;
  clearErrors(): void;
}

// Product Card Component Types
export interface ProductCardOptions {
  cardSelector: string;
  imageSelector: string;
  titleSelector: string;
  priceSelector: string;
  addToCartSelector: string;
  wishlistSelector?: string;
  quickViewSelector?: string;
  onAddToCart?: (productId: number) => void;
  onWishlistToggle?: (productId: number, isWishlisted: boolean) => void;
  onQuickView?: (productId: number) => void;
}

export interface ProductCardComponent extends BaseComponent {
  getProductId(): number;
  updatePrice(price: number): void;
  updateAvailability(available: boolean): void;
  setWishlisted(isWishlisted: boolean): void;
}

// Loading Component Types
export interface LoadingOptions {
  containerSelector: string;
  spinnerSelector?: string;
  textSelector?: string;
  showText?: boolean;
  text?: string;
}

export interface LoadingComponent extends BaseComponent {
  show(text?: string): void;
  hide(): void;
  setText(text: string): void;
  isVisible: boolean;
}

// Toast Component Types
export interface ToastOptions {
  containerSelector: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  maxToasts?: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export interface ToastComponent extends BaseComponent {
  show(message: ToastMessage): void;
  hide(id: string): void;
  hideAll(): void;
}

// Utility Types
export type ComponentConstructor<T extends BaseComponent> = new (
  element: HTMLElement,
  options?: ComponentOptions
) => T;

export type ComponentFactory<T extends BaseComponent> = (
  element: HTMLElement,
  options?: ComponentOptions
) => T;
