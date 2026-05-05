const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/AE/OneDrive/Desktop/redesign';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Hide Categories dropdown using inline style
    content = content.replace('<li class="categories-dropdown">', '<li class="categories-dropdown" style="display: none !important;">');

    // Set standard layout
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Modified HTML structure manually:', file);
});
