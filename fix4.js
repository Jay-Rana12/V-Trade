const fs = require('fs');
const path = require('path');

const dir = "c:\\\\Users\\\\AE\\\\OneDrive\\\\Desktop\\\\redesign";
const files = ['services.html', 'products.html', 'gallery.html', 'index.html'];

files.forEach(f => {
    let target = path.join(dir, f);
    if (!fs.existsSync(target)) return;
    
    let content = fs.readFileSync(target, "utf-8");
    
    // In javascript strings, "\\`" means regex matching a literal backslash followed by backtick.
    content = content.replace(/\\\\`/g, '`');
    
    // Similarly for dollar signs
    content = content.replace(/\\\\\$/g, '$');

    fs.writeFileSync(target, content, "utf-8");
    console.log("Fixed " + f);
});
