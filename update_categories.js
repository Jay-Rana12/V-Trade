const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldDropdownRegex = /<div class="dropdown-menu">[\s\S]*?<\/div>/;
const newDropdown = `<div class="dropdown-menu">
                            <a href="products.html">Kitchenware</a>
                            <a href="products.html">Horeca</a>
                            <a href="products.html">Houseware</a>
                            <a href="products.html">Tubes & Pipes</a>
                            <a href="products.html">Raw Materials</a>
                        </div>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Safety check: ensure we only replace the categories dropdown, 
    // but looking at the structure it's uniquely inside <li class="categories-dropdown">
    const match = content.match(/<li class="categories-dropdown[^>]*>[\s\S]*?<button[^>]*>[\s\S]*?<\/button>\s*(<div class="dropdown-menu">[\s\S]*?<\/div>)/);

    if (match) {
        content = content.replace(match[1], newDropdown);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated categories in', file);
    }
});
