const fs = require('fs');
const path = require('path');

const dir = "c:\\\\Users\\\\AE\\\\OneDrive\\\\Desktop\\\\redesign";
const files = ['services.html', 'products.html', 'gallery.html', 'index.html'];

files.forEach(f => {
    let target = path.join(dir, f);
    if (!fs.existsSync(target)) return;
    
    let content = fs.readFileSync(target, "utf-8");
    
    // Replace literal backslash-backtick with just backtick
    content = content.replace(/\\\\`/g, '`');
    // Also fix the optional chaining just in case if the browser prefers it
    // But optional chaining is standard, so the main issue is the backticks.

    // Also replace \${ inside the backticks which became literal \${ in the code
    content = content.replace(/\\\$\\{/g, '${');
    
    fs.writeFileSync(target, content, "utf-8");
    console.log("Fixed syntax in " + f);
});
