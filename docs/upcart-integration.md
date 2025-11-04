# UpCart Side Cart Integration - Customizable Template

## 📋 Overview
This document provides a complete template for customizing UpCart side cart styles in Shopify. The template is designed to be reusable and easily customizable for different projects.

## 🎨 Custom Styles Structure
The UpCart styles are organized in:
- **SCSS Source**: `src/scss/components/_upcart-side-cart.scss`
- **Compiled CSS**: `assets/upcart-side-cart.css` (auto-generated)

## 🔧 Laravel Mix Configuration
The `webpack.mix.js` file is configured to automatically compile UpCart SCSS:

```javascript
// SCSS compilation with minification
mix.sass('src/scss/frontend.scss', 'frontend.css')
   .sass('src/scss/frontend-vendor.scss', 'frontend-vendor.css')
   .sass('src/scss/components/_upcart-side-cart.scss', 'upcart-side-cart.css');
```

## 🚀 Quick Setup Guide

### 1. Compile Styles
```bash
npm run dev
# or
npm run production
```

### 2. Copy Generated CSS
1. Open `assets/upcart-side-cart.css`
2. Copy the entire file content
3. Go to UpCart app in Shopify Admin
4. Paste CSS in "Custom CSS" section

### 3. Customize CSS Variables
Modify CSS variables in the SCSS file:

```scss
:root {
  --upcart-bg: #ffffff;                    // Cart background
  --upcart-overlay: rgba(0, 0, 0, 0.5);   // Background overlay
  --upcart-border: #e5e5e5;                // Borders
  --upcart-text: #1C355E;                  // Primary text color
  --upcart-text-secondary: #6B7280;        // Secondary text color
  --upcart-accent: #3A6FC4;                // Accent color
  --upcart-accent-hover: #2C5AA0;          // Accent hover color
  --upcart-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); // Shadow
  --upcart-radius: 12px;                    // Border radius
  --upcart-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); // Transitions
  
  // Project-specific colors
  --Contrast: #1F1F1F;
  --Contrast-1: #193547;
  --Background: #FFF;
  --Background-announcement: #FFFCEF;
}
```

## 📋 Complete SCSS Template

### Template Setup Instructions

1. **Create the SCSS file**: `src/scss/components/_upcart-side-cart.scss`
2. **Add imports** for theme dependencies:
   ```scss
   @import 'buttons';
   @import 'typography';
   ```
3. **Define CSS variables** for easy customization
4. **Apply styles** to UpCart-specific selectors
5. **Include responsive adjustments** for mobile

### Key Template Features

#### ✅ Design System Integration
- **Button extensions** using `@extend .btn`, `@extend .btn--primary`
- **Typography** using theme's font families (`rig-sans`, `Inter`)
- **Color variables** for consistent theming
- **Consistent spacing** and border radius

#### ✅ Advanced Visual Effects
- **Gradient backgrounds** for containers and buttons
- **Glassmorphism effects** on upsell images with `backdrop-filter`
- **Box shadows** for depth and visual hierarchy
- **Smooth transitions** for interactive elements

#### ✅ Complete Component Coverage
- **Main container** with gradient background
- **Header** with white text and scaled close button
- **Product rows** with glassmorphism effects
- **Quantity controls** with transparent styling
- **Footer** with subtotal and totals
- **Action buttons** (Checkout, Subscription, Upsells)
- **Rewards progress bar** with custom SVG icon

#### ✅ Responsive Design
- **Mobile optimizations** with adjusted font sizes
- **Flexible layouts** that work on all screen sizes
- **Touch-friendly** button sizes on mobile
- **Breakpoint**: 768px for mobile adjustments

## 🎨 Customization Guide

### Color Customization
Update CSS variables to match your brand:

```scss
:root {
  // Primary brand colors
  --upcart-accent: #3A6FC4;           // Your primary color
  --upcart-accent-hover: #2C5AA0;     // Darker shade for hover
  
  // Text colors
  --upcart-text: #1F1F1F;             // Primary text
  --upcart-text-secondary: #6B7280;   // Secondary text
  
  // Background colors
  --upcart-bg: #ffffff;               // Cart background
  --upcart-overlay: rgba(0, 0, 0, 0.5); // Overlay opacity
  
  // Project-specific colors
  --Contrast: #1F1F1F;               // High contrast text
  --Contrast-1: #193547;             // Secondary contrast
  --Background: #FFF;                 // White background
  --Background-announcement: #FFFCEF; // Announcement background
}
```

### Gradient Customization
Modify gradients for containers and buttons:

```scss
// Container gradient
.styles_CartPreview__card__ {
  background: linear-gradient(347deg, #1C355E 6.27%, var(--Marine-blue, #3A6FC4) 93.08%) !important;
}

// Button gradient
.upcart-checkout-button {
  background: linear-gradient(250deg, #B8CCEA -4.16%, #3A6FC4 76.72%) !important;
}
```

### Typography Customization
Update font families to match your theme:

```scss
// Header text
h3.upcart-header-text {
  font-family: "rig-sans";  // Change to your primary font
}

// Body text
span.TextStyle--variationSubdued.UpcartDesignSettings__cartTextSubduedColor {
  font-family: "rig-sans";  // Change to your body font
}
```

## 🔄 Workflow

1. **Modify styles**: Edit `src/scss/components/_upcart-side-cart.scss`
2. **Compile**: Run `npm run dev` or `npm run production`
3. **Copy CSS**: Copy content from `assets/upcart-side-cart.css`
4. **Paste in UpCart**: Paste CSS in UpCart configuration
5. **Test**: Verify styles apply correctly

## 📝 Best Practices

### ⚠️ Dependencies
- **Theme Integration**: Uses `@import 'buttons'` and `@import 'typography'` for consistency
- **CSS Variables**: All customization through CSS variables in `:root`
- **Standard Media Queries**: Uses standard `@media` queries instead of mixins
- **Direct Styles**: Includes direct styles instead of complex `@extend` chains

### 🎨 Customization
- **Color System**: All colors defined in CSS variables for easy theming
- **Typography**: Uses theme's font families for consistency
- **Spacing**: Consistent spacing and border radius throughout
- **Brand Integration**: Easy to match your brand colors and fonts

### 🔧 Maintenance
- **Auto-compilation**: Compiles automatically with Laravel Mix
- **Auto-minification**: Minifies automatically in production
- **Easy Updates**: Simple to update and maintain
- **Version Control**: Track changes in your SCSS file

## 🐛 Troubleshooting

### Problem: Styles not applying
**Solution**: Verify that:
1. CSS compiled correctly
2. Entire CSS file content copied
3. UpCart configured to use custom CSS
4. No conflicts with other CSS

### Problem: Styles break on mobile
**Solution**: Check that:
1. Media queries are correct
2. Breakpoints match UpCart's responsive behavior
3. No conflicts with other mobile CSS

### Problem: CSS variables not working
**Solution**: Ensure that:
1. Variables defined in `:root`
2. UpCart supports CSS variables
3. No naming conflicts

### Problem: Button styles not consistent
**Solution**: Verify that:
1. `@import 'buttons'` is included
2. `@extend .btn` and `@extend .btn--primary` are used
3. Theme's button system is properly imported

## 📚 Additional Resources

- [UpCart Documentation](https://upcart.app/)
- [Shopify App Store - UpCart](https://apps.shopify.com/upcart-cart-drawer)
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Laravel Mix Documentation](https://laravel-mix.com/)
- [SCSS Documentation](https://sass-lang.com/documentation)

## 🎯 Template Summary

This template provides:

✅ **Complete UpCart styling** with modern design effects
✅ **Theme integration** using button and typography systems  
✅ **Easy customization** through CSS variables
✅ **Responsive design** with mobile optimizations
✅ **Professional effects** including gradients and glassmorphism
✅ **Maintainable code** with clear structure and comments
✅ **Production ready** with auto-compilation and minification

The template is designed to be copied, customized, and reused across different projects while maintaining consistency with your theme's design system.
