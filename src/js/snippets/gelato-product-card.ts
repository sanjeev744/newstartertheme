
// =============================================================================
// Gelato Product Card Component - TypeScript
// =============================================================================

import $ from "jquery";

export class GelatoProductCard {
  private card: HTMLElement;
  private form: HTMLFormElement;
  private productInput: HTMLInputElement;
  private productData: any;

  constructor(card: HTMLElement) {
    this.card = card;
    this.form = card.querySelector('form')!;
    this.productInput = this.form.querySelector('[name=id]')!;
    this.productData = this.getProductData();
    this.init();
  }

  private getProductData(): any {
    const variantsRaw = this.form.getAttribute('data-variants');
    if (variantsRaw) {
      try {
        return JSON.parse(variantsRaw);
      } catch (e) {
        console.error('Error parsing product variants:', e);
      }
    }
    return null;
  }

  private init(): void {
    this.form.addEventListener('change', () => this.onVariantChange());
    this.onVariantChange(); // Set initial state
  }

  private onVariantChange(): void {
    this.updateVariantStatuses();
    this.updatePrice();
    this.updateVariant();
  }

  private updateVariant(): void {
    const selectedVariant = this.getCurrentVariant();
    if (!selectedVariant) return;
    
    console.log('update variant', selectedVariant.id);
    this.productInput.value = selectedVariant.id;
  }

  private updateVariantStatuses(): void {
    const selectedVariant = this.getCurrentVariant();
    if (!selectedVariant) return;

    const submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = !selectedVariant.available;
    }
  }

  private updatePrice(): void {
    const selectedVariant = this.getCurrentVariant();
    if (!selectedVariant) return;

    const regularPriceEl = this.card.querySelector('[data-regular-price]') as HTMLElement;
    const salePriceEl = this.card.querySelector('[data-sale-price]') as HTMLElement;

    if (regularPriceEl) {
      regularPriceEl.innerHTML = (window as any).Shopify.formatMoney(selectedVariant.price, (window as any).Shopify.money_format);
    }

    if (salePriceEl) {
      salePriceEl.innerHTML = (window as any).Shopify.formatMoney(selectedVariant.compare_at_price, (window as any).Shopify.money_format);
    }
  }

  private getCurrentVariant(): any {
    const formData = new FormData(this.form);
    const selectedOptions: string[] = [];
    
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('options[')) {
        selectedOptions.push(value as string);
      }
    }

    if (!this.productData) return null;

    return this.productData.find((variant: any) => 
      variant.options.every((option: string, index: number) => option === selectedOptions[index])
    );
  }

  // Static method for automatic initialization
  static initializeAll(): void {
    const elements = document.querySelectorAll<HTMLElement>('.product-card');
    elements.forEach((element) => {
      if (!(element as any)._gelatoProductCardInstance) {
        (element as any)._gelatoProductCardInstance = new GelatoProductCard(element);
      }
    });
  }

  // Static method for cleanup
  static destroyCard(element: HTMLElement): void {
    const instance = (element as any)._gelatoProductCardInstance;
    if (instance) {
      delete (element as any)._gelatoProductCardInstance;
    }
  }
}