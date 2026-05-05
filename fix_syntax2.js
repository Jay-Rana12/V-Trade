const fs = require('fs');
const path = require('path');

const dir = "c:\\\\Users\\\\AE\\\\OneDrive\\\\Desktop\\\\redesign";
const files = ['services.html', 'products.html', 'gallery.html', 'index.html'];

files.forEach(f => {
    let target = path.join(dir, f);
    if (!fs.existsSync(target)) return;
    let content = fs.readFileSync(target, "utf-8");

    // Replace literal backslash followed by backtick with just backtick
    // Using string replace with split/join to avoid any regex escaping mess
    content = content.split('\\\\`').join('`');

    // Replace literal backslash followed by $ inside backtick strings: \${ -> ${
    content = content.split('\\\\${').join('${');

    fs.writeFileSync(target, content, "utf-8");
    console.log("Fixed syntax correctly in " + f);
});
