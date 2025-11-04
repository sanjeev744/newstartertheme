class GelatoHeader {
    constructor() {
        this.$header = document.querySelector('header');
        if (this.$header) {
            this.init();
        }
    }

    init() {
        // Add header-specific initialization logic here
        // Example: sticky header, menu toggle, etc.
        // console.log('GelatoHeader initialized');
    }
}

// Initialize when the script loads
new GelatoHeader();