# Lucyd Shopify Starter Theme

<p align="center">
  <a href="https://www.wearelucyd.com/">
    <img alt="Lucyd Logo" src="https://www.wearelucyd.com/wp-content/uploads/2021/02/Lucyd_Logo.webp" height="40">
  </a>
</p>

<p align="center">
  <strong>A modern, scalable Shopify starter theme for Lucyd projects</strong>
</p>

<p align="center">
  <a href="#requirements">Requirements</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#development">Development</a> •
  <a href="#file-structure">File Structure</a> •
  <a href="#dawn-theme-integration">DAWN Integration</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 🚀 Overview

This is a production-ready Shopify starter theme built on top of **Shopify's DAWN theme** - the fastest, most accessible theme ever built for Shopify. It features:

- **DAWN Theme Foundation** - Modern, optimized Shopify theme structure
- **Laravel Mix** for asset compilation
- **SCSS** for maintainable CSS architecture
- **Modular JavaScript** with page-specific initialization
- **Responsive design** with mobile-first approach
- **Shopify CLI** integration for seamless development
- **Custom Component System** - Project-specific prefixed components for easy maintenance

## 📋 Requirements

Before you begin, ensure you have the following installed:

- [**Shopify CLI**](https://shopify.dev/docs/api/shopify-cli/) - For theme development and deployment
- [**Node.js**](http://nodejs.org/) - Version 16 or higher
- **npm** - Usually comes with Node.js

## 🛠️ Project Setup (First Time Only)

For new projects, run the automated setup script to customize the theme:

```bash
npm run setup
```

This interactive script will:
- **Validate theme configuration** - Checks body template classes and compiled assets
- **Change the prefix** from "lucyd-" to your project-specific prefix (e.g., "brand-", "client-")
- **Rename all custom files** with the new prefix
- **Update all references** in code, imports, and documentation
- **Set project name** in package.json
- **Validate setup results** - Ensures all changes were applied correctly

**Example:**
```bash
$ npm run setup
🚀 Shopify Theme Setup Script
================================

🔍 Validating theme configuration...
✅ Body tag has template class
✅ CSS asset found: frontend.min.css
✅ CSS asset found: frontend-vendor.min.css
✅ JavaScript asset found: frontend.js
✅ Compiled asset exists: assets/frontend.min.css
✅ Theme configuration is valid

Enter your project prefix (e.g., "brand", "client", "mycompany"): brand
Enter project name (optional, default: "brand-shopify-theme"): Brand Store Theme

📋 Setup Summary:
   Old prefix: lucyd
   New prefix: brand
   Project name: Brand Store Theme

Proceed with setup? (y/N): y

🔄 Starting setup...
✅ Renamed: sections/lucyd-faqs.liquid → sections/brand-faqs.liquid
✅ Updated content: README.md

🔍 Validating setup results...
✅ New file exists: sections/brand-faqs.liquid
✅ Package.json name updated
✅ README title updated
✅ All setup validations passed!

✨ Setup Complete!
```

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Mode

```bash
npx mix watch
```

This will:
- Compile your SCSS and JavaScript files
- Watch for changes and recompile automatically
- Generate optimized assets in the `assets/` directory

### 3. Build for Production

```bash
npx mix --production
```

### 4. Verify Asset Compilation

After building, you should see these files in the `assets/` directory:
- `frontend.min.css` - Your custom styles (minified)
- `frontend-vendor.min.css` - Vendor styles (minified)
- `frontend.js` - Your custom JavaScript
- `fonts/` - Custom fonts (if any)

**Note**: The first time you run the build, you may see linter warnings about missing assets. This is normal - the assets will be generated after the build completes.

## 🏗️ Development

### TypeScript Support

This theme now supports **TypeScript** for new custom sections and components while keeping DAWN theme files untouched.

#### TypeScript Features
- **Strict type checking** for better code quality
- **Shopify theme interfaces** for type-safe development
- **Component type definitions** for consistent architecture
- **Path aliases** for clean imports (`@/types/*`, `@/components/*`)
- **Modern ES2020+ syntax** with full browser support

#### Creating TypeScript Components

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

#### Using Shopify Types

```typescript
import { Product, CartItem } from '@/types/shopify';

function handleProduct(product: Product): void {
  console.log(`Product: ${product.title} - $${product.price}`);
}
```

#### TypeScript Development Commands

```bash
# Development build with TypeScript
npm run dev

# Production build with TypeScript
npm run prod

# Type checking only
npx tsc --noEmit
```

**Note**: TypeScript is only used for new custom components. DAWN theme files remain unchanged for easy updates.

### Template Classes

The theme automatically adds template-specific classes to the body tag for easy JavaScript initialization and CSS targeting:

```html
<!-- Home page -->
<body class="gradient template-index">

<!-- Product page -->
<body class="gradient template-product">

<!-- Collection page -->
<body class="gradient template-collection">

<!-- Cart page -->
<body class="gradient template-cart">
```

This makes it easy to:
- **Target specific pages** in JavaScript without data attributes
- **Apply page-specific styles** in CSS
- **Initialize components** only on relevant pages
- **Maintain clean, semantic code**

### Asset Compilation

The theme uses **Laravel Mix** to compile and optimize your assets. Here's how it works:

1. **Source files** are located in `src/`
2. **Compiled assets** are output to `assets/`
3. **Watch mode** automatically recompiles on file changes

#### Asset Integration
The compiled assets are automatically loaded in the theme layout:

**CSS Files:**
- `frontend.min.css` - Your custom styles compiled and minified from `src/scss/frontend.scss`
- `frontend-vendor.min.css` - Vendor styles compiled and minified from `src/scss/frontend-vendor.scss`

**JavaScript Files:**
- `frontend.js` - Your custom JavaScript compiled from `src/js/frontend.js`

**Fonts:**
- Custom fonts from `src/fonts/` are automatically copied to `assets/fonts/`

The assets are loaded after DAWN's core styles to ensure your custom styles take precedence.

### File Organization

Follow this structure for maintainable code:

```
src/
├── fonts/                    # Custom fonts
├── scss/                    # SCSS stylesheets
│   ├── sections/           # Section-specific styles (e.g., lucyd-faqs.scss)
│   ├── snippets/           # Reusable component styles (e.g., lucyd-product-card.scss)
│   └── frontend.scss       # Main stylesheet
└── js/                     # JavaScript/TypeScript modules
    ├── components/         # Reusable components (e.g., lucyd-age-gate.ts)
    ├── sections/           # Section-specific scripts (e.g., lucyd-header.ts)
    ├── snippets/           # Snippet-specific scripts (e.g., lucyd-collection-ui.ts)
    ├── templates/          # Template-specific scripts (e.g., product.ts)
    ├── types/              # TypeScript type definitions
    └── frontend.ts         # Main TypeScript entry point
```

### JavaScript Architecture

The theme uses a **unified initialization system** with TypeScript classes that have static `initializeAll()` methods. All components are centrally managed through `frontend.ts`.

#### Unified Initialization System

**Entry Point (`src/js/frontend.ts`):**
```typescript
import { LucydHeader } from './sections/lucyd-header';
import { LucydCollectionUI } from './snippets/lucyd-collection-ui';
import { LucydAgeGate } from './components/lucyd-age-gate';
import { LucydProductTemplate } from './templates/product';

document.addEventListener('DOMContentLoaded', () => {
  // Components
  LucydAgeGate.initializeAll?.();
  // Sections
  LucydHeader.initializeAll?.();
  // Snippets
  LucydCollectionUI.initializeAll?.();
  // Templates
  LucydProductTemplate.initializeAll?.();
});
```

#### Component Structure

Each component follows this pattern with automatic element detection:

**Example: Section (`src/js/sections/lucyd-header.ts`):**
```typescript
export class LucydHeader {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }

  private init(): void {
    // Component initialization logic
  }

  public destroy(): void {
    // Cleanup logic
  }

  // Static method for automatic initialization
  static initializeAll(): void {
    const elements = document.querySelectorAll<HTMLElement>(".lucyd-menu-bar");
    elements.forEach((element) => {
      if (!(element as any)._lucydHeaderInstance) {
        (element as any)._lucydHeaderInstance = new LucydHeader(element);
      }
    });
  }

  // Static method for cleanup
  static destroySection(element: HTMLElement): void {
    const instance = (element as any)._lucydHeaderInstance;
    if (instance && typeof instance.destroy === "function") {
      instance.destroy();
      delete (element as any)._lucydHeaderInstance;
    }
  }
}
```

**Example: Snippet (`src/js/snippets/lucyd-collection-ui.ts`):**
```typescript
export class LucydCollectionUI {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }

  private init(): void {
    // Snippet initialization logic
  }

  // Static initialization method
  static initializeAll(): void {
    const elements = document.querySelectorAll<HTMLElement>(".lucyd-collection-ui");
    elements.forEach((element) => {
      new LucydCollectionUI(element);
    });
  }
}
```

#### Template Classes

The body tag automatically includes template-specific classes for CSS targeting and conditional logic:
- **Home page**: `template-index`
- **Product page**: `template-product`
- **Collection page**: `template-collection`
- **Cart page**: `template-cart`
- **Blog page**: `template-blog`
- **Article page**: `template-article`
- **Page template**: `template-page`
- **Search page**: `template-search`
- **404 page**: `template-404`

**Usage in Components:**
```typescript
// Check if we're on a specific page type
const isCollectionPage = document.querySelector('body.template-collection');
if (isCollectionPage) {
  // Collection-specific logic
}
```

### SCSS Architecture

Organize your styles following this pattern:

```scss
// src/scss/frontend.scss
@import 'sections/lucyd-faqs';
@import 'snippets/lucyd-product-card';
@import 'media-queries';

// Add your custom styles here
```

**Consistent Naming Structure:**
- **Liquid files**: `lucyd-faqs.liquid`
- **SCSS files**: `lucyd-faqs.scss`
- **JavaScript files**: `lucyd-faqs.js`

This makes it easy to find all related files for a component.

**Template-Specific Styling:**
```scss
// Page-specific styles using template classes
.template-index {
  .hero-section {
    background: var(--color-primary);
  }
}

.template-product {
  .product-gallery {
    margin-bottom: 2rem;
  }
}

.template-collection {
  .collection-header {
    text-align: center;
  }
}
```

## 📁 File Structure

```
lucyd-shopify-starter-theme/
├── assets/                     # Compiled assets (auto-generated)
├── config/                     # Theme configuration files
├── layout/                     # Theme layout templates
├── locales/                    # Multi-language support
├── sections/                   # Reusable page sections
├── snippets/                   # Reusable code snippets
├── templates/                  # Page templates
├── src/                        # Source files (edit these)
│   ├── fonts/                 # Custom fonts
│   ├── scss/                  # SCSS source files
│   │   ├── components/        # Component library
│   │   ├── sections/          # Section-specific styles
│   │   ├── snippets/          # Snippet-specific styles
│   │   ├── templates/         # Template-specific styles
│   │   └── frontend.scss      # Main stylesheet
│   └── js/                    # JavaScript/TypeScript files
│       ├── types/             # TypeScript type definitions
│       │   ├── shopify.d.ts   # Shopify theme interfaces
│       │   ├── components.d.ts # Component interfaces
│       │   └── README.md      # TypeScript documentation
│       ├── components/        # TypeScript components
│       ├── sections/          # Section-specific JS/TS
│       ├── snippets/          # Snippet-specific JS/TS
│       ├── templates/         # Template-specific JS/TS
│       └── frontend.ts        # Main TypeScript entry point
├── package.json               # Dependencies and scripts
├── webpack.mix.js            # Laravel Mix configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔧 Available Scripts

```bash
npm run dev          # Development build
npm run watch        # Watch mode for development
npm run production   # Production build
npm run mix          # Run mix commands
```

## 📚 Key Features

- **DAWN Theme Foundation**: Built on Shopify's fastest, most accessible theme
- **Modular Architecture**: Separate concerns with page-specific files
- **Asset Optimization**: Automatic compilation and minification
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Shopify Integration**: Built-in Shopify-specific functionality
- **Performance Focused**: Optimized asset delivery
- **Easy Updates**: Project-specific components separated from DAWN core for seamless updates

## 🚀 Deployment

### Using Shopify CLI

```bash
# Login to your Shopify store
shopify auth login

# Deploy your theme
shopify theme push

# Or pull existing theme
shopify theme pull
```

### Manual Upload

1. Run `npm run production` to build optimized assets
2. Zip the theme folder (excluding `src/`, `node_modules/`, etc.)
3. Upload via Shopify admin or CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎨 CSS Architecture

### SCSS Structure
- Use **BEM methodology** for class naming
- Organize styles by component and page
- Leverage SCSS features like variables, mixins, and nesting
- Keep styles modular and reusable
- Use the built-in responsive mixins for consistent breakpoints

### Advanced Component Override Pattern (Optional but Recommended)

For components that need to override DAWN theme styles completely, use the **Placeholder + Extend pattern**. This technique provides powerful override capabilities while maintaining optimal CSS performance.

#### Why Use This Pattern?
- **Complete Override**: Replaces DAWN styles entirely with custom designs
- **CSS Optimization**: Groups selectors efficiently, reducing file size
- **Maintainability**: Centralizes component styles in reusable placeholders
- **Flexibility**: Allows multiple contexts to inherit the same base styles

#### Implementation Structure:

**1. Create Base Placeholder (for desktop styles):**
```scss
// src/scss/components/_my-component.scss
%project-component-base {
  // All base component styles here
  .component-container {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    // ... more styles
  }
  
  .component__element {
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #B8CCEA;
    // ... more styles
  }
}
```

**2. Include Responsive Styles Directly in Each Selector:**
```scss
%project-component-base {
  .component-container {
    display: flex;
    gap: 1.6rem;
    
    // Responsive styles within the same selector
    @include respond-below(md) {
      gap: 1.4rem;
    }
  }
  
  .component__element {
    padding: 1.2rem;
    font-size: 1.4rem;
    
    // Responsive styles within the same selector
    @include respond-below(md) {
      padding: 0.8rem;
      font-size: 1.2rem;
    }
  }
}
```

**3. Apply Override to DAWN Elements:**
```scss
// Override DAWN's default component
dawn-component-selector {
  @extend %project-component-base;
}

// Template-specific override (optional)
.template-product {
  dawn-component-selector {
    @extend %project-component-base;
  }
}
```

#### Key Rules:
- **Use `%placeholders` + `@extend`** for complete component override
- **Include responsive styles directly** within each selector using `@include respond-below(md)`
- **Never use `@extend` inside media queries** (SCSS limitation)
- **Add `!important` selectively** when DAWN styles have high specificity
- **Keep responsive styles co-located** with their base styles for better maintainability

#### Real Example:
```scss
// Variant picker component override
%nad-variant-picker-base {
  .product-form__input label {
    background: rgba(255, 255, 255, 0.6) !important;
    border: 1px solid #B8CCEA !important;
    border-radius: 2.4rem;
    padding: 1.2rem;
    font-size: 1.4rem;
    
    // Responsive styles directly within selector
    @include respond-below(md) {
      padding: 0.8rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }
  }
  
  .form__label {
    font-size: 1.4rem;
    font-weight: 700;
    
    @include respond-below(md) {
      font-size: 1.2rem;
    }
  }
}

variant-selects {
  @extend %nad-variant-picker-base; // Applies all custom styles including responsive
}
```

#### Benefits:
- **Compiled CSS Efficiency**: `@extend` groups selectors like `.btn1, .btn2, .btn3 { styles }`
- **Override Power**: Completely replaces DAWN styles with custom designs
- **Code Reusability**: Same placeholder can be extended in multiple contexts
- **Maintainability**: Single source of truth for component styles

### Media Query Mixins
The theme includes a comprehensive set of responsive mixins for consistent breakpoint usage:

```scss
// Available breakpoints
$breakpoints: (
  xs: 576px,    // Extra small devices
  sm: 768px,    // Small devices (tablets)
  md: 992px,    // Medium devices (desktops)
  lg: 1200px    // Large devices (wide desktops)
);

// Usage examples:
.hero-section {
  padding: 1rem;
  
  // Apply styles for small devices and up
  @include respond-above(sm) {
    padding: 2rem;
  }
  
  // Apply styles for medium devices and down
  @include respond-below(md) {
    padding: 1.5rem;
  }
  
  // Apply styles between specific breakpoints
  @include respond-between(sm, lg) {
    padding: 2.5rem;
  }
}
```

### Example SCSS Structure:
```scss
// _variables.scss
$primary-color: #007bff;

// home.scss
.home-page {
    &__hero {
        background: $primary-color;
        padding: 1rem;
        
        // Responsive adjustments
        @include respond-above(sm) {
            padding: 2rem;
        }
        
        @include respond-above(md) {
            padding: 3rem;
        }
    }
}
```

## 🚀 Shopify Theme Development with GitHub

### Branch Strategy
Use a two-branch workflow for organized development:

1. **`main` branch** - Production-ready code
   - Only stable, tested changes
   - Deploy directly to your Shopify store
   - Tag releases for version tracking

2. **`develop` branch** - Development and testing
   - New features and bug fixes
   - Collaborate without affecting production
   - Merge to main via pull requests

### Feature Development Workflow
1. **Create an issue** with requirements and Monday.com URL
2. **Create a feature branch** from `develop` (e.g., `feature/issue-123-new-header`)
3. **Develop and test** your feature
4. **Create a pull request** to merge into `develop`
5. **Code review** and testing
6. **Merge to main** when ready for production

### Best Practices
- **Use Shopify CLI** for development and testing
- **Commit frequently** with descriptive messages
- **Link commits to issues** using `#issue-number`
- **Test thoroughly** before merging to main
- **Use semantic versioning** for releases

## 🛒 Cart Counter Auto-Update

The theme includes automatic cart counter updates that work seamlessly with **UpCart Cart Drawer** and other cart management systems.

> **Note**: This implementation is specific to UpCart. For other cart systems, adapt the event listeners accordingly.

### Implementation

The cart counter in `.lucyd-menu-bar__icon-bag span` automatically updates when items are added, removed, or modified in the cart without requiring page refreshes.

### How It Works

**Event Detection:**
- Listens for UpCart-specific events (`aftersell-upcart-debug`, `abra:aftersell-upcart:tiers:activate`)
- Fetches cart data from Shopify's `/cart.js` endpoint
- Updates the counter display in real-time

**Code Location:**
```typescript
// src/js/sections/lucyd-header.ts
private initCartCounter(): void {
  // Initial cart count update
  this.fetchCart();

  // Listen for UpCart specific events
  window.addEventListener('aftersell-upcart-debug', (event) => {
    if (!this.isFetchingCart) {
      this.isFetchingCart = true;
      this.fetchCart();
    }
  });
}
```

**HTML Structure:**
```liquid
<!-- sections/lucyd-header.liquid -->
<span class="lucyd-menu-bar__icon-bag">
  <a href="{{ routes.cart_url }}" class="lucyd-menu-bar__icon-link">
    <img src="{{ 'icon-bag.svg' | asset_url }}" alt="Bag" width="20">
  </a>
  <span>{{ cart.item_count }}</span> <!-- This gets updated automatically -->
</span>
```

### Features

- **🔄 Real-time Updates**: Counter updates immediately when cart changes
- **🛡️ Duplicate Prevention**: Prevents multiple simultaneous fetch requests
- **📱 Universal Compatibility**: Works with UpCart and standard Shopify cart systems
- **⚡ Performance Optimized**: Uses efficient event listeners and fetch controls
- **🧹 Clean Architecture**: Proper cleanup and memory management

### Usage

The cart counter updates automatically - no additional configuration required. The system:

1. **Initializes** on page load with current cart count
2. **Listens** for cart update events from UpCart
3. **Fetches** latest cart data from `/cart.js`
4. **Updates** the counter display instantly

This ensures users always see the correct cart count regardless of how items are added or removed from the cart.

### Troubleshooting

**Common Issues:**
- **Counter not updating**: Verify UpCart events are being fired in browser console
- **Multiple requests**: Check `isFetchingCart` flag is working properly
- **Wrong selector**: Ensure `.lucyd-menu-bar__icon-bag span` exists in your HTML
- **Event conflicts**: Other cart systems may interfere with UpCart events

**Debugging:**
```javascript
// Add to browser console to test events
window.addEventListener('aftersell-upcart-debug', (e) => console.log('UpCart event:', e));
```

## 🔍 SEO Optimization

### Meta Tags
- Unique, descriptive page titles (50-60 characters)
- Compelling meta descriptions (150-160 characters)
- Proper Open Graph tags for social sharing

### Image Optimization
- Compress images using tools like [Photopea](https://photopea.com/)
- Use descriptive alt attributes
- Implement lazy loading for better performance

### Structured Data
- Implement JSON-LD markup for rich results
- Use [JSON-LD Generator](https://jsonld.com/) for testing
- Include product, organization, and breadcrumb schemas

### Performance
- Optimize Core Web Vitals
- Implement lazy loading
- Use responsive images
- Minimize render-blocking resources

## ⚡ Performance Recommendations

### JavaScript Libraries
- **Sliders**: Use [Swiper.js](https://swiperjs.com/) instead of Slick
- **Modals**: [Fancybox](https://fancyapps.com/) for image galleries
- **Notifications**: [Noty.js](https://ned.im/noty/) for toast messages
- **Accordions**: [Accordion.js](https://accordion.js.org/) for collapsible content

### Development Tools
- **Google Lighthouse** for performance auditing
- **GTmetrix** for detailed performance analysis
- **Shopify CLI** for local development and testing

## 🌅 DAWN Theme Integration

This theme is built on top of Shopify's **DAWN theme** - the fastest, most accessible theme ever built for Shopify. The integration maintains your existing Laravel Mix workflow while providing access to DAWN's modern, optimized structure.

### File Structure & Naming Convention

#### Custom Components (with Project-Specific Prefix)
All custom sections and snippets use a project-specific prefix to avoid conflicts with DAWN updates. In this example, we use "lucyd-" but this will vary for each project:

**Custom Sections:**
- `lucyd-faqs.liquid` - Custom FAQ section
- `lucyd-image-slider.liquid` - Custom image slider
- `lucyd-blog-posts.liquid` - Custom blog posts layout
- `lucyd-collection-template.liquid` - Custom collection template
- `lucyd-cart-template.liquid` - Custom cart template
- `lucyd-product.liquid` - Custom product template

**Custom Snippets:**
- `lucyd-mini-cart.liquid` - Custom mini cart
- `lucyd-navbar.liquid` - Custom navigation
- `lucyd-product-card.liquid` - Custom product card
- `lucyd-responsive-bg-image.liquid` - Custom responsive background
- `lucyd-responsive-image.liquid` - Custom responsive image

#### DAWN Theme Files (Unchanged)
Standard DAWN files remain unchanged for easy updates:
- `header.liquid`, `footer.liquid`
- `main-product.liquid`, `featured-product.liquid`
- `rich-text.liquid`, `image-banner.liquid`
- And all other standard DAWN sections and snippets

### Development Workflow

#### 1. Custom Development (src folder)
All new custom components should:
- Be created in the `src/` folder
- Use your project-specific prefix in their names (e.g., "lucyd-", "brand-", "client-")
- Follow the existing SCSS and JavaScript structure

#### 2. SCSS Structure
```scss
// src/scss/frontend.scss
@import './media-queries.scss';
@import './mini-cart.scss';
@import './sections/faqs.scss';
@import './snippets/product-card.scss';
@import './frontend-vendor.scss';
```

**File Organization Example:**
```
src/
├── scss/
│   ├── sections/
│   │   └── lucyd-faqs.scss          # Matches lucyd-faqs.liquid
│   ├── snippets/
│   │   └── lucyd-product-card.scss  # Matches lucyd-product-card.liquid
│   └── frontend.scss
└── js/
    ├── sections/
    │   └── lucyd-faqs.js            # Matches lucyd-faqs.liquid
    ├── snippets/
    │   └── lucyd-product-card.js    # Matches lucyd-product-card.liquid
    └── frontend.js
```

#### 3. Asset Compilation
Your existing Laravel Mix workflow is maintained:
- Source files in `src/`
- Compiled assets output to `assets/`
- Watch mode for development
- Production builds with minification

#### 4. Asset Loading Order
The theme loads assets in the correct order for optimal performance:

1. **DAWN Core Assets** - Base styles, components, and functionality
2. **Custom CSS** - Your compiled and minified SCSS files (`frontend.min.css`, `frontend-vendor.min.css`)
3. **Custom JavaScript** - Your compiled JS files (`frontend.js`)

This ensures:
- DAWN's core functionality is always available
- Your custom styles can override DAWN defaults when needed
- Custom JavaScript has access to all required dependencies

### Updating DAWN Theme

#### 1. Create Update Branch
```bash
# Create a new branch for the theme update
git checkout -b update/dawn-theme-v[version]

# Ensure you're working from the latest develop branch
git checkout develop
git pull origin develop
git checkout -b update/dawn-theme-v[version]
```

#### 2. Add New Theme Version
1. **Download the latest DAWN theme** from [Shopify's GitHub repository](https://github.com/Shopify/dawn)
2. **Replace standard DAWN files** (sections, snippets, layout, config, locales)
3. **DO NOT replace** files with your project-specific prefix (e.g., "lucyd-", "brand-", "client-")
4. **DO NOT replace** your `src/` folder
5. **DO NOT replace** your build configuration files (`webpack.mix.js`, `package.json`)

#### 3. Compare and Review Files
```bash
# Review changes to ensure custom features aren't overridden
git diff develop

# Check specific file changes
git diff develop -- sections/
git diff develop -- snippets/
git diff develop -- layout/
git diff develop -- config/
git diff develop -- locales/
```

**Critical Review Points:**
- Verify no project-specific prefixed files were modified (e.g., "lucyd-", "brand-", "client-")
- Check that your `src/` folder remains intact
- Ensure build configuration files weren't changed
- Review any new DAWN features that might conflict with custom code

#### 4. Commit and Test
```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Update DAWN theme to v[version]

- Updated standard DAWN files (sections, snippets, layout, config, locales)
- Preserved all project-specific prefixed custom components
- Maintained existing src/ folder structure
- Kept build configuration intact"

# Push the update branch
git push origin update/dawn-theme-v[version]
```

#### 5. Merge Process
1. **Create Pull Request** from `update/dawn-theme-v[version]` to `develop`
2. **Code Review**: Team reviews changes to ensure no custom features are overridden
3. **Testing**: Run extensive QA on the develop branch
4. **Merge to Develop**: After approval and testing, merge to `develop` branch
5. **Final QA**: Conduct extensive testing on develop branch
6. **Merge to Main**: Only after thorough QA, merge to `main` branch for production

#### 6. Post-Update Verification
- Test that all custom functionality still works
- Verify DAWN updates are properly integrated
- Check for any breaking changes that need custom code updates
- Ensure build process works correctly
- Test on staging environment before production deployment

### Best Practices

#### Naming Convention
- **Custom sections**: `[prefix]-[section-name].liquid` (e.g., `lucyd-faqs.liquid`, `brand-hero.liquid`)
- **Custom snippets**: `[prefix]-[snippet-name].liquid` (e.g., `lucyd-product-card.liquid`, `client-navbar.liquid`)
- **Custom SCSS**: `[prefix]-[component-name].scss` (e.g., `lucyd-faqs.scss`, `brand-hero.scss`)
- **Custom JS**: `[prefix]-[component-name].js` (e.g., `lucyd-faqs.js`, `brand-hero.js`)

**Note**: Use the same naming structure across all file types for easier component discovery and consistency.

#### Avoiding Conflicts
- Never modify standard DAWN files directly
- Always use your project-specific prefix for custom components
- Keep custom logic in the `src/` folder
- Use Shopify's section and snippet rendering system

#### Template Class Best Practices
- **Use template classes** instead of data attributes for page targeting
- **Target specific pages** with `body.template-[name]` selectors
- **Apply page-specific styles** using template class selectors
- **Initialize JavaScript components** only on relevant pages
- **Keep selectors semantic** and easy to understand

### Troubleshooting

#### Common Issues
1. **Custom styles not loading**: Check that SCSS files are properly imported in `frontend.scss`
2. **JavaScript errors**: Ensure custom JS files are imported in `frontend.js`
3. **Missing assets**: Run `npm run watch` to compile assets
4. **DAWN updates breaking custom code**: Check for changes in DAWN's structure or naming
5. **Template classes not working**: Verify the template name is correct and the class is being applied to the body tag
6. **JavaScript not initializing**: Check that you're targeting the correct template class (e.g., `body.template-index`)
7. **Custom styles not applying**: Ensure you've run `npm run watch` or `npm run production` to compile assets
8. **Assets not loading**: Verify that `frontend.min.css`, `frontend-vendor.min.css`, and `frontend.js` exist in the `assets/` folder
9. **Build errors**: Check the console output when running Laravel Mix commands

---

## 📖 Additional Resources

### Shopify Development
- [**Lucyd Development Guidelines**](https://www.notion.so/lucydmedia/Streamlining-Shopify-Theme-Development-Using-GitHub-1463cb84c38b800ba072dd108d561f3f?showMoveTo=true&saveParent=true)
- [Shopify Dev Tips: Lazy Loading](https://www.youtube.com/watch?v=dd3kpLt9KZY)
- [Shopify Theme Development](https://shopify.dev/docs/themes)
- [Shopify CLI Documentation](https://shopify.dev/docs/api/shopify-cli/)

### Version Control & Collaboration
- [GitHub Best Practices](https://docs.github.com/en/get-started/quickstart)
- [Git Flow Workflow](https://nvie.com/posts/a-successful-git-branching-model/)

### Performance & SEO
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [JSON-LD Generator](https://jsonld.com/)

### Design & Development
- [BEM Methodology](https://en.bem.info/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Laravel Mix Documentation](https://laravel-mix.com/docs/6/what-is-mix)

## 📄 License

This project is proprietary to Lucyd Media. All rights reserved.

---

<p align="center">
  <strong>Built with ❤️ by the Lucyd team</strong>
</p>
