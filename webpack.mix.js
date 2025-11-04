const mix = require('laravel-mix');
const minifier = require('minifier');

mix.setPublicPath('assets');
mix.options({
   fileLoaderDirs: {
       fonts: './'
   }
});

// TypeScript and JavaScript compilation
mix.ts('src/js/frontend.ts', 'assets')
   // Only enable if you are using Vue 3
   // .vue({
   //    version: 3,
   // })
   .webpackConfig({
      resolve: {
         alias: {
            jquery: 'jquery/dist/jquery.js'
         }
      },
      plugins: [
         new (require('webpack').ProvidePlugin)({
            $: 'jquery',
            jQuery: 'jquery'
         })
      ]
   });

// SCSS compilation with minification
mix.sass('src/scss/frontend.scss', 'frontend.css')
   .sass('src/scss/frontend-vendor.scss', 'frontend-vendor.css')
   .sass('src/scss/components/_upcart-side-cart.scss', 'upcart-side-cart.css');
   
// Copy fonts from src to assets root
mix.copy('src/fonts', 'assets');

mix.then(() => {
   // Minify CSS files
   minifier.minify('assets/frontend.css'); 
   minifier.minify('assets/frontend-vendor.css');
   minifier.minify('assets/upcart-side-cart.css');
});