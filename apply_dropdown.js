const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const CSS_DECLARATION = `
/* Categories Dropdown */
.categories-dropdown {
  position: relative;
  display: inline-block;
  margin-right: 30px;
}
.btn-categories {
  background: linear-gradient(135deg, #00C9FF, #92FE9D);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--heading-font, 'Poppins', sans-serif);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
  transition: all 0.3s ease;
}
.btn-categories:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 201, 255, 0.4);
}
.categories-dropdown .dropdown-menu {
  position: absolute;
  top: 120%;
  left: 0;
  background: var(--white, #fff);
  min-width: 220px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1000;
  padding: 10px 0;
  border: 1px solid rgba(0,0,0,0.05);
}
.categories-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.categories-dropdown .dropdown-menu a {
  display: block;
  padding: 12px 20px;
  font-family: var(--body-font, 'Inter', sans-serif);
  font-weight: 500;
  color: var(--text, #374151);
  text-decoration: none;
  transition: all 0.2s ease;
}
.categories-dropdown .dropdown-menu a:hover {
  background: rgba(0, 201, 255, 0.05);
  color: #00C9FF;
  padding-left: 25px;
}
.categories-dropdown .dropdown-menu a:not(:last-child) {
  border-bottom: 1px solid rgba(0,0,0,0.03);
}

@media (max-width: 992px) {
  .categories-dropdown {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0px;
  }
  .btn-categories {
    width: 100%;
    justify-content: space-between;
    border-radius: 0;
  }
  .categories-dropdown .dropdown-menu {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    border: none;
    display: none;
  }
  .categories-dropdown:hover .dropdown-menu,
  .categories-dropdown.active .dropdown-menu {
    display: block;
  }
}
`;

// Append CSS if not exists
const cssFile = path.join(dir, 'css/style.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');
if (!cssContent.includes('.categories-dropdown')) {
    cssContent = cssContent.replace('/* Hero Section */', CSS_DECLARATION + '\n/* Hero Section */');
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log('Updated CSS');
}

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let original = content;
    // Remove "All Categories" navlink
    content = content.replace(/<li>\s*<a href="[^"]*"\s*class="nav-item(?:\s+active)?"\s*>All Categories<\/a>\s*<\/li>/gi, '');

    // Check if we need to add dropdown
    if (!content.includes('categories-dropdown')) {
        const dropdownHtml = `<!-- Categories Dropdown Button -->
                <div class="categories-dropdown">
                    <button class="btn-categories"><i class="fa-solid fa-border-all"></i> All Categories <i class="fa-solid fa-chevron-down"></i></button>
                    <div class="dropdown-menu">
                        <a href="products.html">Electronics</a>
                        <a href="products.html">Machinery</a>
                        <a href="products.html">Automotive</a>
                        <a href="products.html">Agriculture</a>
                        <a href="products.html">Apparel</a>
                    </div>
                </div>

                <!-- Navigation Links -->`;
        content = content.replace('<!-- Navigation Links -->', dropdownHtml);
    }

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated HTML:', file);
    }
});
