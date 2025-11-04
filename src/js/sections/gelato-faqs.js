class GelatoFaqs {
  constructor(container) {
    this.container = container;
    // Initialize FAQ functionality here if needed
  }
}

// Register section if using Shopify's section registration pattern
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
      if (event.target && event.target.querySelector('.gelato-faqs')) {
      new GelatoFaqs(event.target.querySelector('.gelato-faqs'));
    }
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    const faqsSection = document.querySelector('.gelato-faqs');
    if (faqsSection) {
      new GelatoFaqs(faqsSection);
    }
  });
}
