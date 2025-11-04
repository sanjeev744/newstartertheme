// =============================================================================
// Shopify Theme Type Definitions
// =============================================================================

// Global library declarations
declare global {
  interface Window {
    // Shopify globals
    Shopify: {
      currency: {
        active: string;
        rate: number;
      };
      locale: string;
      shop: string;
      domain: string;
    };
    
    // Theme-specific globals
    theme: {
      strings: Record<string, string>;
      settings: Record<string, any>;
      moneyFormat: string;
      cartType: string;
    };
    
    // Cart data
    cartData?: {
      items: CartItem[];
      item_count: number;
      total_price: number;
      currency: string;
    };

    // Third-party libraries
    axios: any;
    jQuery: any;
    $: any;
    Noty: any;
  }
}

// Cart Types
export interface CartItem {
  id: number;
  key: string;
  title: string;
  price: number;
  final_price: number;
  final_line_price: number;
  quantity: number;
  properties: Record<string, any>;
  variant_id: number;
  variant_title: string;
  product_id: number;
  handle: string;
  url: string;
  image: string;
  vendor: string;
  product_type: string;
  sku: string;
  grams: number;
  requires_shipping: boolean;
  taxable: boolean;
  gift_card: boolean;
  available: boolean;
  line_price: number;
  original_price: number;
  discounted_price: number;
  discounts: any[];
  discount_allocations: any[];
  total_discount: number;
}

// Product Types
export interface Product {
  id: number;
  title: string;
  handle: string;
  description: string;
  published_at: string;
  created_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  price: number;
  price_min: number;
  price_max: number;
  compare_at_price: number;
  compare_at_price_min: number;
  compare_at_price_max: number;
  available: boolean;
  price_varies: boolean;
  compare_at_price_varies: boolean;
  variants: ProductVariant[];
  options: ProductOption[];
  images: ProductImage[];
  featured_image: string;
  options_with_values: ProductOptionWithValue[];
}

export interface ProductVariant {
  id: number;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  feature_media: any;
  available: boolean;
  price: number;
  compare_at_price: number;
  weight: number;
  weight_unit: string;
  inventory_quantity: number;
  inventory_management: string;
  inventory_policy: string;
  barcode: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductOptionWithValue {
  name: string;
  value: string;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Collection Types
export interface Collection {
  id: number;
  handle: string;
  title: string;
  description: string;
  published_at: string;
  sort_order: string;
  template_suffix: string;
  products_count: number;
  all_products_count: number;
  all_tags: string[];
  all_types: string[];
  all_vendors: string[];
  products: Product[];
}

// Form Types
export interface FormData {
  [key: string]: string | number | boolean | File;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

// Event Types
export interface CustomEvent extends Event {
  detail?: any;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
