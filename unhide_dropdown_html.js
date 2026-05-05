const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the inline style that hid Categories dropdown
    content = content.replace('<li class="categories-dropdown" style="display: none !important;">', '<li class="categories-dropdown">');
    content = content.replace('<li class="categories-dropdown" style="display: none;">', '<li class="categories-dropdown">');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Restored dropdown to html:', file);
});
