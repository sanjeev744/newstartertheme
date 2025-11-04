class LucydProductTemplate {
    constructor() {
        this.$product = document.querySelector('.template-product');
        if (this.$product) {
            this.init();
        }
    }

    init() {
        // Add product page-specific initialization logic here
        // Example: variant selection, image gallery, etc.
        // console.log('LucydProductTemplate initialized');
    }
}

// Initialize when the script loads
new LucydProductTemplate();
