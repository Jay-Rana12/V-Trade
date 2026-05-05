const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Reverse the previous operation
    // Find the standalone categories-dropdown
    const dropdownRegex = /<!-- Categories Dropdown Button -->[\s\S]*?<div class="categories-dropdown">[\s\S]*?<\/div>[\s\S]*?<div class="dropdown-menu">[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<!-- Navigation Links -->/i;
    content = content.replace(dropdownRegex, '<!-- Navigation Links -->');

    // Alternatively, just do string replace
    content = content.replace(`<!-- Categories Dropdown Button -->
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

                <!-- Navigation Links -->`, '<!-- Navigation Links -->');

    // Now insert it INSIDE the ul
    if (!content.includes('<li class="categories-dropdown">')) {
        content = content.replace('<ul class="premium-nav-links">', `<ul class="premium-nav-links">
                    <li class="categories-dropdown">
                        <button class="btn-categories"><i class="fa-solid fa-border-all"></i> All Categories <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="dropdown-menu">
                            <a href="products.html">Electronics</a>
                            <a href="products.html">Machinery</a>
                            <a href="products.html">Automotive</a>
                            <a href="products.html">Agriculture</a>
                            <a href="products.html">Apparel</a>
                        </div>
                    </li>`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed HTML:', file);
    }
});
