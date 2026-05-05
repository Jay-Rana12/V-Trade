const fs = require('fs');
const path = require('path');

const dir = 'c:/xampp/htdocs/redesign';
const indexHtmlPaths = path.join(dir, 'index.html');

let indexContent = fs.readFileSync(indexHtmlPaths, 'utf8');

// The exact regex to capture the full extended-header
const headerRegex = /<header class="extended-header">([\s\S]*?)<\/header>/;
const indexHeaderMatch = indexContent.match(headerRegex);

if (!indexHeaderMatch) {
    console.error("Could not find extended-header in index.html");
    process.exit(1);
}

const baseHeader = indexHeaderMatch[0];

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.match(headerRegex)) {
        // We need to figure out which link should be active.
        let pageName = file;
        let activeLink = 'HOME';
        if (file === 'about.html') activeLink = 'ABOUT US';
        if (file === 'services.html') activeLink = 'TOP CATEGORY';
        if (file === 'products.html') activeLink = 'NEW ARRIVAL';
        if (file === 'gallery.html') activeLink = 'TRENDING PRODUCTS';
        if (file === 'blog.html') activeLink = 'BLOGS';
        if (file === 'contact.html') activeLink = 'CONTACT';
        
        // Remove existing active class from HOME
        let specificHeader = baseHeader.replace('class="nav-item active">HOME<', 'class="nav-item">HOME<');
        // Add active class to proper page
        specificHeader = specificHeader.replace('class="nav-item">' + activeLink + '<', 'class="nav-item active">' + activeLink + '<');
        
        content = content.replace(headerRegex, specificHeader);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated header in ' + file);
    }
}
console.log("All headers synchronized!");
