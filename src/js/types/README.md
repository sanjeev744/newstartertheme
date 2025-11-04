# TypeScript Setup for Shopify Theme

## Overview
This theme now supports TypeScript for new custom sections and components while keeping DAWN theme files untouched.

## File Structure
```
src/js/
├── types/                    # Type definitions
│   ├── shopify.d.ts         # Shopify theme interfaces
│   ├── components.d.ts      # Component interfaces
│   └── README.md            # This file
├── components/               # TypeScript components
│   └── LucydModal.ts        # Example modal component
├── sections/                 # Section-specific JS (can be .ts)
├── snippets/                 # Snippet-specific JS (can be .ts)
├── templates/                # Template-specific JS (can be .ts)
└── frontend.ts              # Main entry point
```

## TypeScript Configuration

### tsconfig.json
- **Target**: ES2020 for modern browser support
- **Module**: ESNext for latest module syntax
- **Strict**: Enabled for better type safety
- **Paths**: Configured for easy imports with `@/` alias

### Key Features
- **Strict null checks** - Prevents null/undefined errors
- **No implicit any** - Requires explicit typing
- **Source maps** - For debugging
- **Path mapping** - Clean import statements

## Usage Patterns

### 1. Creating New TypeScript Components

```typescript
// src/js/components/MyComponent.ts
import { BaseComponent, ComponentOptions } from '@/types/components';

export class MyComponent implements BaseComponent {
  public element: HTMLElement;
  
  constructor(element: HTMLElement, options?: ComponentOptions) {
    this.element = element;
    this.init();
  }
  
  public init(): void {
    // Component initialization
  }
  
  public destroy(): void {
    // Cleanup
  }
}
```

### 2. Using Shopify Types

```typescript
import { Product, CartItem } from '@/types/shopify';

function handleProduct(product: Product): void {
  console.log(`Product: ${product.title} - $${product.price}`);
}

function updateCart(items: CartItem[]): void {
  const total = items.reduce((sum, item) => sum + item.final_line_price, 0);
  console.log(`Cart total: $${total}`);
}
```

### 3. Component Options Pattern

```typescript
import { ModalOptions } from '@/types/components';

const modalOptions: ModalOptions = {
  triggerSelector: '[data-modal-trigger]',
  modalSelector: '[data-modal]',
  closeSelector: '[data-modal-close]',
  onOpen: () => console.log('Modal opened'),
  onClose: () => console.log('Modal closed')
};
```

## Import Aliases

Use these clean import paths:

```typescript
// Instead of relative paths
import { ModalComponent } from '../../../types/components';

// Use aliases
import { ModalComponent } from '@/types/components';
import { Product } from '@/types/shopify';
```

## Available Types

### Shopify Theme Types
- `Product` - Product object structure
- `CartItem` - Cart item structure
- `Collection` - Collection object structure
- `ProductVariant` - Product variant structure
- `FormData` - Form data interface
- `FormValidation` - Form validation results

### Component Types
- `BaseComponent` - Base component interface
- `ModalComponent` - Modal component interface
- `DropdownComponent` - Dropdown component interface
- `TabComponent` - Tabs component interface
- `AccordionComponent` - Accordion component interface
- `CarouselComponent` - Carousel component interface
- `FormComponent` - Form component interface
- `ProductCardComponent` - Product card component interface

### Utility Types
- `EventHandler` - Event handler function type
- `CustomEventHandler<T>` - Custom event handler with data
- `DeepPartial<T>` - Deep partial object type
- `Optional<T, K>` - Make specific keys optional
- `RequireFields<T, K>` - Make specific keys required

## Best Practices

### 1. Type Everything
```typescript
// Good
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.final_line_price, 0);
}

// Avoid
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.final_line_price, 0);
}
```

### 2. Use Interfaces for Objects
```typescript
interface ProductCardOptions {
  showPrice: boolean;
  showVendor: boolean;
  imageSize: 'small' | 'medium' | 'large';
}

class ProductCard {
  constructor(private options: ProductCardOptions) {}
}
```

### 3. Leverage Union Types
```typescript
type ToastType = 'success' | 'error' | 'warning' | 'info';
type Breakpoint = 'mobile' | 'tablet' | 'desktop';
```

### 4. Handle Null/Undefined
```typescript
function getProductTitle(product: Product | null): string {
  return product?.title || 'Unknown Product';
}
```

## Migration from JavaScript

### 1. Rename Files
```bash
mv component.js component.ts
```

### 2. Add Type Annotations
```typescript
// Before
function handleClick(event) {
  console.log(event.target);
}

// After
function handleClick(event: Event): void {
  const target = event.target as HTMLElement;
  console.log(target);
}
```

### 3. Import/Export Syntax
```typescript
// Before (CommonJS)
const MyComponent = require('./MyComponent');
module.exports = MyComponent;

// After (ES6)
import { MyComponent } from './MyComponent';
export { MyComponent };
```

## Development Workflow

### 1. Build Process
```bash
# Development
npm run dev

# Production
npm run build
```

### 2. Type Checking
```bash
# Check types without building
npx tsc --noEmit

# Build with type checking
npx tsc
```

### 3. IDE Support
- **VS Code**: Excellent TypeScript support out of the box
- **IntelliJ/WebStorm**: Full TypeScript support
- **Sublime Text**: Install TypeScript plugin

## Troubleshooting

### Common Issues

#### 1. Module Resolution
```typescript
// If you get module resolution errors, check tsconfig.json paths
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

#### 2. Type Declarations
```typescript
// For third-party libraries without types
declare module 'library-name' {
  const content: any;
  export default content;
}
```

#### 3. Strict Mode Errors
```typescript
// Use type assertions when you know better than TypeScript
const element = document.querySelector('.my-class') as HTMLElement;

// Or use non-null assertion (use carefully)
const element = document.querySelector('.my-class')!;
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Shopify Liquid Documentation](https://shopify.dev/docs/themes/liquid)
- [Laravel Mix Documentation](https://laravel-mix.com/docs/6.0/what-is-mix)
