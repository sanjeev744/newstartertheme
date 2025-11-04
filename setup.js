#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class ThemeSetup {
  constructor() {
    this.currentPrefix = 'lucyd';
    this.newPrefix = '';
    this.projectName = '';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Prompt user for input
  async prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  // Get all files that need to be renamed or updated
  getFilesToUpdate() {
    return {
      // Files to rename (filename contains prefix)
      filesToRename: [
        'sections/lucyd-blog-posts.liquid',
        'sections/lucyd-cart-template.liquid',
        'sections/lucyd-collection-template.liquid',
        'sections/lucyd-faqs.liquid',
        'sections/lucyd-image-slider.liquid',
        'sections/lucyd-product.liquid',
        'snippets/lucyd-mini-cart.liquid',
        'snippets/lucyd-navbar.liquid',
        'snippets/lucyd-product-card.liquid',
        'snippets/lucyd-responsive-bg-image.liquid',
        'snippets/lucyd-responsive-image.liquid',
        'src/js/sections/lucyd-faqs.js',
        'src/scss/sections/lucyd-faqs.scss',
        'src/scss/snippets/lucyd-product-card.scss'
      ],
      // Files with content that references the prefix
      filesToUpdateContent: [
        'README.md',
        'src/scss/frontend.scss',
        'src/js/frontend.ts',
        'src/js/frontend.js',
        'package.json'
      ]
    };
  }

  // Check if file exists
  fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  // Rename a file
  renameFile(oldPath, newPath) {
    if (this.fileExists(oldPath)) {
      // Create directory if it doesn't exist
      const dir = path.dirname(newPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${oldPath} → ${newPath}`);
      return true;
    } else {
      console.log(`⚠️  File not found: ${oldPath}`);
      return false;
    }
  }

  // Update content in a file
  updateFileContent(filePath, replacements) {
    if (!this.fileExists(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }

    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;

      replacements.forEach(({ from, to }) => {
        if (content.includes(from)) {
          content = content.replace(new RegExp(from, 'g'), to);
          updated = true;
        }
      });

      if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated content: ${filePath}`);
        return true;
      } else {
        console.log(`ℹ️  No changes needed: ${filePath}`);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message);
      return false;
    }
  }

  // Generate replacement patterns
  getReplacements() {
    return [
      // File names and imports
      { from: `${this.currentPrefix}-`, to: `${this.newPrefix}-` },
      // CSS classes
      { from: `\\.${this.currentPrefix}-`, to: `.${this.newPrefix}-` },
      // Class names in JavaScript/TypeScript
      { from: `${this.currentPrefix.charAt(0).toUpperCase() + this.currentPrefix.slice(1)}`, to: `${this.newPrefix.charAt(0).toUpperCase() + this.newPrefix.slice(1)}` },
      // Comments and documentation
      { from: `Lucyd`, to: `${this.newPrefix.charAt(0).toUpperCase() + this.newPrefix.slice(1)}` },
      // Package name
      { from: `"name": "codeinpsire"`, to: `"name": "${this.projectName || this.newPrefix + '-shopify-theme'}"` },
      // README title
      { from: `# Lucyd Shopify Starter Theme`, to: `# ${this.newPrefix.charAt(0).toUpperCase() + this.newPrefix.slice(1)} Shopify Theme` }
    ];
  }

  // Validate setup results
  validateSetupResults() {
    const warnings = [];
    const successes = [];

    // Check if old prefix files still exist (should be renamed)
    const { filesToRename } = this.getFilesToUpdate();
    
    filesToRename.forEach(oldPath => {
      if (this.fileExists(oldPath)) {
        warnings.push(`⚠️  Old file still exists: ${oldPath}`);
      }
    });

    // Check if new prefix files exist
    filesToRename.forEach(oldPath => {
      const newPath = oldPath.replace(new RegExp(`${this.currentPrefix}-`, 'g'), `${this.newPrefix}-`);
      if (this.fileExists(newPath)) {
        successes.push(`✅ New file exists: ${newPath}`);
      } else {
        warnings.push(`❌ New file missing: ${newPath}`);
      }
    });

    // Check package.json was updated
    if (this.fileExists('package.json')) {
      const packageContent = fs.readFileSync('package.json', 'utf8');
      if (packageContent.includes(`"name": "${this.projectName}"`)) {
        successes.push('✅ Package.json name updated');
      } else {
        warnings.push('❌ Package.json name not updated');
      }
    }

    // Check README was updated
    if (this.fileExists('README.md')) {
      const readmeContent = fs.readFileSync('README.md', 'utf8');
      const expectedTitle = `# ${this.newPrefix.charAt(0).toUpperCase() + this.newPrefix.slice(1)} Shopify Theme`;
      if (readmeContent.includes(expectedTitle)) {
        successes.push('✅ README title updated');
      } else {
        warnings.push('❌ README title not updated');
      }
    }

    // Display results
    if (successes.length > 0) {
      successes.forEach(success => console.log(success));
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  Setup Warnings:');
      warnings.forEach(warning => console.log(`   ${warning}`));
      console.log('\n💡 You may need to manually fix these issues.');
    } else {
      console.log('✅ All setup validations passed!');
    }
  }

  // Validate theme configuration
  validateThemeConfiguration() {
    console.log('🔍 Validating theme configuration...');
    let isValid = true;
    const issues = [];

    // Check if theme.liquid exists
    if (!this.fileExists('layout/theme.liquid')) {
      issues.push('❌ layout/theme.liquid not found');
      isValid = false;
    } else {
      const themeContent = fs.readFileSync('layout/theme.liquid', 'utf8');

      // Check for template class in body tag
      if (!themeContent.includes('template-{{ template.name | handle }}')) {
        issues.push('❌ Body tag missing template class (template-{{ template.name | handle }})');
        isValid = false;
      } else {
        console.log('✅ Body tag has template class');
      }

      // Check for compiled CSS assets
      const requiredCSS = ['frontend.min.css', 'frontend-vendor.min.css'];
      requiredCSS.forEach(cssFile => {
        if (!themeContent.includes(`'${cssFile}'`)) {
          issues.push(`❌ Missing CSS asset: ${cssFile}`);
          isValid = false;
        } else {
          console.log(`✅ CSS asset found: ${cssFile}`);
        }
      });

      // Check for compiled JavaScript asset
      if (!themeContent.includes("'frontend.js'")) {
        issues.push('❌ Missing JavaScript asset: frontend.js');
        isValid = false;
      } else {
        console.log('✅ JavaScript asset found: frontend.js');
      }
    }

    // Check if compiled assets exist in assets folder
    const compiledAssets = ['assets/frontend.min.css', 'assets/frontend-vendor.min.css', 'assets/frontend.js'];
    compiledAssets.forEach(asset => {
      if (!this.fileExists(asset)) {
        issues.push(`⚠️  Compiled asset not found: ${asset} (run 'npm run production' to generate)`);
      } else {
        console.log(`✅ Compiled asset exists: ${asset}`);
      }
    });

    if (!isValid) {
      console.log('\n❌ Theme configuration issues found:');
      issues.forEach(issue => console.log(`   ${issue}`));
      console.log('\n💡 Please fix these issues before running the setup script.');
      return false;
    }

    console.log('✅ Theme configuration is valid\n');
    return true;
  }

  // Main setup process
  async run() {
    console.log('\n🚀 Shopify Theme Setup Script');
    console.log('================================\n');

    try {
      // Validate theme configuration first
      if (!this.validateThemeConfiguration()) {
        this.rl.close();
        return;
      }

      // Get user input
      this.newPrefix = await this.prompt('Enter your project prefix (e.g., "brand", "client", "mycompany"): ');
      
      if (!this.newPrefix || this.newPrefix.trim() === '') {
        console.log('❌ Prefix cannot be empty. Exiting.');
        this.rl.close();
        return;
      }

      this.newPrefix = this.newPrefix.trim().toLowerCase();

      // Validate prefix
      if (!/^[a-z][a-z0-9]*$/.test(this.newPrefix)) {
        console.log('❌ Prefix must start with a letter and contain only lowercase letters and numbers. Exiting.');
        this.rl.close();
        return;
      }

      this.projectName = await this.prompt(`Enter project name (optional, default: "${this.newPrefix}-shopify-theme"): `);
      
      if (!this.projectName || this.projectName.trim() === '') {
        this.projectName = `${this.newPrefix}-shopify-theme`;
      }

      console.log(`\n📋 Setup Summary:`);
      console.log(`   Old prefix: ${this.currentPrefix}`);
      console.log(`   New prefix: ${this.newPrefix}`);
      console.log(`   Project name: ${this.projectName}\n`);

      const confirm = await this.prompt('Proceed with setup? (y/N): ');
      
      if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
        console.log('❌ Setup cancelled.');
        this.rl.close();
        return;
      }

      console.log('\n🔄 Starting setup...\n');

      // Get files to process
      const { filesToRename, filesToUpdateContent } = this.getFilesToUpdate();

      // Step 1: Rename files
      console.log('📁 Renaming files...');
      let renamedCount = 0;
      
      filesToRename.forEach(filePath => {
        const newPath = filePath.replace(new RegExp(`${this.currentPrefix}-`, 'g'), `${this.newPrefix}-`);
        if (this.renameFile(filePath, newPath)) {
          renamedCount++;
        }
      });

      // Step 2: Update file contents
      console.log('\n📝 Updating file contents...');
      const replacements = this.getReplacements();
      let updatedCount = 0;

      // Update original files and newly renamed files
      const allFilesToUpdate = [
        ...filesToUpdateContent,
        ...filesToRename.map(f => f.replace(new RegExp(`${this.currentPrefix}-`, 'g'), `${this.newPrefix}-`))
      ];

      [...new Set(allFilesToUpdate)].forEach(filePath => {
        if (this.updateFileContent(filePath, replacements)) {
          updatedCount++;
        }
      });

      // Step 3: Post-setup validation
      console.log('\n🔍 Validating setup results...');
      this.validateSetupResults();

      // Step 4: Summary
      console.log('\n✨ Setup Complete!');
      console.log('==================');
      console.log(`📁 Files renamed: ${renamedCount}`);
      console.log(`📝 Files updated: ${updatedCount}`);
      console.log(`🎯 New prefix: ${this.newPrefix}`);
      console.log(`📦 Project name: ${this.projectName}`);

      console.log('\n🚀 Next Steps:');
      console.log('1. Run "npm install" to install dependencies');
      console.log('2. Run "npm run watch" to start development');
      console.log('3. Update any remaining references manually if needed');
      console.log('4. Commit your changes to git\n');

    } catch (error) {
      console.error('❌ Setup failed:', error.message);
    } finally {
      this.rl.close();
    }
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  const setup = new ThemeSetup();
  setup.run();
}

module.exports = ThemeSetup;
