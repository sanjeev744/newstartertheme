# Component Library Documentation

## Overview
This component library provides a comprehensive set of reusable UI components for the Shopify theme. Each component follows BEM methodology and includes responsive design considerations.

## Component Structure

### Base Components
- **`_buttons.scss`** - Button system with variants, sizes, and states
- **`_forms.scss`** - Form elements, validation states, and input types
- **`_typography.scss`** - Text styles, headings, and typography utilities
- **`_icons.scss`** - Icon system with sizes and variants

### Layout Components
- **`_grid.scss`** - CSS Grid and Flexbox layout systems
- **`_container.scss`** - Container layouts and responsive breakpoints
- **`_spacing.scss`** - Margin, padding, and spacing utilities

### Interactive Components
- **`_modal.scss`** - Modal dialogs with different sizes and positions
- **`_dropdown.scss`** - Dropdown menus and navigation
- **`_tabs.scss`** - Tabbed content and navigation
- **`_accordion.scss`** - Collapsible content sections
- **`_carousel.scss`** - Image and content carousels

### Product Components
- **`_product-card.scss`** - Individual product display cards
- **`_product-grid.scss`** - Product grid layouts and filters
- **`_product-form.scss`** - Product selection and add-to-cart forms
- **`_product-gallery.scss`** - Product image galleries and zoom

### Navigation Components
- **`_breadcrumbs.scss`** - Breadcrumb navigation
- **`_pagination.scss`** - Page navigation and pagination
- **`_filters.scss`** - Product filtering and sorting

### Feedback Components
- **`_alerts.scss`** - Alert messages and notifications
- **`_toasts.scss`** - Toast notifications
- **`_loading.scss`** - Loading states and spinners

### Utility Components
- **`_responsive-image.scss`** - Responsive image handling
- **`_lazy-load.scss`** - Lazy loading for images and content
- **`_animations.scss`** - CSS animations and transitions

## Usage Examples

### Buttons
```scss
// Primary button
<button class="btn btn--primary">Click me</button>

// Secondary button with large size
<button class="btn btn--secondary btn--lg">Large Button</button>

// Button group
<div class="btn-group">
  <button class="btn btn--primary">Left</button>
  <button class="btn btn--primary">Middle</button>
  <button class="btn btn--primary">Right</button>
</div>
```

### Grid System
```scss
// CSS Grid
<div class="grid grid--cols-3 grid--gap-lg">
  <div class="grid__item">Item 1</div>
  <div class="grid__item">Item 2</div>
  <div class="grid__item">Item 3</div>
</div>

// Flexbox Grid
<div class="flex-grid flex-grid--justify-center">
  <div class="flex-grid__item flex-grid__item--basis-50">50% width</div>
  <div class="flex-grid__item flex-grid__item--basis-50">50% width</div>
</div>
```

### Forms
```scss
<form class="form">
  <div class="form__group">
    <label class="form__label" for="email">Email</label>
    <input type="email" id="email" class="form__input" placeholder="Enter your email">
  </div>
  
  <div class="form__group">
    <label class="form__checkbox">
      <input type="checkbox">
      <span>Subscribe to newsletter</span>
    </label>
  </div>
  
  <div class="form__actions">
    <button type="submit" class="btn btn--primary">Submit</button>
  </div>
</form>
```

### Alerts
```scss
// Success alert
<div class="alert alert--success">
  <div class="alert__message">Your order has been placed successfully!</div>
</div>

// Dismissible warning alert
<div class="alert alert--warning alert--dismissible">
  <div class="alert__message">Please review your cart before checkout.</div>
  <button class="alert__close" aria-label="Close"></button>
</div>

// Alert with actions
<div class="alert alert--info alert--with-actions">
  <div class="alert__title">New Feature Available</div>
  <div class="alert__message">Check out our new product recommendations!</div>
  <div class="alert__actions">
    <button class="btn btn--sm btn--primary">Learn More</button>
    <button class="btn btn--sm btn--secondary">Dismiss</button>
  </div>
</div>
```

### Modals
```scss
// Basic modal
<div class="modal-overlay">
  <div class="modal modal--md">
    <div class="modal__header">
      <h2 class="modal__title">Modal Title</h2>
      <button class="modal__close" aria-label="Close"></button>
    </div>
    <div class="modal__body">
      <p>Modal content goes here...</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary">Cancel</button>
      <button class="btn btn--primary">Save</button>
    </div>
  </div>
</div>

// Modal variants
<div class="modal modal--lg modal--centered">
  <!-- Large centered modal -->
</div>

<div class="modal modal--slide-up">
  <!-- Slide up animation -->
</div>
```

## CSS Custom Properties

The component library uses CSS custom properties for consistent theming:

```scss
:root {
  // Colors
  --color-primary: #007bff;
  --color-primary-dark: #0056b3;
  --color-primary-contrast: #ffffff;
  --color-primary-rgb: 0, 123, 255;
  
  --color-success: #28a745;
  --color-warning: #ffc107;
  --color-error: #dc3545;
  --color-info: #17a2b8;
  
  // Typography
  --font-heading-family: 'Your Heading Font', sans-serif;
  --font-body-family: 'Your Body Font', sans-serif;
  --font-heading-weight: 600;
  --font-body-weight: 400;
  
  // Spacing
  --grid-gap: 1.5rem;
  --grid-gap-sm: 0.75rem;
  --grid-gap-lg: 2rem;
  
  // Border radius
  --border-radius: 0.375rem;
  --border-radius-lg: 0.5rem;
  
  // Shadows
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

## Responsive Design

All components include responsive design considerations:

```scss
// Mobile-first approach
.component {
  // Base styles for mobile
  
  @media (min-width: 768px) {
    // Tablet styles
  }
  
  @media (min-width: 1024px) {
    // Desktop styles
  }
}
```

## Accessibility

Components follow accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with fallbacks)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

To customize components:

1. **Override CSS custom properties** in your theme's root styles
2. **Extend component classes** using BEM modifiers
3. **Create component variants** by adding new modifier classes
4. **Modify component structure** by overriding specific selectors

## Performance

- CSS is optimized and minified in production
- Components use efficient CSS selectors
- Minimal JavaScript dependencies
- Lazy loading support for images and content

## Contributing

When adding new components:

1. Follow the existing naming conventions
2. Include responsive design considerations
3. Add proper documentation and examples
4. Test across different browsers and devices
5. Update this README with new component information
