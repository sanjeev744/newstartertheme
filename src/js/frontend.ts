// =============================================================================
// Frontend JavaScript - TypeScript Entry Point
// =============================================================================

// Lazy loading
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// import Vue from "vue";
// window.Vue = Vue;

import axios from 'axios';
window.axios = axios;

import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;

import Noty from 'noty';
window.Noty = Noty;

// Sections
import './sections/gelato-header.js';
import './sections/gelato-faqs.js';

// Snippets
import { GelatoProductCard } from './snippets/gelato-product-card';

// Templates
import './templates/product.js';

// Components (TypeScript)
import { createGelatoModal } from './components/GelatoModal';
import { GelatoQuickAddModal } from './snippets/gelato-quick-add-modal';

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  // Components
  GelatoQuickAddModal.initializeAll();

  // Snippets
  GelatoProductCard.initializeAll();

});